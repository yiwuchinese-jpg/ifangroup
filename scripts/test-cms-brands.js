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
client.fetch('*[_type == "brand"]').then(brands => {
    brands.forEach(b => {
        if (b.name.toLowerCase().includes('ifan')) console.log(b.name, "-> slug:", b.slug?.current);
    });
});
