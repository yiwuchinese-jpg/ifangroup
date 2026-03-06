"use client";

import { useState, useRef, ReactNode } from"react";
import { cn } from"@/lib/utils";

interface GlowCardProps {
 children: ReactNode;
 className?: string;
 glowColor?: string;
}

export default function GlowCard({ children, className, glowColor ="rgba(0,127,60,0.08)"}: GlowCardProps) {
 const [pos, setPos] = useState({ x: 0, y: 0 });
 const [opacity, setOpacity] = useState(0);
 const rectRef = useRef<HTMLDivElement>(null);

 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
 if (!rectRef.current) return;
 const rect = rectRef.current.getBoundingClientRect();
 setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
 };

 return (
 <div
 ref={rectRef}
 onMouseMove={handleMouseMove}
 onMouseEnter={() => setOpacity(1)}
 onMouseLeave={() => setOpacity(0)}
 className={cn(
"relative overflow-hidden bg-white border border-slate-200 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,127,60,0.15)] transition-all duration-500 ease-out",
 className
 )}
 >
 <div
 className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
 style={{
 opacity,
 background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 40%)`,
 }}
 />
 <div className="relative z-10 w-full h-full">
 {children}
 </div>
 </div>
 );
}
