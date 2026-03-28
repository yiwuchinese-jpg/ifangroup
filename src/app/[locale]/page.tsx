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
        "@type": "ManufacturingBusiness",
        "name": "IFAN Group",
        "url": "https://ifanholding.com",
        "logo": "https://ifanholding.com/logo-green.png",
        "description": "Leading global manufacturer of PPR, PEX, and Brass plumbing systems. Founded in 1993, operating a 120,000m² smart factory in Zhuji, Zhejiang, China. Exporting to 120+ countries with ISO 9001, CE, and WRAS certifications.",
        "foundingDate": "1993",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": "1000+" },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "IFAN Industrial Park, Diankou Town",
            "addressLocality": "Zhuji",
            "addressRegion": "Zhejiang",
            "addressCountry": "CN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "email": "sales@ifangroup.com",
            "availableLanguage": ["English", "Chinese", "Spanish", "French", "Arabic", "Portuguese", "Russian"]
        },
        "sameAs": []
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
