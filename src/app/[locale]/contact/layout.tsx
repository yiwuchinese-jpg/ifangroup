import type { Metadata } from "next";
import { localeAlternates, localeUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        // 品牌后缀由 [locale]/layout 的 title.template 追加。
        title: "Contact Us | B2B Inquiry",
        description:
            "Contact IFAN Group for factory-direct B2B wholesale pricing, OEM manufacturing inquiries, and regional distributorship applications. Our sales director responds within 12 hours.",
        keywords: [
            "IFAN Group contact",
            "B2B plumbing inquiry",
            "plumbing OEM wholesale contact China",
            "factory direct plumbing supplier",
            "IFAN sales team",
        ],
        openGraph: {
            title: "Contact IFAN Group | Factory-Direct B2B Inquiry",
            description:
                "Skip the middleman. Contact our regional sales directors directly for wholesale pricing, OEM manufacturing, and custom project procurement.",
            url: localeUrl(locale, "/contact"),
        },
        alternates: localeAlternates(locale, "/contact"),
    };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
