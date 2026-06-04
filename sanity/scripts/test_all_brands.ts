import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  const brands = await client.fetch(`*[_type == "brand"]{name, "slug": slug.current, description}`)
  console.log(JSON.stringify(brands, null, 2))
}
main().catch(console.error)
