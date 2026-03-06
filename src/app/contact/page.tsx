"use client";

import { motion } from"framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Building2, CheckCircle2 } from"lucide-react";
import Navbar from"@/components/layout/Navbar";
import Footer from"@/components/layout/Footer";
import { useSearchParams } from"next/navigation";
import { useState, Suspense } from"react";

function ContactForm() {
 const searchParams = useSearchParams();
 const interestedProduct = searchParams.get("interest");

 const [formStatus, setFormStatus] = useState<"idle"|"submitting"|"success">("idle");

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
 <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Company Name *</label>
 <input required type="text"className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors"placeholder="e.g. Acme Construction"/>
 </div>
 <div>
 <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Contact Person *</label>
 <input required type="text"className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors"placeholder="John Doe"/>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Email Address *</label>
 <input required type="email"className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors"placeholder="john@company.com"/>
 </div>
 <div>
 <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Phone / WhatsApp</label>
 <input type="tel"className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors"placeholder="+1 (555) 000-0000"/>
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Inquiry Type</label>
 <select className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors appearance-none">
 <option>Product Quotation (Volume Procurement)</option>
 <option>OEM & Custom Manufacturing</option>
 <option>Global Distributorship Application</option>
 <option>Technical Specification Support</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Detailed Requirements *</label>
 <textarea
 required
 rows={4}
 className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 transition-colors resize-none"
 defaultValue={interestedProduct ? `I am requesting a bulk procurement quotation and technical spec sheet for the following product matrix:\n\n- ${interestedProduct}\n\nPlease advise on MOQ, global shipping logistics, and current pricing tiers.` :""}
 placeholder="Describe your project scale, required materials, or custom OEM specifications..."
 ></textarea>
 </div>

 {formStatus ==="success"? (
 <div className="bg-brand-50/50 border border-brand-100 p-6 flex items-center justify-center flex-col text-center">
 <CheckCircle2 className="w-12 h-12 text-brand-600 mb-4"/>
 <h4 className="text-xl font-black text-slate-900 mb-1">Inquiry Transmitted Securely</h4>
 <p className="text-slate-600 font-medium">Our enterprise sales director will contact you within 12 hours.</p>
 </div>
 ) : (
 <button
 disabled={formStatus ==="submitting"}
 type="submit"
 className="w-full bg-brand-600 text-white font-black tracking-widest uppercase py-4 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
 >
 {formStatus ==="submitting"?"Authenticating...":"Request Official Quotation"}
 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
 </button>
 )}
 </form>
 );
}

export default function ContactUsPage() {
 return (
 <div className="flex min-h-screen flex-col bg-white">
 <Navbar />

 <main className="flex-grow pt-32 pb-24">
 <div className="container mx-auto px-6">

 {/* Immersive Spaceful-style Hero */}
 <div className="absolute top-0 left-0 w-full min-h-[500px] lg:min-h-[80vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32 mb-20 lg:mb-32 z-0">
 {/* Background Image / Overlay */}
 <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
 <img
 src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
 alt="IFAN Corporate Headquarters"
 className="w-full h-full object-cover opacity-40 select-none scale-105"
 draggable={false}
 />
 <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40"/>
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"/>
 </div>

 <div className="container mx-auto px-6 relative z-10">
 <div className="max-w-5xl">
 <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
 Enterprise Connectivity
 </span>

 <motion.h1
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
 className="text-5xl sm:text-6xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12"
 >
 Architectural Scale. <br className="hidden md:block"/>
 Direct From <span className="text-brand-500">Source.</span>
 </motion.h1>

 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1, delay: 0.4 }}
 className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed"
 >
 Bypass the intermediaries. Connect directly with our unified manufacturing hub for global supply chain procurement, OEM development, and master distributorships.
 </motion.p>
 </div>
 </div>
 </div>

 {/* Push content down to avoid overlapping the absolute hero */}
 <div className="pt-[500px] lg:pt-[80vh] relative z-10"/>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 max-w-6xl mx-auto">

 {/* Contact Information Cards */}
 <div className="lg:col-span-5 flex flex-col gap-6">
 <div className="bg-slate-900 text-white p-8 shrink-0">
 <h3 className="text-2xl font-black tracking-tight mb-8">Global Headquarters</h3>

 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <Building2 className="w-6 h-6 text-brand-500 shrink-0"/>
 <div>
 <p className="font-bold mb-1">IFAN GROUP CO., LTD</p>
 <p className="text-slate-400 text-sm leading-relaxed">Diankou Industrial Zone, Zhuji City,<br />Zhejiang Province, China</p>
 </div>
 </div>

 <div className="w-full h-px bg-white/10"/>

 <div className="flex items-start gap-4">
 <Phone className="w-6 h-6 text-brand-500 shrink-0"/>
 <div>
 <p className="font-bold mb-1">Direct Procurement Desk</p>
 <p className="text-slate-400 text-sm">WhatsApp / WeChat: +86 136 5666 6030</p>
 </div>
 </div>

 <div className="w-full h-px bg-white/10"/>

 <div className="flex items-start gap-4">
 <Mail className="w-6 h-6 text-brand-500 shrink-0"/>
 <div>
 <p className="font-bold mb-1">Corporate Communications</p>
 <p className="text-slate-400 text-sm">sales@ifangroup.com</p>
 </div>
 </div>
 </div>
 </div>

 <div className="p-8 bg-slate-50 border border-slate-100">
 <h3 className="text-lg font-black tracking-tight text-slate-900 mb-4">Why Direct Procurement?</h3>
 <ul className="space-y-3">
 <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
 <CheckCircle2 className="w-4 h-4 text-brand-600"/> Factory Floor Pricing (0% Markup)
 </li>
 <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
 <CheckCircle2 className="w-4 h-4 text-brand-600"/> Custom OEM/ODM Capabilities
 </li>
 <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
 <CheckCircle2 className="w-4 h-4 text-brand-600"/> Priority Global Shipping Logistics
 </li>
 </ul>
 </div>
 </div>

 {/* Interactive Form */}
 <div className="lg:col-span-7">
 <div className="bg-white p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50">
 <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
 Initiate Procurement
 </h2>
 <p className="text-slate-500 font-medium mb-8">
 Provide your project semantics. Our engineering and sales team will compile your specialized quote matrix.
 </p>

 <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading form matrix...</div>}>
 <ContactForm />
 </Suspense>
 </div>
 </div>

 </div>
 </div>
 </main>

 <Footer />
 </div>
 );
}
