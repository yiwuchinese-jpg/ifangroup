"use client";

import { motion } from"framer-motion";
import { ReactNode } from"react";
import { cn } from"@/lib/utils";

export default function TextReveal({ children, className, delay = 0 }: { children: string | ReactNode, className?: string, delay?: number }) {
 if (typeof children ==="string") {
 const words = children.split("");
 return (
 <h1 className={cn("overflow-hidden flex flex-wrap", className)}>
 {words.map((word, i) => (
 <motion.span
 key={i}
 initial={{ y:"120%", rotate: 5, opacity: 0 }}
 animate={{ y: 0, rotate: 0, opacity: 1 }}
 transition={{
 duration: 0.8,
 ease: [0.215, 0.61, 0.355, 1],
 delay: delay + i * 0.05,
 }}
 className="mr-[0.25em] inline-block"
 >
 {word}
 </motion.span>
 ))}
 </h1>
 );
 }

 // Fallback for non-string elements (like spans mixing with text)
 return (
 <motion.div
 initial={{ y: 30, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1], delay }}
 className={className}
 >
 {children}
 </motion.div>
 );
}
