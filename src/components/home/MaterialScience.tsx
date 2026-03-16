"use client";

import { motion } from"framer-motion";

const materials = [
 {
 id:"brass",
 name:"CW617N Pure Brass",
 description:"European standard forged brass ensuring absolute tolerance against burst pressure and zero heavy-metal leaching.",
 image: "/images/static/mat-brass.webp", // Working Unsplash metal image
 },
 {
 id:"ppr",
 name:"100% Hyosung R200P",
 description:"Sourced globally from top-tier chemical conglomerates. The foundational polymer for our 50-year lifespan guarantee.",
 image: "/images/static/mat-ppr.webp", // Working Unsplash pipes
 },
 {
 id:"pex",
 name:"Cross-Linked EVOH",
 description:"Advanced multi-layer engineering incorporating an impeccable oxygen barrier to preserve heating system integrity.",
 image: "/images/static/mat-pex.webp", // Working Unsplash tubes
 }
];

export default function MaterialScience() {
 return (
 <section className="py-32 lg:py-48 bg-white border-t border-slate-200">
 <div className="container mx-auto px-6">

 <div className="mb-32 md:flex flex-col lg:flex-row items-end justify-between gap-12">
 <div className="max-w-4xl">
 <span className="text-slate-400 font-bold tracking-[0.3em] uppercase text-xs mb-8 block">
 Our Zero-Defect Guarantee
 </span>
 <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black text-slate-900 tracking-tighter leading-[0.9]">
 Engineered from the Molecular Level.
 </h2>
 </div>
 <p className="text-xl text-slate-500 font-light max-w-lg mt-8 lg:mt-0 leading-relaxed">
 A brand is only as strong as its raw materials. By refusing recycled impurities and utilizing only 100% virgin, globally-verified resins & alloys, we ensure absolute liability protection for your projects.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {materials.map((mat, i) => (
 <motion.div
 key={mat.id}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: i * 0.15 }}
 className="group cursor-pointer"
 >
 <div className="w-full h-[500px] overflow-hidden mb-10 relative bg-slate-200">
 <img
 src={mat.image}
 alt={mat.name}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 </div>
 <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
 {mat.name}
 </h3>
 <p className="text-slate-600 font-medium leading-relaxed">
 {mat.description}
 </p>
 </motion.div>
 ))}
 </div>

 </div>
 </section>
 );
}
