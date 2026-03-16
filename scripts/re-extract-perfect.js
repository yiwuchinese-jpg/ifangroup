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
const TEMP_EXTRACT_DIR = '/tmp/ifangroup-excel-extract-deep';

function normalize(str) {
    return String(str).toLowerCase().replace(/[\s\r\n\t_]+/g, '');
}

function parseRelationships(relsXmlPath) {
    if (!fs.existsSync(relsXmlPath)) return {};
    const relsXml = fs.readFileSync(relsXmlPath, 'utf8');
    const rels = {};
    const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="([^"]+)"/g);
    for (const match of relMatches) {
        rels[match[1]] = match[2];
    }
    return rels;
}

async function run() {
    console.log('🚀 Starting Perfect Multi-Sheet Image Fill...');

    console.log('\n--- Fetching State from Sanity ---');
    const allProducts = await client.fetch(`*[_type == "product" && !defined(mainImage)]{
        _id, 
        name, 
        "brandName": brand->name
    }`);

    // Convert Sanity products for fast lookup
    const sanityMap = allProducts.map(p => ({
        _id: p._id,
        normName: normalize(p.name),
        normBrand: normalize(p.brandName || ''),
        done: false
    }));

    const excelFiles = [];
    const getFiles = (dir, source) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getFiles(fullPath, source);
            } else if (fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                excelFiles.push({ path: fullPath, source, parent: path.basename(path.dirname(fullPath)) });
            }
        }
    };
    getFiles(BASE_EXCEL_DIR, 'native');
    getFiles(TEMP_CONVERT_DIR, 'converted');

    const updates = [];
    let imageUploads = 0;

    for (const fileObj of excelFiles) {
        const file = fileObj.path;
        const parentFolder = fileObj.parent;
        const folderNorm = normalize(parentFolder);

        // 1. Read workbook with SheetJS (for data matching)
        let workbook;
        try { workbook = XLSX.readFile(file); } catch (e) { continue; }

        if (fs.existsSync(TEMP_EXTRACT_DIR)) {
            fs.rmSync(TEMP_EXTRACT_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(TEMP_EXTRACT_DIR, { recursive: true });

        // Unzip EVERYTHING to map relationships accurately (worksheets, drawings, media)
        try {
            execSync(`unzip -o "${file}" -d "${TEMP_EXTRACT_DIR}"`, { stdio: 'ignore' });
        } catch (e) { }

        // 2. Parse workbook.xml to get Sheet name -> Sheet rId
        const wbXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/workbook.xml');
        if (!fs.existsSync(wbXmlPath)) continue;
        const wbXml = fs.readFileSync(wbXmlPath, 'utf8');
        const sheetMap = {}; // name -> rId
        const wbSheetMatches = wbXml.matchAll(/<sheet [^>]*name="([^"]+)"[^>]*r:id="(rId\d+)"/g);
        for (const match of wbSheetMatches) {
            sheetMap[match[1]] = match[2];
        }

        // 3. Parse xl/_rels/workbook.xml.rels to get rId -> worksheets/sheetX.xml
        const wbRels = parseRelationships(path.join(TEMP_EXTRACT_DIR, 'xl/_rels/workbook.xml.rels'));

        // Iterate through all tabs via SheetJS
        for (let sheetIdx = 0; sheetIdx < workbook.SheetNames.length; sheetIdx++) {
            const sheetName = workbook.SheetNames[sheetIdx];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

            const rowToSPU = new Map();
            for (let i = 0; i < data.length; i++) {
                const rowData = data[i];
                if (!rowData || rowData.length < 2) continue;
                const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
                if (nameCell && nameCell.length > 2 && nameCell.toLowerCase() !== 'name') {
                    rowToSPU.set(i + 1, nameCell);
                }
            }

            // Figure out drawing file for this sheet
            const sheetRId = sheetMap[sheetName]; // e.g. "rId1"
            if (!sheetRId) continue;

            const sheetXmlTarget = wbRels[sheetRId]; // e.g. "worksheets/sheet1.xml" or "xl/worksheets/..."
            if (!sheetXmlTarget) continue;

            const sheetXmlTargetCln = sheetXmlTarget.replace('xl/', ''); // Handle LibreOffice vs Excel relative paths
            const sheetRelsPath = path.join(TEMP_EXTRACT_DIR, `xl/worksheets/_rels/${path.basename(sheetXmlTargetCln)}.rels`);

            const sheetRels = parseRelationships(sheetRelsPath);
            // Search for drawing relationship
            let drawingTarget = null;
            for (const rKey in sheetRels) {
                if (sheetRels[rKey].includes('drawing')) {
                    drawingTarget = sheetRels[rKey]; // e.g. "../drawings/drawing1.xml"
                    break;
                }
            }

            const anchors = [];
            let drawRels = {};

            if (drawingTarget) {
                const drawingName = path.basename(drawingTarget);
                const drawingXmlPath = path.join(TEMP_EXTRACT_DIR, `xl/drawings/${drawingName}`);
                const drawRelsPath = path.join(TEMP_EXTRACT_DIR, `xl/drawings/_rels/${drawingName}.rels`);

                drawRels = parseRelationships(drawRelsPath);

                if (fs.existsSync(drawingXmlPath)) {
                    const drawingXml = fs.readFileSync(drawingXmlPath, 'utf8');
                    const anchorBlocks = drawingXml.split(/<xdr:(two|one)CellAnchor/);
                    for (const block of anchorBlocks) {
                        const fromRowMatch = block.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/);
                        const blipMatch = block.match(/<a:blip [^>]*r:embed="(rId\d+)"/);
                        if (fromRowMatch && blipMatch) {
                            anchors.push({ row: parseInt(fromRowMatch[1]) + 1, rId: blipMatch[1] });
                        }
                    }
                }
            }
            anchors.sort((a, b) => a.row - b.row);

            // Match SPUs with Images in this specific Sheet
            const sortedRowSPUs = Array.from(rowToSPU.entries()).sort((a, b) => a[0] - b[0]);

            for (const [sRow, spuNameRaw] of sortedRowSPUs) {
                const clean1 = normalize(spuNameRaw.split('\n')[0].trim());
                const clean2 = normalize(spuNameRaw);

                // Find ALL Sanity products that match this SPU
                const prodMatches = sanityMap.filter(m => {
                    if (m.done) return false;
                    if (m.normBrand === folderNorm) {
                        return m.normName === clean1 || m.normName === clean2 || clean2.includes(m.normName) || m.normName.includes(clean2);
                    }
                    return false;
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
                    const rTarget = drawRels[closestAnchor.rId];
                    if (rTarget) {
                        matchedImageName = path.basename(rTarget);
                    }
                }

                if (matchedImageName) {
                    const imagePath = path.join(TEMP_EXTRACT_DIR, 'xl/media', matchedImageName);
                    if (fs.existsSync(imagePath)) {
                        let uploadedAssetId = null;

                        for (const targetProd of prodMatches) {
                            if (!uploadedAssetId) {
                                try {
                                    const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), { filename: matchedImageName });
                                    uploadedAssetId = uploadedAsset._id;
                                    console.log(`   📸 [Tab Upload] ${parentFolder} -> ${targetProd.normName}`);
                                } catch (imgErr) { break; }
                            }

                            if (uploadedAssetId) {
                                updates.push(client.patch(targetProd._id).set({
                                    mainImage: { _type: 'image', asset: { _type: 'reference', _ref: uploadedAssetId } }
                                }).commit());
                                targetProd.done = true; // prevent re-upload
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

    console.log(`\n✅ Finished Execution! Successfully uploaded ${imageUploads} Perfect Multisheet images.`);
}

run().catch(console.error);
