"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Dynamically import the Heavy 3D canvas with forced client-side rendering
const ViewerInner = dynamic(
    () => import("./Packaging3DViewerInner"),
    { ssr: false }
);

export default function Packaging3DViewer({ url, transparent = false, heroMode = false }: { url: string, transparent?: boolean, heroMode?: boolean }) {
    // Avoid double mounting on React 18 strict mode that can cause Context Lost
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!url) {
        if (transparent) return null;
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 border border-slate-200">
                <span className="font-bold uppercase tracking-widest text-sm mb-2">3D Placeholder</span>
                <span className="text-xs">Upload a .glb file in CMS</span>
            </div>
        );
    }

    const containerClass = transparent
        ? "w-full h-full relative group cursor-grab active:cursor-grabbing overflow-hidden"
        : "w-full h-full relative group cursor-grab active:cursor-grabbing bg-slate-50 border border-slate-200 overflow-hidden";

    return (
        <div className={containerClass}>
            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/80 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 shadow-sm">
                    Drag to rotate
                </span>
            </div>

            <Suspense fallback={
                <div className={`absolute inset-0 flex items-center justify-center ${transparent ? 'bg-transparent' : 'bg-slate-50'}`}>
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Matrix Data...</span>
                    </div>
                </div>
            }>
                {mounted && <ViewerInner url={url} heroMode={heroMode} />}
            </Suspense>
        </div>
    );
}
