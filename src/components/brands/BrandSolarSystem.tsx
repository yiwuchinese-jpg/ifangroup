"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getBrandCopy } from "@/lib/brandCopywriting";

interface Brand {
    _id: string;
    name: string;
    slug: string;
    series: string;
    description: string;
    logo?: { asset: { url: string } };
}

const SERIES_TRANSLATIONS: Record<string, string> = {
    "IFAN系列": "IFAN CORE",
    "IFAN 系列": "IFAN CORE",
    "Ifan系列": "IFAN CORE",
    "IFAN": "IFAN CORE",
    "德国系列": "GERMAN SERIES",
    "德国 系列": "GERMAN SERIES",
    "意大利系列": "ITALY SERIES",
    "意大利 系列": "ITALY SERIES",
    "英国系列": "UK SERIES",
    "英国 系列": "UK SERIES",
    "土耳其系列": "TURKISH SERIES",
    "土耳其 系列": "TURKISH SERIES",
    "其他": "PARTNERS",
    "Sub-Brands": "PARTNERS"
};
const cnFlagSvg = `<svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 30 20"><path fill="#de2910"d="M0,0h30v20h-30z"/><g fill="#ffde00"transform="translate(5,5) scale(3)"><g id="s"><path id="j"d="M0,-0.5 0.1175,0.038 -0.3236,-0.2319 0.3236,-0.2319 -0.1175,0.038z"/><use href="#j"transform="scale(-1,1)"/></g><use href="#s"transform="translate(1,-1.2) rotate(36.87) scale(0.3333333)"/><use href="#s"transform="translate(2,-0.4) rotate(7.747) scale(0.3333333)"/><use href="#s"transform="translate(2,0.6) rotate(-22.25) scale(0.3333333)"/><use href="#s"transform="translate(1,1.4) rotate(-53.13) scale(0.3333333)"/></g></svg>`;

const SERIES_FLAGS: Record<string, string> = {
    "IFAN CORE": `data:image/svg+xml;utf8,${encodeURIComponent(cnFlagSvg)}`,
};

// Removed createTextTextureUrl to keep bundle small since we only render aesthetic spheres now.

// Single Planet Component
function BrandPlanet({
    brand,
    radius,
    speed,
    angleOffset,
    color,
    seriesPosition,
    isGalaxyFocused,
    isActive,
    onClick,
    onClose
}: {
    brand: Brand,
    radius: number,
    speed: number,
    angleOffset: number,
    color: string,
    seriesPosition: [number, number, number],
    isGalaxyFocused: boolean,
    isActive: boolean,
    onClick: (brand: Brand) => void,
    onClose: () => void
}) {
    const groupRef = useRef<THREE.Group>(null);
    const planetRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;
        // Orbit rotation calculation relative to the series center
        const t = state.clock.getElapsedTime() * speed + angleOffset;
        groupRef.current.position.x = seriesPosition[0] + Math.cos(t) * radius;
        groupRef.current.position.y = seriesPosition[1];
        groupRef.current.position.z = seriesPosition[2] + Math.sin(t) * radius;

        if (planetRef.current) {
            planetRef.current.rotation.y += 0.005; // slowly rotate planet itself
        }
    });

    const displaySeries = brand.series ? (SERIES_TRANSLATIONS[brand.series] || brand.series.toUpperCase()) : "";

    return (
        <group
            ref={groupRef as any}
            onClick={(e: any) => { e.stopPropagation(); onClick(brand); }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* 3D Floating Name Label (Always Visible unless active) */}
            <Html position={[0, hovered || isGalaxyFocused ? 1.5 : 1.2, 0]} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
                <div
                    className={`transition-all duration-500 pointer-events-none whitespace-nowrap px-3 py-1 bg-white/95 backdrop-blur-md shadow-lg border border-black/5 text-[10px] sm:text-xs font-black text-slate-900 tracking-widest uppercase transform-gpu ${!isActive && (hovered || isGalaxyFocused) ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'}`}
                >
                    {brand.name}
                </div>
            </Html>

            {/* Active Popover Bubble Attached to the Planet */}
            {isActive && (
                <Html position={[0, 2.5, 0]} center zIndexRange={[200, 0]}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="w-80 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] rounded-3xl p-6 pointer-events-auto flex flex-col items-center relative"
                        onClick={(e) => e.stopPropagation()} // Prevent bubble click from closing it immediately
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-200 rounded-full p-1.5"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                        
                        <div className="text-[10px] font-black tracking-[0.2em] text-brand-500 uppercase mb-3">
                            {displaySeries}
                        </div>

                        {brand.logo?.asset?.url ? (
                            <img
                                src={brand.logo.asset.url}
                                alt={brand.name}
                                className="h-8 mb-4 object-contain mix-blend-multiply"
                            />
                        ) : (
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4">
                                {brand.name}
                            </h3>
                        )}

                        <p className="text-xs text-slate-500 text-center mb-6 line-clamp-4 leading-relaxed">
                            {getBrandCopy(brand.name, brand).valueProposition.content.join(" ")}
                        </p>

                        <Link
                            href={`/brands/${brand.slug}`}
                            className="w-full bg-slate-900 hover:bg-brand-600 text-white font-bold uppercase tracking-widest text-[10px] py-3 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-md"
                        >
                            Enter Matrix
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        {/* Downward pointing triangle (Speech bubble tail) */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[12px] border-t-white/95 border-r-[10px] border-r-transparent filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)]" />
                    </motion.div>
                </Html>
            )}

            <mesh ref={planetRef}>
                <sphereGeometry args={[hovered ? 1.2 : 1, 64, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered || isGalaxyFocused ? 0.3 : 0.05}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Glowing Halo */}
            <mesh>
                <sphereGeometry args={[hovered ? 1.5 : 1.2, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={hovered ? 0.3 : 0.1} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Brand Title Hover Label removed, relying entirely on the persistent top label */}
        </group>
    );
}

// Minimal Orbit Path Ring
function OrbitRing({ radius, color }: { radius: number, color: string }) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
    );
}

// Series Central Galaxy Component
function SeriesGalaxy({
    name,
    position,
    color,
    flagUrl,
    isFocused,
    onClick,
    onDeselect
}: {
    name: string,
    position: [number, number, number],
    color: string,
    flagUrl?: string,
    isFocused: boolean,
    onClick: () => void,
    onDeselect: () => void
}) {
    const coreRef = useRef<THREE.Mesh>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (flagUrl) {
            const loader = new THREE.TextureLoader();
            loader.setCrossOrigin('anonymous');
            loader.load(flagUrl, (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                tex.wrapS = THREE.ClampToEdgeWrapping;
                tex.wrapT = THREE.ClampToEdgeWrapping;
                setTexture(tex);
            });
        }
    }, [flagUrl]);

    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={coreRef}
                onClick={(e) => {
                    e.stopPropagation();
                    if (isFocused) {
                        onDeselect();
                    } else {
                        onClick();
                    }
                }}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                <sphereGeometry args={[4, 64, 64]} />
                <meshStandardMaterial
                    color={texture ? "#ffffff" : "#f8fafc"}
                    map={texture}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.3 : 0.1}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Minimal Wireframe wrapper if no flag */}
            {!texture && (
                <mesh>
                    <sphereGeometry args={[4.1, 32, 32]} />
                    <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
                </mesh>
            )}

            {/* Core Glow */}
            <mesh>
                <sphereGeometry args={[6, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={hovered ? 0.15 : 0.05} blending={THREE.AdditiveBlending} />
            </mesh>

            <Html position={[0, -6, 0]} center className="pointer-events-none transition-transform duration-500 transform-gpu" style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}>
                <div className={`font-black text-sm tracking-[0.3em] uppercase transition-colors duration-500 px-4 py-2 ${hovered ? 'bg-white/90 backdrop-blur-md shadow-lg text-slate-900' : 'text-slate-400 opacity-70'}`}>
                    {SERIES_TRANSLATIONS[name] || name}
                </div>
            </Html>
        </group>
    );
}

// Camera Rig for seamless galaxy transitions
function CameraRig({
    focusedPosition,
    controlsRef
}: {
    focusedPosition: [number, number, number] | null,
    controlsRef: React.RefObject<any>
}) {
    const [isReturningHome, setIsReturningHome] = useState(false);
    const [userInteracting, setUserInteracting] = useState(false);

    // Watch for OrbitControls interaction to disable auto-lerps
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

    useEffect(() => {
        if (focusedPosition === null) {
            setIsReturningHome(true);
            setUserInteracting(false); // Reset interaction when closing modal
        } else {
            setIsReturningHome(false);
        }
    }, [focusedPosition]);

    useFrame((state) => {
        if (!controlsRef.current) return;

        if (focusedPosition && !userInteracting) {
            // Target destinations when focused
            const targetPos = new THREE.Vector3(focusedPosition[0], focusedPosition[1] + 15, focusedPosition[2] + 25);
            const targetLookAt = new THREE.Vector3(...focusedPosition);

            // Interpolate camera position and target
            state.camera.position.lerp(targetPos, 0.05);
            controlsRef.current.target.lerp(targetLookAt, 0.05);

        } else if (isReturningHome && !userInteracting) {
            const homePos = new THREE.Vector3(0, 60, 80);
            const homeLookAt = new THREE.Vector3(0, 0, 0);

            state.camera.position.lerp(homePos, 0.05);
            controlsRef.current.target.lerp(homeLookAt, 0.05);

            // Stop returning home once we are close enough
            if (state.camera.position.distanceTo(homePos) < 1) {
                setIsReturningHome(false);
            }
        }

        controlsRef.current.update();
    });

    return null;
}

export default function BrandSolarSystem({ brands }: { brands: Brand[] }) {
    const [activeBrand, setActiveBrand] = useState<Brand | null>(null);

    // Generate deterministic planetary parameters grouped by series
    const systemData = useMemo(() => {
        const uniqueSeriesSet = new Set(brands.map((b) => {
            const raw = b.series || 'Sub-Brands';
            return SERIES_TRANSLATIONS[raw] || raw.toUpperCase();
        }));
        // Ensure IFAN CORE is at the center (0,0,0)
        let uniqueSeries = Array.from(uniqueSeriesSet).sort((a, b) => {
            const aIsIfan = a.toUpperCase().includes("IFAN");
            const bIsIfan = b.toUpperCase().includes("IFAN");
            if (aIsIfan && !bIsIfan) return -1;
            if (!aIsIfan && bIsIfan) return 1;
            return a.localeCompare(b);
        });

        const getSeriesColor = (seriesName: string) => {
            const upper = seriesName.toUpperCase();
            if (upper.includes("IFAN")) return "#16a34a"; // Green
            if (upper.includes("GERMAN") || upper.includes("德国")) return "#eab308"; // Gold
            if (upper.includes("ITALY") || upper.includes("意大利")) return "#3b82f6"; // Blue
            if (upper.includes("UK") || upper.includes("英国")) return "#f43f5e"; // Rose
            if (upper.includes("TURKISH") || upper.includes("土耳其")) return "#8b5cf6"; // Purple
            return "#94a3b8"; // Slate for Partners / others
        };

        // 1. Position the Galaxies
        const galaxies: Record<string, { position: [number, number, number], color: string, name: string, flagUrl?: string }> = {};

        uniqueSeries.forEach((seriesName, index) => {
            let position: [number, number, number] = [0, 0, 0];

            // Distribute galaxies in a massive outer ring, IFAN CORE at center
            if (index > 0) {
                const galaxyDistance = 35; // Tighter distance so it fits on screens gracefully
                const angle = ((index - 1) / (uniqueSeries.length - 1)) * Math.PI * 2;
                position = [Math.cos(angle) * galaxyDistance, 0, Math.sin(angle) * galaxyDistance];
            }

            galaxies[seriesName] = {
                name: seriesName,
                position,
                color: getSeriesColor(seriesName),
                flagUrl: seriesName.toUpperCase().includes("IFAN") ? SERIES_FLAGS["IFAN CORE"] : undefined
            };
        });

        const seriesCurrentIndex: Record<string, number> = {};
        const seriesCounts: Record<string, number> = {};
        brands.forEach(b => {
            const rawSeries = b.series || 'Sub-Brands';
            const s = SERIES_TRANSLATIONS[rawSeries] || rawSeries.toUpperCase();
            seriesCounts[s] = (seriesCounts[s] || 0) + 1;
        });

        // 2. Assign planets to their respective galaxies
        const planets = brands.map((brand) => {
            const rawSeries = brand.series || 'Sub-Brands';
            const seriesName = SERIES_TRANSLATIONS[rawSeries] || rawSeries.toUpperCase();

            seriesCurrentIndex[seriesName] = (seriesCurrentIndex[seriesName] || 0) + 1;

            const galaxy = galaxies[seriesName];
            const countInSeries = seriesCounts[seriesName];
            const currentIndex = seriesCurrentIndex[seriesName];

            // Local orbital placement within the galaxy
            // Stagger multiple rings if many brands in one galaxy
            const ringLayer = Math.floor((currentIndex - 1) / 8);
            const baseLocalRadius = 10 + (ringLayer * 6);

            const radiusOffset = countInSeries > 1 ? (Math.random() * 2 - 1) : 0;
            const radius = baseLocalRadius + radiusOffset;

            // Varied speeds (significantly slowed down for a majestic feel)
            const baseSpeed = 0.12 * (1 / (ringLayer + 1));
            const speed = baseSpeed + (Math.random() * 0.04 - 0.02);

            // Even spacing within the local ring
            const itemsInRing = Math.min(8, countInSeries - (ringLayer * 8));
            const angleOffset = ((currentIndex - 1) % itemsInRing / itemsInRing) * Math.PI * 2;

            return {
                brand,
                radius,
                speed,
                angleOffset,
                color: galaxy.color,
                seriesPosition: galaxy.position,
                seriesName: galaxy.name
            };
        });

        return { galaxies: Object.values(galaxies), planets };
    }, [brands]);

    // Active Galaxy Focus State
    const [focusedGalaxy, setFocusedGalaxy] = useState<string | null>(null);
    const orbitControlsRef = useRef<any>(null);

    const focusedGalaxyData = useMemo(() => {
        if (!focusedGalaxy) return null;
        return systemData.galaxies.find(g => g.name === focusedGalaxy)?.position || null;
    }, [focusedGalaxy, systemData.galaxies]);

    return (
        <div className="relative w-full h-full bg-slate-50 overflow-hidden font-sans">

            {/* WebGL Canvas */}
            <div className="absolute inset-0 cursor-move touch-none">
                <Canvas camera={{ position: [0, 60, 80], fov: 45 }}>
                    <color attach="background" args={['#f8fafc']} /> {/* matches slate-50 */}
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 20, 10]} intensity={3} color="#ffffff" />

                    <CameraRig focusedPosition={focusedGalaxyData} controlsRef={orbitControlsRef} />

                    {/* Massive Interstellar Orbit Ring (connecting the outer galaxies) */}
                    <group position={[0, 0, 0]}>
                        <OrbitRing radius={35} color="#cbd5e1" />
                        <OrbitRing radius={35.5} color="#e2e8f0" />
                    </group>

                    {/* Render each Galaxy Core */}
                    {systemData.galaxies.map((galaxy) => (
                        <SeriesGalaxy
                            key={galaxy.name}
                            name={galaxy.name}
                            position={galaxy.position}
                            color={galaxy.color}
                            flagUrl={galaxy.flagUrl}
                            isFocused={focusedGalaxy === galaxy.name}
                            onClick={() => {
                                setFocusedGalaxy(galaxy.name);
                                setActiveBrand(null); // Clear brand modal if opening a galaxy
                            }}
                            onDeselect={() => setFocusedGalaxy(null)}
                        />
                    ))}

                    {/* Render all planets and their orbital rings around their respective galaxies */}
                    {systemData.planets.map((p, i) => (
                        <React.Fragment key={p.brand._id}>
                            <group position={p.seriesPosition}>
                                <OrbitRing radius={p.radius} color={p.color} />
                            </group>
                            <BrandPlanet
                                brand={p.brand}
                                radius={p.radius}
                                speed={p.speed}
                                angleOffset={p.angleOffset}
                                color={p.color}
                                seriesPosition={p.seriesPosition}
                                isGalaxyFocused={focusedGalaxy === p.seriesName}
                                isActive={activeBrand?._id === p.brand._id}
                                onClick={(b) => setActiveBrand(b)}
                                onClose={() => setActiveBrand(null)}
                            />
                        </React.Fragment>
                    ))}

                    <OrbitControls
                        ref={orbitControlsRef}
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={20}
                        maxDistance={150}
                        maxPolarAngle={Math.PI / 2 + 0.1} // Allow looking from slightly below the equator
                    />
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div className={`absolute top-24 left-6 md:top-32 md:left-8 pointer-events-none z-10 transition-opacity duration-500 ${focusedGalaxy ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
                    Brand <span className="text-brand-600">Universe.</span>
                </h1>
                <p className="text-slate-500 font-medium tracking-widest uppercase text-[10px] md:text-xs">
                    Drag to rotate · Scroll to zoom · Click to explore
                </p>
            </div>
            
            {/* The standalone UI Modal was removed. Bubbles are now rendered within the BrandPlanet via <Html> */}
        </div>
    );
}
 
