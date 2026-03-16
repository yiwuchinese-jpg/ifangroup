"use client";

import { motion } from"framer-motion";
import Link from"next/link";
import { ArrowRight, Check } from"lucide-react";

const categories = [
    {
    id: "ppr",
    title: "PPR Potable Water Systems",
    description: "Engineered from 100% Hyosung R200P. The undisputed industry standard for zero-leakage, 50-year lifespan water distribution.",
    image: "/images/static/home-cat-ppr.webp",
    features: ["Acoustic Insulation", "Antimicrobial Layers", "PN20 / PN25 Class Rated"],
    link: "/categories/ppr"
    },
    {
    id: "pex",
    title: "PEX & Radiant Heating",
    description: "High-flexibility, cross-linked tubing with EVOH oxygen barriers. Designed for extreme thermal cycling in modern radiant heating.",
    image: "/images/static/home-cat-pex.webp",
    features: ["EVOH Oxygen Barrier", "PEX-a / PEX-b", "Complete Underfloor Manifolds"],
    link: "/categories/pex-ppsu"
    },
    {
    id: "brass",
    title: "Forged Brass Valves",
    description: "Precision-machined European standard brass. Heavy-weight forging ensures absolute tolerance against burst pressure and corrosion.",
    image: "/images/static/home-cat-brass.webp",
    features: ["CW617N Pure Brass", "Heavy Duty Forged Body", "Ball Valves & Bibcocks"],
    link: "/categories/hvac-valves"
    },
    {
    id: "hdpe",
    title: "HDPE Infrastructure",
    description: "High-density infrastructure piping for municipal water grids, mining, and industrial chemical transport. Unyielding strength.",
    image: "/images/static/home-cat-hdpe.webp",
    features: ["Butt Fusion Ready", "Absolute Chemical Immunity", "Large Diameter Capable"],
    link: "/categories/hdpe"
    }
];

export default function ProductMatrix() {
 return (
 <section id="product-matrix"className="bg-slate-50 py-24">
 <div className="container mx-auto px-6">

 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
 <div className="max-w-3xl">
 <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
 Comprehensive Product Categories
 </h2>
 <p className="text-lg text-slate-600 font-medium">
 Consolidate your supply chain. Over 10,000 precision commercial SKUs engineered, tested, and shipped from our unified facility.
 </p>
 </div>

 <Link
 href="/products"
 className="inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700 transition-colors whitespace-nowrap"
 >
 Download Full Catalog
 <ArrowRight className="w-5 h-5"/>
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {categories.map((cat, index) => (
 <motion.div
 key={cat.id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: index * 0.1 }}
 className="bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full"
 >
 {/* Actual Product/Category Image */}
 <div className="h-64 w-full relative bg-slate-200">
 <img
 src={cat.image}
 alt={cat.title}
 className="w-full h-full object-cover select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 </div>

 <div className="p-8 flex flex-col flex-grow">
 <h3 className="text-2xl font-bold text-slate-900 mb-3">
 {cat.title}
 </h3>

 <p className="text-slate-600 mb-8 leading-relaxed">
 {cat.description}
 </p>

 <ul className="mb-8 space-y-3 flex-grow">
 {cat.features.map((feature, i) => (
 <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
 <Check className="w-5 h-5 text-brand-600 shrink-0"/>
 {feature}
 </li>
 ))}
 </ul>

 <Link
 href={cat.link}
 className="mt-auto items-center justify-center w-full py-4 font-bold border-2 border-slate-200 text-slate-700 hover:border-brand-600 hover:text-brand-600 transition-colors text-center"
 >
 View Specifications
 </Link>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
}
