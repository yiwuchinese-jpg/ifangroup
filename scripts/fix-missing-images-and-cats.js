const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { createClient } = require('@sanity/client');
const slugify = require('slugify');
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
const TEMP_EXTRACT_DIR = '/tmp/ifangroup-excel-extract-fix';

// Strict canonical categories
const CATEGORY_MAP = [
    { key: ['PPR', 'PP-R'], name: 'PPR Series', summary: 'PPR Pipe & Fitting Systems.' },
    { key: ['HDPE', 'PE '], name: 'PE Series', summary: 'High-Density Polyethylene solutions.' },
    { key: ['PVC', 'UPVC'], name: 'UPVC / PVC Series', summary: 'Unplasticized PVC systems.' },
    { key: ['PPH'], name: 'PPH Series', summary: 'Industrial PPH piping systems.' },
    { key: ['VALVE'], name: 'Brass Valves', summary: 'Premium Brass Valves.' },
    { key: ['卡套', '铜水暖件', 'BRASS FITTING', 'CW617'], name: 'Brass Fittings', summary: 'Premium Brass Fittings.' },
    { key: ['MLP', 'PRESS FITTING'], name: 'Press Fittings', summary: 'Press fittings for multilayer pipes.' },
    { key: ['滑紧', 'AXIAL'], name: 'Axial Fittings', summary: 'Axial slide fittings.' },
    { key: ['PP管件'], name: 'PP Compression Fittings', summary: 'Polypropylene compression fittings.' }
];

async function run() {
    console.log('🚀 Starting Precision Fix Pipeline for Images & Categories...');

    // 1. Delete ALL old / duplicate categories and strictly re-create canonical ones
    console.log('--- Cleaning up and Initializing Canonical Categories ---');
    const existingCats = await client.fetch('*[_type == "category"]{_id, title}');
    const canonicalNames = CATEGORY_MAP.map(c => c.name);

    // Delete ones that are not strictly matching our canonical list, or duplicates
    const catNameToId = {};
    for (const cat of CATEGORY_MAP) {
        const slug = slugify(cat.name, { lower: true });
        const docId = `category-auto-strict-${slug}`;
        catNameToId[cat.name] = docId;
        await client.createOrReplace({
            _id: docId,
            _type: 'category',
            title: cat.name,
            description: cat.summary,
            slug: { _type: 'slug', current: slug }
        });
    }

    const obsoleteIds = existingCats.filter(c => !Object.values(catNameToId).includes(c._id)).map(c => c._id);
    console.log(`🧹 Deleting ${obsoleteIds.length} obsolete / duplicate categories...`);
    for (const oId of obsoleteIds) {
        try { await client.delete(oId); } catch (e) { }
    }

    // 2. Fetch all products, including their brand name to avoid collisions
    console.log('\n--- Fetching State from Sanity ---');
    const allProducts = await client.fetch(`*[_type == "product"]{
        _id, 
        name, 
        "brandName": brand->name, 
        "hasImage": defined(mainImage), 
        category
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
        let filename = path.basename(file).toUpperCase();
        console.log(`\n⏳ Processing: ${filename}`);

        // Extract Brand from parent folder to match strictly against Sanity SPU brand reference
        const parentFolder = path.basename(path.dirname(file));

        let fileCategory = 'Other Accessories';
        for (const cat of CATEGORY_MAP) {
            if (cat.key.some(k => filename.includes(k))) {
                fileCategory = cat.name;
                break;
            }
        }
        const targetCategoryId = catNameToId[fileCategory];

        let workbook;
        try {
            workbook = XLSX.readFile(file);
        } catch (e) {
            console.log(`   ⚠️ Could not read ${filename}`);
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
            // STRICT MATCH: Must match both Name AND Brand to avoid overwriting identical items across brands
            const prodMatches = allProducts.filter(p => p.name === spuName && (p.brandName && p.brandName.toLowerCase() === parentFolder.toLowerCase()));

            if (prodMatches.length === 0) continue;

            const targetProd = prodMatches[0];
            let patchData = {};
            let isPatchNeeded = false;

            if (!targetProd.category || targetProd.category._ref !== targetCategoryId) {
                patchData.category = { _type: 'reference', _ref: targetCategoryId };
                isPatchNeeded = true;
            }

            if (!targetProd.hasImage) {
                let matchedImageName = null;
                // Increased tolerance because Excel rows with pictures are extremely variable natively
                for (const anch of anchors) {
                    if (Math.abs(sRow - anch.row) <= 4) {
                        matchedImageName = rels[anch.rId];
                        break; // Grab the closest one
                    }
                }

                if (matchedImageName) {
                    const imagePath = path.join(TEMP_EXTRACT_DIR, 'xl/media', matchedImageName);
                    if (fs.existsSync(imagePath)) {
                        try {
                            const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), { filename: path.basename(matchedImageName) });
                            patchData.mainImage = { _type: 'image', asset: { _type: 'reference', _ref: uploadedAsset._id } };
                            isPatchNeeded = true;
                            imageUploads++;
                            targetProd.hasImage = true;
                            console.log(`   📸 [Fixed] ${parentFolder} -> ${spuName}`);
                        } catch (imgErr) { }
                    }
                }
            }

            if (isPatchNeeded) {
                updates.push(client.patch(targetProd._id).set(patchData).commit());
            }
        }
    }

    console.log(`\n--- Batch Processing Sanity Patches (${updates.length} operations) ---`);
    if (updates.length > 0) {
        const BATCH_SIZE = 20;
        for (let i = 0; i < updates.length; i += BATCH_SIZE) {
            const chunk = updates.slice(i, i + BATCH_SIZE);
            await Promise.all(chunk);
        }
    }

    console.log(`\n✅ Finished Execution! Successfully uploaded ${imageUploads} new missing images and fixed categories.`);
}

run().catch(console.error);
