import { client } from "@/lib/sanity";
import { allBrandsQuery } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandSolarSystemClient from "./BrandSolarSystemClient";

export const revalidate = 0;

export const metadata = {
    title: "Our Brands Matrix | IFAN Group",
    description: "Explore the comprehensive brand matrix of IFAN Group, including our premium European series and core plumbing solutions.",
};

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
