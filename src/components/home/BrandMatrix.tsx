"use client";

import { motion } from"framer-motion";
import Link from"next/link";
import { Check, Factory, Diamond, ArrowRight } from"lucide-react";
import { useTranslations } from "next-intl";

export default function BrandMatrix() {
    const t = useTranslations("home.brandMatrix");

    return (
        <section className="py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* IFAN Standard - White/Green */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col bg-slate-50 border border-slate-200 overflow-hidden"
                    >
                        <div className="h-64 relative bg-slate-200">
                            {/* Placeholder for massive warehouse/volume shipments */}
                            <img
                                src="https://cdn.sanity.io/images/m2e07kon/production/3ea62cc8ce082c37e90af35fdf66a20e6449955e-1000x562.jpg"
                                alt={t("ifanStandardBadge")}
                                className="w-full h-full object-cover grayscale opacity-90 select-none"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            <div className="absolute inset-0 bg-brand-900/30 mix-blend-multiply" />
                            <div className="absolute top-6 left-6 bg-white px-4 py-2 shadow-sm">
                                <Factory className="w-6 h-6 text-brand-600" />
                            </div>
                        </div>

                        <div className="p-10 flex flex-col flex-grow">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{t("ifanStandardTitle")}</h3>
                            <p className="text-brand-600 font-bold mb-6">{t("ifanStandardBadge")}</p>

                            <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                                {t("ifanStandardDesc")}
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {[
                                    t("ifanStandardFeature1"),
                                    t("ifanStandardFeature2"),
                                    t("ifanStandardFeature3"),
                                    t("ifanStandardFeature4")
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <Check className="w-5 h-5 text-brand-600 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/brands/ifan"
                                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                {t("ifanStandardBtn")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* IFANPLUS - Black/Gold Premium Contrast */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col bg-slate-950 border border-slate-900 overflow-hidden"
                    >
                        <div className="h-64 relative bg-slate-900">
                            {/* Placeholder for high-end luxury bathroom/architecture */}
                            <img
                                src="https://cdn.sanity.io/images/m2e07kon/production/b01d5cb669a0ffb77db69f33a8e4f5774415c5c7-1000x750.jpg"
                                alt={t("ifanPlusBadge")}
                                className="w-full h-full object-cover border-b border-white/10 select-none"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10">
                                <Diamond className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>

                        <div className="p-10 flex flex-col flex-grow">
                            <h3 className="text-3xl font-black text-white tracking-tight mb-2">{t("ifanPlusTitle")}</h3>
                            <p className="text-yellow-500 font-bold mb-6">{t("ifanPlusBadge")}</p>

                            <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                                {t("ifanPlusDesc")}
                            </p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {[
                                    t("ifanPlusFeature1"),
                                    t("ifanPlusFeature2"),
                                    t("ifanPlusFeature3"),
                                    t("ifanPlusFeature4")
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                        <Check className="w-5 h-5 text-yellow-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/brands/ifanplus"
                                className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                {t("ifanPlusBtn")}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
