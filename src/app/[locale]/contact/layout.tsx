import type { Metadata } from "next";
import { localeAlternates, localeUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        // 品牌后缀由 [locale]/layout 的 title.template 追加。
        // 12 小时回复承诺是本页最强的点击钩子，放进标题而不是埋在描述里。
        title: { absolute: "Contact IFAN Group | Factory Quote in 12 Hours" },
        description:
            "Factory-direct wholesale pricing, OEM enquiries and distributorships. Send sizes, pressure class and volume — engineering desk replies in 12 hours.",
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
