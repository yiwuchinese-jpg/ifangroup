const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Read .env.local manually
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            process.env[match[1]] = match[2];
        }
    });
}

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

const materialsDir = path.join(__dirname, '../public/images/brand-materials');

async function uploadImage(filepath) {
    console.log(`Uploading ${filepath}...`);
    try {
        const asset = await client.assets.upload('image', fs.createReadStream(filepath), {
            filename: path.basename(filepath)
        });
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            }
        };
    } catch (err) {
        console.error(`Failed to upload ${filepath}`, err.message);
        return null;
    }
}

async function run() {
    if (!fs.existsSync(materialsDir)) {
        console.error("Materials directory not found!");
        return;
    }

    // get brands from directory
    const brandFolders = fs.readdirSync(materialsDir).filter(f => fs.statSync(path.join(materialsDir, f)).isDirectory());

    // fetch all brands from sanity to match by name
    const brands = await client.fetch(`*[_type == "brand"]{_id, name}`);

    for (const folder of brandFolders) {
        console.log(`\nProcessing folder: ${folder}`);

        // Find matching brand by name (ignoring case)
        const brand = brands.find(b => b.name.toLowerCase() === folder.toLowerCase());

        if (!brand) {
            console.warn(`⚠️ No brand found in CMS matching folder name: ${folder}`);
            continue;
        }

        const brandId = brand._id;
        const brandPath = path.join(materialsDir, folder);

        const packagingDir = path.join(brandPath, '包装图片');
        let packagingImages = [];
        if (fs.existsSync(packagingDir)) {
            const files = fs.readdirSync(packagingDir).filter(f => f.match(/\.(png|jpe?g|webp|svg|gif)$/i));
            for (const file of files) {
                const uploaded = await uploadImage(path.join(packagingDir, file));
                if (uploaded) packagingImages.push(uploaded);
            }
        }

        const marketingDir = path.join(brandPath, '物料图片');
        let marketingImages = [];
        if (fs.existsSync(marketingDir)) {
            const files = fs.readdirSync(marketingDir).filter(f => f.match(/\.(png|jpe?g|webp|svg|gif)$/i));
            for (const file of files) {
                const uploaded = await uploadImage(path.join(marketingDir, file));
                if (uploaded) marketingImages.push(uploaded);
            }
        }

        if (packagingImages.length > 0 || marketingImages.length > 0) {
            console.log(`Creating patch for ${folder} with ${packagingImages.length} packaging, ${marketingImages.length} marketing materials.`);
            try {
                const patch = client.patch(brandId);
                if (packagingImages.length > 0) patch.set({ packagingMaterials: packagingImages });
                if (marketingImages.length > 0) patch.set({ marketingMaterials: marketingImages });
                await patch.commit();
                console.log(`✅ Successfully updated ${folder} in CMS.`);
            } catch (err) {
                console.error(`❌ Failed to update ${folder} in CMS`, err.message);
            }
        } else {
            console.log(`No valid images found for ${folder}`);
        }
    }
    console.log("Done!");
}

run();
