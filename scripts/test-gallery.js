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
client.fetch('*[_type == "brand" && name match "IFAN*"]').then(brands => {
    brands.forEach(b => {
        console.log(`${b.name}: Packaging (${b.packagingMaterials?.length || 0}), Marketing (${b.marketingMaterials?.length || 0})`);
    });
});
