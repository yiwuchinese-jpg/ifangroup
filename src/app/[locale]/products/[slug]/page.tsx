import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, FileText, ShieldCheck, Box } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type StaticProductSlug = {
    slug: string;
};

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

export async function generateStaticParams() {
    try {
        const products: StaticProductSlug[] = await client.fetch(`*[_type == "product"]{ "slug": slug.current }`);
        return products?.map((p) => ({ slug: p.slug })) || [];
    } catch (error) {
        console.error("Products generateStaticParams failed:", error);
        return [];
    }
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
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

    return (
        <div className="min-h-screen bg-white">
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
                            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                <Link href="/products" className="hover:text-brand-600">{t("products")}</Link>
                                <span>/</span>
                                <span className="text-slate-900">{product.categoryTitle}</span>
                            </nav>

                            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
                                {product.name}
                            </h1>
                            
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
