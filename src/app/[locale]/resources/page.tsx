"use client";

import { motion } from"framer-motion";
import { ArrowRight, Download, FileText, BadgeInfo, MessageCircle } from"lucide-react";
import Navbar from"@/components/layout/Navbar";
import Footer from"@/components/layout/Footer";
import Link from"next/link";

const whatsappNumber = "8613656666030";
const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;

const catalogGroups = [
 { title: "IFAN Global Master Catalog", category: "Corporate master file", format: "PDF set" },
 { title: "PPR Pipe Systems", category: "Piping systems", format: "PDF catalog" },
 { title: "PEX & Underfloor Heating", category: "HVAC solutions", format: "PDF catalog" },
 { title: "PE & HDPE Pipeline", category: "Infrastructure", format: "PDF catalog" },
 { title: "Brass Valves & Fittings", category: "Valve range", format: "PDF catalog" },
 { title: "Bathroom & Sanitary Hardware", category: "Sanitary line", format: "PDF catalog" },
 { title: "Flexible Hoses & Connections", category: "Accessories", format: "PDF catalog" },
 { title: "OEM / Private Label Programs", category: "OEM program", format: "Presentation" }
];

const certifications = ["ISO 9001", "ISO 14001", "CE Mark", "WRAS"];

const newsItems = [
 "IFAN Group Unveils New High-Efficiency PEX Extrusion Facility in Zhejiang",
 "Our Latest Brass Forging Innovations Exhibited at ISH Frankfurt",
 "Understanding the Evolution of HPB59-1 Brass in European Potable Water Systems"
];

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
 src="/images/static/resources-hero.webp"
 alt="IFAN Engineering Data Repository"
 className="w-full h-full object-cover opacity-75 select-none scale-105"
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

 <div className="container mx-auto px-6 max-w-7xl">
  <section className="mb-10 border border-slate-200 bg-white">
   <div className="grid gap-0 border-b border-slate-200 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="border-b border-slate-200 p-8 md:p-10 lg:border-b-0 lg:border-r">
     <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center bg-slate-900 text-white">
       <BookOpenIcon />
      </div>
      <div>
       <p className="text-[11px] font-black uppercase tracking-[0.28em] text-brand-700">Catalog Directory</p>
       <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Resource downloads.</h2>
      </div>
     </div>

     <div className="mt-8 border border-slate-200 bg-slate-50">
      <img
       src="/images/static/nav-resources-bg.webp"
       alt="IFAN resource center"
       className="h-56 w-full object-cover"
       draggable={false}
      />
     </div>
    </div>

    <div className="grid grid-cols-2 border-brand-600 bg-slate-900 text-white sm:grid-cols-4 lg:grid-cols-2">
     <div className="border-b border-r border-white/10 p-6 sm:border-b-0 lg:border-b lg:border-r">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-300">Catalogs</p>
      <p className="mt-3 text-3xl font-black tracking-tight">{catalogGroups.length}</p>
     </div>
     <div className="border-b border-white/10 p-6 sm:border-b-0 lg:border-b">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-300">Certificates</p>
      <p className="mt-3 text-3xl font-black tracking-tight">{certifications.length}</p>
     </div>
     <div className="border-r border-white/10 p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-300">Support</p>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-white">WhatsApp Direct</p>
     </div>
     <div className="p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-300">Updates</p>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-white">Latest Files</p>
     </div>
    </div>
   </div>

   <div className="grid gap-0 lg:grid-cols-[1.65fr_0.9fr]">
    <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
     <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 md:px-8">
      <div>
       <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Catalogs</p>
      </div>
      <a
       href={`${whatsappBaseUrl}?text=${encodeURIComponent("Hello IFAN, please send me the full product catalog package.")}`}
       target="_blank"
       rel="noreferrer"
       className="inline-flex items-center gap-2 border border-brand-600 bg-brand-600 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-brand-700"
      >
       Full Set
       <ArrowRight className="h-4 w-4" />
      </a>
     </div>

     <div>
      {catalogGroups.map((catalog, index) => {
       const message = `Hello IFAN, please send me the ${catalog.title} catalog.`;

       return (
        <a
         key={catalog.title}
         href={`${whatsappBaseUrl}?text=${encodeURIComponent(message)}`}
         target="_blank"
         rel="noreferrer"
         className={`group grid items-center gap-4 px-6 py-5 transition hover:bg-slate-50 md:grid-cols-[minmax(0,1fr)_130px_150px] md:px-8 ${index < catalogGroups.length - 1 ? "border-b border-slate-200" : ""}`}
        >
         <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-700">{catalog.category}</p>
          <h3 className="mt-2 text-xl font-black tracking-tight text-slate-900">{catalog.title}</h3>
         </div>
         <div className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{catalog.format}</div>
         <div className="flex justify-start md:justify-end">
          <span className="inline-flex items-center gap-2 border border-slate-300 px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-900 transition group-hover:border-brand-600 group-hover:text-brand-700">
           <Download className="h-4 w-4" />
           Download
          </span>
         </div>
        </a>
       );
      })}
     </div>
    </div>

    <div className="bg-white">
     <div className="border-b border-slate-200 bg-slate-100">
      <img
       src="/images/static/products-factory.webp"
       alt="IFAN factory support"
       className="h-56 w-full object-cover"
       draggable={false}
      />
     </div>

     <div className="border-b border-slate-200 px-6 py-5 md:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Corporate News</p>
      <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Recent updates.</h3>
     </div>

     <div className="border-b border-slate-200 px-6 py-4 md:px-8">
      {newsItems.map((item, index) => (
       <a key={item} href="#" className={`group block py-5 ${index < newsItems.length - 1 ? "border-b border-slate-200" : ""}`}>
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">News</p>
        <h4 className="mt-2 text-lg font-black leading-8 text-slate-900 transition-colors group-hover:text-brand-700">{item}</h4>
       </a>
      ))}
     </div>

     <div className="border-b border-slate-200 px-6 py-5 md:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-400">Catalog Support</p>
      <div className="mt-4 flex items-start gap-4">
       <div className="flex h-12 w-12 items-center justify-center border border-brand-200 bg-brand-50 text-brand-700">
        <MessageCircle className="h-6 w-6" />
       </div>
       <div>
        <p className="text-lg font-black tracking-tight text-slate-900">Need the latest file?</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Contact us on WhatsApp and we will send the current catalog directly.</p>
       </div>
      </div>
      <a
       href={`${whatsappBaseUrl}?text=${encodeURIComponent("Hello IFAN, I need help choosing the right catalog.")}`}
       target="_blank"
       rel="noreferrer"
       className="mt-5 inline-flex items-center gap-2 border border-brand-600 bg-brand-600 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-brand-700"
      >
       WhatsApp
       <ArrowRight className="h-4 w-4" />
      </a>
     </div>

     <div className="px-6 py-5 md:px-8">
      <Link href="#" className="inline-flex items-center gap-2 border border-slate-300 px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
       View All Articles
       <ArrowRight className="h-4 w-4" />
      </Link>
     </div>
    </div>
   </div>
  </section>

  <section className="border border-slate-200 bg-slate-900 text-white">
   <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="border-b border-white/10 p-8 md:p-10 lg:border-b-0 lg:border-r lg:border-white/10">
     <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center bg-white/10 text-brand-300">
       <BadgeInfo className="h-6 w-6" />
      </div>
      <div>
       <p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-300">Compliance</p>
       <h2 className="mt-2 text-3xl font-black tracking-tight">Compliance & Certifications</h2>
      </div>
     </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4">
     {certifications.map((certificate, index) => (
      <div key={certificate} className={`flex min-h-[112px] items-center justify-center border-white/10 px-4 text-center text-sm font-black uppercase tracking-[0.18em] text-white ${index % 2 === 0 ? "border-r" : ""} ${index < 2 ? "border-b sm:border-b-0 sm:border-r" : ""} sm:border-b-0`}>
       {certificate}
      </div>
     ))}
    </div>
   </div>
  </section>
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
