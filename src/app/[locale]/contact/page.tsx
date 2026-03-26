"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Building2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useTranslations } from "next-intl";

function ContactForm() {
    const t = useTranslations("contact");
    const searchParams = useSearchParams();
    const interestedProduct = searchParams.get("interest");

    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate API call for lead generation
        setTimeout(() => {
            setFormStatus("success");
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{t("companyName")} *</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors" placeholder={t("companyPlaceholder")} />
                </div>
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{t("contactPerson")} *</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors" placeholder="John Doe" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{t("emailLabel")} *</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors" placeholder="john@company.com" />
                </div>
                <div>
                    <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{t("phoneLabel")}</label>
                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{t("inquiryType")}</label>
                <select className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors appearance-none">
                    <option>{t("distributorship")}</option>
                    <option>{t("oemService")}</option>
                    <option>{t("projectSpec")}</option>
                    <option>{t("other")}</option>
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">{t("requirementsLabel")} *</label>
                <textarea
                    required
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors resize-none"
                    defaultValue={interestedProduct ? t("defaultRequirement", { interestedProduct }) : ""}
                    placeholder={t("requirementsPlaceholder")}
                ></textarea>
            </div>

            {formStatus === "success" ? (
                <div className="bg-brand-50/50 border border-brand-100 p-6 flex items-center justify-center flex-col text-center">
                    <CheckCircle2 className="w-12 h-12 text-brand-600 mb-4" />
                    <h4 className="text-xl font-black text-slate-900 mb-1">{t("successTitle")}</h4>
                    <p className="text-slate-600 font-medium">{t("successMessage")}</p>
                </div>
            ) : (
                <button
                    disabled={formStatus === "submitting"}
                    type="submit"
                    className="w-full bg-brand-600 text-white font-black tracking-widest uppercase py-4 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                    {formStatus === "submitting" ? t("submitting") : t("submitBtn")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            )}
        </form>
    );
}

export default function ContactUsPage() {
    const t = useTranslations("contact");

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Immersive Spaceful-style Hero */}
                <section className="relative w-full min-h-[600px] lg:min-h-[85vh] flex flex-col justify-center overflow-hidden bg-slate-900 pt-32 lg:pt-40 pb-48 lg:pb-64">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="https://cdn.sanity.io/images/m2e07kon/production/3ed3a3799cce88a431cd3913c4dabe45041ca50d-1000x750.jpg"
                            alt={t("title")}
                            className="w-full h-full object-cover opacity-75 select-none scale-105"
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10 w-full">
                        <div className="max-w-5xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
                                {t("badge")}
                            </span>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl sm:text-6xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-8 lg:mb-12"
                            >
                                {t("heroTitleLine1")} <br className="hidden md:block" />
                                {t("heroTitleLine2")} <span className="text-brand-500">{t("heroTitleHighlight")}</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-8 lg:mb-16"
                            >
                                {t("heroDesc")}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Overlapping Content Section */}
                <section className="relative z-20 w-full px-4 sm:px-6 pb-24 -mt-24 lg:-mt-48">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Contact Information Cards */}
                            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                                <div className="bg-brand-800 text-white p-8 md:p-10 shadow-2xl shrink-0 border border-brand-700">
                                    <h3 className="text-2xl font-black tracking-tight mb-8">{t("hqTitle")}</h3>

                                    <div className="space-y-6 md:space-y-8">
                                        <div className="flex items-start gap-4">
                                            <Building2 className="w-6 h-6 text-brand-300 shrink-0" />
                                            <div>
                                                <p className="font-bold mb-1">IFAN GROUP CO., LTD</p>
                                                <p className="text-brand-100/80 text-sm leading-relaxed">{t("hqAddress")}</p>
                                            </div>
                                        </div>

                                        <div className="w-full h-px bg-white/20" />

                                        <div className="flex items-start gap-4">
                                            <Phone className="w-6 h-6 text-brand-300 shrink-0" />
                                            <div>
                                                <p className="font-bold mb-1">{t("procurementDesk")}</p>
                                                <p className="text-brand-100/80 text-sm">WhatsApp / WeChat: +86 136 5666 6030</p>
                                            </div>
                                        </div>

                                        <div className="w-full h-px bg-white/20" />

                                        <div className="flex items-start gap-4">
                                            <Mail className="w-6 h-6 text-brand-300 shrink-0" />
                                            <div>
                                                <p className="font-bold mb-1">{t("corporateComm")}</p>
                                                <p className="text-brand-100/80 text-sm">sales@ifangroup.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 md:p-10 bg-white border border-slate-200">
                                    <h3 className="text-lg font-black tracking-tight text-slate-900 mb-6">{t("whyDirectTitle")}</h3>
                                    <ul className="space-y-4">
                                        {[
                                            t("whyDirect1"),
                                            t("whyDirect2"),
                                            t("whyDirect3")
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Interactive Form */}
                            <div className="lg:col-span-7">
                                <div className="bg-white p-8 md:p-12 border border-slate-200 shadow-2xl">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                                        {t("initiateTitle")}
                                    </h2>
                                    <p className="text-slate-500 font-medium mb-10">
                                        {t("initiateDesc")}
                                    </p>

                                    <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">{t("loadingForm")}</div>}>
                                        <ContactForm />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
