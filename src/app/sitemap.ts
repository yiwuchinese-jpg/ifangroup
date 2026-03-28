import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

const BASE_URL = "https://ifanholding.com";
const LOCALES = ["en", "es", "pt", "ru", "ar", "fr"];

type SanitySlug = { slug: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 静态页面路径
    const staticPages = [
        { path: "", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/about-us", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/products", priority: 0.95, changeFrequency: "weekly" as const },
        { path: "/brands", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
        { path: "/news", priority: 0.8, changeFrequency: "daily" as const },
        { path: "/manufacturing-oem", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/global-solutions", priority: 0.75, changeFrequency: "monthly" as const },
    ];

    // 静态页面 × 所有语言
    const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
        staticPages.map(({ path, priority, changeFrequency }) => ({
            url: `${BASE_URL}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        }))
    );

    // 动态产品页
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const products: SanitySlug[] = await client.fetch(
            `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`
        );
        productRoutes = LOCALES.flatMap((locale) =>
            products.map(({ slug }) => ({
                url: `${BASE_URL}/${locale}/products/${slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.7,
            }))
        );
    } catch (error) {
        console.error("[sitemap] Failed to fetch products:", error);
    }

    // 动态品牌页
    let brandRoutes: MetadataRoute.Sitemap = [];
    try {
        const brands: SanitySlug[] = await client.fetch(
            `*[_type == "brand" && defined(slug.current)]{ "slug": slug.current }`
        );
        brandRoutes = LOCALES.flatMap((locale) =>
            brands.map(({ slug }) => ({
                url: `${BASE_URL}/${locale}/brands/${slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.75,
            }))
        );
    } catch (error) {
        console.error("[sitemap] Failed to fetch brands:", error);
    }

    return [...staticRoutes, ...productRoutes, ...brandRoutes];
}
