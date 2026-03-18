"use client";

import { ArrowRight, Trophy, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("about");

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Immersive Spaceful-style Hero */}
                <section className="relative w-full min-h-[500px] lg:min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32 mb-20 lg:mb-32">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="/images/static/about-hero.webp"
                            alt="IFAN Global Infrastructure"
                            className="w-full h-full object-cover opacity-75 select-none scale-105"
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="container relative z-10 px-6 mx-auto">
                        <div className="max-w-4xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
                                {t("hero.badge")}
                            </span>

                            <h1
                                className="text-5xl sm:text-6xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12 animate-fade-in-up"
                            >
                                {t.rich("hero.title", {
                                    br: () => <br className="hidden md:block" />,
                                    highlight: (chunks) => <span className="text-brand-500">{chunks}</span>
                                })}
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-12"
                            >
                                <strong className="text-white font-bold">{t("hero.descBold")}</strong> {t("hero.desc")}
                            </p>

                            <div>
                                <Link
                                    href="/manufacturing-oem"
                                    className="group flex flex-col items-start gap-2 max-w-max"
                                >
                                    <span className="text-white font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                                        {t("hero.cta")}
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
                                {t("timeline.badge")}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-24 leading-[0.9]">
                                {t.rich("timeline.title", {
                                    br: () => <br />
                                })}
                            </h2>

                            <div className="space-y-24 border-l border-slate-200 ml-4 lg:ml-8 pl-10 lg:pl-16">
                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("timeline.items.item1.year")}</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                {t("timeline.items.item1.desc")}
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden">
                                            <img src="/images/static/about-timeline-1.webp" alt="Early hardware manufacturing" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                                        <div className="lg:order-2">
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("timeline.items.item2.year")}</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                {t("timeline.items.item2.desc")}
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden lg:order-1">
                                            <img src="/images/static/about-timeline-2.webp" alt="Automated precision manufacturing lines" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("timeline.items.item3.year")}</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                {t("timeline.items.item3.desc")}
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden">
                                            <img src="/images/static/about-timeline-3.webp" alt="Global logistics and export" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute w-4 h-4 bg-white border border-slate-200 -left-[48.5px] lg:-left-[72.5px] top-2 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors duration-500" />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                                        <div className="lg:order-2">
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("timeline.items.item4.year")}</h3>
                                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                                                {t("timeline.items.item4.desc")}
                                            </p>
                                        </div>
                                        <div className="relative h-64 border border-slate-200 overflow-hidden lg:order-1">
                                            <img src="/images/static/about-timeline-4.webp" alt="Modern massive infrastructure" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
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
                            {t("stats.badge")}
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter text-center mb-24 leading-tight">
                            {t("stats.title")}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-slate-200 max-w-6xl mx-auto">
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">{t("stats.items.item1.value")}</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{t("stats.items.item1.label")}</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">{t("stats.items.item2.value")}</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{t("stats.items.item2.label")}</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">{t("stats.items.item3.value")}</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{t("stats.items.item3.label")}</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 text-center flex flex-col items-center justify-center hover:bg-slate-50 transition-colors duration-500">
                                <h4 className="text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter mb-4">{t("stats.items.item4.value")}</h4>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{t("stats.items.item4.label")}</p>
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
                                    <img src="/images/static/about-quality.webp" alt="Laboratory Quality Control" className="w-full h-full object-cover filter grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/60 transition-colors duration-700 group-hover:bg-slate-900/70" />
                                </div>
                                <div className="relative z-10">
                                    <Trophy className="w-10 h-10 text-white mb-12" />
                                    <h3 className="text-4xl font-black text-white tracking-tighter mb-6">{t("philosophy.title")}</h3>
                                    <p className="text-slate-300 leading-relaxed font-light text-lg mb-16">
                                        {t("philosophy.desc")}
                                    </p>
                                </div>
                                <Link href="/manufacturing-oem" className="relative z-10 group/link inline-flex items-center gap-4 text-brand-500 hover:text-white font-bold tracking-[0.2em] uppercase text-xs transition-colors">
                                    {t("philosophy.cta")} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </div>

                            <div className="p-12 lg:p-20 border-b border-r border-slate-200 hover:bg-slate-50 transition-colors duration-500 flex flex-col h-full justify-between group">
                                <div>
                                    <BookOpen className="w-10 h-10 text-slate-900 mb-12" />
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">{t("certifications.title")}</h3>
                                    <p className="text-slate-500 leading-relaxed font-light text-lg mb-16">
                                        {t("certifications.desc")}
                                    </p>
                                </div>
                                <Link href="/contact" className="group/link inline-flex items-center gap-4 text-slate-400 hover:text-brand-600 font-bold tracking-[0.2em] uppercase text-xs transition-colors">
                                    {t("certifications.cta")} <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
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
