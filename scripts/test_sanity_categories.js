const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN, // Make sure we have rights
    apiVersion: '2024-02-26',
});

async function run() {
    const categories = await client.fetch('*[_type == "category"]{_id, title}');
    console.log("Sanity Categories:", categories);

    const brands = await client.fetch('*[_type == "brand"]{_id, name, series, slug}');
    console.log("Sanity Brands:", brands);
}
run();
