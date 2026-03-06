"use client";

import { motion } from"framer-motion";
import { ArrowRight, Download, PlayCircle, FileText, BadgeInfo } from"lucide-react";
import Navbar from"@/components/layout/Navbar";
import Footer from"@/components/layout/Footer";
import Link from"next/link";

export default function ResourcesPage() {
 return (
 <div className="flex min-h-screen flex-col bg-slate-50">
 <Navbar />

 <main className="flex-grow pt-32 pb-24">
 {/* Immersive Spaceful-style Hero */}
 <section className="relative w-full min-h-[500px] lg:min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32 mb-20 lg:mb-32">
 {/* Background Image / Overlay */}
 <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
 <img
 src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop"
 alt="IFAN Engineering Data Repository"
 className="w-full h-full object-cover opacity-40 select-none scale-105"
 draggable={false}
 />
 <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40"/>
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"/>
 </div>

 <div className="container mx-auto px-6 max-w-7xl relative z-10">
 <div className="max-w-5xl">
 <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
 Knowledge Center
 </span>

 <motion.h1
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
 className="text-5xl sm:text-6xl lg:text-[7.5rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12"
 >
 Technical Data & <br className="hidden md:block"/>
 <span className="text-brand-500">Engineering Insights.</span>
 </motion.h1>

 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1, delay: 0.4 }}
 className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed"
 >
 Access our complete repository of digital catalogs, installation manuals, certification documents, and the latest corporate news.
 </motion.p>
 </div>
 </div>
 </section>

 <div className="container mx-auto px-6">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

 {/* Download Center */}
 <div className="lg:col-span-8 flex flex-col gap-8">

 {/* Catalogs */}
 <div className="bg-white p-8 md:p-12 border border-slate-200">
 <div className="flex items-center gap-4 mb-8">
 <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center">
 <BookOpenIcon />
 </div>
 <h2 className="text-2xl font-black text-slate-900 tracking-tight">2024 Catalogs</h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <button className="flex items-center justify-between p-4 border border-slate-100 hover:border-brand-300 hover:bg-brand-50 transition-colors group">
 <div className="flex items-center gap-4 text-slate-700 font-bold">
 <FileText className="text-brand-600 w-5 h-5"/> IFAN Global Master Catalog
 </div>
 <Download className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors"/>
 </button>
 <button className="flex items-center justify-between p-4 border border-slate-100 hover:border-brand-300 hover:bg-brand-50 transition-colors group">
 <div className="flex items-center gap-4 text-slate-700 font-bold">
 <FileText className="text-brand-600 w-5 h-5"/> IFANPLUS PPR Systems
 </div>
 <Download className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors"/>
 </button>
 <button className="flex items-center justify-between p-4 border border-slate-100 hover:border-brand-300 hover:bg-brand-50 transition-colors group">
 <div className="flex items-center gap-4 text-slate-700 font-bold">
 <FileText className="text-brand-600 w-5 h-5"/> IFANPRO Engineering Data
 </div>
 <Download className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors"/>
 </button>
 <button className="flex items-center justify-between p-4 border border-slate-100 hover:border-brand-300 hover:bg-brand-50 transition-colors group">
 <div className="flex items-center gap-4 text-slate-700 font-bold">
 <FileText className="text-brand-600 w-5 h-5"/> Brass Valves & Fittings
 </div>
 <Download className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors"/>
 </button>
 </div>
 </div>

 {/* Certifications */}
 <div className="bg-slate-900 p-8 md:p-12 text-white">
 <div className="flex items-center gap-4 mb-8">
 <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
 <BadgeInfo className="text-brand-400"/>
 </div>
 <h2 className="text-2xl font-black tracking-tight">Compliance & Certifications</h2>
 </div>
 <p className="text-slate-400 font-medium mb-8">
 Our production process rigorously adheres to international standards. Download our active ISO and CE certificates for your engineering records.
 </p>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 <div className="p-4 border border-white/10 text-center bg-white/5 font-black tracking-widest text-sm hover:bg-white/10 cursor-pointer transition-colors">ISO 9001</div>
 <div className="p-4 border border-white/10 text-center bg-white/5 font-black tracking-widest text-sm hover:bg-white/10 cursor-pointer transition-colors">ISO 14001</div>
 <div className="p-4 border border-white/10 text-center bg-white/5 font-black tracking-widest text-sm hover:bg-white/10 cursor-pointer transition-colors">CE Mark</div>
 <div className="p-4 border border-white/10 text-center bg-white/5 font-black tracking-widest text-sm hover:bg-white/10 cursor-pointer transition-colors">WRAS</div>
 </div>
 </div>
 </div>

 {/* Recent News / Videos */}
 <div className="lg:col-span-4 flex flex-col gap-8">
 <div className="bg-white p-8 border border-slate-200">
 <h3 className="font-black text-xl text-slate-900 tracking-tight mb-6">Corporate News</h3>

 <div className="space-y-6">
 <a href="#"className="block group">
 <p className="text-xs font-bold text-brand-600 mb-2">OCT 12, 2024</p>
 <h4 className="font-black text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2">IFAN Group Unveils New High-Efficiency PEX Extrusion Facility in Zhejiang</h4>
 </a>
 <div className="w-full h-px bg-slate-100"/>
 <a href="#"className="block group">
 <p className="text-xs font-bold text-brand-600 mb-2">SEP 05, 2024</p>
 <h4 className="font-black text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2">Our Latest Brass Forging Innovations Exhibited at ISH Frankfurt</h4>
 </a>
 <div className="w-full h-px bg-slate-100"/>
 <a href="#"className="block group">
 <p className="text-xs font-bold text-brand-600 mb-2">AUG 21, 2024</p>
 <h4 className="font-black text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2">Understanding the Evolution of HPB59-1 Brass in European Potable Water Systems</h4>
 </a>
 </div>

 <Link href="#"className="mt-8 flex items-center justify-center w-full py-4 border-2 border-slate-100 font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 transition-colors text-sm uppercase tracking-widest">
 View All Articles
 </Link>
 </div>

 <div className="bg-slate-100 p-6 relative overflow-hidden group cursor-pointer border border-slate-200">
 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"/>
 <div className="relative z-20 flex flex-col h-48 justify-between">
 <PlayCircle className="w-12 h-12 text-brand-600 bg-white"/>
 <div>
 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-600 mb-1 block">Virtual Tour</span>
 <h3 className="font-black text-xl text-slate-900">Inside the Factory</h3>
 </div>
 </div>
 </div>
 </div>

 </div>
 </div>
 </main>

 <Footer />
 </div>
 );
}

function BookOpenIcon() {
 return (
 <svg xmlns="http://www.w3.org/2000/svg"width="24"height="24"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"strokeLinecap="round"strokeLinejoin="round">
 <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
 <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
 </svg>
 );
}
