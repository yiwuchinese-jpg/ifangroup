import { client } from "@/lib/sanity";
import { allBrandsQuery } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import BrandSolarSystemClient from "./BrandSolarSystemClient";
import { localeAlternates } from "@/lib/seo";
import { buildPageSchema } from "@/lib/schema";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        // GSC：90 天 131 曝光 / 2 点击，主词是「ifan」(28 曝光, pos 36.8) 和「ifan logo」。
        // 原标题 69 字符会被截断，且以「Our Brand Portfolio」开头，品牌搜索者看不出这是官方页。
        title: { absolute: "IFAN Brands: IFANPlus, IFANPRO, IFANNova & IFANUltra" },
        description:
            "The official IFAN Group brand family: IFAN, IFANPlus, IFANPRO, IFANNova and IFANUltra — which brand serves which market, and what each covers.",
        keywords: ["IFAN brand", "IFANPlus premium plumbing", "IFANPRO West Africa", "plumbing brand portfolio", "B2B plumbing brands China"],
        alternates: localeAlternates(locale, "/brands"),
    };
}

// 品牌页此前没有任何 JSON-LD。「ifan」这个词的曝光有一部分落在这页（印度 SERP 排到第 33），
// 页面自己却不声明它属于哪个实体。这里复用全站共用的 #organization 节点——
// 它已经带 brand 子实体（IFAN / IFANPLUS / IFANPRO / IFANNova / IFANUltra），
// 正好和这页的内容对应，不另造实体。
const jsonLd = buildPageSchema({
    path: "/brands",
    breadcrumbName: "Brands",
    serviceName: "IFAN Group Brand Portfolio",
    serviceType: "Plumbing product brands: PPR, PEX, PVC, HDPE pipes, fittings and brass valves",
    serviceDescription:
        "The official IFAN Group brand family — IFAN, IFANPlus, IFANPRO, IFANNova and IFANUltra — and which market each brand serves.",
    areaServed: ["Worldwide"],
});

export default async function BrandsDirectoryPage() {
    const brands = await client.fetch(allBrandsQuery);

    return (
        <div className="flex h-screen w-full flex-col bg-slate-950 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
