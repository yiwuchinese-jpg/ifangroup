"use client";

import { motion } from"framer-motion";

const metrics = [
 { value:"120,000", unit:"m²", label:"Smart Manufacturing Facility"},
 { value:"200", unit:"+", label:"Automated Production Lines"},
 { value:"600", unit:"+", label:"Engineering Specialists"},
 { value:"120", unit:"+", label:"Global Markets Served"},
];

export default function Metrics() {
 return (
 <section className="bg-slate-50 py-24 border-y border-slate-200 relative z-10">
 <div className="container mx-auto px-6">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
 {metrics.map((metric, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin:"-100px"}}
 transition={{
 duration: 0.8,
 delay: index * 0.15,
 ease: [0.16, 1, 0.3, 1]
 }}
 className="flex flex-col items-start border-l-2 border-slate-200 group hover:border-brand-500 transition-colors duration-500 pl-8"
 >
 <div className="flex items-baseline gap-1 mb-3">
 <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter group-hover:text-brand-600 transition-colors duration-500">
 {metric.value}
 </span>
 <span className="text-2xl font-bold text-brand-500">
 {metric.unit}
 </span>
 </div>
 <p className="text-slate-500 font-semibold tracking-wide text-sm md:text-base">
 {metric.label}
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
