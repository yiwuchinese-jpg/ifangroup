"use client";

import { motion, useScroll, useTransform } from"framer-motion";
import { useRef } from"react";
import { ArrowRight } from"lucide-react";
import Link from"next/link";

export default function FactoryScale() {
 const containerRef = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
 target: containerRef,
 offset: ["start end","end start"],
 });

 // Subtle parallax effect for the background image
 const y = useTransform(scrollYProgress, [0, 1], ["-10%","10%"]);

 return (
 <section ref={containerRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
 {/* Parallax Background Image */}
 <motion.div
 style={{ y }}
 className="absolute inset-0 w-full h-[120%] -top-[10%]"
 >
 <img
 src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
 alt="IFAN Advanced Manufacturing Facility"
 className="w-full h-full object-cover select-none"
 draggable={false}
 onContextMenu={(e) => e.preventDefault()}
 />
 </motion.div>

 {/* Gradient Overlay for Legibility */}
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

 {/* Content Container */}
 <div className="container mx-auto px-6 relative z-10 text-white mt-auto pb-24 md:pb-32 lg:flex items-end justify-between">
 <div className="max-w-3xl">
 <motion.span
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-brand-400 font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
 >
 Scale & Precision
 </motion.span>
 <motion.h2
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8, delay: 0.1 }}
 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
 >
 120,000m² of True Manufacturing Muscle.
 </motion.h2>
 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed"
 >
 We do not assemble; we engineer. From raw brass forging to high-polymer extrusion, our fully integrated production lines ensure absolute control over every micron.
 </motion.p>
 </div>

 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.4 }}
 className="mt-12 lg:mt-0"
 >
 <Link
 href="/manufacturing-oem"
 className="group inline-flex items-center gap-4 bg-white text-slate-900 px-8 py-4 font-bold tracking-[0.2em] uppercase text-sm hover:bg-brand-600 hover:text-white transition-all duration-300"
 >
 Explore Factory Capabilities
 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
 </Link>
 </motion.div>
 </div>
 </section>
 );
}
