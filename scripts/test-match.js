const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'm2e07kon', dataset: 'production', useCdn: false, apiVersion: '2024-02-26', token: process.env.SANITY_AUTH_TOKEN });

async function run() {
    const allProducts = await client.fetch(`*[_type == "product"]{
        _id, 
        name, 
        "brandName": brand->name, 
        "hasImage": defined(mainImage)
    }`);

    const spuName = "Male Thread plug";
    const parentFolder = "Bekaatherm";

    console.log("Total products fetched:", allProducts.length);

    const matchSanity = allProducts.find(p => p.name === spuName && p.brandName === parentFolder);
    console.log("Direct find:", matchSanity);

    const filter1 = allProducts.filter(p => p.name === spuName);
    console.log("Just name matches:", filter1);

    const filter2 = allProducts.filter(p => p.name === spuName && (p.brandName && p.brandName.toLowerCase() === parentFolder.toLowerCase()));
    console.log("Full filter match:", filter2);
}

run();
