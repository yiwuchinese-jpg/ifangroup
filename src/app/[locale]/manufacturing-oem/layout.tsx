import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        // 品牌后缀由 [locale]/layout 的 title.template 追加。
        title: "OEM Plumbing Manufacturer & Factory Direct",
        description: "Direct access to our 120,000m² factory. Skip the middleman for PPR, PEX, and brass valves. We provide zero-defect OEM/ODM customization and bulk wholesale pricing.",
        keywords: ["OEM plumbing manufacturer China", "Brass valve factory direct", "PPR pipe factory", "ODM plumbing supplies", "China plumbing wholesale"],
        alternates: localeAlternates(locale, "/manufacturing-oem"),
    };
}

export default function ManufacturingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
