"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe, CheckCircle2, ArrowUpRight, Users, PlayCircle } from "lucide-react";
import ProductListClient from "@/app/products/ProductListClient";
import SecureGallery from "@/components/brands/SecureGallery";
import { getBrandCopy } from "@/lib/brandCopywriting";
import { Sparkles, ShieldCheck, Target, Globe2 } from "lucide-react";

export default function BrandClientPage({ brand, products, relatedBrands = [] }: { brand: any, products: any[], relatedBrands?: any[] }) {
    const [displayBrands, setDisplayBrands] = useState<any[]>(relatedBrands.slice(0, 3));
    const copy = getBrandCopy(brand.name, brand);

    useEffect(() => {
        if (relatedBrands && relatedBrands.length > 3) {
            const shuffled = [...relatedBrands].sort(() => 0.5 - Math.random());
            setDisplayBrands(shuffled.slice(0, 3));
        } else {
            setDisplayBrands(relatedBrands);
        }
    }, [relatedBrands]);

    // 代理商占位数据
    // Standardized local paths: /images/brands/[slug]/gallery-[1-5].webp
    const galleryItems = Array.from({ length: 5 }, (_, i) => `/images/brands/${brand.slug}/gallery-${i + 1}.webp`);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Fullscreen Immersive Brand Hero */}
            <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 pt-32 lg:pt-0 border-b border-slate-800">
                {/* Architectural Grid Background (Dark) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

                {/* Background Image / Overlay */}
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
                    
                    {/* Glowing Accent Orbs (Dark Mode) */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                </div>

                <div className="container relative z-10 px-6 mx-auto flex flex-col items-center justify-center text-center mt-12 lg:mt-20">
                    {/* Series Badge */}
                    {brand.series && brand.series !== "Default" && brand.series !== "其他" && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-none text-xs font-bold uppercase tracking-[0.3em] mb-10"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                            {brand.series === "土耳其系列" ? "Turkey Series" :
                                brand.series === "德国系列" ? "Germany Series" :
                                    brand.series === "意大利系列" ? "Italy Series" :
                                        brand.series === "Ifan系列" ? "IFAN Core Series" :
                                            brand.series === "欧洲系列" ? "Euro Series" :
                                                brand.series}
                        </motion.div>
                    )}

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] uppercase mb-6 drop-shadow-2xl"
                    >
                        {brand.name}
                    </motion.h1>
                    
                    {/* Tagline From Copywriting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="mb-10 text-brand-400 font-bold tracking-[0.2em] uppercase text-sm md:text-lg"
                    >
                        {copy.tagline}
                    </motion.div>

                    {/* Description */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed font-light mb-14 whitespace-pre-line">
                            {copy.heroDescription}
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
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
                                Explore Matrix
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
                                    <Globe size={16} /> Official Site
                                </span>
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Bottom decorative line & scroll indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center pb-10 z-20 pointer-events-none"
                >
                    <div className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Scroll to Discover</div>
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
                                    Value Proposition
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
                                {copy.valueProposition.title}
                            </h2>
                            <div className="space-y-6">
                                {copy.valueProposition.content.map((paragraph, idx) => (
                                    <p key={idx} className="text-lg md:text-xl text-slate-500 leading-relaxed font-light">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white p-10 border border-slate-200 hover:border-brand-300 hover:shadow-2xl transition-all duration-500 group">
                                <ShieldCheck className="w-12 h-12 text-brand-500 mb-8 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Quality Assured</h3>
                                <p className="text-slate-500 leading-relaxed">Manufactured under strict ISO protocols, ensuring every component performs flawlessly under extreme conditions.</p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-slate-900 p-10 border border-slate-800 hover:border-brand-500 hover:shadow-2xl transition-all duration-500 group sm:translate-y-12">
                                <Sparkles className="w-12 h-12 text-brand-400 mb-8 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{copy.designPhilosophy.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{copy.designPhilosophy.description}</p>
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
                                {copy.marketStrategy.title}
                            </h2>
                            <p className="text-xl text-slate-300 leading-relaxed font-light">
                                {copy.marketStrategy.description}
                            </p>
                        </div>
                        <div className="md:w-1/2 relative min-h-[400px]">
                            <div className="absolute inset-0 bg-brand-600 mix-blend-multiply opacity-20 z-10" />
                            {brand.heroImage?.asset?.url ? (
                                <img src={brand.heroImage.asset.url} alt="Strategy" className="w-full h-full object-cover grayscale" />
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
                                    Brand Ecosystem
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                                    Explore More Brands.
                                </h2>
                            </div>
                            <Link href="/brands" className="inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase text-slate-500 hover:text-brand-600 transition-colors group">
                                View Full Portfolio
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
                                        {/* Background hover effect */}
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

                                        {/* Interaction Indicator */}
                                        <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-brand-600 group-hover:border-brand-600 group-hover:text-white text-slate-400 transition-all duration-300 -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <ArrowRight className="w-4 h-4 -rotate-45" />
                                        </div>
                                    </div>
                                    <div className="p-8 border-t border-slate-100">
                                        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                                            {relatedBrand.series || 'Partner Brand'}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-brand-600 transition-colors">
                                            {relatedBrand.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 whitespace-pre-line">
                                            {getBrandCopy(relatedBrand.name, relatedBrand).valueProposition.content.join(" ")}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Reused Product Matrix Client */}
            <section id="brand-products" className="py-32 lg:py-48 bg-white border-b border-slate-100">
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

            {/* Secure Brand Materials Gallery */}
            {brand.marketingMaterials?.length > 0 && (
                <section className="py-32 bg-[#f8fafc] border-t border-slate-200 shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-60"></div>
                    
                    <div className="w-full relative z-10">
                        <SecureGallery
                            packagingMaterials={[]} // Only show marketing materials as requested
                            marketingMaterials={brand.marketingMaterials}
                            brandName={brand.name}
                            logoUrl={brand.logo?.asset?.url}
                        />
                    </div>
                </section>
            )}

            {/* Agent Partnership Gallery (Infinite Scroll/Marquee) */}
            <section className="py-32 bg-white border-t border-slate-200 overflow-hidden relative">
                <div className="container mx-auto px-6 max-w-7xl mb-16 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-xl">
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4 text-brand-500" /> Global Partnership
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
                                Agent Network.
                            </h2>
                        </div>
                        <p className="text-lg text-slate-500 max-w-sm leading-relaxed font-light">
                            Glimpses into our global showrooms, factory inspections, and trusted partnerships driving the {brand.name} ecosystem forward.
                        </p>
                    </div>
                </div>

                {/* Auto-scrolling Gallery */}
                <div className="w-full overflow-hidden relative h-[300px] md:h-[450px]">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    
                    <motion.div 
                        className="flex gap-4 md:gap-8 absolute left-0"
                        animate={{ x: [0, -2000] }}
                        transition={{ 
                            repeat: Infinity, 
                            ease: "linear", 
                            duration: 30 
                        }}
                    >
                        {/* Double the items for seamless looping */}
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

            {/* High Impact Call To Action / News Teaser */}
            <section className="relative py-32 lg:py-48 bg-slate-900 overflow-hidden">
                {/* Dynamic Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none w-full h-full" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

                {/* Main Content */}
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8 mt-12">
                            <ArrowUpRight className="w-8 h-8 text-brand-400" />
                        </div>
                        
                        <h2 className="text-5xl sm:text-7xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.85] uppercase mb-8 drop-shadow-2xl">
                            Join The <br className="hidden md:block"/> <span className="text-brand-500">Framework.</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
                            Elevate your distribution network with {brand.name}'s extreme manufacturing scale. Contact us today to discuss exclusive territorial agency opportunities.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                            <Link 
                                href="/contact"
                                className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-brand-500 text-white font-bold tracking-[0.2em] uppercase text-sm hover:bg-brand-600 transition-colors overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    Become a Partner
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Link>

                            <Link 
                                href="/news"
                                className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-slate-700 text-slate-300 font-bold tracking-[0.2em] uppercase text-sm hover:border-slate-500 hover:text-white transition-colors"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <PlayCircle className="w-5 h-5" /> Recent Stories
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
