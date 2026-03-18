import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Brand {
    _id: string;
    name: string;
    slug: string;
    series: string;
    description: string;
    logo?: { asset: { url: string } };
}

export default function BrandGridView({ brands }: { brands: Brand[] }) {
    const t = useTranslations("brandPage");

    const getSeriesLabel = (series: string) => {
        const map: Record<string, string> = {
            "土耳其系列": t("seriesLabels.turkey"),
            "德国系列": t("seriesLabels.germany"),
            "意大利系列": t("seriesLabels.italy"),
            "Ifan系列": t("seriesLabels.ifanCore"),
            "欧洲系列": t("seriesLabels.euro"),
            "IFAN系列": t("seriesLabels.ifanCore"),
            "IFAN 系列": t("seriesLabels.ifanCore"),
            "其他": t("seriesLabels.euro"), // Fallback to Euro or generic
            "Sub-Brands": t("partnerBrand")
        };
        return map[series] || series;
    };

    // Group brands by series
    const groups: Record<string, Brand[]> = {};
    brands.forEach(brand => {
        const rawSeries = brand.series || 'Sub-Brands';
        const seriesName = getSeriesLabel(rawSeries);
        if (!groups[seriesName]) {
            groups[seriesName] = [];
        }
        groups[seriesName].push(brand);
    });

    const groupedBrands = Object.entries(groups).sort(([a], [b]) => {
        const ifanCore = t("seriesLabels.ifanCore");
        if (a === ifanCore) return -1;
        if (b === ifanCore) return 1;
        return a.localeCompare(b);
    });

    const getBrandSnapshot = (brand: Brand) => {
        const coreBrands = ["IFAN", "IFANPlus", "IFANPRO", "IFANNova", "IFANUltra"];
        if (coreBrands.includes(brand.name)) {
            return t(`brands.${brand.name}.heroDescription`);
        }
        
        // Extract from CMS description for non-core brands
        const productTypes = brand.description?.match(/主要产品：(.*?)(?=\n|$)/)?.[1] || "Core Plumbing Systems";
        return t("generic.heroDescription", { brandName: brand.name, products: productTypes });
    };

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-50 pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* Header Title for Grid View */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase">
                        {t("brandEcosystem")}
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                        {t("exploreMoreBrands")}
                    </p>
                </div>

                {groupedBrands.map(([seriesName, seriesBrands], groupIndex) => (
                    <motion.section
                        key={seriesName}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: groupIndex * 0.1 }}
                        className="space-y-12"
                    >
                        {/* Series Header with Hairline Divider */}
                        <div className="border-b border-slate-200 pb-6 flex items-baseline justify-between">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                                {seriesName}
                            </h2>
                            <span className="text-sm font-bold text-slate-400 tracking-widest">
                                {seriesBrands.length} {t("brandsLabel", { defaultValue: "BRANDS" })}
                            </span>
                        </div>

                        {/* Responsive CSS Grid for Brand Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {seriesBrands.map((brand, i) => (
                                <Link href={`/brands/${brand.slug || brand._id}`} key={brand._id}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="group bg-white p-8 border border-slate-100/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(22,163,74,0.08)] transition-all duration-500 h-full flex flex-col items-start justify-between relative overflow-hidden"
                                    >
                                        {/* Hover Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        <div className="w-full relative z-10 space-y-8">
                                            {/* Brand Logo / Text Identifier */}
                                            <div className="h-16 flex items-center justify-start">
                                                {brand.logo?.asset?.url ? (
                                                    <img
                                                        src={brand.logo.asset.url}
                                                        alt={brand.name}
                                                        className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                                                    />
                                                ) : (
                                                    <div className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                                                        {brand.name}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Brand Description Snapshot */}
                                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 whitespace-pre-line">
                                                {getBrandSnapshot(brand)}
                                            </p>
                                        </div>

                                        {/* Interactive Footer */}
                                        <div className="mt-8 flex items-center justify-between w-full pt-6 border-t border-slate-100 relative z-10">
                                            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest group-hover:text-brand-600 transition-colors">
                                                {t("exploreMatrix", { defaultValue: "Discover" })}
                                            </span>
                                            <div className="w-8 h-8 bg-slate-50 flex items-center justify-center group-hover:bg-brand-600 group-hover:scale-110 transition-all duration-300">
                                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
}
