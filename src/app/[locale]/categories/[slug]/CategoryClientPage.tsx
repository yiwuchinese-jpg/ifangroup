"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, TrendingUp, Globe, Award } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CategoryCopy } from "@/lib/categoryCopywriting";

export default function CategoryClientPage({
    slug,
    copy
}: {
    slug: string;
    copy: CategoryCopy;
}) {
    const t = useTranslations("categories");
    const showcaseImages = Array.from({ length: 8 }, (_, i) => `/images/categories/${slug}/gallery-${i + 1}.webp`);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 relative selection:bg-brand-200 selection:text-brand-900">
            <Navbar />

            <main className="flex-grow">
                <section className="relative w-full min-h-[85vh] flex items-center justify-start overflow-hidden bg-slate-950 pt-32 lg:pt-40 pb-20">
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <Image
                            src={`/images/categories/${slug}/hero-bg.webp`}
                            alt={`${t(`items.${slug}.heroTitle`, { fallback: copy.heroTitle })} Background`}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover opacity-75 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-t from-slate-950 via-transparent to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
                        <div className="max-w-4xl pt-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-400 border border-brand-500/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                        <ShieldCheck className="w-4 h-4" /> {t("badge")}
                                    </span>
                                    <span className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px]">
                                        {t("series")}
                                    </span>
                                </div>

                                <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black text-white tracking-tighter leading-[0.9] mb-8">
                                    {t(`items.${slug}.heroTitle`, { fallback: copy.heroTitle }).split(" ").map((word, i) => (
                                        <React.Fragment key={i}>
                                            <span className={i === 0 ? "text-brand-400" : ""}>{word}</span>{" "}
                                        </React.Fragment>
                                    ))}
                                </h1>

                                <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-12 border-l-4 border-brand-500 pl-6 lg:pl-8 py-2">
                                    {t(`items.${slug}.heroDescription`, { fallback: copy.heroDescription })}
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Link
                                        href="#showcase"
                                        className="w-full sm:w-auto bg-brand-600 text-white px-10 py-5 font-bold tracking-[0.1em] uppercase text-sm hover:bg-white hover:text-slate-900 transition-colors flex items-center justify-center gap-3 group shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)]"
                                    >
                                        {t("exploreShowcase")}
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                    <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                                        <div className="flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center"><Globe className="w-4 h-4 text-white" /></div>
                                            <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-700 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-white" /></div>
                                        </div>
                                        <span>{t("trustedBy")}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="bg-white py-24 lg:py-32 border-b border-slate-200 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50 rounded-full blur-[120px] opacity-80 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="w-full lg:w-1/2 flex flex-col justify-center"
                            >
                                <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest mb-6 border border-brand-100 bg-brand-50 px-4 py-2 rounded-full w-max text-xs">
                                    <ShieldCheck className="w-4 h-4" /> {t("signatureBadge")}
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.05]">
                                    {t("signatureTitlePrefix")} <br/><span className="text-brand-600">{t(`items.${slug}.heroTitle`, { fallback: copy.heroTitle }).split(" ")[0]}</span> {t("signatureTitleSuffix")}
                                </h2>
                                <p className="text-slate-600 text-xl leading-relaxed mb-10 font-light max-w-lg">
                                    {t("signatureDesc")}
                                </p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-4 text-brand-600 font-bold tracking-[0.1em] uppercase text-sm hover:text-brand-800 transition-colors group w-max"
                                >
                                    {t("viewSpecs")}
                                    <span className="w-12 h-12 rounded-full border border-brand-200 flex items-center justify-center group-hover:border-brand-500 group-hover:bg-brand-50 transition-all">
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0"
                            >
                                <div className="relative w-full max-w-xl flex items-center justify-center p-8 lg:p-12">
                                    <div className="absolute inset-0 bg-brand-50 rounded-full blur-[80px] -z-10 mix-blend-multiply opacity-50"></div>
                                    
                                    <div className="relative z-10 w-full aspect-[4/3]">
                                        <Image
                                            src={`/images/categories/${slug}/signature.webp`}
                                            alt="Signature Component"
                                            fill
                                            sizes="(min-width: 1024px) 40vw, 90vw"
                                            className="object-contain mix-blend-multiply drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    
                                    <div className="absolute bottom-0 right-0 lg:right-10 bg-slate-900 border border-slate-800 px-4 py-2 z-20 shadow-2xl">
                                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">{t("replaceImage")}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="bg-white border-b border-slate-200 py-16">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100">
                            {[
                                { title: "30+ Years", desc: "Manufacturing Excellence", icon: <Award className="w-6 h-6 text-brand-600" /> },
                                { title: "100% Quality", desc: "Rigorous ISO 9001 Testing", icon: <CheckCircle2 className="w-6 h-6 text-brand-600" /> },
                                { title: "50-Year", desc: "Lifespan Guarantee", icon: <ShieldCheck className="w-6 h-6 text-brand-600" /> },
                                { title: "Global Scale", desc: "Exporting to 120+ Countries", icon: <Globe className="w-6 h-6 text-brand-600" /> }
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex flex-col items-center text-center ${i !== 0 ? "pl-8" : ""}`}
                                >
                                    <div className="mb-4 bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                    <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{stat.title}</h4>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 lg:py-40 bg-slate-50 relative">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="lg:col-span-5"
                            >
                                <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-6 block">
                                    {t("engineeringBadge")}
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
                                    {t(`items.${slug}.tagline`, { fallback: copy.tagline })}
                                </h2>
                                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
                                    {t("engineeringDesc")}
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 shadow-sm">
                                        <ShieldCheck className="w-8 h-8 text-brand-500 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-2">{t("materialIntegrityTitle")}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{t("materialIntegrityDesc")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 shadow-sm">
                                        <CheckCircle2 className="w-8 h-8 text-brand-500 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-2">{t("factoryQATitle")}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{t("factoryQADesc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="lg:col-span-7 space-y-8"
                            >
                                <div className="bg-slate-900 text-white p-12 lg:p-16 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <h3 className="text-3xl font-black tracking-tight mb-6">
                                        {t(`items.${slug}.technicalSuperiority.title`, { fallback: copy.technicalSuperiority.title })}
                                    </h3>
                                    <div className="w-16 h-1 bg-brand-500 mb-8"></div>
                                    <p className="text-xl text-slate-300 leading-relaxed font-light">
                                        {t(`items.${slug}.technicalSuperiority.description`, { fallback: copy.technicalSuperiority.description })}
                                    </p>
                                </div>

                                <div className="bg-white p-12 lg:p-16 border border-slate-200 hover:shadow-xl transition-all duration-500">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
                                        {t(`items.${slug}.applications.title`, { fallback: copy.applications.title })}
                                    </h3>
                                    <div className="w-16 h-1 bg-brand-600 mb-8"></div>
                                    <p className="text-xl text-slate-600 leading-relaxed font-light">
                                        {t(`items.${slug}.applications.description`, { fallback: copy.applications.description })}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="showcase" className="py-24 lg:py-32 bg-white border-t border-slate-200">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div className="max-w-3xl">
                                <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                    {t("visualIntelligence")}
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    {t(`items.${slug}.heroTitle`, { fallback: copy.heroTitle }).split(" ")[0]} <br /> {t("showcaseSuffix")}
                                </h2>
                            </div>
                            <div className="max-w-md text-slate-500 font-medium text-lg leading-relaxed">
                                {t("galleryDesc")} 
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="md:col-span-8 md:row-span-2 group relative overflow-hidden bg-slate-100"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image
                                        src={showcaseImages[0]}
                                        alt="Product Showcase Main"
                                        fill
                                        sizes="(min-width: 768px) 66vw, 100vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out will-change-transform"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-8 left-8 right-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white flex items-end justify-between">
                                        <div>
                                            <p className="font-bold tracking-widest text-xs uppercase mb-2 text-brand-400">{t("galleryMainBadge")}</p>
                                            <h4 className="text-2xl font-bold">{t("galleryMainTitle")}</h4>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:bg-brand-600 transition-colors">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="md:col-span-4 group relative overflow-hidden bg-slate-100"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image
                                        src={showcaseImages[1]}
                                        alt="Product Detail 1"
                                        fill
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out will-change-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="md:col-span-4 group relative overflow-hidden bg-slate-100"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image
                                        src={showcaseImages[2]}
                                        alt="Product Detail 2"
                                        fill
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out will-change-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="md:col-span-4 group relative overflow-hidden bg-slate-100 hidden md:block"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image src={showcaseImages[3]} alt="Product Detail 3" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="md:col-span-4 group relative overflow-hidden bg-slate-100 hidden md:block"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image src={showcaseImages[4]} alt="Product Detail 4" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="md:col-span-4 group relative overflow-hidden bg-slate-100 hidden md:block"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image src={showcaseImages[5]} alt="Product Detail 5" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="md:col-span-6 group relative overflow-hidden bg-slate-100 hidden md:block"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image src={showcaseImages[6]} alt="Product Detail 6" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="md:col-span-6 group relative overflow-hidden bg-slate-100 hidden md:block"
                            >
                                <Link href="/products" prefetch className="block w-full h-full cursor-pointer">
                                    <Image src={showcaseImages[7]} alt="Product Detail 7" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <div className="bg-white/10 backdrop-blur-md rounded-full p-3 text-white"><ArrowRight className="w-6 h-6" /></div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600 rounded-full blur-[150px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                        <span className="text-brand-500 font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
                            {t("ctaBadge")}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                            {t("ctaTitle")}
                        </h2>
                        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                            {t("ctaDesc")}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/contact?intent=wholesale"
                                className="w-full sm:w-auto px-10 py-5 bg-brand-600 text-white font-bold uppercase tracking-[0.1em] text-sm hover:bg-brand-500 transition-colors shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] flex items-center justify-center gap-3 group"
                            >
                                {t("ctaButtonPrimary")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="/products"
                                className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-slate-700 text-white font-bold uppercase tracking-[0.1em] text-sm hover:border-brand-500 hover:text-brand-400 transition-colors flex items-center justify-center"
                            >
                                {t("ctaButtonSecondary")}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
