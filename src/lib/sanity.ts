import { createClient } from "next-sanity";
import { fallbackBrands, fallbackProducts, fallbackArticles } from "./sanity-fallback";

export const client = createClient({
    projectId: "m2e07kon",
    dataset: "production",
    apiVersion: "2024-02-26",
    useCdn: false,
});

/**
 * Resilient fetch wrapper for Sanity.
 * Handles timeouts and connection errors by returning fallback data.
 */
export async function resilientFetch<T>(query: string, params: any = {}, fallbackType: 'brands' | 'products' | 'articles' = 'brands'): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
        const data = await client.fetch(query, params, { signal: controller.signal } as any);
        clearTimeout(timeoutId);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
            console.warn(`Sanity returned empty data for query. Falling back to mock data...`);
            return getFallback(fallbackType) as T;
        }
        
        return data as T;
    } catch (error: any) {
        clearTimeout(timeoutId);
        console.error(`Sanity fetch failed: ${error.message}. Returning fallback data...`);
        return getFallback(fallbackType) as T;
    }
}

function getFallback(type: string) {
    switch (type) {
        case 'brands': return fallbackBrands;
        case 'products': return fallbackProducts;
        case 'articles': return fallbackArticles;
        default: return [];
    }
}
