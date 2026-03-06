"use client";

import { motion } from"framer-motion";
import { MapPin, Building2, TrendingUp, CheckCircle2 } from"lucide-react";

export default function GlobalFootprint() {
 return (
 <section className="py-24 bg-white border-t border-slate-200">
 <div className="container mx-auto px-6">
 <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">

 {/* Right: Text & Stats */}
 <div className="lg:w-1/2">
 <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
 Powering Infrastructure in <span className="text-brand-600">120+ Countries</span>
 </h2>
 <p className="text-lg text-slate-600 font-medium mb-10">
 From extreme heat in the Middle East to deep freezes in Northern Europe, IFAN products are engineered to shatter local standard requirements worldwide.
 </p>

 <div className="space-y-8">
 {[
 {
 icon: <Building2 className="w-6 h-6 text-brand-600"/>,
 title:"Major Municipal Projects",
 desc:"Approved vendor for government water grids across Asia and Africa."
 },
 {
 icon: <TrendingUp className="w-6 h-6 text-brand-600"/>,
 title:"High-Volume Distribution",
 desc:"Supplying tier-1 plumbing wholesalers in Europe and the Americas."
 },
 {
 icon: <MapPin className="w-6 h-6 text-brand-600"/>,
 title:"Localized Certifications",
 desc:"WRAS, CE, SKZ, and ISO certifications for strict regional compliance."
 }
 ].map((item, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="flex items-start gap-5"
 >
 <div className="w-12 h-12 bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
 {item.icon}
 </div>
 <div>
 <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
 <p className="text-slate-600 font-medium">
 {item.desc}
 </p>
 </div>
 </motion.div>
 ))}
 </div>

 <div className="mt-12 pt-8 border-t border-slate-200 flex items-center gap-6">
 <div className="flex flex-col">
 <span className="text-3xl font-black text-slate-900">500+</span>
 <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Global Partners</span>
 </div>
 <div className="w-px h-12 bg-slate-200"/>
 <div className="flex flex-col">
 <span className="text-3xl font-black text-slate-900">10,000+</span>
 <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Containers/Year</span>
 </div>
 </div>
 </div>

 {/* Left: Photography Map/Global Image */}
 <div className="lg:w-1/2 w-full">
 <div className="relative overflow-hidden shadow-sm h-[600px] border border-slate-200">
 <img
 src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
 alt="Global shipping containers port"
 className="w-full h-full object-cover select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"/>
 <div className="absolute bottom-8 left-8 right-8">
 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6">
 <div className="flex items-center gap-3 text-white mb-2">
 <CheckCircle2 className="w-5 h-5 text-brand-400"/>
 <span className="font-bold">Seamless Door-to-Port Logistics</span>
 </div>
 <p className="text-slate-200 text-sm">
 Our dedicated logistics team handles full customs clearance and shipping optimization, minimizing your landed cost per unit.
 </p>
 </div>
 </div>
 </div>
 </div>

 </div>
 </div>
 </section>
 );
}
