import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, FileText, ShieldCheck, Box } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeUrl } from "@/lib/seo";
import {
    buildProductTitle,
    categoryPillarSlug,
    dedupeSignature,
    pickCanonical,
    primaryCode,
    sizeRange,
} from "@/lib/products/catalog";

// Render on demand and cache (ISR) instead of statically generating all 7146
// product pages at build time. Static generation forced getTranslations to run
// without a request context, which threw and 500'd every product page.
export const revalidate = 3600;

type ProductVariant = {
    _key: string;
    code?: string;
    size?: string;
    packing?: string;
    weight?: string;
    volume?: string;
};

type ProductDetail = {
    name: string;
    slug: string;
    categoryTitle?: string;
    brandName?: string;
    description?: string;
    mainImage?: {
        asset?: {
            url?: string;
        };
    };
    variants?: ProductVariant[];
};

/**
 * 找出该产品的规范 URL。
 *
 * 全站有 69 组 variants 逐行一致的重复导入（elbow-1031-37 / elbow-1031-37-193c 之类），
 * 互相稀释排名。按「首个变体型号 + 变体数量」识别同一产品，再用 pickCanonical
 * 选出稳定的规范页。查不到或只有自己时原样返回，不改变现状。
 */
async function resolveCanonicalSlug(
    slug: string,
    product: Pick<ProductDetail, "categoryTitle" | "variants">
): Promise<string> {
    const code = primaryCode(product.variants);
    const signature = dedupeSignature(product.variants);
    if (!code || !signature) return slug;

    try {
        const twins: { slug: string; categoryTitle?: string; variants?: { code?: string }[] }[] =
            await client.fetch(
                `*[_type == "product" && variants[0].code == $code && defined(slug.current)]{
                    "slug": slug.current,
                    "categoryTitle": category->title,
                    variants[] { code }
                }`,
                { code }
            );
        const sameProduct = twins.filter((t) => dedupeSignature(t.variants) === signature);
        if (sameProduct.length < 2) return slug;
        return pickCanonical(sameProduct).slug;
    } catch {
        // 查询失败时不要擅自改 canonical——错误的 canonical 比没有更糟
        return slug;
    }
}

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await props.params;
    setRequestLocale(locale);
    try {
        const product: Pick<ProductDetail, "name" | "description" | "mainImage" | "categoryTitle" | "brandName" | "variants"> | null =
            await client.fetch(
                `*[_type == "product" && slug.current == $slug][0]{
                    name, description,
                    mainImage { asset->{ url } },
                    "categoryTitle": category->title,
                    "brandName": brand->name,
                    variants[] { code, size }
                }`,
                { slug }
            );
        if (!product) return {};
        // 原来是 `${name} | Wholesale B2B`，导致 26 个页面同题为「Elbow | Wholesale B2B」。
        // buildProductTitle 补上品类前缀 + 型号 + 尺寸区间，让每页在 SERP 里可分辨。
        const title = buildProductTitle(product);
        const range = sizeRange(product.variants);
        const description =
            product.description ||
            `${product.name} from IFAN, factory direct${range ? ` in ${range}` : ""}. B2B wholesale, batch certificates per shipment, shipped to 120+ countries.`;

        // 重复导入的页面 canonical 到规范页：全站有 69 组 variants 完全一致的重复
        // （如 elbow-1031-37 与 elbow-1031-37-193c），互相稀释排名。
        const canonicalSlug = await resolveCanonicalSlug(slug, product);
        return {
            // absolute：buildProductTitle 已按 60 字符预算带上品牌，
            // 再让 [locale]/layout 的 template 追加「| IFAN Group」会超长被截断。
            title: { absolute: title },
            description,
            keywords: [
                product.name,
                product.categoryTitle || "",
                product.brandName || "",
                "wholesale plumbing",
                "OEM manufacturer China",
                "factory direct pricing",
            ].filter(Boolean),
            openGraph: {
                title: `${product.name} - Factory Direct Wholesale`,
                description,
                url: localeUrl(locale, `/products/${slug}`),
                images: product.mainImage?.asset?.url
                    ? [{ url: product.mainImage.asset.url, width: 800, height: 800, alt: product.name }]
                    : [],
            },
            // 产品内容是英文单语，各语言路径互为重复页——全部 canonical 到无前缀英文 URL，
            // 不声明 hreflang 集群（那些不是翻译版本）。
            alternates: {
                canonical: localeUrl("en", `/products/${canonicalSlug}`),
            },
        };
    } catch {
        return {};
    }
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string; locale: string }> }) {
    const params = await props.params;
    setRequestLocale(params.locale);
    const t = await getTranslations("products");
    const product: ProductDetail | null = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{
        name,
        "slug": slug.current,
        "categoryTitle": category->title,
        "brandName": brand->name,
        description,
        mainImage { asset->{ url } },
        variants[] { _key, code, size, packing, weight, volume }
    }`, { slug: params.slug });

    if (!product) notFound();

    const localImagePath = `/images/products/${product.slug}/main.webp`;
    const pillarSlug = categoryPillarSlug(product.categoryTitle);
    const code = primaryCode(product.variants);
    const range = sizeRange(product.variants);

    const productUrl = localeUrl("en", `/products/${product.slug}`);
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        url: productUrl,
        ...(product.description ? { description: product.description } : {}),
        ...(product.mainImage?.asset?.url ? { image: product.mainImage.asset.url } : {}),
        ...(product.brandName ? { brand: { "@type": "Brand", name: product.brandName } } : {}),
        ...(product.categoryTitle ? { category: product.categoryTitle } : {}),
        manufacturer: { "@type": "Organization", name: "IFAN Group", url: "https://www.ifanholding.com" },
    };
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: localeUrl("en") },
            { "@type": "ListItem", position: 2, name: "Products", item: localeUrl("en", "/products") },
            { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Navbar />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-square bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden relative group">
                                <Image
                                    src={product.mainImage?.asset?.url || localImagePath}
                                    alt={product.name}
                                    fill
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                                    unoptimized={Boolean(product.mainImage?.asset?.url)}
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-3 py-1 bg-brand-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                                        {product.brandName}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                            {/* 品类名原来是死文本。1191 个产品页各给品类支柱页一条链接，
                                是把这批页面仅有的权重导向 money 页最直接的方式。 */}
                            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                <Link href="/products" className="hover:text-brand-600">{t("products")}</Link>
                                <span>/</span>
                                {pillarSlug ? (
                                    <Link
                                        href={`/categories/${pillarSlug}`}
                                        className="text-slate-900 hover:text-brand-600"
                                    >
                                        {product.categoryTitle}
                                    </Link>
                                ) : (
                                    <span className="text-slate-900">{product.categoryTitle}</span>
                                )}
                            </nav>

                            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
                                {product.name}
                            </h1>

                            {/* 型号与尺寸区间是采购方扫页时第一眼要找的两个信息 */}
                            {(code || range) && (
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    {code && (
                                        <span dir="ltr" className="inline-block px-3 py-1.5 bg-slate-900 text-white text-xs font-bold tracking-wider rounded-full">
                                            {code}
                                        </span>
                                    )}
                                    {range && (
                                        <span dir="ltr" className="inline-block px-3 py-1.5 bg-brand-50 text-brand-800 border border-brand-200 text-xs font-bold tracking-wider rounded-full">
                                            {range}
                                        </span>
                                    )}
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                                        {product.variants?.length || 0} sizes
                                    </span>
                                </div>
                            )}

                            <p className="text-xl text-slate-500 font-light leading-relaxed mb-10">
                                {product.description || t("defaultProductDescription")}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <ShieldCheck className="w-6 h-6 text-brand-600 mb-2" />
                                    <p className="text-xs font-bold text-slate-400 uppercase">{t("durability")}</p>
                                    <p className="font-bold text-slate-900">50 {t("yearWarranty")}</p>
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <Box className="w-6 h-6 text-brand-600 mb-2" />
                                    <p className="text-xs font-bold text-slate-400 uppercase">{t("material")}</p>
                                    <p className="font-bold text-slate-900">{t("virginGrade")}</p>
                                </div>
                            </div>

                            <Link 
                                href={`/contact?interest=${encodeURIComponent(product.name)}`}
                                className="w-full lg:w-fit bg-slate-900 text-white px-10 py-5 rounded-full font-black tracking-widest uppercase hover:bg-brand-600 transition-all flex items-center justify-center gap-3 shadow-2xl"
                            >
                                {t("getQuote")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Technical Matrix */}
                    <div className="mt-24 pt-24 border-t border-slate-100">
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                <FileText className="text-brand-600" /> {t("completeSpecMatrix")}
                            </h2>
                            <p className="text-slate-500">{t("specNote")}</p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("code")}</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("dimensionsSize")}</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("packaging")}</th>
                                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">{t("cbm")}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {product.variants?.map((v) => (
                                        <tr key={v._key} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-6 font-mono font-medium text-slate-900">{v.code || '-'}</td>
                                            <td className="p-6 font-bold text-slate-900">{v.size || '-'}</td>
                                            <td className="p-6 text-slate-600">{v.packing || '-'}</td>
                                            <td className="p-6 text-slate-500 font-mono text-sm">{v.volume || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
