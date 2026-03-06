"use client";

import { motion, useMotionValue, useSpring } from"framer-motion";
import { ReactNode, useRef } from"react";
import { cn } from"@/lib/utils";

interface MagneticButtonProps {
 children: ReactNode;
 className?: string;
 onClick?: () => void;
 strength?: number;
}

export default function MagneticButton({
 children,
 className,
 onClick,
 strength = 30
}: MagneticButtonProps) {
 const ref = useRef<HTMLDivElement>(null);
 const x = useMotionValue(0);
 const y = useMotionValue(0);

 const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
 const springX = useSpring(x, springConfig);
 const springY = useSpring(y, springConfig);

 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
 if (!ref.current) return;
 const { clientX, clientY } = e;
 const { left, top, width, height } = ref.current.getBoundingClientRect();
 const centerX = left + width / 2;
 const centerY = top + height / 2;
 x.set((clientX - centerX) * (strength / 100));
 y.set((clientY - centerY) * (strength / 100));
 };

 const handleMouseLeave = () => {
 x.set(0);
 y.set(0);
 };

 return (
 <motion.div
 ref={ref}
 style={{ x: springX, y: springY }}
 onMouseMove={handleMouseMove}
 onMouseLeave={handleMouseLeave}
 onClick={onClick}
 className={cn("cursor-pointer relative z-10", className)}
 >
 {children}
 </motion.div>
 );
}
