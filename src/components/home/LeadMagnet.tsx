"use client";

import { Download, FileText, CheckCircle2 } from"lucide-react";

export default function LeadMagnet() {
 return (
 <section className="py-24 bg-brand-900 relative overflow-hidden">

 {/* Background Image Overlay */}
 <div className="absolute inset-0 z-0">
 <img
 src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
 alt="Corporate consulting architecture"
 className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 </div>

 <div className="container mx-auto px-6 relative z-10">
 <div className="flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">

 {/* Content */}
 <div className="flex-1 lg:pr-10">
 <div className="inline-flex items-center gap-2 px-4 py-2 border border-brand-700 bg-brand-800 text-brand-100 text-sm font-bold tracking-widest uppercase mb-8">
 <FileText className="w-4 h-4"/> Exclusive B2B Whitepaper
 </div>

 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
 The 2024 Guide to Sourcing Plumbing Materials in China
 </h2>

 <p className="text-brand-100 text-lg mb-10 leading-relaxed font-medium">
 Stop losing margin to hidden costs. Download our comprehensive guide covering advanced factory vetting, TCO quality benchmarks, and global logistics optimization.
 </p>

 <ul className="space-y-5">
 {[
"Identifying Fake Manufacturers vs. Real Mega-Factories",
"TCO (Total Cost of Ownership) Analysis for Piping",
"Strict Quality Checklists for PPR & Brass Valves"
 ].map((item, i) => (
 <li key={i} className="flex items-start gap-4 text-white font-bold text-lg">
 <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0 mt-0.5"/>
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* Form Card */}
 <div className="w-full lg:w-[440px] shrink-0 bg-white p-8 md:p-10 shadow-2xl relative z-10 border-t-8 border-brand-600">
 <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
 Get Instant Access
 </h3>
 <p className="text-slate-600 font-medium mb-8">Download securely to your inbox.</p>

 <form className="space-y-5">
 <div>
 <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
 <input
 type="text"
 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all font-medium"
 placeholder="e.g. Acme Wholesale"
 />
 </div>
 <div>
 <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
 <input
 type="email"
 className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all font-medium"
 placeholder="john@example.com"
 />
 </div>

 <button
 type="button"
 className="w-full py-4 mt-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition-colors"
 >
 <Download className="w-5 h-5"/>
 Download PDF
 </button>

 <p className="text-xs text-center text-slate-500 font-medium pt-2">
 We respect your privacy. SSL Encrypted.
 </p>
 </form>
 </div>

 </div>
 </div>
 </section>
 );
}
