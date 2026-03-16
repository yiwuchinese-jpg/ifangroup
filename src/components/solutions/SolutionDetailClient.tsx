"use client";

import React from "react";
import { RegionData } from "@/lib/regionsData";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldAlert, Zap, Factory, ArrowRight, Cog, HardHat, FileCheck2, Globe2 } from "lucide-react";
import Link from "next/link";

export default function SolutionDetailClient({ region }: { region: RegionData }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <div className="w-full bg-black font-sans overflow-hidden text-slate-300">

            {/* 1. HERO SECTION (Dark, Industrial, Impactful) */}
            <section className="relative w-full min-h-[85vh] flex items-end pb-24 md:pb-32 bg-slate-900 overflow-hidden border-b border-white/10">
                {/* Background Texture/Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-20 filter grayscale blend-luminosity pointer-events-none">
                    <img
                        src={region.images?.[0] || `/images/solutions/${region.id}/img-1.webp`}
                        alt={`${region.name} Infrastructure`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 w-full">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <Link href="/global-solutions" className="group flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 hover:bg-brand-600 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-white rotate-180 group-hover:-translate-x-1 transition-transform" />
                                </Link>
                                <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                                    Global Intelligence Hub / {region.id.replace(/-/g, ' ')}
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
                                <span className="block text-brand-500 mb-2 truncate max-w-full">{region.name}</span>
                                Infrastructure.
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl border-l-4 border-brand-500 pl-6 py-2">
                                {region.details.intro}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. THE THREAT (PAS: Problem & Liability) */}
            <section className="py-24 md:py-32 bg-black border-b border-white/10 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left: Text & Threat Analysis */}
                        <div className="flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            >
                                <h2 className="text-brand-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-3">
                                    <ShieldAlert className="w-4 h-4" /> Systemic Vulnerabilities
                                </h2>
                                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-8">
                                    The Environment <br />Dictates <span className="text-red-500">The Risk.</span>
                                </h3>

                                <div className="h-[1px] w-12 bg-white/20 mb-8" />

                                <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium mb-12">
                                    Localized climate extremes and volatile water chemistry are the silent destroyers of generic plumbing systems. In this territory, standard materials guarantee catastrophic failure.
                                </p>
                            </motion.div>

                            <div className="flex flex-col gap-6">
                                {/* Problem */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                    className="bg-slate-900 border border-white/10 p-8 relative overflow-hidden group hover:border-red-500/50 transition-colors"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-red-500 transition-colors" />
                                    <div className="flex items-center gap-4 mb-4">
                                        <h4 className="text-white font-black uppercase tracking-widest text-lg">01 / The Core Threat</h4>
                                    </div>
                                    <p className="text-slate-300 text-base leading-relaxed font-medium">
                                        {region.problem}
                                    </p>
                                </motion.div>

                                {/* Liability / Agitate */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                    className="bg-red-950/20 border border-red-900/40 p-8 relative overflow-hidden group hover:border-red-500/80 transition-colors"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-red-900 group-hover:bg-red-500 transition-colors" />
                                    <div className="flex items-center gap-4 mb-4">
                                        <h4 className="text-red-500 font-black uppercase tracking-widest text-lg">02 / Business Liability</h4>
                                    </div>
                                    <p className="text-red-200/80 text-base leading-relaxed font-medium">
                                        {region.agitate}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right: Intense Environmental Photography */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                            className="relative h-[600px] lg:h-[800px] w-full border border-white/10 overflow-hidden group"
                        >
                            <img
                                src={region.images?.[1] || `/images/solutions/${region.id}/img-2.webp`}
                                alt={`${region.name} environmental challenge`}
                                className="w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                            {/* High-tech overlay matrix */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none mix-blend-overlay" />
                            <div className="absolute bottom-6 left-6 right-6 border border-red-500/30 bg-black/80 backdrop-blur-sm p-6 text-red-500 font-mono text-xs uppercase tracking-widest">
                                <span className="animate-pulse">● Live Threat Feed</span>
                                <div className="mt-2 text-white/70">Monitoring regional failure vectors.</div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 3. THE SOLUTION (FAB: Feature, Advantage, Benefit) */}
            <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
                {/* Huge Typography Background Motif */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[15rem] font-black text-white/5 uppercase tracking-tighter whitespace-nowrap pointer-events-none select-none">
                    IFAN MATRIX
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mb-16 md:mb-24 max-w-3xl"
                    >
                        <h2 className="text-brand-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-3">
                            <Cog className="w-4 h-4" /> Engineered Intervention
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
                            The IFAN Product <br />Integration.
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* 2-Column Photo Block for Solution Imagery */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="lg:col-span-4 relative h-[400px] lg:h-auto border border-white/10 overflow-hidden"
                        >
                            <img
                                src={region.images?.[2] || `/images/solutions/${region.id}/img-3.webp`}
                                alt={`${region.name} engineered solution`}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Overlay Gradient for readability if needed, though raw photo is better for brutalism */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <span className="text-brand-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Execution</span>
                            </div>
                        </motion.div>

                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {/* Feature */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="bg-black border border-white/10 p-8 md:p-10 flex flex-col h-full hover:border-brand-500/50 transition-colors"
                            >
                                <Factory className="w-12 h-12 text-slate-700 mb-8" />
                                <h4 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Precision Manufacturing</h4>
                                <p className="text-white font-black text-2xl uppercase tracking-tighter leading-tight flex-grow">
                                    {region.feature}
                                </p>
                            </motion.div>

                            {/* Advantage */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                                className="bg-black border border-white/10 p-8 md:p-10 flex flex-col h-full hover:border-brand-500/50 transition-colors"
                            >
                                <HardHat className="w-12 h-12 text-slate-700 mb-8" />
                                <h4 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Technical Advantage</h4>
                                <p className="text-slate-300 font-medium text-lg leading-relaxed flex-grow">
                                    {region.advantage}
                                </p>
                            </motion.div>

                            {/* Benefit (Spans full width of this sub-grid) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                                className="md:col-span-2 bg-brand-600 p-8 md:p-10 flex flex-col h-full shadow-[0_0_50px_rgba(22,163,74,0.15)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <Zap className="w-12 h-12 text-brand-950 mb-8 relative z-10" />
                                <h4 className="text-brand-950 font-black uppercase tracking-[0.2em] text-[10px] mb-4 relative z-10">Primary Business Benefit</h4>
                                <p className="text-white font-black text-2xl md:text-3xl uppercase tracking-tighter leading-tight flex-grow relative z-10">
                                    {region.benefit}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SPECS & COMPLIANCE (Auditing & Certification) */}
            <section className="py-24 bg-black border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

                        {/* Hardware Specs */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <FileCheck2 className="w-8 h-8 text-white" />
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Infrastructure Specs</h3>
                            </div>
                            <div className="space-y-4">
                                {region.details.infrastructureSpecs.map((spec, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 border border-white/10 bg-slate-900/50 hover:bg-slate-900 transition-colors">
                                        <div className="w-1.5 h-1.5 bg-brand-500 mt-2 shrink-0" />
                                        <span className="text-slate-300 font-mono text-sm uppercase tracking-tight">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certs */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <Globe2 className="w-8 h-8 text-white" />
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Mandatory Compliance</h3>
                            </div>
                            <p className="text-slate-400 font-medium mb-8">
                                100% factory-tested to pass or exceed these regional auditing standards out-of-the-box. We guarantee completely frictionless customs clearance.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {region.details.certifications.map((cert, i) => (
                                    <div key={i} className="px-6 py-4 bg-white/5 border border-white/10 text-white font-bold tracking-[0.2em] uppercase text-[10px] hover:border-brand-500 hover:text-brand-500 transition-colors cursor-default">
                                        {cert}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. HARDCORE CONVERSION CTA */}
            <section className="py-32 bg-brand-600 relative overflow-hidden flex items-center justify-center">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black text-white tracking-tighter uppercase leading-[0.9] mb-8">
                            Lock In Your <br />Supply Chain.
                        </h2>
                        <p className="text-xl md:text-2xl text-brand-950 font-bold mb-12 max-w-3xl mx-auto">
                            Speak directly with our regional engineering directors. Bypass the middlemen. Request sample shipments and receive a complete matrix quote within 24 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/contact"
                                className="group flex items-center justify-center gap-4 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-sm md:text-base px-10 py-6 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-2xl"
                            >
                                Contact Regional Sales Director
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>

                            <Link
                                href="/global-solutions"
                                className="text-brand-950 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors p-4"
                            >
                                Return to Global Map
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
