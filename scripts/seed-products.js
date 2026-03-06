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

const EXCEL_PATH = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/1-103-1，IFANPro 103 PPR 2103 2026-2-11 美员更新.xlsx';
const TEMP_DIR = path.join(__dirname, '../temp_excel_products');

// Predefined Brand and Category IDs based on context
const BRAND_ID = 'brand-ifanpro'; // Ensure this matches the existing slug for IFANPro
const CATEGORY_ID = 'category-ppr-pipe-fitting';
const CATEGORY_NAME = 'PPR Pipe & Fitting';

async function seedProducts() {
    console.log('🚀 Starting Product Import & Logo Extraction Pipeline...');

    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

    try {
        // 1. Unzip relevant XML files to find positions
        try {
            console.log('📦 Unzipping Excel media...');
            execSync(`unzip -o "${EXCEL_PATH}" "xl/drawings/drawing1.xml" "xl/drawings/_rels/drawing1.xml.rels" "xl/media/*" -d "${TEMP_DIR}"`, { stdio: 'pipe' });
        } catch (unzipErr) {
            console.log('⚠️ Warning: No images found or unzip failed. Continuing without image extraction.');
        }

        let rels = {};
        let anchors = [];

        if (fs.existsSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'))) {
            const drawingXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'), 'utf8');
            const relsXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/_rels/drawing1.xml.rels'), 'utf8');

            // 2. Parse relationships (rId -> image filename)
            const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image\d+\.\w+)"/g);
            for (const match of relMatches) {
                rels[match[1]] = match[2];
            }

            // 3. Parse anchors (row -> rId)
            const anchorMatches = drawingXml.matchAll(/<xdr:row>(\d+)<\/xdr:row>[\s\S]*?<a:blip r:embed="(rId\d+)"/g);
            for (const match of anchorMatches) {
                anchors.push({
                    row: parseInt(match[1]) + 1, // Excel row is 1-indexed, match is 0-indexed
                    rId: match[2]
                });
            }
        }

        // 4. Create Category First
        console.log(`📁 Ensuring Category: ${CATEGORY_NAME}`);
        await client.createOrReplace({
            _id: CATEGORY_ID,
            _type: 'category',
            title: CATEGORY_NAME,
            description: 'Premium PPR Piping Solutions by IFAN',
            slug: { _type: 'slug', current: slugify(CATEGORY_NAME, { lower: true }) }
        });

        // 5. Parse XLSX to aggregate Products & Variants
        const workbook = XLSX.readFile(EXCEL_PATH);
        const sheetName = workbook.SheetNames[0]; // '103，IFANPro'
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        console.log(`📊 Processing Sheet: ${sheetName}, total rows: ${data.length}`);

        let currentProduct = null;
        const productsList = [];

        // Data headers are around row 7 (index 6)
        // [ 'Code', 'Name', 'Pictures', 'Size', '4M/BAG', '含税 RMB', 'FOB RMB', 'RMB/4M EXW', 'G/4M', 'CBM' ]

        for (let i = 6; i < data.length; i++) {
            const rowData = data[i];
            // Skip empty rows or header rows
            if (!rowData || rowData.length === 0 || rowData[0] === 'Code') continue;

            const code = rowData[0] ? String(rowData[0]).trim() : '';
            const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
            const size = rowData[3] ? String(rowData[3]).trim() : '';

            // Note: Pricing columns (index 5, 6, 7) are STRICTLY IGNORED!
            const packing = rowData[4] ? String(rowData[4]).trim() : '';
            const weight = rowData[8] ? String(rowData[8]).trim() : '';
            const volume = rowData[9] ? String(rowData[9]).trim() : '';

            // If we have a new Name, it's a new SPU
            if (nameCell && nameCell !== '') {
                // If we were building an SPU, push it
                if (currentProduct) {
                    productsList.push(currentProduct);
                }

                // Clean the name (remove \n and format nicely)
                const cleanName = nameCell.split('\n')[0].trim(); // Take the first line as the main title
                let fullDesc = nameCell.replace(/\n/g, ', ');

                const slug = slugify(cleanName + '-' + (code || Math.random().toString(36).substring(7)), { lower: true });

                currentProduct = {
                    metadata: {
                        name: cleanName,
                        fullDesc: fullDesc,
                        slug: slug,
                        excelRow: i + 1, // Store 1-based row index for image matching later
                    },
                    variants: []
                };
            }

            // If we have a Code or Size, it's a valid variant for the current SPU
            if (currentProduct && (code !== '' || size !== '')) {
                currentProduct.variants.push({
                    _key: `var-${code}-${Math.random().toString(36).substring(7)}`, // Sanity arrays need unique _keys
                    code,
                    size,
                    packing,
                    weight,
                    volume
                });
            }
        }

        // Push the last one
        if (currentProduct) {
            productsList.push(currentProduct);
        }

        console.log(`🚀 Aggregated ${productsList.length} Unique Products (SPUs). Now creating documents...`);

        // 6. Mutate to Sanity
        for (const prod of productsList) {
            const { name, slug, fullDesc, excelRow } = prod.metadata;
            let mainImageAssetInfo = null;

            // Find an anchor that is close to the starting row of this product
            // Excel rows for products start at `excelRow`. The image is usually anchored around there.
            const anchor = anchors.find(a => Math.abs(a.row - excelRow) <= 2);

            if (anchor && rels[anchor.rId]) {
                const imageName = rels[anchor.rId];
                const imagePath = path.join(TEMP_DIR, 'xl/media', imageName);

                if (fs.existsSync(imagePath)) {
                    console.log(`🖼️ Uploading image for product: ${name} (Row ${excelRow})`);
                    try {
                        const uploadedAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
                            filename: imageName
                        });
                        mainImageAssetInfo = {
                            _type: 'image',
                            asset: {
                                _type: 'reference',
                                _ref: uploadedAsset._id
                            }
                        };
                    } catch (e) {
                        console.error(`❌ Failed to upload image for ${name}: ${e.message}`);
                    }
                }
            }

            const docId = `product-${slug}`;

            const productDoc = {
                _id: docId,
                _type: 'product',
                name: name,
                slug: { current: slug, _type: 'slug' },
                description: fullDesc,
                brand: { _type: 'reference', _ref: BRAND_ID },
                category: { _type: 'reference', _ref: CATEGORY_ID },
                variants: prod.variants,
            };

            if (mainImageAssetInfo) {
                productDoc.mainImage = mainImageAssetInfo;
            }

            console.log(`📤 Uploading Product Document: ${name} with ${prod.variants.length} SKU variants.`);
            await client.createOrReplace(productDoc);
        }

        console.log('✅✅✅ Product Seeding Completed successfully!');

    } catch (err) {
        console.error('💥 Critical error during seeding:', err);
    } finally {
        console.log('🧹 Cleaning up temp directory...');
        if (fs.existsSync(TEMP_DIR)) {
            // fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        }
    }
}

seedProducts();
