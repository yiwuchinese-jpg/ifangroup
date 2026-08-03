/**
 * 博客 → 品类支柱页的内链层。
 *
 * 起因：GSC 90 天数据显示博客占全站曝光 93.9%（33,491 / 35,679），而所有非博客页加起来
 * 只有 6.1%，且其中 90% 的曝光来自品牌词。421 篇文章里没有任何系统性的内链指向
 * /categories/*——唯一通路是页脚那 5 条。读者读完技术文章就走，权重也留在博客层。
 *
 * 这个模块做两件事：
 *   ① 判断一篇文章该指向哪些品类（pickCategoryTargets）
 *   ② 把链接注入到 Sanity 存的原始 HTML 正文里（injectCategoryLinks）
 *
 * 两条硬约束：
 *   - 只指向 PILLAR_SLUGS。其余 9 个品类页是 robots noindex（见 categories/[slug]/page.tsx），
 *     往 noindex 页面导内链等于把权重倒进水槽。
 *   - 注入是保守的：只在 <p>/<li> 的文本节点里改，且跳过已在 <a>/<h*>/<code>/<pre> 内的文本。
 *     宁可少注入，也不要破坏正文 HTML 或产生嵌套 <a>。
 */

import { PILLAR_SLUGS, type CategorySlug } from "./pillar";

/** 每篇文章最多注入的正文内链数。超过这个量就从「相关」变成「堆链接」。 */
const MAX_INLINE_LINKS = 3;

/**
 * 品类 → 触发词。顺序即优先级：先匹配长词组，避免 "PPR" 抢在 "PPR fittings" 前面
 * 把锚文本缩成一个裸缩写。
 */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
    ppr: ["PPR pipe fittings", "PPR fittings", "PPR piping", "PPR pipe", "PPR"],
    hdpe: ["HDPE pipe fittings", "HDPE fittings", "HDPE piping", "HDPE pipe", "PE100", "PE 100", "HDPE"],
    pvc: ["PVC pipe fittings", "PVC fittings", "PVC pipe", "UPVC", "uPVC", "CPVC", "PVC-U", "PVC"],
    "hvac-valves": [
        "backflow preventer",
        "butterfly valve",
        "swing check valve",
        "check valve",
        "brass ball valve",
        "ball valve",
        "gate valve",
        "globe valve",
    ],
    "pex-ppsu": [
        "underfloor heating pipe",
        "underfloor heating",
        "floor heating",
        "PEX-AL-PEX",
        "PEX pipe",
        "PE-RT",
        "PPSU",
        "PEX",
    ],
};

/** 只保留有完整支柱正文、且确实进 sitemap 的品类。 */
const LINKABLE: CategorySlug[] = PILLAR_SLUGS.filter((s) => s in CATEGORY_KEYWORDS);

export interface CategoryTarget {
    slug: CategorySlug;
    /** 文章正文里该品类触发词的出现次数——用来排序，越高越相关 */
    score: number;
}

/** 英文无前缀；其余语言带前缀。与 lib/seo.ts 的 localeUrl 同一套规则，但这里输出站内相对路径。 */
export function categoryHref(locale: string, slug: string): string {
    return `${locale === "en" ? "" : `/${locale}`}/categories/${slug}`;
}

function keywordRegex(kw: string): RegExp {
    // 词组里的空格/连字符放宽成 [\s-]+，这样 "PEX-AL-PEX" 和 "PEX AL PEX" 都能命中。
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s-]+/g, "[\\s-]+");
    // 缩写两侧用 (?![\w-]) 而不是 \b：\b 在 "PVC-U" 里会把 "PVC" 单独切出来。
    return new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`, "i");
}

function keywordRegexGlobal(kw: string): RegExp {
    return new RegExp(keywordRegex(kw).source, "gi");
}

/** 去掉标签，只留可见文本——用于打分，不用于注入。 */
function plainText(html: string): string {
    return html.replace(/<[^>]*>/g, " ");
}

/**
 * 相关度门槛。标题命中一次记 5 分，所以任何主题级匹配都能过；正文里顺口提一句
 * （HDPE 文章里出现一次 "PPR"）拿 1 分，过不了——收口卡片推错品类比不推更糟。
 */
const MIN_RELEVANCE = 3;

/**
 * 一篇文章该链到哪些品类。按触发词出现频次排序，返回最相关的几个。
 *
 * 这里**不**排除正文已手写过链接的品类：收口卡片要推的是文章主题对应的品类，
 * 正文里已经有一条链接不代表文末就该改推别的。去重是注入环节的事，见 injectCategoryLinks。
 */
export function pickCategoryTargets(
    input: { title?: string; category?: string; html?: string },
    limit = MAX_INLINE_LINKS
): CategoryTarget[] {
    const html = input.html ?? "";
    // 标题和 Sanity 分类名权重更高：它们代表文章主题，正文提一句不代表相关。
    const heavy = `${input.title ?? ""} ${input.category ?? ""}`;
    const text = plainText(html);

    const scored = LINKABLE.map((slug) => {
        let score = 0;
        for (const kw of CATEGORY_KEYWORDS[slug]) {
            const re = keywordRegexGlobal(kw);
            score += (text.match(re)?.length ?? 0);
            score += (heavy.match(keywordRegexGlobal(kw))?.length ?? 0) * 5;
        }
        return { slug, score };
    })
        .filter((t) => t.score >= MIN_RELEVANCE)
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit);
}

/**
 * 把品类链接注入正文 HTML。
 *
 * 只改 <p> / <li> 里的裸文本节点，且每个品类最多注入一次。任何一个目标没找到可用的
 * 文本节点就直接跳过——注入失败是可接受的，破坏 HTML 不是。
 *
 * 正文里已经手写过 /categories/<slug> 的品类不再注入：同一篇文章给同一个目标两条链接，
 * 对读者是噪音，对 Google 是第二条链接不计权重。
 */
export function injectCategoryLinks(
    html: string,
    locale: string,
    targets: CategoryTarget[]
): { html: string; injected: CategorySlug[] } {
    const fresh = targets.filter((t) => !html.includes(`/categories/${t.slug}`));
    if (!html || fresh.length === 0) return { html, injected: [] };

    const pending = new Map(fresh.map((t) => [t.slug, CATEGORY_KEYWORDS[t.slug]]));
    const injected: CategorySlug[] = [];

    // 标签 / 文本 交替扫描。用深度计数而不是布尔，嵌套标签（<p><strong>…）才不会算错。
    const tokens = html.match(/<[^>]*>|[^<]+/g);
    if (!tokens) return { html, injected: [] };

    let anchorDepth = 0; // 已在链接里 → 不能再套 <a>
    let blockedDepth = 0; // 标题 / 代码块 → 不注入
    let textDepth = 0; // 在 <p> 或 <li> 里 → 才允许注入

    const out: string[] = [];

    for (const token of tokens) {
        if (token.startsWith("<")) {
            const m = /^<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9]*)/.exec(token);
            if (m) {
                const closing = m[1] === "/";
                const tag = m[2].toLowerCase();
                // 自闭合标签不影响深度
                const selfClosing = /\/\s*>$/.test(token) || ["br", "img", "hr", "input"].includes(tag);
                if (!selfClosing) {
                    const delta = closing ? -1 : 1;
                    if (tag === "a") anchorDepth = Math.max(0, anchorDepth + delta);
                    else if (/^h[1-6]$/.test(tag) || tag === "code" || tag === "pre" || tag === "table")
                        blockedDepth = Math.max(0, blockedDepth + delta);
                    else if (tag === "p" || tag === "li") textDepth = Math.max(0, textDepth + delta);
                }
            }
            out.push(token);
            continue;
        }

        const eligible = anchorDepth === 0 && blockedDepth === 0 && textDepth > 0;
        if (!eligible || pending.size === 0 || injected.length >= MAX_INLINE_LINKS) {
            out.push(token);
            continue;
        }

        let chunk = token;
        for (const [slug, keywords] of pending) {
            if (injected.length >= MAX_INLINE_LINKS) break;
            let done = false;
            for (const kw of keywords) {
                const match = keywordRegex(kw).exec(chunk);
                if (!match) continue;
                const href = categoryHref(locale, slug);
                // 用命中的原文做锚文本，保留原始大小写——比塞一个固定锚文本自然。
                chunk =
                    chunk.slice(0, match.index) +
                    `<a href="${href}" class="pillar-inline-link">${match[0]}</a>` +
                    chunk.slice(match.index + match[0].length);
                injected.push(slug);
                done = true;
                break;
            }
            if (done) pending.delete(slug);
        }
        out.push(chunk);
    }

    return { html: out.join(""), injected };
}
