import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  const result = await client.delete('X9ORxzRbtqr9lSJFeHkMm7')
  console.log("Deleted:", result)
}
main().catch(console.error)
