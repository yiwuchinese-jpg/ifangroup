"use client";

import { motion } from"framer-motion";
import Link from"next/link";
import { ArrowRight } from"lucide-react";

const collections = [
 {
 title:"Potable Water Networks",
 category:"PPR Piping Systems",
 image:"https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
 link:"/products/ppr-piping"
 },
 {
 title:"Thermal Control",
 category:"PEX & Radiant Heating",
 image:"https://images.unsplash.com/photo-1590483863704-df61b4712776?q=80&w=2000&auto=format&fit=crop",
 link:"/products/pex-systems"
 },
 {
 title:"Precision Flow",
 category:"Forged Brass Valves",
 image:"https://images.unsplash.com/photo-1621535450849-c1ab6fa14828?q=80&w=2000&auto=format&fit=crop",
 link:"/products/brass-valves"
 },
 {
 title:"Subterranean Strength",
 category:"HDPE Infrastructure",
 image:"https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop",
 link:"/products/hdpe-pvc"
 }
];

export default function FeaturedCollections() {
 return (
 <section className="bg-white py-32 lg:py-48">
 <div className="container mx-auto px-6">

 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-32 gap-6 md:gap-8">
 <div className="max-w-4xl">
 <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
 Flagship Series
 </span>
 <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-black text-slate-900 tracking-tighter leading-[0.9]">
 The Collections.
 </h2>
 </div>
 <Link
 href="/products"
 className="group inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-slate-900 hover:text-brand-600 transition-colors"
 >
 Explore Complete Catalog
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
 {col.title}
 </h3>
 <p className="text-slate-500 font-medium tracking-wide">
 {col.category}
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
 Ready to scale your inventory?
 </h3>
 <p className="text-xl text-slate-500 font-light leading-relaxed">
 Skip the middleman. Get direct factory pricing, secure supply chains, and expert engineering support for your next major project.
 </p>
 </div>
 <div className="flex-shrink-0">
 <Link
 href="/contact?intent=quote"
 className="group flex items-center gap-4 text-brand-600 font-bold tracking-[0.2em] uppercase text-sm"
 >
 Get Source Factory Pricing
 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"/>
 </Link>
 </div>
 </div>
 </motion.div>

 </div>
 </section>
 );
}
