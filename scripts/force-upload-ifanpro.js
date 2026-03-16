const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
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

const materialsDir = path.join(__dirname, '../public/images/brand-materials/IFANpro');

async function uploadImage(filepath) {
    try {
        const asset = await client.assets.upload('image', fs.createReadStream(filepath), {
            filename: path.basename(filepath)
        });
        return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    } catch (err) {
        console.error(`Failed to upload ${filepath}`, err.message);
        return null;
    }
}

async function run() {
    const brand = await client.fetch('*[_type == "brand" && slug.current == "ifanpro"][0]');

    const packagingDir = path.join(materialsDir, '包装图片');
    let packagingImages = [];
    if (fs.existsSync(packagingDir)) {
        const files = fs.readdirSync(packagingDir).filter(f => f.match(/\.(png|jpe?g|webp|svg|gif)$/i));
        for (const file of files) {
            const uploaded = await uploadImage(path.join(packagingDir, file));
            if (uploaded) packagingImages.push(uploaded);
        }
    }

    const marketingDir = path.join(materialsDir, '物料图片');
    let marketingImages = [];
    if (fs.existsSync(marketingDir)) {
        const files = fs.readdirSync(marketingDir).filter(f => f.match(/\.(png|jpe?g|webp|svg|gif)$/i));
        for (const file of files) {
            const uploaded = await uploadImage(path.join(marketingDir, file));
            if (uploaded) marketingImages.push(uploaded);
        }
    }

    if (packagingImages.length > 0 || marketingImages.length > 0) {
        const patch = client.patch(brand._id);
        if (packagingImages.length > 0) patch.set({ packagingMaterials: packagingImages });
        if (marketingImages.length > 0) patch.set({ marketingMaterials: marketingImages });
        await patch.commit();
        console.log(`✅ successfully updated IFANpro`);
    } else {
        console.log("No valid images found for IFANpro");
    }
}
run();
