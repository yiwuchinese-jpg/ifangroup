"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, CheckCircle2 } from "lucide-react";
import ProductListClient from "@/app/products/ProductListClient";
import Packaging3DViewer from "@/components/brands/Packaging3DViewer";
import Hero3DLogo from "@/components/brands/Hero3DLogo";

export default function BrandClientPage({ brand, products }: { brand: any, products: any[] }) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Fullscreen Immersive Brand Hero */}
            <section className="relative w-full min-h-[500px] lg:min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32">

                {/* Background Image / Overlay */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <img
                        src={brand.heroImage?.asset?.url || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"}
                        alt={`${brand.name} Background`}
                        className="w-full h-full object-cover opacity-40 select-none scale-105"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 px-6 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full min-h-[60vh] py-20 pointer-events-none">

                        {/* Text / Identity Column */}
                        <div className="max-w-2xl w-full lg:w-1/2 flex flex-col justify-center relative z-20">
                            {/* Force Text Logo */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="pointer-events-auto mb-8 md:mb-12"
                            >
                                <h1 className="text-5xl sm:text-6xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] uppercase">{brand.name}</h1>
                            </motion.div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-widest mb-8 max-w-max pointer-events-auto">
                                {brand.series === "土耳其系列" ? "Turkey Series" : brand.series === "德国系列" ? "Germany Series" : brand.series === "Ifan系列" ? "IFAN Core Series" : "Official Component Matrix"}
                            </div>

                            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-12 font-light pointer-events-auto">
                                {(!brand.description || /[\u4e00-\u9fa5]/.test(brand.description))
                                    ? "Advanced fluid control systems engineered for absolute precision and global structural requirements."
                                    : brand.description}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                                className="flex flex-col items-start gap-8 pointer-events-auto mt-4"
                            >
                                <a
                                    href="#brand-products"
                                    className="group flex flex-col items-start gap-2 max-w-max"
                                >
                                    <span className="text-white font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                                        Explore Matrix
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
                                    </span>
                                    <div className="h-[1px] w-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
                                </a>

                                {brand.externalUrl && (
                                    <a
                                        href={brand.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-start gap-2 max-w-max"
                                    >
                                        <span className="text-slate-400 hover:text-white transition-colors font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-3">
                                            <Globe size={14} /> Official Site
                                        </span>
                                        <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/50 transition-colors duration-300" />
                                    </a>
                                )}
                            </motion.div>
                        </div>

                        {/* Interactive 3D Packaging Column */}
                        {(brand.packaging3dModel?.asset?.url || brand.slug === 'ifanpro' || brand.name?.toLowerCase() === 'ifanpro') && (
                            <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative pointer-events-auto flex flex-col items-center justify-center -mt-10 lg:mt-0 xl:scale-110">
                                <Packaging3DViewer
                                    url={brand.packaging3dModel?.asset?.url || "/models/gw4-draco.glb"}
                                    transparent
                                    heroMode
                                />
                                {/* Cinematic Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/10 blur-[150px] pointer-events-none -z-10 mix-blend-overlay"></div>

                                {/* 3D Model Descriptive Label */}
                                <div className="absolute bottom-4 lg:bottom-12 flex flex-col items-center pointer-events-none">
                                    <div className="text-white/90 font-bold tracking-[0.4em] uppercase text-xs mb-1.5 backdrop-blur-md bg-black/40 px-5 py-2 border border-white/20 shadow-xl">
                                        3D Interactive Model
                                    </div>
                                    <div className="text-white/50 text-[10px] tracking-[0.3em] uppercase drop-shadow-md">
                                        Signature Packaging Showcase
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            {brand.advantages && brand.advantages.length > 0 && (
                <section className="py-32 bg-slate-50 border-b border-slate-200">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="mb-24">
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                Technical Specifications
                            </span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
                            >
                                System Advantages.
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 mt-6 text-xl font-light max-w-2xl"
                            >
                                Core engineering benefits of choosing {brand.name}.
                            </motion.p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
                            {brand.advantages.map((adv: string, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex flex-col items-start gap-8 p-12 border-b border-r border-slate-200 hover:bg-slate-50 transition-colors duration-500 group"
                                >
                                    <div className="text-slate-200 group-hover:text-brand-600 transition-colors duration-500">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <p className="font-black text-slate-900 tracking-tight text-2xl leading-tight">{adv}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Brand Story Placeholder */}
            <section className="py-32 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                Heritage & Vision
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1] mb-8">
                                The Origin of {brand.name}.
                            </h2>
                            <p className="text-lg text-slate-500 leading-relaxed mb-6">
                                [Placeholder for Brand Story] Since its inception, {brand.name} has been engineered to meet the massive demands of modern infrastructure. This section will detail the origin, philosophy, and precise engineering standards that define the brand.
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                You can populate this data from a new CMS field (e.g., brand.story) to tell the unique journey of {brand.name} across global markets.
                            </p>
                        </div>
                        <div className="aspect-[4/3] bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-sm overflow-hidden relative group">
                            <div className="absolute inset-0 bg-brand-600/5 group-hover:bg-brand-600/10 transition-colors duration-500"></div>
                            Image or Video Region
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand VI Showcase Placeholder */}
            <section className="py-32 bg-slate-900 border-b border-slate-800 text-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                            Visual Identity
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                            Brand Signatures.
                        </h2>
                        <p className="text-slate-400 text-lg">
                            [Placeholder for VI Showcase] Explore the official color palettes, logos, typography, and standard application guidelines for {brand.name} distributors and partners.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="aspect-[3/4] bg-slate-800 border border-slate-700 mt-8 flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-xs relative overflow-hidden group">
                                <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">VI Asset {item}</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Reused Product Matrix Client */}
            <section id="brand-products" className="py-32 lg:py-48 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-24 lg:flex items-end justify-between">
                        <div className="max-w-2xl">
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                Global Supply
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-4">
                                Product Universe.
                            </h2>
                            <p className="text-xl text-slate-500 font-light mt-8">
                                Filtered strictly to {brand.name} commercial items. Discover the complete range of specifications.
                            </p>
                        </div>
                    </div>

                    {products && products.length > 0 ? (
                        <div className="w-full">
                            <ProductListClient initialProducts={products} />
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-slate-50">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Matrix Generating</h3>
                            <p className="text-slate-500 font-medium">Products for this brand are currently being documented for the global matrix.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
