import { createClient } from "next-sanity";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-03-01",
    useCdn: false,
});

async function main() {
    const data = await client.fetch(`*[_type == "brand" && slug.current == "bekaatherm-8737"][0] { name, description }`);
    console.log(data);
}
main();
