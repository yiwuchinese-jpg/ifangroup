import { client } from "@/lib/sanity";
import ProductListClient from "./ProductListClient";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import Link from "next/link";
import { 
    Box, 
    Droplets, 
    Settings, 
    ShieldCheck, 
    Award, 
    Globe, 
    CheckCircle2, 
    ArrowRight, 
    PhoneCall, 
    PackageSearch,
    Factory
} from "lucide-react";

export const metadata: Metadata = {
    title: "10,000+ Plumbing SKUs | Specs, Sizes & Volume Pricing",
    description: "Search, filter, and instantly access technical specifications for 10,000+ IFAN Group plumbing components. Build your bulk quote directly from our factory matrix.",
    keywords: ["PPR pipe sizes", "Brass valve specifications", "Plumbing bulk pricing", "IFAN wholesale catalog", "Plumbing specifications search"],
};

// Force dynamic rendering or shorter revalidation to ensure fresh Sanity data is visible
export const revalidate = 0;

export default async function ProductsPage() {
    // Fetch all products, including their brand name, category title, main image, and variants.
    const products = await client.fetch(`*[_type =="product"] | order(name asc) {
 _id,
 name,
"slug": slug.current,
"categoryTitle": category->title,
"brandName": brand->name,
 description,
 mainImage {
 asset->{
 url
 }
 },
 variants[] {
 _key,
 code,
 size,
 packing,
 weight,
 volume
 }
 }`);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow bg-slate-50">
                {/* Immersive Spaceful-style Hero */}
                <section className="relative w-full min-h-[500px] lg:min-h-[70vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-32 lg:pt-40 pb-24 lg:pb-32 mb-20 lg:mb-32">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="/images/static/products-hero.webp"
                            alt="IFAN Global Engineering Components"
                            className="w-full h-full object-cover opacity-30 select-none scale-105"
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className="max-w-5xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
                                Global Supply Chain
                            </span>

                            <h1
                                className="text-5xl sm:text-6xl lg:text-[8.5rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12 animate-fade-in-up"
                            >
                                Product <br className="hidden md:block" />
                                <span className="text-brand-500">Matrix.</span>
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed"
                            >
                                Explore our comprehensive engineering components. Select products to view deep technical specifications, tolerances, and packaging metrics. Contact our enterprise team for volume manufacturing quotes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 1. Brand & Category Quick-Jump Matrix */}
                <section className="relative -mt-32 lg:-mt-48 z-20 mb-16">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                            {[
                                { name: "PPR Systems", icon: Droplets, link: "/categories/ppr", desc: "Potable Water & Heating" },
                                { name: "PEX Series", icon: Box, link: "/categories/pex", desc: "Radiant Floor Heating" },
                                { name: "Brass Valves", icon: Settings, link: "/categories/brass-valves", desc: "Heavy-Duty Control" },
                                { name: "PE Fittings", icon: PackageSearch, link: "/categories/pe", desc: "Municipal & Industrial" }
                            ].map((cat, i) => (
                                <Link href={cat.link} key={i} className="group bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-slate-100 hover:border-brand-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl mb-6 flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                        <cat.icon className="w-6 h-6 text-slate-400 group-hover:text-brand-600 transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">{cat.name}</h3>
                                    <p className="text-slate-500 text-sm">{cat.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. EEAT Global Trust Banner */}
                <section className="bg-white border-y border-slate-200 py-16 mb-16">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100 text-center md:text-left">
                            {[
                                { title: "10,000+", desc: "Active SKUs", icon: <PackageSearch className="w-6 h-6 text-brand-600" /> },
                                { title: "30+ Years", desc: "Manufacturing", icon: <Factory className="w-6 h-6 text-brand-600" /> },
                                { title: "100% Quality", desc: "ISO 9001 Tested", icon: <CheckCircle2 className="w-6 h-6 text-brand-600" /> },
                                { title: "Global Scale", desc: "Exporting to 120+ Countries", icon: <Globe className="w-6 h-6 text-brand-600" /> }
                            ].map((stat, i) => (
                                <div key={i} className={`flex flex-col items-center md:items-start ${i !== 0 ? 'md:pl-12' : ''}`}>
                                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mb-6">
                                        {stat.icon}
                                    </div>
                                    <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{stat.title}</h4>
                                    <p className="text-slate-500 font-medium">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 md:px-6 mb-24">
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Complete Catalog Directory</h2>
                        <p className="text-slate-500 text-lg">Use the filters below to browse our full inventory of piping and fitting solutions.</p>
                    </div>
                    <ProductListClient initialProducts={products} />
                </div>

                {/* 3. Signature Manufacturing Showcase */}
                <section className="bg-slate-50 py-24 border-t border-slate-200 overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="w-full lg:w-1/2">
                                <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                                    Factory Direct Advantage
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
                                    Scale Your Operations with the Source Factory.
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    Why deal with middlemen when you can partner directly with the manufacturer? With over 3 decades of extrusion and molding expertise, IFAN guarantees unprecedented quality control, massive scalable capacity, and unbeatable wholesale margins for global distributors.
                                </p>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Automated German Extrusion Lines",
                                        "In-House Mold Engineering & Tooling",
                                        "Rigorous Hydrostatic Pressure Testing Labs"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full lg:w-1/2">
                                {/* Large visual grid to represent 'Factory' scale */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="w-full h-64 bg-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                        <img src="/images/static/products-factory.webp" alt="Factory Floor" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="grid grid-rows-2 gap-4 h-64">
                                        <div className="w-full bg-brand-600 rounded-3xl overflow-hidden shadow-lg p-6 flex flex-col justify-between text-white hover:bg-brand-700 transition-colors">
                                            <Award className="w-8 h-8 opacity-80" />
                                            <div>
                                                <div className="text-3xl font-black mb-1">Top 1%</div>
                                                <div className="text-sm font-medium opacity-80 uppercase tracking-wider">in Manufacturing</div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-3xl overflow-hidden shadow-lg">
                                            <img src="/images/static/products-lab.webp" alt="Laboratory Testing" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Bottom Wholesale CTA */}
                <section className="bg-slate-900 py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/static/products-pattern.webp')] opacity-5 mix-blend-screen bg-cover bg-center"></div>
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-900 to-transparent"></div>
                    <div className="absolute inset-0 bg-brand-600/10 mix-blend-overlay"></div>
                    
                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                            Need Bulk Pricing?
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
                            Skip the retail margins. Connect with our enterprise sales engineering team to configure your next 40HQ container load with direct factory pricing.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <Link
                                href="/contact"
                                className="bg-brand-600 text-white px-10 py-5 rounded-full font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-slate-900 transition-all flex items-center gap-3 w-full sm:w-auto justify-center shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)]"
                            >
                                Get a Quote
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a
                                href="tel:+861234567890"
                                className="bg-transparent border border-slate-700 text-white px-10 py-5 rounded-full font-bold tracking-[0.1em] uppercase hover:border-brand-500 hover:text-brand-400 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                            >
                                <PhoneCall className="w-5 h-5" />
                                Sales Hotline
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
