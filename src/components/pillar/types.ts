/**
 * 支柱页的 section 类型定义。
 *
 * 设计要点：PillarSection 是判别联合，PillarSections.tsx 用穷尽 switch 渲染。
 * 新增一种 section 而忘了处理，是编译错误而不是运行时空白——
 * 这是防止再出现「每个落地页各自硬编码 1000 行」的机制性保障。
 */

/** 规格表一行。verified=false 的行不渲染——宁可表短，也不摆未经确认的数字。 */
export interface SpecRow {
    label: string;
    value: string;
    note?: string;
    verified: boolean;
}

export interface CompareRow {
    label: string;
    ifan: string;
    alternative: string;
}

export interface FaqItem {
    q: string;
    a: string;
}

export interface ApplicationItem {
    title: string;
    body: string;
    /** 图标名而非组件——保持数据模块可序列化，能安全跨 RSC 边界传递 */
    icon?: string;
    sizeHint?: string;
}

export interface StandardItem {
    code: string;
    scope: string;
    /** 证书编号；没有就别写，买家无法核验的认证等于没写 */
    certNumber?: string;
    verified: boolean;
}

export interface LinkRef {
    href: string;
    label: string;
    blurb?: string;
}

export type PillarSection =
    | { type: "prose"; id: string; heading: string; body: string[]; aside?: string }
    | { type: "specTable"; id: string; heading: string; intro?: string; rows: SpecRow[]; caption?: string }
    | {
          type: "comparison";
          id: string;
          heading: string;
          intro?: string;
          rows: CompareRow[];
          alternativeLabel: string;
      }
    | { type: "applications"; id: string; heading: string; intro?: string; items: ApplicationItem[] }
    | { type: "standards"; id: string; heading: string; intro?: string; items: StandardItem[] }
    | { type: "faq"; id: string; heading: string; items: FaqItem[] }
    | { type: "relatedReading"; id: string; heading: string; links: LinkRef[] }
    | { type: "relatedProducts"; id: string; heading: string; sanityCategoryTitles: string[]; limit?: number }
    | { type: "cta"; id: string; primaryHref: string; secondaryHref: string };

/** PillarSections 一次性解析、向下传递的界面文案，避免每个子组件都 await 一次 */
export interface PillarLabels {
    specification: string;
    value: string;
    criterion: string;
    ifan: string;
    verifiedCert: string;
    viewAllProducts: string;
    ctaHeading: string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
}
