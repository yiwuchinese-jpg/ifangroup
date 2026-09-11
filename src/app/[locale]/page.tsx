import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import BrandShowcase from "@/components/home/BrandShowcase";
import FactoryScale from "@/components/home/FactoryScale";
import ProductionSimulator from "@/components/home/ProductionSimulator";
import MaterialScience from "@/components/home/MaterialScience";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import GlobalFootprint from "@/components/home/GlobalFootprint";
import Footer from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";
import { localeAlternates, localeUrl } from "@/lib/seo";
import { buildPageSchema } from "@/lib/schema";

export const revalidate = 0; // 强制刷新数据，不在此处缓存

// 首页 canonical + 六语言 hreflang + 按语言的 title/description。
// 此前 title/description 继承 [locale]/layout 的英文默认值，/es /pt 等页面
// 吐的是英文标题配西语 H1——GSC 里西班牙、葡萄牙的品牌词曝光都撞在这上面。
// absolute 是为了绕开 layout 的 "%s | IFAN Group" 模板，否则品牌名会出现两次。
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "home.meta" });
    const title = t("title");
    const description = t("description");
    return {
        title: { absolute: title },
        description,
        alternates: localeAlternates(locale, ""),
        openGraph: {
            title,
            description,
            url: localeUrl(locale, ""),
            siteName: "IFAN Group",
            type: "website",
            // openGraph 在 Next 的 metadata 合并里是整体覆盖，不写这项就会丢掉 layout 的 OG 图。
            images: [
                {
                    url: "https://cdn.sanity.io/images/m2e07kon/production/0e0247d4fdac183d018fe72ec7b5079243abf18b-1000x562.jpg",
                    width: 1200,
                    height: 630,
                    alt: "IFAN Group Manufacturing Facility",
                },
            ],
        },
    };
}

// 首页此前内联了一个自己的 ManufacturingBusiness：没有 @id、sameAs 是空数组、
// 员工数写 1000+ 而 schema.ts 写 600。结果是全站最重要的一页在告诉谷歌
// 「ifanholding.com 上还有第二个实体」，正好和我们要做的实体收敛相反。
// 现在改走全站共用的 #organization 节点，首页不再自造实体。
const jsonLd = buildPageSchema({
    path: "/",
    breadcrumbName: "Home",
    serviceName: "Plumbing Pipe, Fitting & Valve Manufacturing — IFAN Group",
    serviceType: "B2B wholesale manufacturing of PPR, PEX, PVC, HDPE pipes and brass valves",
    serviceDescription:
        "Factory-direct manufacturing of PPR, PEX, PVC, CPVC, HDPE and PE-RT pipes and fittings, brass fittings and brass valves from a 120,000 m² facility in Zhuji, Zhejiang, China. Exporting B2B to 120+ countries since 1993.",
    areaServed: ["Worldwide"],
});

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <Hero />
            <BrandShowcase />
            <FactoryScale />
            <ProductionSimulator />
            <MaterialScience />
            <GlobalFootprint />
            <FeaturedCollections />
            <Footer />
        </div>
    );
}
