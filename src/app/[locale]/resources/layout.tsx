import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

// 页面本身是 "use client"，metadata 从这个 layout 提供。
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Technical Data & Engineering Insights | Resources",
        description: "Download IFAN Group product catalogs, technical data sheets, and engineering documentation for PPR, PEX, PVC, brass valves and multilayer pipe systems.",
        keywords: ["plumbing catalog download", "PPR technical data sheet", "pipe fitting specifications", "IFAN product catalog", "plumbing engineering resources"],
        alternates: localeAlternates(locale, "/resources"),
    };
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
