import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        // 品牌后缀由 [locale]/layout 的 title.template 追加。
        title: "Engineering Global Fluid Systems | About Us",
        description: "Why we exist: to engineer safe, reliable global fluid systems. Discover how our 30 years of relentless manufacturing optimization has built the world's most trusted plumbing portfolio.",
        keywords: ["IFAN Group history", "Plumbing manufacturer background", "Global fluid systems engineering", "B2B plumbing corporate"],
        alternates: localeAlternates(locale, "/about-us"),
    };
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
