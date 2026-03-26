"use client";

import { motion } from"framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const collections = [
 {
 id:"ppr-piping",
 title:"PPR Potable Water Network",
 description:"Hyosung R200P material. Impeccable hygiene and seamless fusion for drinking water grids.",
 image:"https://cdn.sanity.io/images/m2e07kon/production/652824310cdbe7f4c48eb5a887974abb33dc32fe-1000x667.jpg",
 link:"/categories/ppr"
 },
 {
 id:"pex-systems",
 title:"PEX Radiant Heating",
 description:"Cross-linked flexibility with EVOH oxygen barrier for maximal thermal energy transfer.",
 image:"https://cdn.sanity.io/images/m2e07kon/production/1782650a46f74ecc170495cfff71cd400e7ddbf4-1000x667.jpg",
 link:"/categories/pex-ppsu"
 },
 {
 id:"brass-valves",
 title:"Precision Flow",
 description:"Forged Brass Valves for reliable control in diverse plumbing and industrial applications.",
 image:"https://cdn.sanity.io/images/m2e07kon/production/ebfccb028632f2fe0b4a1e3b1985ff5dfd3f93f0-1000x667.jpg",
 link:"/categories/hvac-valves"
 },
 {
 id:"hdpe-infrastructure",
 title:"HDPE Infrastructure",
 description:"High-density strength for large-scale municipal water grids and chemical transport.",
 image:"https://cdn.sanity.io/images/m2e07kon/production/3ca80723d6de9d17bd64d31d306f245cae5824fc-1000x667.jpg",
 link:"/categories/hdpe"
 }
];

export default function FeaturedCollections() {
 const t = useTranslations("featuredCollections");
 return (
 <section className="bg-white py-32 lg:py-48">
 <div className="container mx-auto px-6">

 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-32 gap-6 md:gap-8">
 <div className="max-w-4xl">
 <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
 {t("badge", { defaultMessage: "Flagship Series" })}
 </span>
 <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-black text-slate-900 tracking-tighter leading-[0.9]">
 {t("title", { defaultMessage: "The Collections." })}
 </h2>
 </div>
 <Link
 href="/products"
 className="group inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-slate-900 hover:text-brand-600 transition-colors"
 >
 {t("explore", { defaultMessage: "Explore Complete Catalog" })}
 <span className="w-10 h-10 border border-slate-200 flex items-center justify-center group-hover:border-brand-600 transition-colors">
 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
 </span>
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {collections.map((col, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: i * 0.1 }}
 >
 <Link href={col.link} className="block group">
 <div className="w-full h-[300px] md:h-[600px] overflow-hidden bg-slate-100 relative mb-6">
 <img
 src={col.image}
 alt={col.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"/>
 </div>
 <div className="flex justify-between items-start">
 <div>
 <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
 {t(`items.${col.id}.title`, { defaultMessage: col.title })}
 </h3>
 <p className="text-slate-500 font-medium tracking-wide line-clamp-2">
 {t(`items.${col.id}.desc`, { defaultMessage: col.description })}
 </p>
 </div>
 <div className="w-10 h-10 bg-slate-50 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 text-slate-400">
 <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300"/>
 </div>
 </div>
 </Link>
 </motion.div>
 ))}
 </div>

 {/* AIDA Action CTA (Flattened) */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mt-32 p-12 md:p-24 bg-slate-50 border border-slate-200"
 >
 <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
 <div className="max-w-2xl text-center lg:text-left">
 <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
 {t("ctaTitle", { defaultMessage: "Ready to scale your inventory?" })}
 </h3>
 <p className="text-xl text-slate-500 font-light leading-relaxed">
 {t("ctaDesc", { defaultMessage: "Skip the middleman. Get direct factory pricing, secure supply chains, and expert engineering support for your next major project." })}
 </p>
 </div>
 <div className="flex-shrink-0">
 <Link
 href="/contact?intent=quote"
 className="group flex items-center gap-4 text-brand-600 font-bold tracking-[0.2em] uppercase text-sm"
 >
 {t("ctaButton", { defaultMessage: "Get Source Factory Pricing" })}
 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"/>
 </Link>
 </div>
 </div>
 </motion.div>

 </div>
 </section>
 );
}
