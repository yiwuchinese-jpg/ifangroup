"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, Droplets, Flame, Hexagon, Component, Factory, Diamond, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Mega Menu Data (Categorized)
    const productCategories = [
        {
            title: "Pipes & Fittings",
            icon: <Component className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "PPR", link: "/categories/ppr" },
                { name: "Brass Fittings", link: "/categories/brass-fittings" },
                { name: "PP", link: "/categories/pp" },
                { name: "PVC", link: "/categories/pvc" },
                { name: "PPH", link: "/categories/pph" },
                { name: "HDPE", link: "/categories/hdpe" },
                { name: "Stainless Steel Press Fittings", link: "/categories/stainless-press" },
            ]
        },
        {
            title: "HVAC",
            icon: <Flame className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "Brass Valves & Manifolds", link: "/categories/hvac-valves" },
                { name: "PEX / PPSU", link: "/categories/pex-ppsu" },
                { name: "PEXA", link: "/categories/pexa" },
            ]
        },
        {
            title: "Gas",
            icon: <Hexagon className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "Gas System Products", link: "/categories/gas-systems" },
                { name: "Stainless Steel Corrugated Pipes", link: "/categories/stainless-corrugated" },
            ]
        },
        {
            title: "Sanitary",
            icon: <Droplets className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "Angle Valves & Hoses", link: "/categories/angle-valves" },
                { name: "Faucets & Accessories", link: "/categories/faucets" },
            ]
        }
    ];

    const companyCategories = [
        {
            title: "About IFAN",
            icon: <Factory className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "Our Story", link: "/about-us", desc: "30+ years of manufacturing excellence" },
                { name: "Global Solutions", link: "/global-solutions", desc: "Enterprise project capabilities" },
                { name: "Our Brands", link: "/brands", desc: "Explore our brand portfolio" },
            ]
        },
        {
            title: "Capabilities",
            icon: <Diamond className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "OEM & Manufacturing", link: "/manufacturing-oem", desc: "Custom production and scale" },
                { name: "Quality & Certifications", link: "/about-us#certifications", desc: "International standards" },
            ]
        }
    ];

    const resourcesCategories = [
        {
            title: "Insights & Media",
            icon: <Globe className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "News & Insights", link: "/news", desc: "Latest updates and industry trends" },
                { name: "Media Center", link: "/media", desc: "Press releases and videos" },
            ]
        },
        {
            title: "Support",
            icon: <Droplets className="w-5 h-5 text-brand-600" />,
            items: [
                { name: "Contact Us", link: "/contact", desc: "Get in touch with our team" },
                { name: "Download Center", link: "/resources", desc: "Catalogs and technical documents" },
            ]
        }
    ];

    const pathname = usePathname();
    // Determine if we need white text based on pathname and scroll state
    const useWhiteText = (pathname === "/" || pathname === "/global-solutions") && !isScrolled && !activeMegaMenu;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || activeMegaMenu
                ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-4"
                : (pathname === "/" || pathname === "/global-solutions") ? "bg-transparent py-6" : "bg-white py-4 border-b border-slate-200"
                }`}
            onMouseLeave={() => setActiveMegaMenu(null)}
        >
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
                        <div className={`flex items-center gap-1.5 text-base md:text-lg font-bold tracking-widest uppercase transition-colors py-4 ${useWhiteText ? "text-white hover:text-white/80" : activeMegaMenu === "products" ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                            Products <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "products" ? "rotate-180" : ""}`} />
                        </div>
                    </div>

                    {/* Company Mega Menu Trigger */}
                    <div
                        className="relative group h-full flex items-center cursor-pointer"
                        onMouseEnter={() => setActiveMegaMenu("company")}
                    >
                        <div className={`flex items-center gap-1.5 text-base md:text-lg font-bold tracking-widest uppercase transition-colors py-4 ${useWhiteText ? "text-white hover:text-white/80" : activeMegaMenu === "company" ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                            Company <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "company" ? "rotate-180" : ""}`} />
                        </div>
                    </div>

                    {/* Resources Mega Menu Trigger */}
                    <div
                        className="relative group h-full flex items-center cursor-pointer"
                        onMouseEnter={() => setActiveMegaMenu("resources")}
                    >
                        <div className={`flex items-center gap-1.5 text-base md:text-lg font-bold tracking-widest uppercase transition-colors py-4 ${useWhiteText ? "text-white hover:text-white/80" : activeMegaMenu === "resources" ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                            Resources <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "resources" ? "rotate-180" : ""}`} />
                        </div>
                    </div>
                </nav>

                {/* Global CTAs */}
                <div className="hidden lg:flex items-center gap-6">
                    <button className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors ${useWhiteText ? "text-white/90 hover:text-white" : "text-slate-700 hover:text-brand-600"}`}>
                        <Globe className="w-4 h-4" /> EN
                    </button>

                    <Link
                        href="/contact?intent=quote"
                        className="group flex items-center gap-3 px-6 py-3 bg-brand-600 text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-slate-900 transition-colors duration-300"
                    >
                        Request Quote
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side: Featured / Hero */}
                                <div className="col-span-4 bg-slate-50 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="/images/static/nav-products-bg.webp"
                                            alt="IFAN Products"
                                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 backdrop-blur-sm text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
                                            Featured Catalog
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                                            The Complete 2024 Product Universe
                                        </h3>
                                        <p className="text-slate-600 font-medium text-sm">
                                            Over 10,000 SKUs covering every aspect of modern plumbing and heating infrastructure.
                                        </p>
                                    </div>
                                    <Link href="/products" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 p-6 pt-0 relative z-10 group/link">
                                        Download Full PDF Catalog
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

                                {/* View All - Spans 8 columns on a new virtual wrapper, empty 4 on the left */}
                                <div className="col-span-4 lg:block hidden"></div>
                                <div className="col-span-12 lg:col-span-8 pt-4 border-t border-slate-100 flex justify-end">
                                    <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm uppercase tracking-widest transition-colors group">
                                        View All Categories
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side */}
                                <div className="col-span-4 bg-slate-50 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="/images/static/nav-company-bg.webp"
                                            alt="IFAN Manufacturing"
                                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 backdrop-blur-sm text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
                                            Our Legacy
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                                            Building the Future of Infrastructure
                                        </h3>
                                        <p className="text-slate-600 font-medium text-sm">
                                            With over three decades of manufacturing excellence, IFAN Group delivers innovative piping solutions globally.
                                        </p>
                                    </div>
                                    <Link href="/about-us" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 p-6 pt-0 relative z-10 group/link">
                                        Learn More About IFAN
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6">
                            <div className="grid grid-cols-12 gap-8">
                                {/* Left Side */}
                                <div className="col-span-4 bg-slate-50 border border-slate-100 flex flex-col justify-between overflow-hidden relative group">
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="/images/static/nav-resources-bg.webp"
                                            alt="IFAN Resources"
                                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
                                    </div>
                                    <div className="p-6 relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100/80 backdrop-blur-sm text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
                                            Knowledge Base
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                                            Insights & Documentation
                                        </h3>
                                        <p className="text-slate-600 font-medium text-sm">
                                            Access our comprehensive library of technical documents, industry news, and product resources.
                                        </p>
                                    </div>
                                    <Link href="/news" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 p-6 pt-0 relative z-10 group/link">
                                        View All Insights
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
                            <div className="pb-4 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</p>
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
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Company</p>
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
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resources</p>
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
                                Request a Quote <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
