import { client } from "@/lib/sanity";
import { brandBySlugQuery, productsByBrandQuery, relatedBrandsQuery } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import BrandClientPage from "./BrandClientPage";
import { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const brand = await client.fetch(brandBySlugQuery, { slug: resolvedParams.slug });

    if (!brand) return { title: "Brand Not Found" };

    // FAB SEO Framework
    // Feature: Brand Name | Advantage: High pressure, 50-year life | Benefit: Wholesale Supplier
    return {
        title: `${brand.name} | Premium Plumbing Systems & Wholesale Manufacturer`,
        description: `Source authentic ${brand.name} products direct from the factory. High-performance plumbing systems designed for 50-year lifespans. Increase your margins with our B2B wholesale pricing.`,
        keywords: [`${brand.name} wholesale`, `${brand.name} manufacturer`, "PPR pipe supplier", "Brass valves factory", "B2B plumbing exporter"],
        alternates: {
            canonical: `/brands/${resolvedParams.slug}`,
        }
    };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;

    // 1. Fetch Brand Data
    const brand = await client.fetch(brandBySlugQuery, { slug: resolvedParams.slug });

    console.log("=== BRAND API RESPONSE ===");
    console.log(JSON.stringify(brand, null, 2));

    if (!brand) {
        notFound();
    }

    // 2. Fetch Products for this specific brand
    const products = await client.fetch(productsByBrandQuery, { slug: resolvedParams.slug });

    // 3. Fetch Related Brands
    const relatedBrands = await client.fetch(relatedBrandsQuery, { slug: resolvedParams.slug });

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow">
                <BrandClientPage brand={brand} products={products} relatedBrands={relatedBrands} />
            </main>

            <Footer />
        </div>
    );
}

// Optional: static generation for known brands
const locales = ['en', 'es', 'pt', 'ru', 'ar', 'fr'];

export async function generateStaticParams() {
    try {
        const brands = await client.fetch(`*[_type =="brand"]{"slug": slug.current }`);
        const slugs = brands?.map((b: { slug: string }) => b.slug) || [];
        
        return locales.flatMap((locale) => 
            slugs.map((slug: string) => ({
                locale,
                slug,
            }))
        );
    } catch (error) {
        console.error("Brands generateStaticParams failed:", error);
        return [];
    }
}
