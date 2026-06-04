import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  console.log("Deleting old bekaatherm duplicate...")
  await client.delete("X9ORxzRbtqr9lSJFeHkMm7")
  console.log("Deleted old record X9ORxzRbtqr9lSJFeHkMm7")
}
main().catch(console.error)
