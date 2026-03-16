const { createClient } = require('@sanity/client');
const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-26',
    token: process.env.SANITY_AUTH_TOKEN
});

async function run() {
    const products = await client.fetch(`*[_type =="product"] | order(name asc) [0...2] {
        _id,
        name,
        "slug": slug.current,
        "categoryTitle": category->title,
        "brandName": brand->name,
        description,
        mainImage {
            asset->{
                url
            }
        }
    }`);
    console.log(JSON.stringify(products, null, 2));
}

run();
