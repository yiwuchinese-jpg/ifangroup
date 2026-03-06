"use client";

import React, { useRef, useState, useMemo, useEffect } from"react";
import { Canvas, useFrame } from"@react-three/fiber";
import { OrbitControls, Html } from"@react-three/drei";
import * as THREE from"three";
import { motion, AnimatePresence } from"framer-motion";
import { X, ArrowRight, ShieldAlert, Zap, Factory, Globe } from"lucide-react";
import Link from"next/link";
import { REGIONS_DATA, RegionData } from"@/lib/regionsData";

// Helper: Lat/Lon to 3D Cartesian (Radius = 10)
function getCartesian(lat: number, lon: number, radius: number): [number, number, number] {
 const phi = (90 - lat) * (Math.PI / 180);
 const theta = (lon + 180) * (Math.PI / 180);
 return [
 -(radius * Math.sin(phi) * Math.cos(theta)),
 radius * Math.cos(phi),
 radius * Math.sin(phi) * Math.sin(theta)
 ];
}

// --- 3D Components ---

function WireframeEarth() {
 const [mapTexture, setMapTexture] = useState<THREE.CanvasTexture | null>(null);

 useEffect(() => {
 let isMounted = true;
 fetch("/models/countries.json")
 .then(res => res.json())
 .then(data => {
 if (!isMounted) return;
 const canvas = document.createElement("canvas");
 canvas.width = 4096; // 4K texture for crisp lines
 canvas.height = 2048;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 ctx.fillStyle ="rgba(0,0,0,0)";
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 ctx.strokeStyle ="#4da8da"; // vibrant blue
 ctx.lineWidth = 3;
 ctx.lineJoin ="round";
 ctx.lineCap ="round";
 ctx.shadowColor ="#3b82f6";
 ctx.shadowBlur = 6;

 const project = (lon: number, lat: number) => {
 // Equirectangular projection
 const x = ((lon + 180) / 360) * canvas.width;
 const y = ((90 - lat) / 180) * canvas.height;
 return [x, y];
 };

 const drawPolygon = (rings: number[][][]) => {
 rings.forEach((ring) => {
 ctx.beginPath();
 ring.forEach((coord, i) => {
 const [x, y] = project(coord[0], coord[1]);
 if (i === 0) ctx.moveTo(x, y);
 else ctx.lineTo(x, y);
 });
 ctx.stroke();
 });
 };

 data.features.forEach((feature: any) => {
 const geometry = feature.geometry;
 if (!geometry) return;
 if (geometry.type ==="Polygon") {
 drawPolygon(geometry.coordinates);
 } else if (geometry.type ==="MultiPolygon") {
 geometry.coordinates.forEach((poly: any) => drawPolygon(poly));
 }
 });

 const texture = new THREE.CanvasTexture(canvas);
 texture.colorSpace = THREE.SRGBColorSpace;
 texture.anisotropy = 16;
 setMapTexture(texture);
 })
 .catch(err => console.error("Failed to map data to canvas", err));

 return () => { isMounted = false; };
 }, []);

 return (
 <group>
 {/* Inner dark core */}
 <mesh>
 <sphereGeometry args={[9.9, 64, 64]} />
 <meshStandardMaterial color="#020617"roughness={0.8} metalness={0.2} transparent={false} depthWrite={true} />
 </mesh>
 {/* Tech Wireframe grid overlay (Latitude/Longitude lines) */}
 <mesh>
 <sphereGeometry args={[9.91, 32, 32]} />
 <meshBasicMaterial color="#0f172a"wireframe transparent opacity={0.6} depthWrite={false} />
 </mesh>
 {/* Atmosphere Glow */}
 <mesh>
 <sphereGeometry args={[10.4, 32, 32]} />
 <meshBasicMaterial color="#3b82f6"transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
 </mesh>

 {/* The actual continents drawn with the high-res Canvas texture map */}
 {mapTexture && (
 <mesh>
 <sphereGeometry args={[9.92, 64, 64]} />
 {/* Using AdditiveBlending to make the blue lines glow beautifully on dark background */}
 <meshBasicMaterial
 map={mapTexture}
 transparent={true}
 opacity={1}
 blending={THREE.AdditiveBlending}
 depthWrite={false}
 />
 </mesh>
 )}
 </group>
 );
}

function RegionMarker({
 region,
 isActive,
 isAnyActive,
 onClick
}: {
 region: RegionData,
 isActive: boolean,
 isAnyActive: boolean,
 onClick: () => void
}) {
 const position = useMemo(() => getCartesian(region.coordinates[0], region.coordinates[1], 9.92), [region.coordinates]);
 const markerRef = useRef<THREE.Mesh>(null);
 const labelRef = useRef<HTMLDivElement>(null);

 useFrame((state) => {
 if (markerRef.current) {
 markerRef.current.rotation.z += 0.02; // Spin the marker around local Z-axis (normal)

 // Math-based occlusion: Calculate distance from camera to marker
 const worldPos = new THREE.Vector3();
 markerRef.current.getWorldPosition(worldPos);
 const distance = state.camera.position.distanceTo(worldPos);

 // Compute distance to the exact horizon of the globe (radius ~9.9) using Pythagoras
 const distToCenter = state.camera.position.length();
 const horizonDistance = Math.sqrt(distToCenter * distToCenter - 9.9 * 9.9);

 // If the marker distance exceeds the horizon distance, it's rotating to the back
 // Adding a small buffer (e.g. +1) to let it fade out just as it crosses the globe's edge
 const visible = distance < horizonDistance + 1;

 // Directly mutate DOM to avoid React set state loops in useFrame
 if (labelRef.current) {
 labelRef.current.style.opacity = visible ? '1' : '0';
 labelRef.current.style.pointerEvents = visible ? 'auto' : 'none';
 }
 }
 });

 // Compute the outward normal vector for correct surface alignment
 const normal = useMemo(() => new THREE.Vector3(...position).normalize(), [position]);

 // Calculate rotation to make the ring lie flat on the sphere surface
 const quaternion = useMemo(() => {
 const q = new THREE.Quaternion();
 const up = new THREE.Vector3(0, 0, 1); // Default ring axis is Z
 q.setFromUnitVectors(up, normal);
 return q;
 }, [normal]);

 return (
 <group position={position} quaternion={quaternion}>
 {/* 3D Anchor Point - Octahedron Core */}
 <mesh
 ref={markerRef}
 position={[0, 0, 0.8]}
 onClick={(e) => { e.stopPropagation(); onClick(); }}
 onPointerOver={() => {
 if (labelRef.current && labelRef.current.style.opacity === '1') {
 document.body.style.cursor = 'pointer';
 }
 }}
 onPointerOut={() => { document.body.style.cursor = 'auto'; }}
 >
 <octahedronGeometry args={[isActive ? 1.0 : 0.6, 0]} />
 <meshStandardMaterial
 color={region.color}
 emissive={region.color}
 emissiveIntensity={isActive ? 2 : 0.8}
 wireframe={!isActive}
 />
 </mesh>

 {/* Permanent Outer Ring - Radar Target Style */}
 <mesh position={[0, 0, 0.6]}>
 <ringGeometry args={[1.5, 1.6, 32]} />
 <meshBasicMaterial color={region.color} transparent opacity={isActive ? 0.8 : 0.3} side={THREE.DoubleSide} />
 </mesh>

 {/* Glowing Halo when active */}
 {isActive && (
 <mesh position={[0, 0, 0.8]}>
 <sphereGeometry args={[1.4, 16, 16]} />
 <meshBasicMaterial color={region.color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
 </mesh>
 )}

 {/* HTML Label floating above marker */}
 <Html
 center
 position={[0, 0, isActive ? 3.5 : 2.5]}
 style={{ zIndex: isActive ? 100 : 10, visibility: isAnyActive && !isActive ? 'hidden' : 'visible' }}
 >
 <div
 ref={labelRef}
 style={{ transition: 'opacity 0.3s ease-in-out' }}
 className={`whitespace-nowrap px-4 py-2 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs border ${isActive
 ? 'bg-brand-600 border-brand-500 text-white shadow-[0_0_30px_rgba(22,163,74,0.4)]'
 : 'bg-slate-900/80 backdrop-blur-md border-white/20 text-white hover:bg-slate-800'
 }`}
 >
 {region.name}
 </div>
 </Html>
 </group>
 );
}

function GlobeCameraRig({
 targetRegion,
 controlsRef
}: {
 targetRegion: RegionData | null,
 controlsRef: React.RefObject<any>
}) {
 const [userInteracting, setUserInteracting] = useState(false);

 useEffect(() => {
 const controls = controlsRef.current;
 if (!controls) return;
 const onStart = () => setUserInteracting(true);
 const onEnd = () => setUserInteracting(false);
 controls.addEventListener("start", onStart);
 controls.addEventListener("end", onEnd);
 return () => {
 controls.removeEventListener("start", onStart);
 controls.removeEventListener("end", onEnd);
 };
 }, [controlsRef]);

 useFrame((state) => {
 if (!controlsRef.current) return;

 if (targetRegion && !userInteracting) {
 // Calculate a camera position looking AT the region, slightly elevated
 const pos = getCartesian(targetRegion.coordinates[0], targetRegion.coordinates[1], 10);

 // Push camera back along the normal vector
 const norm = new THREE.Vector3(...pos).normalize();
 const targetCamPos = norm.clone().multiplyScalar(30); // Distance from center

 // Slightly offset to keep the globe not perfectly centered (leaves room for UI)
 targetCamPos.x += 10;

 const targetLookAt = new THREE.Vector3(...pos);

 state.camera.position.lerp(targetCamPos, 0.05);
 controlsRef.current.target.lerp(targetLookAt, 0.05);
 } else if (!targetRegion && !userInteracting) {
 // Default idle view: smoothly center the target
 controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
 }

 controlsRef.current.update();
 });

 return null;
}

// --- Main Client Component ---

export default function GlobalSolutionsClient() {
 const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
 const orbitControlsRef = useRef<any>(null);

 return (
 <div className="relative w-full h-full bg-slate-900 overflow-hidden font-sans">

 {/* Header Overlay */}
 <div className="absolute top-24 left-6 md:top-32 md:left-12 pointer-events-none z-10 transition-opacity duration-500">
 <span className="text-brand-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
 Geographic Intelligence
 </span>
 <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-4 leading-none">
 Global<br />Solutions.
 </h1>
 <p className="text-slate-400 font-medium tracking-widest uppercase text-[10px] md:text-xs">
 Drag to rotate · Select a territory to analyze
 </p>
 </div>

 {/* Top Right HUD Panel - Global Reach */}
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.5, duration: 0.8 }}
 className="absolute top-32 right-12 z-10 hidden lg:flex flex-col gap-4 w-72 pointer-events-none"
 >
 <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-5">
 <h3 className="text-brand-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 flex items-center gap-2">
 <Globe className="w-3 h-3"/> Global Footprint
 </h3>
 <div className="flex items-baseline gap-2">
 <span className="text-3xl font-black text-white">120+</span>
 <span className="text-slate-400 text-xs font-medium">Countries Served</span>
 </div>
 </div>
 </motion.div>

 {/* Bottom Left HUD Panel - Manufacturing Muscle */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.7, duration: 0.8 }}
 className="absolute bottom-12 left-12 z-10 hidden lg:flex flex-col gap-4 w-80 pointer-events-none"
 >
 <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-5">
 <h3 className="text-brand-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 flex items-center gap-2">
 <Factory className="w-3 h-3"/> Scale & Capacity
 </h3>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <div className="text-2xl font-black text-white mb-0.5">120k <span className="text-sm font-medium text-slate-400">m²</span></div>
 <div className="text-[10px] text-slate-400 uppercase tracking-wider">Mega Facility</div>
 </div>
 <div>
 <div className="text-2xl font-black text-white mb-0.5">100+</div>
 <div className="text-[10px] text-slate-400 uppercase tracking-wider">Auto Lines</div>
 </div>
 </div>
 </div>
 </motion.div>

 {/* Bottom Right HUD Panel - Compliance */}
 <motion.div
 initial={{ opacity: 0, y: 20, x: 20 }}
 animate={{ opacity: 1, y: 0, x: 0 }}
 transition={{ delay: 0.9, duration: 0.8 }}
 className="absolute bottom-12 right-12 z-10 hidden lg:flex flex-col gap-4 w-72 pointer-events-none"
 >
 <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-5">
 <h3 className="text-brand-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-2 flex items-center gap-2">
 <ShieldAlert className="w-3 h-3"/> Certified Quality
 </h3>
 <div className="flex flex-wrap gap-2 mt-3">
 {['ISO 9001', 'CE', 'NSF-61', 'DVGW', 'WaterMark'].map((cert) => (
 <span key={cert} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 tracking-wider">
 {cert}
 </span>
 ))}
 </div>
 </div>
 </motion.div>

 {/* 3D WebGL Canvas */}
 <div className="absolute inset-0 cursor-move touch-none">
 <Canvas camera={{ position: [0, 10, 40], fov: 45 }}>
 <ambientLight intensity={1} />
 <directionalLight position={[20, 30, 20]} intensity={3} color="#ffffff"/>
 <directionalLight position={[-20, 10, -20]} intensity={1} color="#3b82f6"/>

 <GlobeCameraRig targetRegion={activeRegion} controlsRef={orbitControlsRef} />

 <WireframeEarth />

 {REGIONS_DATA.map(region => (
 <RegionMarker
 key={region.id}
 region={region}
 isActive={activeRegion?.id === region.id}
 isAnyActive={!!activeRegion}
 onClick={() => setActiveRegion(region)}
 />
 ))}

 <OrbitControls
 ref={orbitControlsRef}
 enablePan={false}
 enableZoom={true}
 enableRotate={true}
 minDistance={15}
 maxDistance={80}
 autoRotate={!activeRegion} // Auto-rotate slowly when idle
 autoRotateSpeed={0.5}
 />
 </Canvas>
 </div>

 {/* PAS/FAB Data Panel Overlay */}
 <AnimatePresence>
 {activeRegion && (
 <motion.div
 initial={{ opacity: 0, x: 50 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 50 }}
 transition={{ type:"spring", damping: 25, stiffness: 200 }}
 className="absolute top-auto bottom-0 right-0 md:top-0 md:bottom-auto w-full md:w-[500px] h-[65vh] md:h-full bg-slate-900/95 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-slate-700 p-6 md:p-12 z-50 flex flex-col overflow-y-auto shadow-2xl"
 >
 <button
 onClick={() => setActiveRegion(null)}
 className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 z-50 cursor-pointer"
 >
 <X className="w-5 h-5"/>
 </button>

 <div className="pt-8 flex-grow">
 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 pr-12 uppercase leading-none">
 {activeRegion.name}
 </h2>

 {/* [PAS Model] Problem & Agitate */}
 <div className="mb-10 space-y-6">
 <div className="p-6 bg-slate-800/40 border-l-4 border-red-500">
 <h3 className="text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2 mb-4">
 <ShieldAlert size={14} className="text-red-500"/> Critical Pain Points
 </h3>
 <div className="space-y-4">
 <div className="text-slate-300 text-sm leading-relaxed">
 <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] block mb-1">Problem</span>
 {activeRegion.problem}
 </div>
 <div className="text-slate-300 text-sm leading-relaxed">
 <span className="text-red-500 font-bold uppercase tracking-widest text-[10px] block mb-1">Liability</span>
 {activeRegion.agitate}
 </div>
 </div>
 </div>
 </div>

 <div className="h-[1px] w-full bg-slate-800 mb-10"/>

 {/* [FAB Model] Feature, Advantage, Benefit */}
 <div className="space-y-8">
 <div>
 <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
 <Factory size={14} className="text-brand-500"/> The IFAN Integration
 </h3>
 <p className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
 {activeRegion.feature}
 </p>
 </div>

 <div className="pl-5 border-l border-slate-700">
 <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
 Technical Advantage
 </h3>
 <p className="text-slate-300 text-sm leading-relaxed font-medium">
 {activeRegion.advantage}
 </p>
 </div>

 <div className="p-6 bg-slate-800/40 border-l-4 border-brand-500">
 <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
 <Zap size={14} className="text-brand-500"/> Primary Business Benefit
 </h3>
 <p className="text-white font-bold text-lg leading-relaxed">
 {activeRegion.benefit}
 </p>
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="mt-12 pt-8 border-t border-slate-800">
 <Link
 href={`/global-solutions/${activeRegion.id}`}
 className="group flex items-center justify-between w-full px-6 py-5 bg-white text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-500 hover:text-white transition-all duration-300"
 >
 <span>Deep Dive: {activeRegion.name}</span>
 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform"/>
 </Link>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}
