import type { CategorySlug } from "@/lib/pillar";

/**
 * 产品目录的清理层。
 *
 * 背景（2026-07-27 实测）：1191 个产品页只有 459 个唯一名称，927 个（78%）与
 * 其他页面重名；69 组是 variants 完全相同的重复导入（如 elbow-1031-37 与
 * elbow-1031-37-193c）。90 天合计只拿到 107 次 GSC 曝光。
 *
 * 处理原则是「剪枝 + 区分 + 导流」，不是往页面里塞更多模板文案——
 * 这些页的 description 本来就是同一段话套不同产品名，加料只会加深 doorway 特征。
 */

export type Variant = {
    code?: string;
    size?: string;
    packing?: string;
    weight?: string;
    volume?: string;
};

/** Sanity 分类名 → 品类页 slug。Sanity 与路由是两套词汇，这里是唯一的桥。 */
const CATEGORY_TO_SLUG: Record<string, CategorySlug> = {
    "PPR Series": "ppr",
    "PE Series": "hdpe",
    "UPVC / PVC Series": "pvc",
    "PEX Series": "pex-ppsu",
    "PPH Series": "pph",
    "PP Compression Fittings": "pp",
    "Press Fittings": "stainless-press",
    "Brass Fittings": "brass-fittings",
    "Brass Fittings & Valves": "hvac-valves",
    "Brass Valves": "hvac-valves",
    // "Other Accessories" 与 "Axial Fittings" 没有对应品类页，刻意不映射
};

/** 供人类阅读的短前缀，用来把 26 个都叫 Elbow 的页面区分开 */
const CATEGORY_PREFIX: Record<string, string> = {
    "PPR Series": "PPR",
    "PE Series": "HDPE",
    "UPVC / PVC Series": "uPVC",
    "PEX Series": "PEX",
    "PPH Series": "PPH",
    "PP Compression Fittings": "PP Compression",
    "Press Fittings": "Press-Fit",
    "Brass Fittings": "Brass",
    "Brass Fittings & Valves": "Brass",
    "Brass Valves": "Brass",
    "Axial Fittings": "Axial",
};

export function categoryPillarSlug(categoryTitle?: string): CategorySlug | undefined {
    return categoryTitle ? CATEGORY_TO_SLUG[categoryTitle] : undefined;
}

export function categoryPrefix(categoryTitle?: string): string {
    return (categoryTitle && CATEGORY_PREFIX[categoryTitle]) || "";
}

/**
 * 从 variants 的 size 串里抽出公称尺寸区间。
 * size 形如 "L20 103/M10"、"T32×20 128/M51"、"D25"——只看第一个空格前的片段，
 * 后面的 "103/M10" 是包装/模具编号，不是尺寸，混进来会把区间算错。
 */
export function sizeRange(variants: Variant[] = []): string | undefined {
    const nums: number[] = [];
    for (const v of variants) {
        const head = (v.size || "").trim().split(/\s+/)[0];
        if (!head) continue;
        for (const m of head.matchAll(/\d+(?:\.\d+)?/g)) {
            const n = Number(m[0]);
            // 排除 M10 这类模具号和明显不是管径的值
            if (Number.isFinite(n) && n >= 8 && n <= 1600) nums.push(n);
        }
    }
    if (!nums.length) return undefined;
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return min === max ? `DN${min}` : `DN${min}–DN${max}`;
}

/** 该产品的主型号，用作标题里的区分位 */
export function primaryCode(variants: Variant[] = []): string | undefined {
    return variants.find((v) => v.code)?.code?.trim() || undefined;
}

/**
 * 重复识别签名。
 * 两个产品若首个变体型号相同且变体数量相同，就是同一个产品被导入了两次
 * （已核对 elbow-1031-37 / elbow-1031-37-193c 的 variants 逐行一致）。
 */
export function dedupeSignature(variants: Variant[] = []): string | undefined {
    const code = primaryCode(variants);
    return code ? `${code.toLowerCase()}::${variants.length}` : undefined;
}

/** 没有对应品类页的分类——这些产品页不进 sitemap */
const ORPHAN_CATEGORIES = new Set(["Other Accessories"]);

export function isOrphanCategory(categoryTitle?: string): boolean {
    return !categoryTitle || ORPHAN_CATEGORIES.has(categoryTitle);
}

/**
 * 同签名的多个产品里选出规范页。规则必须确定且稳定，否则 canonical 会来回摆动：
 *   1. 有对应品类页的优先（把 Other Accessories 的复制品排除掉）
 *   2. 其次 slug 短的优先（无 hash 后缀的那个是原始导入）
 *   3. 最后按字典序，保证结果唯一
 */
export function pickCanonical<T extends { slug: string; categoryTitle?: string }>(candidates: T[]): T {
    return [...candidates].sort((a, b) => {
        const ao = isOrphanCategory(a.categoryTitle) ? 1 : 0;
        const bo = isOrphanCategory(b.categoryTitle) ? 1 : 0;
        if (ao !== bo) return ao - bo;
        if (a.slug.length !== b.slug.length) return a.slug.length - b.slug.length;
        return a.slug < b.slug ? -1 : 1;
    })[0];
}

/**
 * 构造有区分度的标题。
 * 原来是 `${name} | Wholesale B2B`，导致 26 个页面同题为「Elbow | Wholesale B2B」。
 * 现在补上品类前缀、型号和尺寸区间，让每个页面在 SERP 里是可分辨的实体。
 */
export function buildProductTitle(p: {
    name: string;
    categoryTitle?: string;
    variants?: Variant[];
}): string {
    const prefix = categoryPrefix(p.categoryTitle);
    const code = primaryCode(p.variants);
    const range = sizeRange(p.variants);

    const head = [prefix, p.name].filter(Boolean).join(" ").trim();
    const parts = [code ? `${head} ${code}` : head];
    if (range) parts.push(range);
    parts.push("IFAN Wholesale");

    let title = parts.join(" | ");
    if (title.length > 60) title = [code ? `${head} ${code}` : head, range || "IFAN"].join(" | ");
    return title;
}
