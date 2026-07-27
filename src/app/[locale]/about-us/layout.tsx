import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        // 品牌后缀由 [locale]/layout 的 title.template 追加。
        // GSC：本页 90 天 181 次曝光、排名 6.6、点击 0，词全是「ifan group」「ifan company」
        // 「ifan official website」「what is ifan」。品牌搜索者要的是「这是不是那家公司」的确认，
        // 原标题以「Engineering Global Fluid Systems」开头，没回答这个问题，所以没人点。
        // absolute：本页标题已含品牌，不能再让 [locale]/layout 的 template 追加一次「| IFAN Group」。
        title: { absolute: "About IFAN Group | Pipe & Valve Maker Since 1993" },
        description:
            "IFAN Group (Zhuji Fengfan Piping) has made PPR, HDPE, uPVC and PEX pipe plus brass valves in Zhejiang since 1993. 120,000 m², 600+ staff, 120+ markets.",
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
