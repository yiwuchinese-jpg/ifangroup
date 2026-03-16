const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'm2e07kon', dataset: 'production', useCdn: false, apiVersion: '2024-02-26', token: process.env.SANITY_AUTH_TOKEN });

async function run() {
    const missing = await client.fetch('*[_type == "product" && !defined(mainImage)]{name, "brandName": brand->name}');
    const grouped = missing.reduce((acc, p) => {
        acc[p.brandName] = acc[p.brandName] || [];
        acc[p.brandName].push(p.name);
        return acc;
    }, {});
    console.log(JSON.stringify(grouped, null, 2));
}

run();
