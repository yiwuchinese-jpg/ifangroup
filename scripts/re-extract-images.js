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
const TEMP_CONVERT_DIR = '/tmp/ifangroup-excel-converted';
const TEMP_EXTRACT_DIR = '/tmp/ifangroup-excel-extract-re-extract';

const normalize = (str) => String(str).toLowerCase().replace(/[\s\r\n\t_]+/g, '');

async function run() {
    console.log('🚀 Starting Universal Image Fill v3 (Legacy + Native + Fuzzy Math)...');

    console.log('\n--- Fetching State from Sanity ---');
    const allProducts = await client.fetch(`*[_type == "product"]{
        _id, 
        name, 
        "brandName": brand->name, 
        "hasImage": defined(mainImage)
    }`);

    const excelFiles = [];

    // 1. Gather native .xlsx
    const getNative = (dir) => {
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getNative(fullPath);
            } else if (fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                excelFiles.push({ path: fullPath, source: 'native', parent: path.basename(path.dirname(fullPath)) });
            }
        }
    };
    getNative(BASE_EXCEL_DIR);

    // 2. Gather converted legacy .xlsx
    const getConverted = (dir) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getConverted(fullPath);
            } else if (fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                excelFiles.push({ path: fullPath, source: 'converted', parent: path.basename(path.dirname(fullPath)) });
            }
        }
    };
    getConverted(TEMP_CONVERT_DIR);

    console.log(`\nGathered ${excelFiles.length} combined files for processing.`);

    const updates = [];
    let imageUploads = 0;

    for (const fileObj of excelFiles) {
        const file = fileObj.path;
        const parentFolder = fileObj.parent;
        const filename = path.basename(file).toUpperCase();

        let workbook;
        try { workbook = XLSX.readFile(file); } catch (e) { continue; }

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

        const rowToSPU = new Map();
        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];
            if (!rowData || rowData.length < 2) continue;
            const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
            if (nameCell && nameCell.length > 2 && nameCell.toLowerCase() !== 'name') {
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
                const blipMatch = block.match(/<a:blip [^>]*r:embed="(rId\d+)"/);
                if (fromRowMatch && blipMatch) {
                    anchors.push({ row: parseInt(fromRowMatch[1]) + 1, rId: blipMatch[1] });
                }
            }
        }

        anchors.sort((a, b) => a.row - b.row);
        const sortedRowSPUs = Array.from(rowToSPU.entries()).sort((a, b) => a[0] - b[0]);

        for (const [sRow, spuName] of sortedRowSPUs) {
            const normalizedSpu = normalize(spuName);
            const normalizedFolder = normalize(parentFolder);

            // Fuzzy match name + Fuzzy match brand
            const prodMatches = allProducts.filter(p => {
                if (!p.brandName) return false;
                const matchName = normalize(p.name) === normalizedSpu;
                const matchBrand = normalize(p.brandName) === normalizedFolder;
                return matchName && matchBrand;
            });

            if (prodMatches.length === 0) continue;

            let matchedImageName = null;
            let closestAnchor = null;
            // Cascading to group bounds +2/-1 tolerance
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

                    for (const targetProd of prodMatches) {
                        if (!targetProd.hasImage) {
                            if (!uploadedAssetId) {
                                try {
                                    const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), { filename: path.basename(matchedImageName) });
                                    uploadedAssetId = uploadedAsset._id;
                                    console.log(`   📸 [Uploaded] ${parentFolder} -> ${spuName}`);
                                } catch (imgErr) { break; }
                            }

                            if (uploadedAssetId) {
                                updates.push(client.patch(targetProd._id).set({
                                    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: uploadedAssetId } }
                                }).commit());
                                targetProd.hasImage = true; // prevent re-upload
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

    console.log(`\n✅ Finished Execution! Successfully uploaded ${imageUploads} new images via Universal Extraction.`);
}

run().catch(console.error);
