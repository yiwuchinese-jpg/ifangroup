const { createClient } = require('@sanity/client');
const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-26',
    token: process.env.SANITY_AUTH_TOKEN
});

async function run() {
    const products = await client.fetch(`*[_type == "product" && defined(mainImage)][0...5]{
        name, 
        "imageUrl": mainImage.asset->url, 
        mainImage
    }`);
    console.log(JSON.stringify(products, null, 2));
}

run();
