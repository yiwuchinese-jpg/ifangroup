import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2024-02-26', // use current date (YYYY-MM-DD) to target the latest API version
    token: 'skv96JDQU6h6xgZMQf3oUk32RZ7d3roArJ3mzUsgrasppdL5Mhx6zCk8ldvMjji6o4fRvhUF7ojzZmW9eY7NJxjfWEPpNbOVCW7xo8ts6P9DdyzciBWb6C6bNiVRFaqPx7z3OYOnSfYlq2jaCN2VVhRgulKvSUdpRMVWnoPmPODRjsph5t3H'
})

async function main() {
    console.log("Checking duplicates...");

    const allDocs = await client.fetch(`*[slug.current match "*8737*" || name match "*bekaatherm*" || name match "*Bekaatherm*"]{_id, _type, name, "slug": slug.current}`)
    console.log("Matches:", allDocs);

    for (const doc of allDocs) {
        if (doc._id === 'X9ORxzRbtqr9lSJFeHkMm7' || doc.slug.includes('8737')) {
            console.log('Force Deleting ->', doc._id);
            await client.delete(doc._id);
            console.log('Deleted successfully.');
        }
    }
}

main().catch(console.error);
