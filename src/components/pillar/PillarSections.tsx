import { getTranslations } from "next-intl/server";
import ProseSection from "./ProseSection";
import SpecTable from "./SpecTable";
import ComparisonTable from "./ComparisonTable";
import ApplicationGrid from "./ApplicationGrid";
import StandardsPanel from "./StandardsPanel";
import FaqAccordion from "./FaqAccordion";
import RelatedReading from "./RelatedReading";
import RelatedProducts from "./RelatedProducts";
import CtaBand from "./CtaBand";
import type { PillarLabels, PillarSection } from "./types";

/**
 * 支柱页正文的渲染器。
 *
 * switch 是穷尽的：新增一种 PillarSection 而这里没处理，tsc 会在 exhaustive 检查处报错，
 * 而不是页面上悄悄少一块。这是「不再出现第 4 个硬编码落地页」的机制保障。
 *
 * 界面文案在这里一次性解析后向下传，子组件保持同步 server component，
 * 避免每个小组件各自 await 一次 getTranslations。
 */
export default async function PillarSections({
    sections,
    locale,
}: {
    sections: PillarSection[];
    locale: string;
}) {
    const t = await getTranslations({ locale, namespace: "pillar" });
    const labels: PillarLabels = {
        specification: t("specTable.specification"),
        value: t("specTable.value"),
        criterion: t("comparison.criterion"),
        ifan: t("comparison.ifan"),
        verifiedCert: t("standards.certNumber"),
        viewAllProducts: t("relatedProducts.viewAll"),
        ctaHeading: t("cta.heading"),
        ctaBody: t("cta.body"),
        ctaPrimary: t("cta.primary"),
        ctaSecondary: t("cta.secondary"),
    };

    return (
        <>
            {sections.map((s, i) => {
                // 背景深浅交替，靠索引而不是写死在数据里
                const tone = i % 2 ? ("muted" as const) : ("light" as const);

                switch (s.type) {
                    case "prose":
                        return <ProseSection key={s.id} {...s} tone={tone} />;
                    case "specTable":
                        return <SpecTable key={s.id} {...s} labels={labels} tone={tone} />;
                    case "comparison":
                        return <ComparisonTable key={s.id} {...s} labels={labels} tone={tone} />;
                    case "applications":
                        return <ApplicationGrid key={s.id} {...s} tone={tone} />;
                    case "standards":
                        return <StandardsPanel key={s.id} {...s} labels={labels} tone={tone} />;
                    case "faq":
                        return <FaqAccordion key={s.id} {...s} tone={tone} />;
                    case "relatedReading":
                        return <RelatedReading key={s.id} {...s} tone={tone} />;
                    case "relatedProducts":
                        return <RelatedProducts key={s.id} {...s} labels={labels} tone={tone} />;
                    case "cta":
                        return <CtaBand key={s.id} {...s} labels={labels} />;
                    default: {
                        // 漏处理某个 section 类型时，这里会变成编译错误
                        const never: never = s;
                        return never;
                    }
                }
            })}
        </>
    );
}
