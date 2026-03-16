"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface BrandShowcaseClientProps {
    flagships: any[];
    subBrands: any[];
    proxySeries: Record<string, any[]>;
    otherBrands: any[];
}

export default function BrandShowcaseClient({
    flagships,
    subBrands,
    proxySeries,
}: BrandShowcaseClientProps) {

    const ifan = flagships.find(b => b.name === "IFAN");
    const ifanPlus = flagships.find(b => b.name === "IFANPlus");

    return (
        <section className="bg-white">

            {/* 1. THE CINEMATIC FLAGSHIPS (Now Architectural & Flat) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-slate-200">

                {/* IFAN: The Infrastructure Power */}
                {ifan && (
                    <div className="group flex flex-col justify-between min-h-[400px] md:min-h-[600px] lg:min-h-[800px] bg-slate-50 p-8 md:p-16 lg:p-32 border-b lg:border-b-0 lg:border-r border-slate-200">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {ifan.logo?.asset?.url ? (
                                <img
                                    src={ifan.logo.asset.url}
                                    alt="IFAN"
                                    className="h-[60px] mb-12 lg:mb-24 object-contain object-left select-none mix-blend-multiply"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            ) : (
                                <h3 className="text-4xl font-black text-slate-900 mb-12 lg:mb-24 tracking-tighter">IFAN</h3>
                            )}

                            <div className="space-y-6">
                                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    Global<br /><span className="text-brand-600">Power.</span>
                                </h2>
                                <p className="text-slate-500 text-lg md:text-xl font-light max-w-sm leading-relaxed">
                                    The backbone of municipal water grids and large-scale public infrastructure.
                                </p>
                            </div>
                        </motion.div>

                        <div className="pt-24 lg:pt-0">
                            <Link href={`/brands/${ifan.slug}`} className="group/btn inline-flex items-center gap-4 text-brand-600 font-bold tracking-[0.2em] uppercase text-sm">
                                Explore Collection
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* IFANPLUS: The Aesthetic Pinnacle */}
                {ifanPlus && (
                    <div className="group flex flex-col justify-between min-h-[400px] md:min-h-[600px] lg:min-h-[800px] bg-white p-8 md:p-16 lg:p-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="flex flex-col h-full"
                        >
                            {ifanPlus.logo?.asset?.url ? (
                                <img
                                    src={ifanPlus.logo.asset.url}
                                    alt="IFANPLUS"
                                    className="h-[60px] mb-12 lg:mb-24 object-contain object-left select-none mix-blend-multiply"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                />
                            ) : (
                                <h3 className="text-4xl font-black text-slate-900 mb-12 lg:mb-24 tracking-tighter">IFANPLUS</h3>
                            )}

                            <div className="space-y-6">
                                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    Pure<br /><span className="text-slate-800">Elegance.</span>
                                </h2>
                                <p className="text-slate-500 text-lg md:text-xl font-light max-w-sm leading-relaxed">
                                    The flagship luxury tier for strict residential aesthetics and performance.
                                </p>
                            </div>
                        </motion.div>

                        <div className="pt-24 lg:pt-0">
                            <Link href={`/brands/${ifanPlus.slug}`} className="group/btn inline-flex items-center gap-4 text-slate-900 hover:text-brand-600 font-bold tracking-[0.2em] uppercase text-sm transition-colors">
                                Discover Masterpieces
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. SUB-BRAND PORTFOLIO (Architectural Grid Style) */}
            <div className="py-32 lg:py-48 bg-white border-b border-slate-200">
                <div className="container mx-auto px-6">
                    <header className="max-w-4xl mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">Diversified Portfolio</span>
                            <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
                                The Ecosystem <br className="hidden md:block" /> of <span className="text-brand-600">Specialization.</span>
                            </h3>
                            <p className="text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
                                A highly calibrated network of brands, each leading a specific regional or technological segment of the global fluid control market.
                            </p>
                        </motion.div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200">
                        {subBrands.map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="group relative bg-white border-r border-b border-slate-200 p-12 flex flex-col h-[320px] hover:bg-slate-50 transition-colors duration-500"
                            >
                                <div className="flex-grow flex flex-col items-start justify-center mb-8">
                                    {b.logo?.asset?.url ? (
                                        <img
                                            src={b.logo.asset.url}
                                            alt={b.name}
                                            className="max-h-[80px] max-w-[200px] object-contain object-left grayscale group-hover:grayscale-0 transition-all duration-500 select-none mix-blend-multiply"
                                            draggable={false}
                                        />
                                    ) : (
                                        <div className="text-3xl font-black text-slate-300 group-hover:text-slate-900 transition-colors uppercase tracking-tighter">{b.name}</div>
                                    )}
                                </div>

                                <div className="mt-auto">
                                    <Link href={`/brands/${b.slug}`} className="flex items-center gap-4 group/link text-slate-400 hover:text-brand-600 transition-colors">
                                        <span className="text-xs font-bold tracking-[0.2em] uppercase">View Specifications</span>
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. PROXY BRANDS (Minimalist Prestige Wall) */}
            <div className="bg-slate-50 py-32 lg:py-48">
                <div className="container mx-auto px-6">
                    <div className="mb-32">
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter max-w-4xl leading-tight">
                            Authorized for Prestigious <span className="text-brand-600">Global Labels.</span>
                        </h3>
                    </div>

                    <div className="space-y-16 lg:space-y-24">
                        {Object.entries(proxySeries).map(([series, brands], index) => (
                            <div key={index} className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start border-t border-slate-200 pt-16">
                                <div className="lg:w-1/4 shrink-0 mt-2">
                                    <h4 className="text-sm font-bold text-slate-900 tracking-[0.3em] uppercase">
                                        {series === "土耳其系列" ? "Turkey Series" : series === "德国系列" ? "Germany Series" : series === "意大利系列" ? "Italy Series" : series === "Ifan系列" ? "IFAN Core" : series}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium mt-4">Strategic OEM Distribution</p>
                                </div>

                                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                                    {brands.map((b, i) => (
                                        <Link key={i} href={`/brands/${b.slug}`} className="group block relative">
                                            <div className="h-16 flex items-start justify-start grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                                {b.logo?.asset?.url ? (
                                                    <img
                                                        src={b.logo.asset.url}
                                                        alt={b.name}
                                                        className="max-h-full max-w-[140px] md:max-w-[180px] object-contain object-left select-none mix-blend-multiply"
                                                        draggable={false}
                                                    />
                                                ) : (
                                                    <span className="text-xl md:text-2xl font-black text-slate-400 uppercase tracking-tighter group-hover:text-brand-600 transition-colors">{b.name}</span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action for Partnership (Flattened) */}
                    <div className="mt-48 pt-24 border-t border-slate-200 flex flex-col md:flex-row items-start justify-between gap-12">
                        <div className="max-w-xl">
                            <h4 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">Scale Your Brand with the IFAN Mega-Factory.</h4>
                            <p className="text-slate-500 text-lg font-light leading-relaxed">Join the prestigious list of global series authorized for precision manufacturing.</p>
                        </div>
                        <Link href="/contact" className="group flex items-center gap-4 text-brand-600 font-bold tracking-[0.2em] uppercase text-sm mt-4 md:mt-0">
                            Global Partnership Inquiry
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    );
}
