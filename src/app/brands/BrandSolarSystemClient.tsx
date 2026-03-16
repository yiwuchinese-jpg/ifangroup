"use client";

import dynamic from"next/dynamic";
import { useState } from"react";
import { motion } from"framer-motion";
import BrandGridView from"@/components/brands/BrandGridView";

const BrandSolarSystem = dynamic(
 () => import("@/components/brands/BrandSolarSystem"),
 {
 ssr: false,
 loading: () => (
 <div className="w-full h-full flex items-center justify-center bg-slate-50">
 <div className="text-brand-600 font-bold tracking-widest uppercase animate-pulse">
 Initializing Brand Universe...
 </div>
 </div>
 ),
 }
);

interface Brand {
 _id: string;
 name: string;
 slug: string;
 series: string;
 description: string;
 logo?: { asset: { url: string } };
}

export default function BrandSolarSystemClient({ brands }: { brands: Brand[] }) {
 const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

 return (
 <div className="relative w-full h-full bg-slate-50">
 {/* View Toggle UI */}
 <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-white/80 backdrop-blur-md p-1.5 border border-slate-200/60 shadow-lg">
 <button
 onClick={() => setViewMode('3d')}
 className={`relative px-4 py-2 text-xs font-black tracking-widest uppercase transition-colors z-10 ${viewMode === '3d' ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
 >
 {viewMode === '3d' && (
 <motion.div
 layoutId="active-view-pill"
 className="absolute inset-0 bg-slate-900 -z-10"
 transition={{ type:"spring", stiffness: 400, damping: 30 }}
 />
 )}
 3D Universe
 </button>
 <button
 onClick={() => setViewMode('grid')}
 className={`relative px-4 py-2 text-xs font-black tracking-widest uppercase transition-colors z-10 ${viewMode === 'grid' ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
 >
 {viewMode === 'grid' && (
 <motion.div
 layoutId="active-view-pill"
 className="absolute inset-0 bg-slate-900 -z-10"
 transition={{ type:"spring", stiffness: 400, damping: 30 }}
 />
 )}
 Grid View
 </button>
 </div>

 {/* Dynamic View Rendering (CSS Toggle to prevent WebGL context loss) */}
 <div className="w-full h-full relative overflow-hidden">
 {/* 3D WebGL Layer */}
 <div
 className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${viewMode === '3d' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
 >
 <BrandSolarSystem brands={brands} />
 </div>

 {/* 2D Grid Layer */}
 <div
 className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${viewMode === 'grid' ? 'opacity-100 pointer-events-auto z-50' : 'opacity-0 pointer-events-none z-0'}`}
 >
 <BrandGridView brands={brands} />
 </div>
 </div>
 </div>
 );
}
 
