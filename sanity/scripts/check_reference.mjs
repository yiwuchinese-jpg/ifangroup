import { createClient } from '@sanity/client'
const client = createClient({
  projectId: 'm2e07kon',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-26',
  token: process.env.SANITY_AUTH_TOKEN
})
async function main() {
  const refDoc = await client.fetch(`*[_id == "ChPy2hTrLaycRwOtl1rAbj"]`)
  console.log("Blocking Reference Document:", JSON.stringify(refDoc, null, 2))
}
main().catch(console.error);
