"use client";

import { motion } from"framer-motion";

export default function HeroBackgroundSVG() {
 return (
 <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
 {/* Tech Grid Pattern */}
 <svg className="absolute w-full h-full opacity-[0.15]"xmlns="http://www.w3.org/2000/svg">
 <defs>
 <pattern id="grid-pattern"width="40"height="40"patternUnits="userSpaceOnUse">
 <path d="M 40 0 L 0 0 0 40"fill="none"stroke="currentColor"strokeWidth="1"/>
 </pattern>
 </defs>
 <rect width="100%"height="100%"fill="url(#grid-pattern)"className="text-slate-900"/>
 </svg>

 {/* Glowing Brand Green Orb */}
 <motion.div
 initial={{ opacity: 0, scale: 0.5 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 2, ease:"easeOut"}}
 className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/40 blur-[120px]"
 />

 {/* Secondary Accent Orb */}
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 2.5, ease:"easeOut", delay: 0.2 }}
 className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-slate-400/30 blur-[100px]"
 />

 {/* Fading bottom edge */}
 <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent"/>
 </div>
 );
}
