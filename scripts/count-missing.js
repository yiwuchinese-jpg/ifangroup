const { createClient } = require('@sanity/client');
const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-26',
    token: process.env.SANITY_AUTH_TOKEN
});

async function run() {
    const missing = await client.fetch('count(*[_type == "product" && !defined(mainImage)])');
    const total = await client.fetch('count(*[_type == "product"])');
    console.log(`Total Products: ${total}`);
    console.log(`Missing Images: ${missing}`);
    console.log(`Coverage: ${((total - missing) / total * 100).toFixed(2)}%`);
}

run();
