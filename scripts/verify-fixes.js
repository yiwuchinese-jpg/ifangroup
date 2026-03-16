const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-26',
});

async function run() {
    const categories = await client.fetch('*[_type == "category"]{title}');
    console.log("Categories in system:", categories.map(c => c.title).join(', '));

    const productsInfo = await client.fetch(`{
        "total": count(*[_type == "product"]),
        "withImage": count(*[_type == "product" && defined(mainImage)])
    }`);

    console.log(`Product Stats: ${productsInfo.withImage} out of ${productsInfo.total} have an image.`);
}

run();
