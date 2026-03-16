const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

const EXCEL_PATH = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/1-103-1，IFANPro 103 PPR 2103 2026-2-11 美员更新.xlsx';
const TEMP_DIR = path.join(__dirname, '../temp_excel_products');

async function run() {
    console.log('🚀 Starting Image Fix Pipeline...');

    // 1. Gather all products from Sanity to know which ones need images
    // We filter down to products from the IFANPro sheet we know.
    const products = await client.fetch('*[_type == "product" && brand->slug.current == "ifanpro"]{_id, name, "hasImage": defined(mainImage)}');
    const existingProducts = new Map(products.map(p => [p.name.trim(), p]));
    console.log(`Fetched ${products.length} products. ${products.filter(p => !p.hasImage).length} missing images.`);

    // 2. Parse relationships and robust anchors from XML
    const rels = {};
    const anchors = [];

    if (fs.existsSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'))) {
        const drawingXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'), 'utf8');
        const relsXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/_rels/drawing1.xml.rels'), 'utf8');

        const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image\d+\.\w+)"/g);
        for (const match of relMatches) {
            rels[match[1]] = match[2];
        }

        const anchorBlocks = drawingXml.split(/<xdr:(two|one)CellAnchor/);
        for (const block of anchorBlocks) {
            const fromRowMatch = block.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/);
            const blipMatch = block.match(/<a:blip r:embed="(rId\d+)"/);
            if (fromRowMatch && blipMatch) {
                anchors.push({
                    row: parseInt(fromRowMatch[1]) + 1, // Make 1-indexed to match XLSX sheet row reading concept
                    rId: blipMatch[1]
                });
            }
        }
        console.log(`Found ${anchors.length} anchors and ${Object.keys(rels).length} images.`);
    } else {
        console.log('❌ drawing1.xml not found. Please extract first.');
        return;
    }

    // 3. Scan the sheet again to map Name -> Excel Row
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheetName = workbook.SheetNames[0]; // IFANPro
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

    const rowToSPU = new Map();
    // Data starts around row 7 (index 6)
    for (let i = 0; i < data.length; i++) {
        const rowData = data[i];
        if (!rowData || rowData.length < 2) continue;
        const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
        if (nameCell && nameCell.length > 2 && nameCell !== 'Name') {
            const cleanName = nameCell.split('\n')[0].trim();
            rowToSPU.set(i + 1, cleanName); // i+1 because anchors match visually 1-based index (often)
        }
    }

    // Attempt matching Image -> Product
    let countUploaded = 0;

    // Sort anchors by row to iterate smoothly
    anchors.sort((a, b) => a.row - b.row);
    const sortedRowSPUs = Array.from(rowToSPU.entries()).sort((a, b) => a[0] - b[0]);

    for (const anchor of anchors) {
        // Find the closest SPU row BEFORE or AT this anchor row.
        // Images are often placed at the exact row or slightly below the name cell.
        let targetSPU = null;
        for (const [rowNum, val] of sortedRowSPUs) {
            // we give it a tolerance of falling back to the previous SPU definition
            if (rowNum <= anchor.row + 3) {
                targetSPU = val;
            } else {
                break;
            }
        }

        if (targetSPU) {
            const prod = existingProducts.get(targetSPU);
            if (prod && !prod.hasImage) {
                const imageName = rels[anchor.rId];
                if (!imageName) continue;

                const imagePath = path.join(TEMP_DIR, 'xl/media', imageName);
                if (fs.existsSync(imagePath)) {
                    console.log(`🖼️ Extracted image ${imageName} for product: ${targetSPU} (Row ~${anchor.row})`);
                    try {
                        const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
                            filename: imageName
                        });

                        await client.patch(prod._id)
                            .set({
                                mainImage: {
                                    _type: 'image',
                                    asset: { _type: 'reference', _ref: uploadedAsset._id }
                                }
                            })
                            .commit();

                        prod.hasImage = true; // prevent re-upload
                        countUploaded++;
                    } catch (e) {
                        console.error(`❌ Upload fail for ${targetSPU}: ${e.message}`);
                    }
                }
            }
        }
    }

    console.log(`✅ Uploaded and fixed ${countUploaded} missing images.`);
}

run().catch(console.error);
