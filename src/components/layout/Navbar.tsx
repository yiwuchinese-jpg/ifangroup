"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe, ChevronDown, Droplets, Flame, Hexagon, Component, Factory, Diamond, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Language metadata
const LANGUAGES = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);

    const t = useTranslations("nav");
    const tp = useTranslations("nav_products");
    const tc = useTranslations("nav_company");
    const tr = useTranslations("nav_resources");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close language menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
                setLangMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Switch locale using next-intl navigation so locale state and routing stay in sync
    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setLangMenuOpen(false);
    };

    const currentLang = LANGUAGES.find(l => l.code === locale) || LANGUAGES[0];

    // Mega Menu Data (Categorized)
    const productCategories = [
        {
            title: tp("pipesAndFittings"),
            icon: <Component className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tp("items.ppr"), link: "/categories/ppr" },
                { name: tp("items.brassFittings"), link: "/categories/brass-fittings" },
                { name: tp("items.pp"), link: "/categories/pp" },
                { name: tp("items.pvc"), link: "/categories/pvc" },
                { name: tp("items.pph"), link: "/categories/pph" },
                { name: tp("items.hdpe"), link: "/categories/hdpe" },
                { name: tp("items.stainlessPress"), link: "/categories/stainless-press" },
            ]
        },
        {
            title: tp("hvac"),
            icon: <Flame className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tp("items.hvacValves"), link: "/categories/hvac-valves" },
                { name: tp("items.pexPpsu"), link: "/categories/pex-ppsu" },
                { name: tp("items.pexa"), link: "/categories/pexa" },
            ]
        },
        {
            title: tp("gas"),
            icon: <Hexagon className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tp("items.gasSystems"), link: "/categories/gas-systems" },
                { name: tp("items.stainlessCorrugated"), link: "/categories/stainless-corrugated" },
            ]
        },
        {
            title: tp("sanitary"),
            icon: <Droplets className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tp("items.angleValves"), link: "/categories/angle-valves" },
                { name: tp("items.faucets"), link: "/categories/faucets" },
            ]
        }
    ];

    const companyCategories = [
        {
            title: tc("aboutIfan"),
            icon: <Factory className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tc("items.ourStory"), link: "/about-us", desc: tc("items.ourStoryDesc") },
                { name: tc("items.globalSolutions"), link: "/global-solutions", desc: tc("items.globalSolutionsDesc") },
                { name: tc("items.ourBrands"), link: "/brands", desc: tc("items.ourBrandsDesc") },
            ]
        },
        {
            title: tc("capabilities"),
            icon: <Diamond className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tc("items.oem"), link: "/manufacturing-oem", desc: tc("items.oemDesc") },
                { name: tc("items.quality"), link: "/about-us#certifications", desc: tc("items.qualityDesc") },
            ]
        }
    ];

    const resourcesCategories = [
        {
            title: tr("insightsMedia"),
            icon: <Globe className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tr("items.news"), link: "/news", desc: tr("items.newsDesc") },
                { name: tr("items.media"), link: "/media", desc: tr("items.mediaDesc") },
            ]
        },
        {
            title: tr("support"),
            icon: <Droplets className="w-5 h-5 text-brand-600" />,
            items: [
                { name: tr("items.contact"), link: "/contact", desc: tr("items.contactDesc") },
                { name: tr("items.download"), link: "/resources", desc: tr("items.downloadDesc") },
            ]
        }
    ];

    // Determine if we need white text based on pathname and scroll state
    const useWhiteText = (pathname === "/" || pathname === "/global-solutions" || pathname.endsWith("/global-solutions")) && !isScrolled && !activeMegaMenu;

    const handleMouseLeave = () => {
        setActiveMegaMenu(null);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${isScrolled || activeMegaMenu
                ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm"
                : (pathname === "/" || pathname === "/global-solutions" || pathname.endsWith("/global-solutions"))
                ? "bg-transparent py-6"
                : "bg-white py-4 border-b border-slate-100"
                }`}
            onMouseLeave={handleMouseLeave}
        >
            {/* Invisible bridge to prevent mouse-leave when header height shrinks */}
            <div className="absolute top-full left-0 w-full h-8 bg-transparent" />

            <div className="container mx-auto px-6 relative flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group relative w-36 h-12 md:w-44 md:h-14">
                    <img
                        src="/logo-white.png"
                        alt="IFAN Group"
                        className={`absolute inset-0 w-full h-full object-contain object-left transition-opacity duration-300 ${useWhiteText ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                        src="/logo-green.png"
                        alt="IFAN Group"
                        className={`absolute inset-0 w-full h-full object-contain object-left transition-opacity duration-300 ${!useWhiteText ? 'opacity-100' : 'opacity-0'}`}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
                    {/* Products Mega Menu Trigger */}
                    <div
                        className="relative group h-full flex items-center cursor-pointer"
                        onMouseEnter={() => setActiveMegaMenu("products")}
                    >
                        <Link href="/products" className={`flex items-center gap-1.5 text-base md:text-lg font-bold tracking-widest uppercase transition-colors py-4 ${useWhiteText ? "text-white hover:text-white/80" : activeMegaMenu === "products" ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                            {t("products")} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "products" ? "rotate-180" : ""}`} />
                        </Link>
                    </div>

                    {/* Company Mega Menu Trigger */}
                    <div
                        className="relative group h-full flex items-center cursor-pointer"
                        onMouseEnter={() => setActiveMegaMenu("company")}
                    >
                        <div className={`flex items-center gap-1.5 text-base md:text-lg font-bold tracking-widest uppercase transition-colors py-4 ${useWhiteText ? "text-white hover:text-white/80" : activeMegaMenu === "company" ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                            {t("company")} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "company" ? "rotate-180" : ""}`} />
                        </div>
                    </div>

                    {/* Resources Mega Menu Trigger */}
                    <div
                        className="relative group h-full flex items-center cursor-pointer"
                        onMouseEnter={() => setActiveMegaMenu("resources")}
                    >
                        <div className={`flex items-center gap-1.5 text-base md:text-lg font-bold tracking-widest uppercase transition-colors py-4 ${useWhiteText ? "text-white hover:text-white/80" : activeMegaMenu === "resources" ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                            {t("resources")} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "resources" ? "rotate-180" : ""}`} />
                        </div>
                    </div>
                </nav>

                {/* Global CTAs */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Language Switcher */}
                    <div className="relative" ref={langMenuRef}>
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors ${useWhiteText ? "text-white/90 hover:text-white" : "text-slate-700 hover:text-brand-600"}`}
                        >
                            <Globe className="w-4 h-4" />
                            <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langMenuOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {langMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-3 w-44 bg-white border border-slate-200 shadow-xl overflow-hidden z-50"
                                >
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => switchLocale(lang.code)}
                                            className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors
                                                ${locale === lang.code
                                                    ? "bg-brand-50 text-brand-600 border-l-2 border-brand-600"
                                                    : "text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                                                }`}
                                        >
                                            <span className="text-lg">{lang.flag}</span>
                                            <span>{lang.label}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        href="/contact?intent=quote"
                        className="group flex items-center gap-3 px-6 py-3 bg-brand-600 text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-slate-900 transition-colors duration-300"
                    >
                        {t("requestQuote")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden p-2 transition-colors ${useWhiteText ? "text-white" : "text-slate-900"}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* --- MEGA MENU DROPDOWNS --- */}
            <AnimatePresence>
                {activeMegaMenu === "products" && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side: Featured / Hero */}
                                <div className="col-span-4 bg-slate-50 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="https://cdn.sanity.io/images/m2e07kon/production/652824310cdbe7f4c48eb5a887974abb33dc32fe-1000x667.jpg"
                                            alt="IFAN Products"
                                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 backdrop-blur-sm text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
                                            {tp("badge")}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                                            {tp("title")}
                                        </h3>
                                        <p className="text-slate-600 font-medium text-sm">
                                            {tp("desc")}
                                        </p>
                                    </div>
                                    <Link href="/products" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 p-6 pt-0 relative z-10 group/link">
                                        {t("downloadCatalog")}
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Right Side: Flowing Grid (Categorized) */}
                                <div className="col-span-8 grid grid-cols-5 gap-x-8 gap-y-8">
                                    {productCategories.map((category, i) => (
                                        <div key={i} className={`flex flex-col relative ${i === 0 ? "col-span-2" : "col-span-1"}`}>
                                            {/* Vertical Divider */}
                                            {i !== productCategories.length - 1 && (
                                                <div className="absolute -right-4 top-0 bottom-0 w-px bg-slate-100 hidden lg:block"></div>
                                            )}

                                            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100 pr-4">
                                                <div className="w-8 h-8 bg-brand-50 flex items-center justify-center text-brand-600 rounded">
                                                    {category.icon}
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900">
                                                    {category.title}
                                                </h4>
                                            </div>
                                            <ul className={`flex-grow pr-4 ${i === 0 ? "columns-2 gap-x-6" : "space-y-0"}`}>
                                                {category.items.map((item, j) => (
                                                    <li key={j} className="break-inside-avoid">
                                                        <Link
                                                            href={item.link}
                                                            className="group flex items-center justify-between py-2 border-b border-transparent hover:border-brand-100 transition-colors"
                                                        >
                                                            <div className="text-base font-bold text-slate-700 group-hover:text-brand-600 transition-colors">
                                                                {item.name}
                                                            </div>
                                                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand-500 transition-all duration-300" />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* View All */}
                                <div className="col-span-4 lg:block hidden"></div>
                                <div className="col-span-12 lg:col-span-8 pt-4 border-t border-slate-100 flex justify-end">
                                    <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm uppercase tracking-widest transition-colors group">
                                        {t("viewAll")}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Company Mega Menu */}
                {activeMegaMenu === "company" && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side */}
                                <div className="col-span-4 bg-slate-50 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="https://cdn.sanity.io/images/m2e07kon/production/5396721f3133e7f2d01534d7950da9574bacf34d-1000x667.jpg"
                                            alt="IFAN Manufacturing"
                                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 backdrop-blur-sm text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
                                            {tc("badge")}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                                            {tc("title")}
                                        </h3>
                                        <p className="text-slate-600 font-medium text-sm">
                                            {tc("desc")}
                                        </p>
                                    </div>
                                    <Link href="/about-us" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 p-6 pt-0 relative z-10 group/link">
                                        {t("learnMore")}
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Right Side: Flowing Grid */}
                                <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-8">
                                    {companyCategories.map((category, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
                                                <div className="w-8 h-8 bg-brand-50 flex items-center justify-center">
                                                    {category.icon}
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900">
                                                    {category.title}
                                                </h4>
                                            </div>
                                            <ul className="space-y-3 flex-grow">
                                                {category.items.map((item, j) => (
                                                    <li key={j}>
                                                        <Link
                                                            href={item.link}
                                                            className="group block"
                                                        >
                                                            <div className="text-base font-bold text-slate-700 group-hover:text-brand-600 transition-colors">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-sm text-slate-500 mt-0.5">
                                                                {item.desc}
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Resources Mega Menu */}
                {activeMegaMenu === "resources" && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side */}
                                <div className="col-span-4 bg-slate-50 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="https://cdn.sanity.io/images/m2e07kon/production/5c41f82ca6e6bd6cd73a70f538ea5160ccf0bfaf-1000x667.jpg"
                                            alt="IFAN Resources"
                                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 backdrop-blur-sm text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
                                            {tr("badge")}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                                            {tr("title")}
                                        </h3>
                                        <p className="text-slate-600 font-medium text-sm">
                                            {tr("desc")}
                                        </p>
                                    </div>
                                    <Link href="/news" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 p-6 pt-0 relative z-10 group/link">
                                        {t("viewInsights")}
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Right Side: Flowing Grid */}
                                <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-8">
                                    {resourcesCategories.map((category, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-100">
                                                <div className="w-8 h-8 bg-brand-50 flex items-center justify-center">
                                                    {category.icon}
                                                </div>
                                                <h4 className="text-lg font-bold text-slate-900">
                                                    {category.title}
                                                </h4>
                                            </div>
                                            <ul className="space-y-3 flex-grow">
                                                {category.items.map((item, j) => (
                                                    <li key={j}>
                                                        <Link
                                                            href={item.link}
                                                            className="group block"
                                                        >
                                                            <div className="text-base font-bold text-slate-700 group-hover:text-brand-600 transition-colors">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-sm text-slate-500 mt-0.5">
                                                                {item.desc}
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {/* Language switcher for mobile */}
                            <div className="pb-4 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Language / 语言</p>
                                <div className="flex flex-wrap gap-2">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { switchLocale(lang.code); setMobileMenuOpen(false); }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border transition-colors
                                                ${locale === lang.code
                                                    ? "bg-brand-600 text-white border-brand-600"
                                                    : "bg-white text-slate-700 border-slate-200 hover:border-brand-600 hover:text-brand-600"
                                                }`}
                                        >
                                            {lang.flag} {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pb-4 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t("categories")}</p>
                                <div className="space-y-6">
                                    {productCategories.map((category, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center gap-3 text-slate-800 font-bold">
                                                <div className="w-8 h-8 bg-brand-50 flex items-center justify-center">
                                                    {category.icon}
                                                </div>
                                                {category.title}
                                            </div>
                                            <div className="pl-11 space-y-2">
                                                {category.items.map((item, j) => (
                                                    <Link key={j} href={item.link} className="block text-sm text-slate-600 hover:text-brand-600">
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pb-4 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t("company")}</p>
                                <div className="space-y-6">
                                    {companyCategories.map((category, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center gap-3 text-slate-800 font-bold">
                                                <div className="w-8 h-8 bg-brand-50 flex items-center justify-center">
                                                    {category.icon}
                                                </div>
                                                {category.title}
                                            </div>
                                            <div className="pl-11 space-y-2">
                                                {category.items.map((item, j) => (
                                                    <Link key={j} href={item.link} className="block text-sm text-slate-600 hover:text-brand-600">
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pb-4 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t("resources")}</p>
                                <div className="space-y-6">
                                    {resourcesCategories.map((category, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center gap-3 text-slate-800 font-bold">
                                                <div className="w-8 h-8 bg-brand-50 flex items-center justify-center">
                                                    {category.icon}
                                                </div>
                                                {category.title}
                                            </div>
                                            <div className="pl-11 space-y-2">
                                                {category.items.map((item, j) => (
                                                    <Link key={j} href={item.link} className="block text-sm text-slate-600 hover:text-brand-600">
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Link href="/contact" className="bg-brand-600 text-white p-4 font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-3 text-center mt-4">
                                {t("requestQuote")} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
