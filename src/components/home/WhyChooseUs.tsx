"use client";

import { motion } from"framer-motion";
import { ShieldCheck, Truck, Scale, BadgePercent } from"lucide-react";

export default function WhyChooseUs() {
 const features = [
 {
 icon: <Scale className="w-7 h-7 text-white"/>,
 title:"Massive Production Scale",
 description:"120,000m² facility with 200+ intelligent extrusion lines ensuring multi-million dollar deliveries."
 },
 {
 icon: <BadgePercent className="w-7 h-7 text-white"/>,
 title:"Direct Factory Pricing",
 description:"Full value chain control from raw material to final packaging eliminates middlemen margins entirely."
 },
 {
 icon: <ShieldCheck className="w-7 h-7 text-white"/>,
 title:"Zero Defect Tolerance",
 description:"CNAS-certified lab strictly testing burst pressure and thermal cycling. ISO9001/CE certified."
 },
 {
 icon: <Truck className="w-7 h-7 text-white"/>,
 title:"Global Logistics & OEM",
 description:"Complete OEM customization including laser engraving, brass molding, and optimized shipping."
 }
 ];

 return (
 <section className="bg-slate-50 py-24">
 <div className="container mx-auto px-6">
 <div className="flex flex-col lg:flex-row gap-16 items-center">

 {/* Left: Text & Features */}
 <div className="lg:w-1/2">
 <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
 Why Global Wholesalers Bank On <span className="text-brand-600">IFAN</span>
 </h2>
 <p className="text-lg text-slate-600 font-medium mb-12">
 {"We don't just sell pipes; we engineer profitability and absolute supply chain reliability. For 30 years, we've powered the world's most demanding water networks."}
 </p>

 <div className="grid sm:grid-cols-2 gap-8">
 {features.map((feature, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 >
 <div className="w-12 h-12 bg-brand-600 flex items-center justify-center mb-4">
 {feature.icon}
 </div>
 <h3 className="text-xl font-bold text-slate-900 mb-2">
 {feature.title}
 </h3>
 <p className="text-slate-600 leading-relaxed font-medium">
 {feature.description}
 </p>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Right: Photography grid */}
 <div className="lg:w-1/2 w-full">
 <div className="grid grid-cols-2 gap-4">
 <img
 src="/images/static/home-why-1.webp"
 alt="Automated production line"
 className="w-full h-80 object-cover shadow-sm select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 <img
 src="/images/static/home-why-2.webp"
 alt="CNAS Lab Testing"
 className="w-full h-80 object-cover mt-12 shadow-sm select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 </div>
 </div>

 </div>
 </div>
 </section>
 );
}
