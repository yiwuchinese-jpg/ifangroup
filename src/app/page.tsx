import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import BrandShowcase from "@/components/home/BrandShowcase";
import FactoryScale from "@/components/home/FactoryScale";
import ProductionSimulator from "@/components/home/ProductionSimulator";
import MaterialScience from "@/components/home/MaterialScience";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import GlobalFootprint from "@/components/home/GlobalFootprint";
import Footer from "@/components/layout/Footer";

export const revalidate = 0; // 强制刷新数据，不在此处缓存

export default function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "IFAN Group",
        "url": "https://ifangroup.com",
        "logo": "https://ifangroup.com/logo.png", // replace with actual
        "description": "Leading global manufacturer of PPR, PEX, and Brass plumbing systems.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "CN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "sales@ifangroup.com"
        },
        "sameAs": [
            // Social Links here
        ]
    };

    return (
        <div className="flex min-h-screen flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <Hero />
            <BrandShowcase />
            <FactoryScale />
            <ProductionSimulator />
            <MaterialScience />
            <GlobalFootprint />
            <FeaturedCollections />
            <Footer />
        </div>
    );
}
