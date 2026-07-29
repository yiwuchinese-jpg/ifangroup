import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { localeUrl, LOCALES } from "@/lib/seo";
import { toolsData } from "@/lib/data/tools";
import { REGIONS_DATA } from "@/lib/regionsData";
import { CATEGORY_SLUGS } from "@/lib/pillar";
import { getPillar } from "@/lib/pillar/categoryPillars";
import { dedupeSignature, isOrphanCategory, pickCanonical } from "@/lib/products/catalog";
import { MERGED_SLUGS } from "@/lib/mergedArticles";

// Cache the generated sitemap for 1h (ISR) so Googlebot always gets a fast
// response instead of re-querying every product/news slug from Sanity per fetch.
export const revalidate = 3600;

type SanityEntry = { slug: string; updatedAt?: string };
type ProductEntry = SanityEntry & { categoryTitle?: string; variants?: { code?: string }[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 静态页面路径（六语言均有翻译，全部列出；英文为无前缀 URL）
    const staticPages = [
        { path: "", priority: 1.0, changeFrequency: "weekly" as const },
        { path: "/about-us", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/products", priority: 0.95, changeFrequency: "weekly" as const },
        { path: "/brands", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
        { path: "/news", priority: 0.8, changeFrequency: "daily" as const },
        { path: "/manufacturing-oem", priority: 0.9, changeFrequency: "monthly" as const },
        { path: "/global-solutions", priority: 0.75, changeFrequency: "monthly" as const },
        { path: "/faq", priority: 0.85, changeFrequency: "monthly" as const },
        { path: "/resources", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/media", priority: 0.6, changeFrequency: "monthly" as const },
        { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    ];

    const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
        staticPages.map(({ path, priority, changeFrequency }) => ({
            url: localeUrl(locale, path),
            changeFrequency,
            priority,
        }))
    );

    // 分类页 / 区域方案页 / 工具指南页（slug 来自本地数据源）
    // 英文支柱页是 money 页，优先级最高；非英文只有短版页，次之。
    //
    // 只列有支柱数据的品类。另外 9 个（pp/pph/pexa/gas-systems/stainless-corrugated/
    // angle-valves/faucets/stainless-press/brass-fittings）正文只有 i18n 里约 100 词的
    // hero 文案，已在 categories/[slug]/page.tsx 里 noindex——把 noindex 页留在 sitemap 里
    // 是自相矛盾的信号。之前它们拿 0.85，比文章的 0.8 还高，优先级设置是倒置的。
    // 判据与 page.tsx 同源（getPillar），补齐支柱正文后自动重新入图。
    const categoryRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
        CATEGORY_SLUGS.filter((slug) => getPillar(slug)).map((slug) => ({
            url: localeUrl(locale, `/categories/${slug}`),
            changeFrequency: "weekly" as const,
            priority: locale !== "en" ? 0.7 : 0.9,
        }))
    );

    const solutionRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
        REGIONS_DATA.map((region) => ({
            url: localeUrl(locale, `/global-solutions/${region.id}`),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    );

    const toolRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
        Object.keys(toolsData).map((id) => ({
            url: localeUrl(locale, `/Tutorial/tools/${id}`),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }))
    );

    // 落地页：只列有真实内容的语言版本
    const landingRoutes: MetadataRoute.Sitemap = [
        { url: localeUrl("en", "/ppr-supplier"), changeFrequency: "monthly" as const, priority: 0.9 },
        { url: localeUrl("en", "/global-plumbing-supplier"), changeFrequency: "monthly" as const, priority: 0.9 },
        { url: localeUrl("es", "/global-plumbing-supplier"), changeFrequency: "monthly" as const, priority: 0.9 },
        { url: localeUrl("en", "/latin-america-plumbing-supplier"), changeFrequency: "monthly" as const, priority: 0.9 },
        { url: localeUrl("es", "/latin-america-plumbing-supplier"), changeFrequency: "monthly" as const, priority: 0.9 },
        { url: localeUrl("en", "/fabrica-ifanholding-mexico"), changeFrequency: "monthly" as const, priority: 0.85 },
    ];

    // 动态产品页：内容为英文单语，只列规范的无前缀 URL。
    //
    // 1191 个产品页 90 天只拿到 107 次 GSC 曝光，其中 69 组是 variants 逐行一致的
    // 重复导入。把重复页和无品类归属的页面剔出 sitemap，让爬虫预算落到规范页上，
    // 页面本身仍可访问（canonical 已指向规范页），只是不再主动推给谷歌。
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const products: ProductEntry[] = await client.fetch(
            `*[_type == "product" && defined(slug.current)]{
                "slug": slug.current,
                "updatedAt": _updatedAt,
                "categoryTitle": category->title,
                variants[] { code }
            }`
        );

        // 按「首变体型号 + 变体数」分组，每组只保留规范页
        const groups = new Map<string, ProductEntry[]>();
        const ungrouped: ProductEntry[] = [];
        for (const p of products) {
            const sig = dedupeSignature(p.variants);
            if (!sig) ungrouped.push(p);
            else groups.set(sig, [...(groups.get(sig) ?? []), p]);
        }
        const canonical = [
            ...ungrouped,
            ...[...groups.values()].map((g) => (g.length > 1 ? pickCanonical(g) : g[0])),
        ];

        const listed = canonical.filter((p) => !isOrphanCategory(p.categoryTitle));
        const dropped = products.length - listed.length;
        if (dropped > 0) {
            console.info(`[sitemap] 产品页 ${products.length} → ${listed.length}，剔除 ${dropped}（重复导入 + 无品类归属）`);
        }

        productRoutes = listed.map(({ slug, updatedAt }) => ({
            url: localeUrl("en", `/products/${slug}`),
            ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        }));
    } catch (error) {
        console.error("[sitemap] Failed to fetch products:", error);
    }

    // 动态品牌页：同为英文单语，只列规范 URL
    let brandRoutes: MetadataRoute.Sitemap = [];
    try {
        const brands: SanityEntry[] = await client.fetch(
            `*[_type == "brand" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`
        );
        brandRoutes = brands.map(({ slug, updatedAt }) => ({
            url: localeUrl("en", `/brands/${slug}`),
            ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
            changeFrequency: "monthly" as const,
            priority: 0.75,
        }));
    } catch (error) {
        console.error("[sitemap] Failed to fetch brands:", error);
    }

    // 动态新闻页：文章带多语言翻译，按六语言列出
    let newsRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts: SanityEntry[] = await client.fetch(
            `*[_type == "article" && defined(slug.current) && defined(publishedAt)]{ "slug": slug.current, "updatedAt": _updatedAt }`
        );
        // 已合并的文章 URL 在 next.config.ts 里 301 到保留页，不能再出现在 sitemap 里
        const live = posts.filter(({ slug }) => !MERGED_SLUGS.has(slug));
        newsRoutes = LOCALES.flatMap((locale) =>
            live.map(({ slug, updatedAt }) => ({
                url: localeUrl(locale, `/news/${slug}`),
                ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            }))
        );
    } catch (error) {
        console.error("[sitemap] Failed to fetch news:", error);
    }

    return [
        ...staticRoutes,
        ...categoryRoutes,
        ...solutionRoutes,
        ...toolRoutes,
        ...landingRoutes,
        ...productRoutes,
        ...brandRoutes,
        ...newsRoutes,
    ];
}
