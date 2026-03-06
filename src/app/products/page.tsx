import { client } from"@/lib/sanity";
import ProductListClient from"./ProductListClient";
import Navbar from"@/components/layout/Navbar";
import Footer from"@/components/layout/Footer";
import { Metadata } from"next";

export const metadata: Metadata = {
 title:"10,000+ Plumbing SKUs | Specs, Sizes & Volume Pricing",
 description:"Search, filter, and instantly access technical specifications for 10,000+ IFAN Group plumbing components. Build your bulk quote directly from our factory matrix.",
 keywords: ["PPR pipe sizes","Brass valve specifications","Plumbing bulk pricing","IFAN wholesale catalog","Plumbing specifications search"],
};

// Revalidate every hour or adapt as needed for ISR
export const revalidate = 3600;

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
 src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
 alt="IFAN Global Engineering Components"
 className="w-full h-full object-cover opacity-30 select-none scale-105"
 draggable={false}
 />
 <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40"/>
 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"/>
 </div>

 <div className="container mx-auto px-6 max-w-7xl relative z-10">
 <div className="max-w-5xl">
 <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
 Global Supply Chain
 </span>

 <h1
 className="text-5xl sm:text-6xl lg:text-[8.5rem] font-bold text-white tracking-tighter leading-[0.9] uppercase mb-12 animate-fade-in-up"
 >
 Product <br className="hidden md:block"/>
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

 <div className="container mx-auto px-4 md:px-6">
 <ProductListClient initialProducts={products} />
 </div>
 </main>

 <Footer />
 </div>
 );
}
