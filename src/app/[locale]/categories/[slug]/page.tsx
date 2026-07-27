import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CategoryClientPage from "./CategoryClientPage";
import { Metadata } from "next";
import { localeAlternates, localeUrl } from "@/lib/seo";
import { buildPageSchema } from "@/lib/schema";
import { CATEGORY_SLUGS, hasLocalizedBody, isCategorySlug } from "@/lib/pillar";
import { getPillar } from "@/lib/pillar/categoryPillars";
import { LanguageBridge, PillarSections } from "@/components/pillar";

// 品类页内容来自 i18n 文件与本地数据，不依赖请求——预渲染 + 1h ISR 即可。
// 之前是 revalidate=0（每次请求全动态），加长文后会变成 TTFB 问题。
export const revalidate = 3600;

// 关掉动态参数：此前 /categories/任意字符串 都返回 200 + 兜底文案，
// 等于给爬虫开了一个无限 soft-404 面。现在未知 slug 直接 404。
export const dynamicParams = false;

export function generateStaticParams() {
    return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
    const { slug, locale } = await params;
    if (!isCategorySlug(slug)) return {};

    // 必须走 getTranslations：此前用的是英文 TS 文案，导致 /ru /ar 等
    // 正文是本语言、<title> 却是英文，且只覆盖 6 个 slug。
    const t = await getTranslations({ locale, namespace: "categories" });
    const pillar = getPillar(slug);
    const full = hasLocalizedBody(locale) && pillar;

    // 只有渲染了完整支柱正文的语言，才用支柱页的 SEO 文案——
    // 否则标题承诺的深度和页面实际内容对不上。
    const title = full ? pillar.seo.title : t(`items.${slug}.heroTitle`);
    const description = full ? pillar.seo.description : t(`items.${slug}.heroDescription`);

    return {
        // 支柱页标题是按 60 字符预算写死的，再让 [locale]/layout 的 template 追加
        // 「| IFAN Group」会超长被截断；短版页仍走 template 以带上品牌。
        title: full ? { absolute: pillar.seo.title } : title,
        description,
        alternates: localeAlternates(locale, `/categories/${slug}`),
        openGraph: {
            title,
            description,
            url: localeUrl(locale, `/categories/${slug}`),
            siteName: "IFAN Group",
        },
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string; locale: string }>;
}) {
    const { slug, locale } = await params;
    if (!isCategorySlug(slug)) notFound();

    const pillar = getPillar(slug);
    const path = `/categories/${slug}`;

    // 支柱正文是英文撰写的。非英文语言渲染已全译的短版页 + 桥接链接，
    // 不拼「本语言标题 + 英文正文」的混搭页。见 src/lib/pillar/index.ts 的 PILLAR_BODY_LOCALES。
    const showBody = Boolean(pillar) && hasLocalizedBody(locale);

    const t = await getTranslations({ locale, namespace: "categories" });
    const schema = pillar
        ? buildPageSchema({
              path,
              breadcrumbName: t(`items.${slug}.heroTitle`),
              ...pillar.schema,
              // FAQ 只在正文实际渲染出来的语言里进 schema——
              // Google 要求结构化数据里的问答必须在页面上可见。
              ...(showBody ? { faqs: pillar.faqs } : {}),
          })
        : null;

    return (
        <>
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
            <CategoryClientPage slug={slug}>
                {showBody && pillar ? (
                    <PillarSections sections={pillar.sections} locale={locale} />
                ) : pillar ? (
                    <LanguageBridge locale={locale} path={path} />
                ) : null}
            </CategoryClientPage>
        </>
    );
}
