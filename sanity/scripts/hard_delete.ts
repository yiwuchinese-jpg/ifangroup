import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  console.log("Hard deleting X9ORxzRbtqr9lSJFeHkMm7...")
  await client.delete('X9ORxzRbtqr9lSJFeHkMm7')
  console.log("Deletion query sent.")
  
  // Verify it's gone
  const check = await client.fetch(`*[_id == "X9ORxzRbtqr9lSJFeHkMm7"]`)
  console.log("Remaining after delete:", check.length)
}
main().catch(console.error)
