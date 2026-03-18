"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Settings2, Activity, Zap, Layers, Gauge, Wind, PlayCircle, PauseCircle } from "lucide-react";
import { useTranslations } from "next-intl";

// Predefined Materials
const MATERIALS = [
    { id: "ppr", name: "PPR", color: "#16a34a", factor: 1.2, desc: "Polypropylene Random Copolymer" },
    { id: "pex", name: "PEX", color: "#64748b", factor: 0.9, desc: "Cross-linked Polyethylene" }, // Changed to grey
    { id: "pvc", name: "PVC", color: "#2563eb", factor: 1.5, desc: "Polyvinyl Chloride" },
    { id: "pe", name: "HDPE", color: "#0f172a", factor: 1.1, desc: "High-Density Polyethylene" }, // Changed to black
];

export default function ProductionSimulator() {
    const t = useTranslations("productionSimulator");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // --- STATE ---
    const [material, setMaterial] = useState(MATERIALS[0]);
    const [diameter, setDiameter] = useState(32); // 20 - 110 mm
    const [speed, setSpeed] = useState(60); // 10 - 100%
    const [cooling, setCooling] = useState(50); // 10 - 100%
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    // --- DERIVED METRICS ---
    const activeSpeed = isPlaying ? speed : 0;

    const metrics = useMemo(() => {
        const productionRate = (diameter * 2) * (activeSpeed / 100) * material.factor;
        const lineSpeed = (activeSpeed * 0.5) * (40 / diameter); // Thinner pipes go faster
        const powerConsumption = 45 + (productionRate * 0.15) + (cooling * 0.2); // Base + melt energy + cooling energy
        const efficiency = activeSpeed > 0 ? Math.min(99, 50 + (activeSpeed * 0.4) - (cooling * 0.1)) : 0;

        return {
            rate: productionRate.toFixed(1),
            lineSpeed: lineSpeed.toFixed(2),
            power: powerConsumption.toFixed(1),
            efficiency: efficiency.toFixed(1)
        };
    }, [material, diameter, activeSpeed, cooling]);

    // --- TIMER ---
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Animation Duration
    const baseDuration = isPlaying ? Math.max(0.5, 10 - (speed / 12)) : 0;

    return (
        <section ref={ref} className="py-24 bg-slate-50 relative overflow-hidden font-sans border-y border-slate-200">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* Header Content */}
            <div className="container mx-auto px-6 relative z-10 mb-12">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 font-bold text-xs uppercase tracking-widest rounded-none mb-6">
                            <Activity className="w-4 h-4" />
                            {t("badge", { defaultMessage: "Digital Twin System" })}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                            {t("title1", { defaultMessage: "Smart Manufacturing" })} <span className="text-brand-600">{t("title2", { defaultMessage: "Simulator" })}</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-medium">
                            {t("desc", { defaultMessage: "Experience the precision of IFAN's extrusion technology. Adjust parameters in real-time to observe throughput, energy efficiency, and operational metrics." })}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- LEFT COLUMN: CONTROLS --- */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-4 flex flex-col gap-6"
                >
                    <div className="bg-white rounded-none border border-slate-200 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                <Settings2 className="w-5 h-5 text-brand-600" />
                                {t("controlPanel", { defaultMessage: "Control Panel" })}
                            </h3>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-sm font-bold transition-colors ${isPlaying ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-brand-100 text-brand-700 hover:bg-brand-200'}`}
                            >
                                {isPlaying ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                                {isPlaying ? t("haltLine", { defaultMessage: "Halt Line" }) : t("startLine", { defaultMessage: "Start Line" })}
                            </button>
                        </div>

                        {/* Material Select */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                                {t("rawMaterial", { defaultMessage: "Raw Material" })}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {MATERIALS.map(mat => (
                                    <button
                                        key={mat.id}
                                        onClick={() => setMaterial(mat)}
                                        className={`px-3 py-2.5 rounded-none text-sm font-bold tracking-wide transition-all border ${material.id === mat.id
                                            ? 'bg-brand-50 text-brand-700 border-brand-200 shadow-sm'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mat.color }} />
                                            {mat.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs font-medium text-slate-500 mt-3 truncate bg-slate-50 px-3 py-2 rounded-none">
                                {material.desc}
                            </p>
                        </div>

                        {/* Diameter Slider */}
                        <div className="mb-8 p-4 bg-slate-50 rounded-none border border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600">
                                    {t("pipeDiameter", { defaultMessage: "Pipe Diameter" })}
                                </label>
                                <span className="font-mono font-bold text-brand-600 text-sm bg-white px-2 py-0.5 rounded-none border border-slate-200 shadow-sm">{diameter} mm</span>
                            </div>
                            <input
                                type="range"
                                min="20" max="110" step="10"
                                value={diameter}
                                onChange={(e) => setDiameter(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-600"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2">
                                <span>20</span>
                                <span>110</span>
                            </div>
                        </div>

                        {/* Speed Slider */}
                        <div className="mb-8 p-4 bg-slate-50 rounded-none border border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1">
                                    <Gauge className="w-3.5 h-3.5" /> {t("extruderRPM", { defaultMessage: "Extruder RPM" })}
                                </label>
                                <span className="font-mono font-bold text-blue-600 text-sm bg-white px-2 py-0.5 rounded-none border border-slate-200 shadow-sm">{speed}%</span>
                            </div>
                            <input
                                type="range"
                                min="10" max="100" step="5"
                                value={speed}
                                onChange={(e) => setSpeed(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-none appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        {/* Cooling Slider */}
                        <div className="p-4 bg-slate-50 rounded-none border border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1">
                                    <Wind className="w-3.5 h-3.5" /> {t("coolingIntensity", { defaultMessage: "Cooling Intensity" })}
                                </label>
                                <span className="font-mono font-bold text-cyan-600 text-sm bg-white px-2 py-0.5 rounded-none border border-slate-200 shadow-sm">{cooling}%</span>
                            </div>
                            <input
                                type="range"
                                min="10" max="100" step="5"
                                value={cooling}
                                onChange={(e) => setCooling(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-none appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* --- RIGHT COLUMN: VISUALS & METRICS --- */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="lg:col-span-8 flex flex-col gap-6"
                >

                    {/* Metrics Dashboard */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricCard
                            title={t("productionRate", { defaultMessage: "Production Rate" })}
                            value={metrics.rate}
                            unit="kg/h"
                            icon={<Layers className="w-4 h-4 text-brand-600" />}
                            badgeColor="bg-brand-50"
                            textColor="text-brand-900"
                        />
                        <MetricCard
                            title={t("lineSpeed", { defaultMessage: "Line Speed" })}
                            value={metrics.lineSpeed}
                            unit="m/min"
                            icon={<Gauge className="w-4 h-4 text-blue-600" />}
                            badgeColor="bg-blue-50"
                            textColor="text-blue-900"
                        />
                        <MetricCard
                            title={t("powerDraw", { defaultMessage: "Power Draw" })}
                            value={metrics.power}
                            unit="kW"
                            icon={<Zap className="w-4 h-4 text-amber-600" />}
                            badgeColor="bg-amber-50"
                            textColor="text-amber-900"
                        />
                        <MetricCard
                            title={t("efficiency", { defaultMessage: "Efficiency" })}
                            value={metrics.efficiency}
                            unit="%"
                            icon={<Activity className="w-4 h-4 text-violet-600" />}
                            badgeColor="bg-violet-50"
                            textColor="text-violet-900"
                        />
                    </div>

                    {/* Animation Canvas */}
                    <div className="bg-white rounded-none border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative overflow-hidden min-h-[420px]">
                        {/* Light Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                        <div className="absolute inset-0 flex items-center justify-center p-8 overflow-x-auto">
                            <div className="w-[1000px] h-[300px] relative flex-shrink-0">

                                {/* 1. Hopper & Extruder */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-48">
                                    {/* Hopper */}
                                    <svg className="absolute top-0 left-12 w-24 h-24" viewBox="0 0 100 100">
                                        <polygon points="10,10 90,10 60,90 40,90" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                                        {/* Falling Pellets Simulation */}
                                        <g style={{ opacity: isPlaying ? 1 : 0 }}>
                                            {[...Array(5)].map((_, i) => (
                                                <motion.circle
                                                    key={i}
                                                    cx={45 + (i * 2)}
                                                    cy="30"
                                                    r="3"
                                                    fill={material.color}
                                                    animate={{ cy: [30, 80], opacity: [1, 0] }}
                                                    transition={{
                                                        duration: baseDuration * 0.5,
                                                        repeat: Infinity,
                                                        delay: i * (baseDuration * 0.1),
                                                        ease: "linear"
                                                    }}
                                                />
                                            ))}
                                        </g>
                                    </svg>

                                    {/* Barrel */}
                                    <svg className="absolute bottom-[33px] left-0 w-64 h-16" viewBox="0 0 250 60">
                                        <rect x="0" y="10" width="220" height="40" rx="0" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                                        {/* Heater Bands */}
                                        {[40, 80, 120, 160, 200].map(x => (
                                            <rect key={x} x={x} y="8" width="10" height="44" fill="#ef4444" opacity={isPlaying ? 0.6 : 0.2} rx="0" />
                                        ))}
                                        {/* internal screw (implied) */}
                                        <motion.path
                                            d="M 10 30 Q 20 20, 30 30 T 50 30 T 70 30 T 90 30 T 110 30 T 130 30 T 150 30 T 170 30 T 190 30 T 210 30"
                                            fill="none"
                                            stroke={material.color}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            animate={isPlaying ? { x: [-20, 0] } : {}}
                                            transition={{ duration: baseDuration, repeat: Infinity, ease: "linear" }}
                                            style={{ opacity: 0.9 }}
                                        />
                                        {/* Die Head */}
                                        <polygon points="220,10 250,20 250,40 220,50" fill="#94a3b8" />
                                    </svg>
                                    <div className="absolute -bottom-6 left-24 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t("extruderDie")}</div>
                                </div>

                                {/* 2. Cooling Bath */}
                                <div className="absolute left-64 top-1/2 -translate-y-1/2 w-96 h-48 border-l-2 border-r-2 border-[#e2e8f0]">
                                    <svg className="absolute bottom-4 left-0 w-full h-24" viewBox="0 0 400 100">
                                        {/* Tank Background */}
                                        <rect x="0" y="20" width="400" height="60" fill="#f8fafc" />
                                        <rect x="0" y="20" width="400" height="60" fill="#0ea5e9" opacity={cooling / 250} />

                                        {/* Animated Water Level/Spray */}
                                        <motion.path
                                            d="M 0 20 Q 50 10, 100 20 T 200 20 T 300 20 T 400 20"
                                            fill="none"
                                            stroke="#38bdf8"
                                            strokeWidth="3"
                                            animate={isPlaying ? { x: [-100, 0] } : {}}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            style={{ opacity: cooling > 20 ? 0.8 : 0.2 }}
                                        />

                                        {/* The Pipe Passing Through */}
                                        <motion.rect
                                            x="0"
                                            y={50 - ((diameter / 110) * 15)}
                                            width="400"
                                            height={(diameter / 110) * 30}
                                            fill={material.color}
                                            style={{ background: `linear-gradient(to right, ${material.color}, ${material.color}90)` }}
                                        />

                                        {/* Speed indicator lines on pipe */}
                                        {isPlaying && (
                                            <motion.g animate={{ x: [0, 400] }} transition={{ duration: baseDuration * 4, repeat: Infinity, ease: "linear" }}>
                                                <line x1="0" y1={50 - ((diameter / 110) * 15)} x2="0" y2={50 + ((diameter / 110) * 15)} stroke="#ffffff" strokeWidth="2" opacity="0.5" />
                                            </motion.g>
                                        )}
                                    </svg>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-cyan-600">{t("coolingTank")}</div>
                                </div>

                                {/* 3. Haul-off & Cutter */}
                                <div className="absolute left-[640px] top-1/2 -translate-y-1/2 w-64 h-48">
                                    <svg className="absolute bottom-[20px] left-0 w-full h-32" viewBox="0 0 250 120">
                                        {/* Pipe continuing */}
                                        <rect
                                            x="0"
                                            y={80 - ((diameter / 110) * 15)}
                                            width="250"
                                            height={(diameter / 110) * 30}
                                            fill={material.color}
                                        />

                                        {/* Haul-off Tracks */}
                                        <g>
                                            {/* Top Track */}
                                            <rect x="20" y={40 - ((diameter / 110) * 15)} width="80" height="20" rx="0" fill="#e2e8f0" stroke="#cbd5e1" />
                                            <motion.circle cx="30" cy={50 - ((diameter / 110) * 15)} r="6" fill="#94a3b8" animate={isPlaying ? { rotate: -360 } : {}} transition={{ duration: baseDuration, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `30px ${50 - ((diameter / 110) * 15)}px` }} />
                                            <motion.circle cx="90" cy={50 - ((diameter / 110) * 15)} r="6" fill="#94a3b8" animate={isPlaying ? { rotate: -360 } : {}} transition={{ duration: baseDuration, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `90px ${50 - ((diameter / 110) * 15)}px` }} />

                                            {/* Bottom Track */}
                                            <rect x="20" y={100 + ((diameter / 110) * 15)} width="80" height="20" rx="0" fill="#e2e8f0" stroke="#cbd5e1" />
                                            <motion.circle cx="30" cy={110 + ((diameter / 110) * 15)} r="6" fill="#94a3b8" animate={isPlaying ? { rotate: 360 } : {}} transition={{ duration: baseDuration, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `30px ${110 + ((diameter / 110) * 15)}px` }} />
                                            <motion.circle cx="90" cy={110 + ((diameter / 110) * 15)} r="6" fill="#94a3b8" animate={isPlaying ? { rotate: 360 } : {}} transition={{ duration: baseDuration, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: `90px ${110 + ((diameter / 110) * 15)}px` }} />
                                        </g>

                                        {/* Cutter Box */}
                                        <rect x="150" y="30" width="40" height="100" fill="#f8fafc" stroke="#cbd5e1" rx="0" />
                                        <motion.rect
                                            x="165"
                                            y="40"
                                            width="10"
                                            height="40"
                                            fill="#ef4444"
                                            animate={isPlaying ? { y: [0, 40, 0] } : {}}
                                            transition={{ duration: baseDuration * 2, repeat: Infinity, ease: "easeInOut" }}
                                            rx="0"
                                        />
                                    </svg>
                                    <div className="absolute -bottom-6 left-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t("haulOff")}</div>
                                    <div className="absolute -bottom-6 right-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t("cutter")}</div>
                                </div>

                                {/* 4. End Product Stacker */}
                                <div className="absolute left-[896px] top-1/2 -translate-y-1/2 w-32 h-48 overflow-hidden">
                                    <svg className="absolute bottom-[21px] left-0 w-full h-32" viewBox="0 0 100 120">
                                        <AnimatePresence>
                                            {isPlaying && (
                                                <motion.rect
                                                    key={Math.floor(elapsedTime / (baseDuration * 2))}
                                                    x="0"
                                                    y={80 - ((diameter / 110) * 15)}
                                                    width="80"
                                                    height={(diameter / 110) * 30}
                                                    fill={material.color}
                                                    initial={{ x: -80 }}
                                                    animate={{ x: 100 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: baseDuration * 2, ease: "linear" }}
                                                />
                                            )}
                                        </AnimatePresence>
                                        <rect x="0" y="110" width="100" height="10" fill="#cbd5e1" rx="0" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Status Overlay */}
                        {!isPlaying && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-300">
                                <div className="bg-white px-8 py-6 rounded-none shadow-xl flex flex-col items-center gap-3 border border-slate-100">
                                    <PauseCircle className="w-12 h-12 text-slate-400" />
                                    <span className="text-slate-900 font-black text-xl tracking-tight">{t("haltedTitle")}</span>
                                    <p className="text-slate-500 font-medium text-sm">{t("haltedDesc")}</p>
                                </div>
                            </div>
                        )}

                        {/* Status Bar Header */}
                        <div className="absolute top-0 left-0 right-0 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10">
                            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: material.color }}></span> {t("meltTempOk")}</span>
                                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm"></span> {t("waterFlowOk")}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t("uptime")}</span>
                                <span className="font-mono font-bold text-slate-700 text-sm bg-white px-2 py-0.5 rounded-none border border-slate-200">{formatTime(elapsedTime)}</span>
                            </div>
                        </div>

                        {/* Quality Warning Alert */}
                        <AnimatePresence>
                            {speed > 80 && cooling < 40 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
                                >
                                    <div className="bg-red-50 border border-red-200 shadow-lg rounded-none px-6 py-4 flex items-center gap-3">
                                        <span className="flex h-3 w-3 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                        <p className="text-red-700 text-xs font-bold uppercase tracking-wider">
                                            {t("qualityAlert", { defaultMessage: "Quality Alert: High speed with low cooling compromises pipe integrity." })}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Helper Component for Metrics
function MetricCard({ title, value, unit, icon, badgeColor, textColor }: { title: string, value: string, unit: string, icon: React.ReactNode, badgeColor: string, textColor: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-none p-5 shadow-[0_4px_15px_rgb(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] relative overflow-hidden">
            <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-none ${badgeColor}`}>
                        {icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{title}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl lg:text-4xl font-black tracking-tight tabular-nums ${textColor}`}>
                        {value}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{unit}</span>
                </div>
            </div>
        </div>
    );
}
