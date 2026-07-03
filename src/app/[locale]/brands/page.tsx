import { client } from "@/lib/sanity";
import { allBrandsQuery } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import BrandSolarSystemClient from "./BrandSolarSystemClient";
import { localeAlternates } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: "Our Brand Portfolio | IFAN, IFANPlus, IFANPRO & More",
        description: "Explore the full IFAN Group brand portfolio: IFAN (global volume), IFANPlus (premium tier), IFANPRO (West Africa), IFANNova (French elegance), and IFANUltra (European standard). Each brand serves a distinct market segment.",
        keywords: ["IFAN brand", "IFANPlus premium plumbing", "IFANPRO West Africa", "plumbing brand portfolio", "B2B plumbing brands China"],
        alternates: localeAlternates(locale, "/brands"),
    };
}

export default async function BrandsDirectoryPage() {
    const brands = await client.fetch(allBrandsQuery);

    return (
        <div className="flex h-screen w-full flex-col bg-slate-950 overflow-hidden">
            {/* The Navbar floats on top */}
            <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <Navbar />
                </div>
            </div>

            {/* Immersive 3D Experience (Client Component Wrapper to bypass SSR limits) */}
            <main className="flex-grow w-full h-full relative">
                <BrandSolarSystemClient brands={brands} />
            </main>
        </div>
    );
}
