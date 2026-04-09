import { createClient } from "next-sanity";

export const writeClient = createClient({
    projectId: "m2e07kon",
    dataset: "production",
    apiVersion: "2024-02-26",
    useCdn: false, // Ensure false for mutate operations
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
});
