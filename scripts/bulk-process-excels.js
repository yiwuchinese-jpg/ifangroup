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
const TEMP_EXTRACT_DIR = '/tmp/ifangroup-excel-extract';

// Keyword to Canonical Category mapping
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
    console.log('🚀 Starting Global Excel Batch Processor...');

    // 1. Map existing Categories in Sanity (or create if missing)
    console.log('--- Initializing Canonical Categories ---');
    const catNameToId = {};
    for (const cat of CATEGORY_MAP) {
        const slug = slugify(cat.name, { lower: true });
        const docId = `category-auto-${slug}`;
        catNameToId[cat.name] = docId;
        await client.createOrReplace({
            _id: docId,
            _type: 'category',
            title: cat.name,
            description: cat.summary,
            slug: { _type: 'slug', current: slug }
        });
    }

    // 2. Fetch ALL products once to know what exists and if they need patches
    console.log('--- Fetching State from Sanity ---');
    const allProducts = await client.fetch('*[_type == "product"]{_id, name, "hasImage": defined(mainImage), category}');

    // We'll need brand matching and potentially Name + Brand unique matching
    // But products in Sanity were created via names, often the names match Excel names exactly.
    // However, some products share names across brands.

    // 3. Find all Excels
    const excelFiles = [];
    const getFiles = (dir) => {
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getFiles(fullPath);
            } else if (fullPath.endsWith('.xls') || fullPath.endsWith('.xlsx')) {
                excelFiles.push(fullPath);
            }
        }
    };
    getFiles(BASE_EXCEL_DIR);
    console.log(`--- Found ${excelFiles.length} Excel Files to process ---`);

    // We will build batched updates
    const updates = [];
    let imageUploads = 0;

    for (const file of excelFiles) {
        const filename = path.basename(file).toUpperCase();
        console.log(`\n⏳ Processing: ${filename}`);

        // Infer Category
        let fileCategory = 'Other Accessories';
        for (const cat of CATEGORY_MAP) {
            if (cat.key.some(k => filename.includes(k))) {
                fileCategory = cat.name;
                break;
            }
        }
        const targetCategoryId = catNameToId[fileCategory];
        console.log(`   -> Context Category: ${fileCategory}`);

        // Read Excel SPU Rows
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
                rowToSPU.set(i + 1, cleanName); // 1-indexed visual tracking
            }
        }

        // Unzip and Match Drawing XML Anchor rows for Images
        if (fs.existsSync(TEMP_EXTRACT_DIR)) {
            fs.rmSync(TEMP_EXTRACT_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(TEMP_EXTRACT_DIR, { recursive: true });

        try {
            execSync(`unzip -o "${file}" "xl/drawings/drawing1.xml" "xl/drawings/_rels/drawing1.xml.rels" "xl/media/*" -d "${TEMP_EXTRACT_DIR}"`, { stdio: 'ignore' });
        } catch (e) {
            console.log('   (No embedded media extracted for this file)');
        }

        const rels = {};
        const anchors = [];

        const drawingXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/drawings/drawing1.xml');
        const relsXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/drawings/_rels/drawing1.xml.rels');
        if (fs.existsSync(drawingXmlPath) && fs.existsSync(relsXmlPath)) {
            const drawingXml = fs.readFileSync(drawingXmlPath, 'utf8');
            const relsXml = fs.readFileSync(relsXmlPath, 'utf8');

            const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image[^"]+)"/g);
            for (const match of relMatches) {
                rels[match[1]] = match[2];
            }

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

        // Process each extracted SPU
        for (const [sRow, spuName] of sortedRowSPUs) {
            // Find target product in sanity
            // The naive assumption is that Name is unique enough for our patching.
            const prodMatches = allProducts.filter(p => p.name === spuName);
            if (prodMatches.length === 0) continue;

            const targetProd = prodMatches[0];

            let patchData = {};
            let isPatchNeeded = false;

            // 1. Force override Category based on this File's context
            if (!targetProd.category || targetProd.category._ref !== targetCategoryId) {
                patchData.category = { _type: 'reference', _ref: targetCategoryId };
                isPatchNeeded = true;
            }

            // 2. Try to assign Image
            if (!targetProd.hasImage) {
                let matchedImageName = null;
                for (const anch of anchors) {
                    if (sRow <= anch.row + 3 && sRow >= anch.row - 3) {
                        matchedImageName = rels[anch.rId];
                        break;
                    }
                }

                if (matchedImageName) {
                    const imagePath = path.join(TEMP_EXTRACT_DIR, 'xl/media', matchedImageName);
                    if (fs.existsSync(imagePath)) {
                        console.log(`   📸 Found image for ${spuName}`);
                        try {
                            const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), { filename: path.basename(matchedImageName) });
                            patchData.mainImage = { _type: 'image', asset: { _type: 'reference', _ref: uploadedAsset._id } };
                            isPatchNeeded = true;
                            imageUploads++;
                            targetProd.hasImage = true; // Mark as done locally so we don't spam
                        } catch (imgErr) {
                            console.error(`   ❌ Failed upload image for ${spuName}: ${imgErr.message}`);
                        }
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
        // Execute in small batches to prevent Sanity API choke
        const BATCH_SIZE = 20;
        for (let i = 0; i < updates.length; i += BATCH_SIZE) {
            const chunk = updates.slice(i, i + BATCH_SIZE);
            await Promise.all(chunk);
            console.log(`Patched ${Math.min(i + BATCH_SIZE, updates.length)} / ${updates.length}`);
        }
    }

    console.log(`\n✅ Finished! Successfully uploaded ${imageUploads} new images and assigned granular categories.`);
}

run().catch(console.error);
