const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { createClient } = require('@sanity/client');
const slugify = require('slugify');
const { execSync } = require('child_process');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

const EXCEL_PATH = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/IFANGroup 2025-2-7 Justin更新.xlsx';
const TEMP_DIR = path.join(__dirname, '../temp_excel_extraction');

async function extractLogos() {
    console.log('🚀 Starting deep logo extraction and upload...');

    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

    try {
        // 1. Unzip relevant XML files to find positions
        execSync(`unzip -o "${EXCEL_PATH}" "xl/drawings/drawing1.xml" "xl/drawings/_rels/drawing1.xml.rels" "xl/media/*" -d "${TEMP_DIR}"`);

        const drawingXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'), 'utf8');
        const relsXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/_rels/drawing1.xml.rels'), 'utf8');

        // 2. Parse relationships (rId -> image filename)
        const rels = {};
        const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image\d+\.\w+)"/g);
        for (const match of relMatches) {
            rels[match[1]] = match[2];
        }

        // 3. Parse anchors (row -> rId)
        const anchors = [];
        const anchorMatches = drawingXml.matchAll(/<xdr:row>(\d+)<\/xdr:row>[\s\S]*?<a:blip r:embed="(rId\d+)"/g);
        for (const match of anchorMatches) {
            anchors.push({
                row: parseInt(match[1]) + 1, // Excel row is 1-indexed, match is 0-indexed
                rId: match[2]
            });
        }

        // 4. Parse XLSX for Brand Names at those rows
        const workbook = XLSX.readFile(EXCEL_PATH);
        const sheet = workbook.Sheets['IFANGroup'];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const brandMap = {}; // Row -> BrandName
        for (let i = 1; i < data.length; i++) {
            const rowData = data[i];
            const brandName = rowData[3];
            if (brandName && brandName !== '品牌名称') {
                brandMap[i + 1] = brandName.toString().trim();
            }
        }

        // 5. Match and Upload
        for (const anchor of anchors) {
            let matchedBrand = null;

            // Images might be slightly offset from the exact text row, so we look for the closest brand name row above or at the image row
            for (let r = anchor.row; r >= anchor.row - 2; r--) {
                if (brandMap[r]) {
                    matchedBrand = brandMap[r];
                    break;
                }
            }

            if (matchedBrand) {
                const imageName = rels[anchor.rId];
                const imagePath = path.join(TEMP_DIR, 'xl/media', imageName);
                const slug = slugify(matchedBrand, { lower: true });
                const brandId = `brand-${slug}`;

                if (fs.existsSync(imagePath)) {
                    console.log(`🖼️  Uploading logo for brand "${matchedBrand}" (${imageName})...`);

                    try {
                        const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
                            filename: imageName
                        });

                        await client.patch(brandId)
                            .set({
                                logo: {
                                    _type: 'image',
                                    asset: {
                                        _type: 'reference',
                                        _ref: asset._id
                                    }
                                }
                            })
                            .commit();

                        console.log(`✅ Successfully attached logo to ${matchedBrand}`);
                    } catch (uploadErr) {
                        console.error(`❌ Failed to upload/attach for ${matchedBrand}:`, uploadErr.message);
                    }
                }
            }
        }

    } catch (err) {
        console.error('💥 Critical error during extraction:', err);
    } finally {
        console.log('🧹 Cleaning up...');
        // Optional: fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }

    console.log('🏁 Batch logo process finished.');
}

extractLogos();
