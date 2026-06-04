import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  const allDocs = await client.fetch(`*[slug.current match "*8737*" || name match "*bekaatherm*" || name match "*Bekaatherm*"]{_id, _type, name, "slug": slug.current}`)
  console.log("SANITY MATCHES:")
  console.log(JSON.stringify(allDocs, null, 2))
}
main().catch(console.error)
