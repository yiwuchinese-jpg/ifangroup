const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'm2e07kon', dataset: 'production', useCdn: false, apiVersion: '2024-02-26' });
async function run() {
    console.log(await client.fetch(`*[_type == "product"]{name, "brandName": brand->name}[0...20]`));
}
run();
