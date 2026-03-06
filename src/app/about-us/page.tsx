"use client";

import { ArrowRight, Trophy, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Immersive Spaceful-style Hero */}
                <section className="relative w-full min-h-[500px] lg:min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32 mb-20 lg:mb-32">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
                            alt="IFAN Global Infrastructure"
                            className="w-full h-full object-cover opacity-40 select-none scale-105"
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="container relative z-10 px-6 mx-auto">
                        <div className="max-w-4xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
                                Our Core Purpose
                            </span>

                            <h1
                                className="text-5xl sm:text-6xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12 animate-fade-in-up"
                            >
                                Engineering <br className="hidden md:block" />
                                The <span className="text-brand-500">Veins</span> of <br className="hidden md:block" />
                                Modern <span className="text-brand-500">Infrastructure.</span>
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-12"
                            >
                                <strong className="text-white font-bold">Why we exist:</strong> We believe that every drop of water and every joule of energy should flow securely. IFAN Group exists to eliminate the catastrophic risks of fluid control failure in global construction.
                            </p>

                            <div>
                                <Link
                                    href="/manufacturing-oem"
                                    className="group flex flex-col items-start gap-2 max-w-max"
                                >
                                    <span className="text-white font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                                        View Manufacturing Floor
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
                                    </span>
                                    <div className="h-[1px] w-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="bg-slate-50 py-32 lg:py-48 border-t border-slate-200">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl">
                            <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                How We Do It
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-24 leading-[0.9]">
                                30 Years of Relentless<br />Optimization.
                            </h2>

                            <div className="space-y-24 border-l border-slate-200 ml-4 lg:ml-8 pl-10 lg:pl-16">
                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">1993</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                Founded in Zhuji City, Zhejiang. Began as a specialized domestic hardware and valve manufacturer.
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop" alt="Early hardware manufacturing" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                                        <div className="lg:order-2">
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">2001</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                Established IFAN Piping Systems. Implemented fully automated European extrusion lines for PPR and PVC.
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden lg:order-1">
                                            <img src="https://images.unsplash.com/photo-1565439390141-8add469dfb4c?q=80&w=2000&auto=format&fit=crop" alt="Automated precision manufacturing lines" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">2015</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                Global expansion phase. Export volume exceeded 100 countries, earning national high-tech enterprise certification.
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop" alt="Global logistics and export" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                                        <div className="lg:order-2">
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">2024</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                Launch of IFAN GROUP holdings. Unifying IFAN, IFANPLUS, and IFANPRO under a massive 400,000 m² smart manufacturing ecosystem.
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden lg:order-1">
                                            <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop" alt="Modern massive infrastructure" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Build Data Callout */}
                <section className="bg-white py-32 lg:py-48 border-t border-slate-200">
                    <div className="container mx-auto px-6">
                        <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block text-center">
                            What We Build
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter text-center mb-24 leading-tight">
                            The Comprehensive Portfolio.
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-slate-200 max-w-6xl mx-auto">
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">10K+</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Distinct SKUs</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">3</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Core Brands</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">120</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Export Countries</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">50yr</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Lifespan Guarantee</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Culture & Standards */}
                <section className="py-32 lg:py-48 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-slate-200 bg-white">
                            <div className="relative p-12 lg:p-20 border-b border-r border-slate-200 overflow-hidden flex flex-col h-full justify-between group">
                                <div className="absolute inset-0 z-0">
                                    <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2000&auto=format&fit=crop" alt="Laboratory Quality Control" className="w-full h-full object-cover filter grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/60 transition-colors duration-700 group-hover:bg-slate-900/70" />
                                </div>
                                <div className="relative z-10">
                                    <Trophy className="w-10 h-10 text-white mb-12" />
                                    <h3 className="text-4xl font-black text-white tracking-tighter mb-6">Zero-Defect Philosophy.</h3>
                                    <p className="text-slate-300 leading-relaxed font-light text-lg mb-16">
                                        Our CNAS-certified national laboratory subjects every production batch to rigorous hydrostatic, thermal, and impact stress tests. We don't just meet ISO/CE standards; we exceed them.
                                    </p>
                                </div>
                                <Link href="/manufacturing-oem" className="relative z-10 group/link inline-flex items-center gap-4 text-brand-500 hover:text-white font-bold tracking-[0.2em] uppercase text-xs transition-colors">
                                    View Manufacturing Floor <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </div>

                            <div className="p-12 lg:p-20 border-b border-r border-slate-200 hover:bg-slate-50 transition-colors duration-500 flex flex-col h-full justify-between group">
                                <div>
                                    <BookOpen className="w-10 h-10 text-slate-900 mb-12" />
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">Global Certifications.</h3>
                                    <p className="text-slate-500 leading-relaxed font-light text-lg mb-16">
                                        Fully compliant with CE, ISO9001, ISO14001, SKZ, and WRAS. Our potable water and gas systems are legally certified for use in over 120 jurisdictions worldwide.
                                    </p>
                                </div>
                                <Link href="/contact" className="group/link inline-flex items-center gap-4 text-slate-400 hover:text-brand-600 font-bold tracking-[0.2em] uppercase text-xs transition-colors">
                                    Request Compliance Files <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
