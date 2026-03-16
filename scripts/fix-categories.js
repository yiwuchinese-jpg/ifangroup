const { createClient } = require('@sanity/client');
const slugify = require('slugify');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN, // Ensure this exists in .env or system env
    apiVersion: '2024-02-26',
});

// Map of canonical Series to keyword matchers
const SERIES_MAPPING = [
    {
        name: 'PPR Series',
        keywords: ['PPR', 'PP-R'],
        desc: 'Polypropylene Random Copolymer systems for hot and cold water.'
    },
    {
        name: 'PEX Series',
        keywords: ['PEX', 'PEX-A', 'PEX-B', 'PEX-C', 'PERT', 'PE-RT'],
        desc: 'Cross-linked polyethylene systems for flexible plumbing and underfloor heating.'
    },
    {
        name: 'PE Series',
        keywords: ['HDPE', 'PE ', 'PE '],
        desc: 'High-Density Polyethylene systems for water mains and gas distribution.'
    },
    {
        name: 'PVC Series',
        keywords: ['PVC', 'UPVC', 'CPVC', 'U-PVC', 'C-PVC'],
        desc: 'Unplasticized Polyvinyl Chloride systems for drainage and pressurized applications.'
    },
    {
        name: 'Brass Fittings & Valves',
        keywords: ['BRASS', 'VALVE', 'BIBCOCK', 'MANIFOLD', 'FAUCET'],
        desc: 'Premium brass manifolds, ball valves, and threaded fittings.'
    },
    {
        name: 'Other Accessories',
        keywords: [], // Fallback
        desc: 'Specialized plumbing tools, clamps, and installation accessories.'
    }
];

async function run() {
    console.log('🚀 Starting Category Consolidation Pipeline...');

    // 1. Create mapping of existing & new categories
    const createdCategories = {};
    for (const series of SERIES_MAPPING) {
        const slug = slugify(series.name, { lower: true });
        const id = `category-${slug}`;
        console.log(`Creating canonical Category: ${series.name}`);
        const result = await client.createOrReplace({
            _id: id,
            _type: 'category',
            title: series.name,
            description: series.desc,
            slug: { _type: 'slug', current: slug }
        });
        createdCategories[series.name] = result._id;
    }

    // 2. Fetch all products with their names and current categories
    console.log('Fetching all products...');
    const products = await client.fetch('*[_type == "product"]{_id, name, "categoryId": category._ref}');
    console.log(`Found ${products.length} products to process.`);

    let updatedCount = 0;
    const updates = [];

    // 3. Remap products
    for (const product of products) {
        let assignedSeriesName = 'Other Accessories';
        const upperName = (product.name || '').toUpperCase();

        for (const series of SERIES_MAPPING) {
            if (series.keywords.some(kw => upperName.includes(kw))) {
                assignedSeriesName = series.name;
                break;
            }
        }

        const newCatId = createdCategories[assignedSeriesName];

        // Only update if it's changing
        if (product.categoryId !== newCatId) {
            updates.push(
                client.patch(product._id).set({
                    category: { _type: 'reference', _ref: newCatId }
                }).commit()
            );
            updatedCount++;
        }
    }

    if (updates.length > 0) {
        console.log(`Updating ${updates.length} products to new categories...`);
        await Promise.all(updates);
        console.log(`✅ Successfully updated ${updatedCount} products.`);
    } else {
        console.log('✅ All products are already mapped to canonical categories.');
    }

    // 4. Cleanup old, unreferenced categories
    console.log('Fetching old categories...');
    const allCategoriesAfter = await client.fetch('*[_type == "category"]{_id, title}');
    const canonicalIds = Object.values(createdCategories);

    // Find categories not in our canonical list
    const obsoleteIds = allCategoriesAfter
        .filter(c => !canonicalIds.includes(c._id))
        .map(c => c._id);

    if (obsoleteIds.length > 0) {
        console.log(`Found ${obsoleteIds.length} obsolete categories. Deleting...`);
        for (const oId of obsoleteIds) {
            try {
                await client.delete(oId);
                console.log(`Deleted category: ${oId}`);
            } catch (e) {
                console.log(`⚠️ Could not delete ${oId} (might still be referenced somewhere): ${e.message}`);
            }
        }
        console.log(`✅ Obsolete categories cleaned up.`);
    }

    console.log('🎯 Categories completely consolidated!');
}

run().catch(console.error);
