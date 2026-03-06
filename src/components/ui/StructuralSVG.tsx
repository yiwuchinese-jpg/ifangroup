"use client";

import { motion } from"framer-motion";

export default function StructuralSVG() {
 return (
 <div className="w-full h-full relative flex items-center justify-center opacity-40 mix-blend-multiply">
 <motion.svg
 viewBox="0 0 800 600"
 className="w-full max-w-[800px] h-auto drop-shadow-sm"
 initial="hidden"
 animate="visible"
 >
 {/* 
 Isometric abstract piping / manufacturing grid structure 
 Uses motion.path to draw the lines over time
 */}

 {/* Vertical Lines */}
 <motion.path
 d="M 400 100 L 400 500"
 stroke="#068650"/* IFAN Green */
 strokeWidth="1.5"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 2, ease:"easeInOut", delay: 0.2 }}
 />
 <motion.path
 d="M 300 200 L 300 450"
 stroke="#94a3b8"/* slate-400 */
 strokeWidth="1"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 1.5, ease:"easeInOut", delay: 0.5 }}
 />
 <motion.path
 d="M 500 150 L 500 480"
 stroke="#94a3b8"
 strokeWidth="1"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 1.8, ease:"easeInOut", delay: 0.8 }}
 />

 {/* Isometric Diagonal Lines (Top Left to Bottom Right) */}
 <motion.path
 d="M 200 300 L 400 400 L 600 300"
 stroke="#068650"
 strokeWidth="1.5"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 2, ease:"easeInOut", delay: 1 }}
 />
 <motion.path
 d="M 300 200 L 400 250 L 500 200"
 stroke="#cbd5e1"
 strokeWidth="1"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 1.5, ease:"easeInOut", delay: 1.2 }}
 />

 {/* Isometric Diagonal Lines (Bottom Left to Top Right) */}
 <motion.path
 d="M 200 400 L 400 300 L 600 400"
 stroke="#cbd5e1"
 strokeWidth="1"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 1.5, ease:"easeInOut", delay: 1.5 }}
 />

 {/* Abstract Data Nodes / Valves */}
 <motion.circle
 cx="400"
 cy="400"
 r="6"
 fill="#068650"
 initial={{ scale: 0, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 0.5, delay: 2.8, type:"spring"}}
 />
 <motion.circle
 cx="300"
 cy="200"
 r="4"
 fill="#94a3b8"
 initial={{ scale: 0, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 0.5, delay: 2.3, type:"spring"}}
 />
 <motion.circle
 cx="500"
 cy="200"
 r="4"
 fill="#94a3b8"
 initial={{ scale: 0, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 transition={{ duration: 0.5, delay: 2.5, type:"spring"}}
 />

 {/* Horizontal flow lines */}
 <motion.path
 d="M 400 250 L 550 250"
 stroke="#cbd5e1"
 strokeWidth="1"
 strokeDasharray="4 4"
 fill="none"
 initial={{ pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{ duration: 2, ease:"linear", delay: 2 }}
 />
 </motion.svg>
 </div>
 );
}
