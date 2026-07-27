import type { FaqItem, PillarSection } from "@/components/pillar/types";
import type { CategorySlug } from "./index";

/**
 * 品类支柱页的数据契约。每个品类一个文件，放在 ./pillars/ 下。
 *
 * 事实纪律，对应方法论 2.11 的两类划分：
 *  ① 只有 IFAN 知道的事实（尺寸范围 / 产能 / MOQ / 证书编号 / 客户案例）
 *     —— 要么由用户在 产品规划/整站支柱层-P1/00-信息收集表.md 填实，
 *        要么取自本站已发布的博客（那已经是公司对外口径，取用时须在注释里标出处）。
 *        两者都没有的，一律 verified:false，组件层直接不渲染。
 *  ② 可核验的行业通识（ISO 12162 的 MRS 分级、SDR↔PN 换算、熔接原理、EN 1401 管刚度）
 *     —— 现在就写成带数字的实，这正是 Helpful Content 与 AI 引用要的信息增益。
 */
export interface CategoryPillar {
    slug: CategorySlug;
    seo: { title: string; description: string };
    schema: { serviceName: string; serviceType: string; serviceDescription: string };
    sections: PillarSection[];
    /** 与可见 FAQ 区同源，单独提出来喂 FAQPage JSON-LD，保证两者不漂移 */
    faqs: FaqItem[];
}
