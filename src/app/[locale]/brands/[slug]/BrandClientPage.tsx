"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Globe, ArrowUpRight, Users, PlayCircle } from "lucide-react";
import ProductListClient from "@/app/[locale]/products/ProductListClient";
import SecureGallery from "@/components/brands/SecureGallery";
import { Sparkles, ShieldCheck, Target, Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";

type BrandAsset = { asset?: { url?: string } };

type BrandProductVariant = {
    _key: string;
    code: string;
    size: string;
    packing: string;
    weight: string;
    volume: string;
};

type BrandProduct = {
    _id: string;
    name: string;
    slug: string;
    categoryTitle: string;
    brandName: string;
    description: string;
    mainImage?: BrandAsset;
    variants: BrandProductVariant[];
};

type RelatedBrand = {
    _id: string;
    name: string;
    slug: string;
    series?: string;
    description?: string;
    logo?: BrandAsset;
};

type Brand = {
    name: string;
    slug: string;
    description?: string;
    series?: string;
    externalUrl?: string;
    logo?: BrandAsset;
    heroImage?: BrandAsset;
    marketingMaterials?: Array<{ asset?: { url?: string } }>;
};

type BrandClientPageProps = {
    brand: Brand;
    products: BrandProduct[];
    relatedBrands?: RelatedBrand[];
};

export default function BrandClientPage({ brand, products, relatedBrands = [] }: BrandClientPageProps) {
    const t = useTranslations("brandPage");

    // Get brand-specific copy from translations, fall back to generic template for non-core brands
    const brandName = brand.name as string;
    const coreBrands = ["IFAN", "IFANPlus", "IFANPRO", "IFANNova", "IFANUltra"];
    const isCoreBrand = coreBrands.includes(brandName);

    // Extract attributes from CMS description for non-core brands
    const reference = brand.description?.match(/参照系：(.*?)(?=\n|$)/)?.[1] || "Modern Engineering";
    const productTypes = brand.description?.match(/主要产品：(.*?)(?=\n|$)/)?.[1] || "Core Plumbing Systems";
    const route = brand.description?.match(/拟定路线：(.*?)(?=\n|$)/)?.[1] || "Strategic Distribution";
    const market = brand.description?.match(/目标市场：(.*?)(?=\n|$)/)?.[1] || "Global Markets";

    const isPremium = route.includes("高端") || route.includes("顶级");

    // Define content based on whether it's a core brand or needs generic template
    const tagline = isCoreBrand 
        ? t(`brands.${brandName}.tagline`) 
        : (isPremium ? t("generic.premiumTagline") : t("generic.valueTagline"));

    const heroDescription = isCoreBrand
        ? t(`brands.${brandName}.heroDescription`)
        : t("generic.heroDescription", { brandName, products: productTypes });

    const valuePropositionTitle = isCoreBrand
        ? t(`brands.${brandName}.valuePropositionTitle`)
        : t("generic.propositionTitle", { brandName });

    const valuePropositionContent = isCoreBrand
        ? [t(`brands.${brandName}.valuePropositionContent1`), t(`brands.${brandName}.valuePropositionContent2`)]
        : [
            t("generic.propositionContent1", { brandName }),
            t("generic.propositionContent2", { brandName, route })
        ];

    const marketStrategyTitle = isCoreBrand
        ? t(`brands.${brandName}.marketStrategyTitle`)
        : t("generic.strategyTitle", { market });

    const marketStrategyDesc = isCoreBrand
        ? t(`brands.${brandName}.marketStrategyDesc`)
        : t("generic.strategyDesc", { brandName, market });

    const designPhilosophyTitle = isCoreBrand
        ? t(`brands.${brandName}.designPhilosophyTitle`)
        : t("generic.philosophyTitle");

    const designPhilosophyDesc = isCoreBrand
        ? t(`brands.${brandName}.designPhilosophyDesc`)
        : t("generic.philosophyDesc", { brandName, reference });

    const displayBrands = useMemo(() => {
        return relatedBrands.slice(0, 3);
    }, [relatedBrands]);

    const galleryItems = Array.from({ length: 5 }, (_, i) => `/images/brands/${brand.slug}/gallery-${i + 1}.webp`);
    const marketingMaterials = brand.marketingMaterials ?? [];

    const getSeriesLabel = (series: string) => {
        const map: Record<string, string> = {
            "土耳其系列": t("seriesLabels.turkey"),
            "德国系列": t("seriesLabels.germany"),
            "意大利系列": t("seriesLabels.italy"),
            "Ifan系列": t("seriesLabels.ifanCore"),
            "欧洲系列": t("seriesLabels.euro"),
        };
        return map[series] || series;
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Fullscreen Immersive Brand Hero */}
            <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 pt-32 lg:pt-0 border-b border-slate-800">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "easeOut" }}
                        src={brand.heroImage?.asset?.url || `/images/brands/${brand.slug}/hero-bg.webp`}
                        alt={`${brand.name} Background`}
                        className="w-full h-full object-cover opacity-20 select-none"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                </div>

                <div className="container relative z-10 px-6 mx-auto flex flex-col items-center justify-center text-center mt-12 lg:mt-20">
                    {brand.series && brand.series !== "Default" && brand.series !== "其他" && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-none text-xs font-bold uppercase tracking-[0.3em] mb-10"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                            {getSeriesLabel(brand.series)}
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] uppercase mb-6 drop-shadow-2xl"
                    >
                        {brand.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="mb-10 text-brand-400 font-bold tracking-[0.2em] uppercase text-sm md:text-lg"
                    >
                        {tagline}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed font-light mb-14 whitespace-pre-line">
                            {heroDescription}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <a
                            href="#brand-products"
                            className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-white text-slate-900 font-bold tracking-[0.2em] uppercase text-sm hover:bg-slate-100 transition-colors overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-brand-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                            <span className="relative z-10 flex items-center gap-4">
                                {t("exploreMatrix")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        {brand.externalUrl && (
                            <a
                                href={brand.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-white/20 text-white font-bold tracking-[0.2em] uppercase text-sm hover:border-white/40 transition-colors overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                <span className="relative z-10 flex items-center gap-3">
                                    <Globe size={16} /> {t("officialSite")}
                                </span>
                            </a>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center pb-10 z-20 pointer-events-none"
                >
                    <div className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold mb-6">{t("scrollToDiscover")}</div>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
                </motion.div>
            </section>

            {/* High-Converting Value Proposition Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden border-b border-slate-200">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100 rounded-full blur-[100px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-[1px] w-12 bg-brand-500" />
                                <span className="text-brand-600 font-bold tracking-[0.3em] uppercase text-xs">
                                    {t("valuePropositionLabel")}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
                                {valuePropositionTitle}
                            </h2>
                            <div className="space-y-6">
                                {valuePropositionContent.map((paragraph, idx) => (
                                    <p key={idx} className="text-lg md:text-xl text-slate-500 leading-relaxed font-light">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-10 border border-slate-200 hover:border-brand-300 hover:shadow-2xl transition-all duration-500 group">
                                <ShieldCheck className="w-12 h-12 text-brand-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{t("qualityAssuredTitle")}</h3>
                                <p className="text-slate-500 leading-relaxed">{t("qualityAssuredDesc")}</p>
                            </div>
                            <div className="bg-slate-900 p-10 border border-slate-800 hover:border-brand-500 hover:shadow-2xl transition-all duration-500 group sm:translate-y-12">
                                <Sparkles className="w-12 h-12 text-brand-400 mb-8 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{designPhilosophyTitle}</h3>
                                <p className="text-slate-400 leading-relaxed">{designPhilosophyDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Positioning & Market Target */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-slate-900 w-full rounded-none overflow-hidden flex flex-col md:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center relative z-10">
                            <Target className="w-16 h-16 text-brand-400 mb-8" />
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                                {marketStrategyTitle}
                            </h2>
                            <p className="text-xl text-slate-300 leading-relaxed font-light">
                                {marketStrategyDesc}
                            </p>
                        </div>
                        <div className="md:w-1/2 relative min-h-[400px]">
                            <div className="absolute inset-0 bg-brand-600 mix-blend-multiply opacity-20 z-10" />
                            {brand.heroImage?.asset?.url ? (
                                <Image src={brand.heroImage.asset.url} alt="Strategy" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover grayscale" unoptimized />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <Globe2 className="w-32 h-32 text-slate-700" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Brands Section */}
            {relatedBrands && relatedBrands.length > 0 && (
                <section className="py-24 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div>
                                <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                                    {t("brandEcosystem")}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                                    {t("exploreMoreBrands")}
                                </h2>
                            </div>
                            <Link href="/brands" className="inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase text-slate-500 hover:text-brand-600 transition-colors group">
                                {t("viewFullPortfolio")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayBrands.map((relatedBrand, idx) => (
                                <Link
                                    key={relatedBrand._id || idx}
                                    href={`/brands/${relatedBrand.slug}`}
                                    className="group block bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 p-8 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                        {relatedBrand.logo?.asset?.url ? (
                                            <img
                                                src={relatedBrand.logo.asset.url}
                                                alt={relatedBrand.name}
                                                className="w-3/4 h-3/4 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 relative z-0 mix-blend-multiply"
                                            />
                                        ) : (
                                            <div className="text-2xl font-black text-slate-300 tracking-tight">{relatedBrand.name}</div>
                                        )}
                                        <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-brand-600 group-hover:border-brand-600 group-hover:text-white text-slate-400 transition-all duration-300 -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <ArrowRight className="w-4 h-4 -rotate-45" />
                                        </div>
                                    </div>
                                    <div className="p-8 border-t border-slate-100">
                                        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                                            {relatedBrand.series || t("partnerBrand")}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-brand-600 transition-colors">
                                            {relatedBrand.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 whitespace-pre-line">
                                            {relatedBrand.description || t("partnerBrandDesc", { brandName: relatedBrand.name })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Product Matrix */}
            <section id="brand-products" className="py-32 lg:py-48 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-24 lg:flex items-end justify-between">
                        <div className="max-w-2xl">
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                {t("globalSupply")}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-4">
                                {t("productUniverse")}
                            </h2>
                            <p className="text-xl text-slate-500 font-light mt-8">
                                {t("productUniverseDesc", { brandName: brand.name })}
                            </p>
                        </div>
                    </div>

                    {products && products.length > 0 ? (
                        <div className="w-full">
                            <ProductListClient initialProducts={products} />
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-slate-50">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">{t("matrixGenerating")}</h3>
                            <p className="text-slate-500 font-medium">{t("matrixGeneratingDesc")}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Secure Brand Materials Gallery */}
            {marketingMaterials.length > 0 && (
                <section className="py-32 bg-[#f8fafc] border-t border-slate-200 shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-60"></div>
                    <div className="w-full relative z-10">
                        <SecureGallery
                            packagingMaterials={[]}
                            marketingMaterials={marketingMaterials}
                            brandName={brand.name}
                            logoUrl={brand.logo?.asset?.url}
                        />
                    </div>
                </section>
            )}

            {/* Agent Partnership Gallery */}
            <section className="py-32 bg-white border-t border-slate-200 overflow-hidden relative">
                <div className="container mx-auto px-6 max-w-7xl mb-16 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-xl">
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4 text-brand-500" /> {t("globalPartnership")}
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                                {t("agentNetwork")}
                            </h2>
                        </div>
                        <p className="text-lg text-slate-500 max-w-sm leading-relaxed font-light">
                            {t("agentNetworkDesc", { brandName: brand.name })}
                        </p>
                    </div>
                </div>

                <div className="w-full overflow-hidden relative h-[300px] md:h-[450px]">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <motion.div
                        className="flex gap-4 md:gap-8 absolute left-0"
                        animate={{ x: [0, -2000] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    >
                        {[...galleryItems, ...galleryItems].map((src, i) => (
                            <div key={i} className="relative w-[300px] md:w-[450px] aspect-[4/3] shrink-0 overflow-hidden group">
                                <img
                                    src={src}
                                    alt="Global Agent Partnership"
                                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-brand-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* High Impact CTA */}
            <section className="relative py-32 lg:py-48 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none w-full h-full" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8 mt-12">
                            <ArrowUpRight className="w-8 h-8 text-brand-400" />
                        </div>

                        <h2 className="text-5xl sm:text-7xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.85] uppercase mb-8 drop-shadow-2xl">
                            {t("joinFramework")} <br className="hidden md:block" /> <span className="text-brand-500">{t("joinFrameworkHighlight")}</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
                            {t("joinFrameworkDesc", { brandName: brand.name })}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                            <Link
                                href="/contact"
                                className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-brand-500 text-white font-bold tracking-[0.2em] uppercase text-sm hover:bg-brand-600 transition-colors overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    {t("becomePartner")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                href="/news"
                                className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-slate-700 text-slate-300 font-bold tracking-[0.2em] uppercase text-sm hover:border-slate-500 hover:text-white transition-colors"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <PlayCircle className="w-5 h-5" /> {t("recentStories")}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
