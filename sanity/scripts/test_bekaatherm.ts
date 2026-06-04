import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  const brand = await client.fetch(`*[_type == "brand" && slug.current == "bekaatherm" || slug.current == "bekaatherm-8737"]`)
  console.log(JSON.stringify(brand, null, 2))
}
main().catch(console.error)
