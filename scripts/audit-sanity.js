const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-26',
});

async function run() {
    console.log("🔍 Running Data Audit...");

    // 1. Check Categories
    const categories = await client.fetch('*[_type == "category"]{title, _id}');
    console.log(`\n--- Categories (${categories.length}) ---`);
    for (const c of categories) console.log(`- ${c.title}`);

    // 2. Check Products Overview
    const stats = await client.fetch(`{
        "total": count(*[_type == "product"]),
        "withImage": count(*[_type == "product" && defined(mainImage)]),
        "byCategory": *[_type == "category"]{ 
            title, 
            "count": count(*[_type == "product" && references(^._id)]) 
        }
    }`);

    console.log(`\n--- Products Overview ---`);
    console.log(`Total Products: ${stats.total}`);
    console.log(`With Main Image: ${stats.withImage} (${Math.round(stats.withImage / stats.total * 100)}%)`);
    console.log(`Missing Image: ${stats.total - stats.withImage}`);

    console.log(`\n--- Product Distribution by Category ---`);
    stats.byCategory.forEach(c => {
        if (c.count > 0) console.log(`${c.title}: ${c.count} products`);
    });

    const productsMissingCat = await client.fetch(`count(*[_type == "product" && !defined(category)])`);
    console.log(`Products without any category: ${productsMissingCat}`);
}

run();
