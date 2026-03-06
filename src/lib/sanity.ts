import { createClient } from"next-sanity";

export const client = createClient({
 projectId:"m2e07kon",
 dataset:"production",
 apiVersion:"2024-02-26",
 useCdn: false, // Set to true for production to cache results
});
