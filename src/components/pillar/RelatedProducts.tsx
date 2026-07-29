import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { client } from "@/lib/sanity";
import Section from "./Section";

type ProductCard = {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
};

/**
 * 生产设备与模具的排除条件。
 *
 * 品类分类里混进了产线设备：uPVC 分类挂着「Electric pipe threading machines」和
 * 「Manual threading machine」，PEX 分类挂着「PEX Round Tools Mold 1」，PE 分类挂着一堆
 * 「Pipe clip」。这些出现在「uPVC Products in the IFAN Catalogue」这类标题下面，
 * 对买家是噪声，对 Google 是品类与产品不一致的信号。
 *
 * 在查询层排除而不是逐个改 Sanity 分类：分类归属是导入流程的产物，人工改完下次
 * 导入还会回来。GROQ 的 match 按词元前缀匹配，已实测四个词能把上述条目全部滤掉。
 */
const TOOLING_EXCLUSION = `!(name match "machine*") && !(name match "mold*")
    && !(name match "tool*") && !(name match "clip*")`;

/**
 * 按 Sanity 的 category->title 取关联产品。
 *
 * 为什么按 title 而不按 slug：路由 slug（hdpe/ppr）和 Sanity slug（pe-series/ppr-series）
 * 是两套词汇，且 Sanity 里存在同名重复分类文档（ppr-series 就有三个，分别挂 414/79/1 个产品）。
 * 按 title 取集合是目前唯一能把货取全的方式。
 */
export default async function RelatedProducts({
    id,
    heading,
    sanityCategoryTitles,
    limit = 12,
    labels,
    tone,
}: {
    id: string;
    heading: string;
    sanityCategoryTitles: string[];
    limit?: number;
    labels: { viewAllProducts: string };
    tone?: "light" | "muted";
}) {
    let products: ProductCard[] = [];
    try {
        products = await client.fetch<ProductCard[]>(
            `*[_type == "product" && category->title in $titles && defined(slug.current)
                && ${TOOLING_EXCLUSION}][0...$limit]{
                name,
                "slug": slug.current,
                description,
                "imageUrl": mainImage.asset->url
            }`,
            { titles: sanityCategoryTitles, limit }
        );
    } catch (error) {
        console.error(`[pillar] related products fetch failed for ${id}:`, error);
    }

    // 取不到货就整块不渲染，不留空标题
    if (!products.length) return null;

    return (
        <Section id={id} heading={heading} tone={tone}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="group border border-slate-200 bg-white hover:border-brand-600 transition-colors"
                    >
                        <div className="relative aspect-square bg-slate-50 overflow-hidden">
                            {p.imageUrl && (
                                <Image
                                    src={p.imageUrl}
                                    alt={p.name}
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    className="object-contain p-3 group-hover:scale-105 transition-transform"
                                    loading="lazy"
                                />
                            )}
                        </div>
                        <p className="px-3 py-3 text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-brand-700">
                            {p.name}
                        </p>
                    </Link>
                ))}
            </div>
            <div className="mt-8">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-700 hover:text-brand-800"
                >
                    {labels.viewAllProducts}
                </Link>
            </div>
        </Section>
    );
}
