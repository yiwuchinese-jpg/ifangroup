import { LOCALES } from "./seo";

/**
 * 已合并的文章：from 的 URL 301 到 to，from 不再进 sitemap。
 *
 * 为什么要合并而不是留着：两篇打同一批词时 Google 只给同域名一个位置，
 * 于是它在两页之间反复摇摆，两页都停在拿不到点击的位置上。
 *
 * upvc-vs-pvc ←→ pvc-vs-upvc-vs-cpvc 的实测（GSC 2026-04-30 ~ 07-26）：
 *   39 个查询词两页同时出现，合计 1820 次曝光只换来 1 次点击。
 *   多个词上被合并页反而排得更前（difference between pvc and upvc pipe：
 *   pos 1.0 vs 3.7），正是摇摆的特征。
 * 保留覆盖面更广的那篇：pvc-vs-upvc-vs-cpvc 有 199 个查询词 / 1167 次曝光 / 3591 词正文，
 * 且已含 "PVC vs UPVC — Are They Different?" 与 "Where the Name UPVC Is Used" 两节，
 * 承接得住被合并页的主题，不会变成软 404。
 *
 * 被合并页的 Sanity 文档刻意保留：它有 4 节独有内容（standards 差异、
 * seal-ring 接头、如何看报价、常见错误）和五种译文，之后要择优补进保留页。
 */
export const MERGED_ARTICLES: readonly { from: string; to: string }[] = [
    { from: "upvc-vs-pvc", to: "pvc-vs-upvc-vs-cpvc" },
];

/** 被合并掉的 slug，sitemap 用来过滤 */
export const MERGED_SLUGS: ReadonlySet<string> = new Set(
    MERGED_ARTICLES.map((m) => m.from)
);

/** 路由前缀：英文无前缀（localePrefix: "as-needed"），其余各带 /xx */
export const LOCALE_PREFIXES: readonly string[] = LOCALES.map((l) =>
    l === "en" ? "" : `/${l}`
);
