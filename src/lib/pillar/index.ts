/**
 * 品类页的单一事实来源。
 *
 * 之前 slug 清单在 sitemap.ts 和 categoryCopywriting.ts 各存一份，两边都只有 6 个，
 * 而路由实际能渲染 14 个——导致 8 个品类页长期不在 sitemap 里（含流量最大的 hdpe）。
 * 任何需要「有哪些品类」的地方都从这里取。
 */

export const CATEGORY_SLUGS = [
    "ppr",
    "brass-fittings",
    "pp",
    "pvc",
    "pex-ppsu",
    "hvac-valves",
    "hdpe",
    "pph",
    "stainless-press",
    "pexa",
    "gas-systems",
    "stainless-corrugated",
    "angle-valves",
    "faucets",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export function isCategorySlug(slug: string): slug is CategorySlug {
    return (CATEGORY_SLUGS as readonly string[]).includes(slug);
}

/**
 * 已写出完整英文支柱正文的品类——sitemap 里给更高优先级。
 * 每完成一个支柱页就往这里加一个。
 */
export const PILLAR_SLUGS: readonly CategorySlug[] = ["ppr", "hdpe", "pvc", "hvac-valves", "pex-ppsu"];

/**
 * 正文已本地化的语言。
 *
 * 支柱正文用英文撰写并存在 TS 数据文件里。未列入的语言**不渲染**这部分正文，
 * 而是回退到已全译的短版页 + 一条指向英文完整版的桥接链接——
 * 俄语标题配英文正文的混搭页既伤体验也是质量信号风险。
 * 某语言真正翻译完成后，把它加进这个数组即可。
 */
export const PILLAR_BODY_LOCALES: readonly string[] = ["en"];

export function hasLocalizedBody(locale: string): boolean {
    return PILLAR_BODY_LOCALES.includes(locale);
}
