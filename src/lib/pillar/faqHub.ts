import type { FaqItem } from "@/components/pillar/types";
import { pprFaq } from "@/components/landing/pprData";
import { hdpePillar } from "./pillars/hdpe";
import { pvcPillar } from "./pillars/pvc";
import { valvesPillar } from "./pillars/valves";
import { pexPillar } from "./pillars/pex";

export interface FaqGroup {
    id: string;
    heading: string;
    /** 该组对应的品类页，读者看完想深入时的去处 */
    href: string;
    items: FaqItem[];
}

/**
 * FAQ 中心页的数据。各支柱页的 faqs 是单一来源，这里只做汇总，
 * 所以品类页改了问答，中心页自动跟着改，不会两边漂移。
 */
const RAW_GROUPS: FaqGroup[] = [
    { id: "ppr", heading: "PPR Piping", href: "/ppr-supplier", items: pprFaq },
    { id: "hdpe", heading: "HDPE / PE100 Pipe", href: "/categories/hdpe", items: hdpePillar.faqs },
    { id: "pvc", heading: "uPVC Drainage", href: "/categories/pvc", items: pvcPillar.faqs },
    { id: "valves", heading: "Brass Valves", href: "/categories/hvac-valves", items: valvesPillar.faqs },
    { id: "pex", heading: "PEX & PE-RT", href: "/categories/pex-ppsu", items: pexPillar.faqs },
];

/**
 * 跨组去重。
 * 同一个 Question name 在一个 FAQPage 里出现两次会压制富媒体结果，
 * 所以按问题文本归一化后只保留首次出现的那条。
 */
export function getFaqGroups(): FaqGroup[] {
    const seen = new Set<string>();
    return RAW_GROUPS.map((g) => ({
        ...g,
        items: g.items.filter((item) => {
            const key = item.q.trim().toLowerCase().replace(/\s+/g, " ");
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }),
    })).filter((g) => g.items.length > 0);
}

export function getAllFaqs(): FaqItem[] {
    return getFaqGroups().flatMap((g) => g.items);
}
