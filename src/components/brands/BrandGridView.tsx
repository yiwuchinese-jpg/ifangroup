import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBrandCopy } from '@/lib/brandCopywriting';

interface Brand {
    _id: string;
    name: string;
    slug: string;
    series: string;
    description: string;
    logo?: { asset: { url: string } };
}

const SERIES_TRANSLATIONS: Record<string, string> = {
    "IFAN系列": "IFAN CORE",
    "IFAN 系列": "IFAN CORE",
    "Ifan系列": "IFAN CORE",
    "德国系列": "GERMAN SERIES",
    "德国 系列": "GERMAN SERIES",
    "意大利系列": "ITALY SERIES",
    "意大利 系列": "ITALY SERIES",
    "英国系列": "UK SERIES",
    "英国 系列": "UK SERIES",
    "土耳其系列": "TURKISH SERIES",
    "土耳其 系列": "TURKISH SERIES",
    "其他": "PARTNERS",
    "Sub-Brands": "PARTNERS"
};

export default function BrandGridView({ brands }: { brands: Brand[] }) {
    // Group brands by series
    const groupedBrands = useMemo(() => {
        const groups: Record<string, Brand[]> = {};
        brands.forEach(brand => {
            const rawSeries = brand.series || 'Sub-Brands';
            const seriesName = SERIES_TRANSLATIONS[rawSeries] || rawSeries.toUpperCase();
            if (!groups[seriesName]) {
                groups[seriesName] = [];
            }
            groups[seriesName].push(brand);
        });

        // Ensure"IFAN CORE"is always first if it exists
        const orderedGroups = Object.entries(groups).sort(([a], [b]) => {
            if (a === "IFAN CORE") return -1;
            if (b === "IFAN CORE") return 1;
            return a.localeCompare(b);
        });

        return orderedGroups;
    }, [brands]);

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-50 pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* Header Title for Grid View */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase">
                        Brand Matrix.
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                        Explore our comprehensive ecosystem of specialized manufacturing brands across global standards.
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
                                {seriesBrands.length} BRANDS
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
                                                    // Ensure the logo uses Next Image for optimization or just a simple img tag for CMS urls
                                                    /* eslint-disable-next-line @next/next/no-img-element */
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
                                                {getBrandCopy(brand.name, brand).valueProposition.content.join(" ")}
                                            </p>
                                        </div>

                                        {/* Interactive Footer */}
                                        <div className="mt-8 flex items-center justify-between w-full pt-6 border-t border-slate-100 relative z-10">
                                            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest group-hover:text-brand-600 transition-colors">
                                                Discover
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
