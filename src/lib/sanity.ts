import { createClient } from "next-sanity";
import { fallbackBrands, fallbackProducts, fallbackArticles } from "./sanity-fallback";

// 2026-09-29：前台读取走 API CDN。此前 useCdn:false 让每次页面渲染都打直连 API，
// 9 月把免费版 25 万次直连额度用光（API CDN 100 万额度只用了 6 次），整站 500。
// 发布流程会触发 /api/revalidate，CDN 在内容发布后几秒内失效，前台不会读到旧内容太久。
export const client = createClient({
    projectId: "m2e07kon",
    dataset: "production",
    apiVersion: "2024-02-26",
    useCdn: true,
});

// 需要"刚写完立刻读回"的地方（wp-json 兼容接口：发布后按 id/slug 查回）仍走直连，保证读到最新。
export const freshClient = createClient({
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
