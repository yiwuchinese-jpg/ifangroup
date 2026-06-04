import { getCliClient } from 'sanity/cli'
const client = getCliClient()

async function main() {
  const brandId = "kHQ7Zjgs1KD26bKJktJCBN"
  console.log("Capitalizing Bekaatherm name...")
  await client.patch(brandId).set({ name: "Bekaatherm" }).commit()
  console.log("Successfully patched!")
}
main().catch(console.error)
