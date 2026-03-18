"use client";

import { ArrowRight, Factory, Globe, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ManufacturingPage() {
    const t = useTranslations("manufacturing");

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Immersive Spaceful-style Hero */}
                <section className="relative w-full min-h-[500px] lg:min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32 mb-20 lg:mb-32">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="/images/static/mfg-hero.webp"
                            alt="IFAN Manufacturing Excellence"
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
                                className="text-5xl sm:text-6xl lg:text-[8.5rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12 animate-fade-in-up"
                            >
                                {t.rich("hero.title", {
                                    br: () => <br className="hidden md:block" />,
                                    highlight: (chunks) => <span className="text-brand-500">{chunks}</span>
                                })}
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-12"
                            >
                                {t("hero.desc")}
                            </p>

                            <div>
                                <Link
                                    href="/contact?intent=oem"
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

                {/* PAS Model: Problem & Agitation */}
                <section className="bg-slate-50 py-32 lg:py-48 border-t border-slate-200">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                            <div className="lg:col-span-6">
                                <span className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-8 flex items-center gap-3">
                                    <AlertTriangle className="w-4 h-4" /> {t("pas.badge")}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-10 leading-[0.9]">
                                    {t("pas.title")}
                                </h2>
                                <div className="h-[1px] w-12 bg-slate-300 mb-8" />
                                <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-8">
                                    {t("pas.desc1")}
                                </p>
                                <p className="text-lg text-slate-600 font-medium">
                                    {t("pas.desc2")}
                                </p>
                            </div>

                            <div className="lg:col-span-6 relative h-[500px] lg:h-[700px] w-full border border-slate-200 overflow-hidden group">
                                <img
                                    src="/images/static/mfg-chaos.webp"
                                    alt="Logistics and Supply Chain Chaos"
                                    className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
                            </div>

                        </div>
                    </div>
                </section>

                {/* PAS Model: Solution (Capability Matrix) */}
                <section className="bg-white py-32 lg:py-48 border-t border-slate-200">
                    <div className="container mx-auto px-6">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
                            <div>
                                <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                    {t("solution.badge")}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                                    {t.rich("solution.title", {
                                        br: () => <br />
                                    })}
                                </h2>
                            </div>
                            <div className="relative h-[300px] lg:h-[400px] w-full border border-slate-200 overflow-hidden group">
                                <img
                                    src="/images/static/mfg-factory.webp"
                                    alt="Massive automated factory floor"
                                    className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
                            <div className="p-12 border-b border-r border-slate-200 flex flex-col items-start hover:bg-slate-50 transition-colors duration-500">
                                <Factory className="w-8 h-8 text-slate-900 mb-12" />
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("solution.items.item1.value")}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{t("solution.items.item1.desc")}</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 flex flex-col items-start hover:bg-slate-50 transition-colors duration-500">
                                <Zap className="w-8 h-8 text-slate-900 mb-12" />
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("solution.items.item2.value")}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{t("solution.items.item2.desc")}</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 flex flex-col items-start hover:bg-slate-50 transition-colors duration-500">
                                <ShieldCheck className="w-8 h-8 text-slate-900 mb-12" />
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("solution.items.item3.value")}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{t("solution.items.item3.desc")}</p>
                            </div>
                            <div className="p-12 border-b border-r border-slate-200 flex flex-col items-start hover:bg-slate-50 transition-colors duration-500">
                                <Globe className="w-8 h-8 text-slate-900 mb-12" />
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">{t("solution.items.item4.value")}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{t("solution.items.item4.desc")}</p>
                            </div>
                        </div>

                    </div>
                </section >

                {/* Custom Manufacturing CTA */}
                <section className="relative py-32 lg:py-48 border-t border-slate-200 overflow-hidden bg-slate-900 pb-32">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/static/mfg-engineering-2.webp"
                            alt="Engineering blueprints and tools"
                            className="w-full h-full object-cover filter grayscale opacity-20 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
                    </div>

                    <div className="container relative z-10 mx-auto px-6">
                        <div className="max-w-4xl">
                            <span className="text-brand-500 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
                                {t("cta.badge")}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
                                {t("cta.title")}
                            </h2>
                            <div className="h-[1px] w-24 bg-white/20 mb-8" />
                            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-16 max-w-2xl">
                                {t("cta.desc")}
                            </p>
                            <Link
                                href="/contact?intent=custom"
                                className="group inline-flex items-center justify-center bg-brand-600 text-white font-bold tracking-[0.2em] uppercase text-sm px-8 py-5 hover:bg-brand-500 transition-colors w-full sm:w-auto"
                            >
                                {t("cta.button")}
                                <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main >

            <Footer />
        </div >
    );
}
