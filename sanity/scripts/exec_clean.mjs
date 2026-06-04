import { createClient } from '@sanity/client'
const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-26',
    token: process.env.SANITY_AUTH_TOKEN
})

async function main() {
    const newBekaathermId = 'kHQ7Zjgs1KD26bKJktJCBN';
    const oldGhostId = 'X9ORxzRbtqr9lSJFeHkMm7';

    console.log("1. Finding ALL products linking to ghost brand...");
    const blockingProducts = await client.fetch(`*[_type == "product" && brand._ref == "${oldGhostId}"]{_id, name}`);
    console.log(`Found ${blockingProducts.length} blocking products.`);

    if (blockingProducts.length > 0) {
        console.log("2. Batch patching products to point to new Bekaatherm...");
        const transaction = client.transaction();
        blockingProducts.forEach(prod => {
            console.log(`  -> Patching ${prod.name} (ID: ${prod._id})`);
            transaction.patch(prod._id, p => p.set({ brand: { _type: 'reference', _ref: newBekaathermId } }));
        });
        await transaction.commit();
        console.log("Batch patch successful!");
    }

    console.log("3. Nuking the old ghost brand from orbit...");
    const deleteResult = await client.delete(oldGhostId);
    console.log("Delete result:", deleteResult);
}
main().catch(console.error);
