const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { createClient } = require('@sanity/client');
const { execSync } = require('child_process');

// Initialization
const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

const BASE_EXCEL_DIR = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/20，ifan及风帆旗下品牌价格';
const TEMP_EXTRACT_DIR = '/tmp/ifangroup-excel-extract-cascade-v2';

async function run() {
    console.log('🚀 Starting Deep Cascading Array Fill...');

    console.log('\n--- Fetching State from Sanity ---');
    const allProducts = await client.fetch(`*[_type == "product"]{
        _id, 
        name, 
        "brandName": brand->name, 
        "hasImage": defined(mainImage)
    }`);

    const excelFiles = [];
    const getFiles = (dir) => {
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getFiles(fullPath);
            } else if (fullPath.endsWith('.xls') || fullPath.endsWith('.xlsx')) {
                if (!fullPath.includes('~$')) excelFiles.push(fullPath);
            }
        }
    };
    getFiles(BASE_EXCEL_DIR);

    const updates = [];
    let imageUploads = 0;

    for (const file of excelFiles) {
        const filename = path.basename(file).toUpperCase();
        const parentFolder = path.basename(path.dirname(file));

        let workbook;
        try {
            workbook = XLSX.readFile(file);
        } catch (e) {
            continue;
        }

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const rowToSPU = new Map();
        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];
            if (!rowData || rowData.length < 2) continue;
            const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
            if (nameCell && nameCell.length > 2 && nameCell !== 'Name') {
                const cleanName = nameCell.split('\n')[0].trim();
                rowToSPU.set(i + 1, cleanName);
            }
        }

        if (fs.existsSync(TEMP_EXTRACT_DIR)) {
            fs.rmSync(TEMP_EXTRACT_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(TEMP_EXTRACT_DIR, { recursive: true });

        try {
            execSync(`unzip -o "${file}" "xl/drawings/drawing1.xml" "xl/drawings/_rels/drawing1.xml.rels" "xl/media/*" -d "${TEMP_EXTRACT_DIR}"`, { stdio: 'ignore' });
        } catch (e) { }

        const rels = {};
        const anchors = [];

        const drawingXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/drawings/drawing1.xml');
        const relsXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/drawings/_rels/drawing1.xml.rels');
        if (fs.existsSync(drawingXmlPath) && fs.existsSync(relsXmlPath)) {
            const drawingXml = fs.readFileSync(drawingXmlPath, 'utf8');
            const relsXml = fs.readFileSync(relsXmlPath, 'utf8');

            const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image[^"]+)"/g);
            for (const match of relMatches) { rels[match[1]] = match[2]; }

            const anchorBlocks = drawingXml.split(/<xdr:(two|one)CellAnchor/);
            for (const block of anchorBlocks) {
                const fromRowMatch = block.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/);
                const blipMatch = block.match(/<a:blip r:embed="(rId\d+)"/);
                if (fromRowMatch && blipMatch) {
                    anchors.push({ row: parseInt(fromRowMatch[1]) + 1, rId: blipMatch[1] });
                }
            }
        }

        anchors.sort((a, b) => a.row - b.row);
        const sortedRowSPUs = Array.from(rowToSPU.entries()).sort((a, b) => a[0] - b[0]);

        for (const [sRow, spuName] of sortedRowSPUs) {
            const prodMatches = allProducts.filter(p => p.name === spuName && (p.brandName && p.brandName.toLowerCase() === parentFolder.toLowerCase()));

            if (prodMatches.length === 0) continue;

            // Find image once via cascade
            let matchedImageName = null;
            let closestAnchor = null;
            for (const anch of anchors) {
                if (anch.row <= sRow + 2) {
                    if (!closestAnchor || anch.row > closestAnchor.row) {
                        closestAnchor = anch;
                    }
                }
            }

            if (closestAnchor) {
                matchedImageName = rels[closestAnchor.rId];
            }

            if (matchedImageName) {
                const imagePath = path.join(TEMP_EXTRACT_DIR, 'xl/media', matchedImageName);
                if (fs.existsSync(imagePath)) {
                    let uploadedAssetId = null;

                    // Patch ALL matching products in Sanity that lack images, not just [0]
                    for (const targetProd of prodMatches) {
                        if (!targetProd.hasImage) {
                            if (!uploadedAssetId) {
                                try {
                                    const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), { filename: path.basename(matchedImageName) });
                                    uploadedAssetId = uploadedAsset._id;
                                    console.log(`   📸 [Cascade Bound] ${parentFolder} -> ${spuName}`);
                                } catch (imgErr) { break; }
                            }

                            if (uploadedAssetId) {
                                updates.push(client.patch(targetProd._id).set({
                                    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: uploadedAssetId } }
                                }).commit());
                                targetProd.hasImage = true;
                                imageUploads++;
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(`\n--- Batch Processing Sanity Patches (${updates.length} operations) ---`);
    if (updates.length > 0) {
        const BATCH_SIZE = 15;
        for (let i = 0; i < updates.length; i += BATCH_SIZE) {
            const chunk = updates.slice(i, i + BATCH_SIZE);
            await Promise.all(chunk);
            console.log(`Patched ${Math.min(i + BATCH_SIZE, updates.length)} / ${updates.length}`);
        }
    }

    console.log(`\n✅ Finished Execution! Successfully cascaded ${imageUploads} missing duplicate images.`);
}

run().catch(console.error);
