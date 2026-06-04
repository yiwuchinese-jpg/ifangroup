import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function main() {
  console.log("Fetching client config...", client.config())
  try {
    const result = await client.delete('X9ORxzRbtqr9lSJFeHkMm7')
    console.log("DELETE RESULT:", result)
  } catch (e) {
    console.error("DELETE ERROR:", e)
  }
}
main().catch(console.error)
