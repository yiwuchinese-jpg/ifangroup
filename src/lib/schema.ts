// Shared JSON-LD schema builder for IFAN architecture pages.
// Emits an @graph with Organization + Service + BreadcrumbList, and an optional FAQPage
// (only pass faqs when the same Q&A is VISIBLE on the page, per Google's structured-data policy).

const SITE = "https://www.ifanholding.com";

export const ORG_ID = `${SITE}/#organization`;

type Faq = { q: string; a: string };

export function buildPageSchema(opts: {
  path: string; // e.g. "/products"
  breadcrumbName: string; // e.g. "Products"
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  areaServed?: string[];
  faqs?: Faq[];
}) {
  const url = `${SITE}${opts.path}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "IFAN Group",
      // GSC 显示非博客页的曝光几乎全部来自品牌词（ifan / ifan group / ifan ppr / ifan company），
      // 而「ifan」只排到 9.5。把实体属性写足，是让谷歌把 ifanholding.com 认成 IFAN 本体的直接手段。
      legalName: "Zhuji Fengfan Piping Co., Ltd",
      alternateName: ["IFAN", "IFAN Group", "IFANHOLDING", "诸暨风帆管业有限公司"],
      url: SITE,
      logo: `${SITE}/icon.png`,
      foundingDate: "1993",
      description:
        "Chinese manufacturer of PPR, PVC, HDPE and PEX pipes, fittings and brass valves, exporting B2B wholesale to 120+ countries.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "IFAN Industrial Park, Diankou Town",
        addressLocality: "Zhuji",
        addressRegion: "Zhejiang",
        addressCountry: "CN",
      },
      numberOfEmployees: { "@type": "QuantitativeValue", value: 600 },
      knowsAbout: [
        "PPR pipe manufacturing",
        "HDPE pipe manufacturing",
        "uPVC drainage systems",
        "PEX and PE-RT underfloor heating",
        "CW617N brass valves",
      ],
      brand: [
        { "@type": "Brand", name: "IFAN" },
        { "@type": "Brand", name: "IFANPLUS" },
        { "@type": "Brand", name: "IFANPRO" },
        { "@type": "Brand", name: "IFANNova" },
        { "@type": "Brand", name: "IFANUltra" },
      ],
      hasCredential: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "CE", "SGS", "WRAS"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["en", "es", "pt", "ru", "ar", "fr"],
        url: `${SITE}/contact`,
      },
      areaServed: "Worldwide",
      // sameAs 是实体消歧最强的信号。「ifan」是个高歧义词（还有风扇品牌、同名机构），
      // 官方账号列得越全，谷歌越容易把 ifanholding.com 认成 IFAN 本体。
      // LinkedIn 用数字 ID 形式：公开可访问且永久有效，改 vanity slug 也不会失效。
      // TODO 待补：Alibaba 旺铺、Google Business Profile（方法论 2.9 列为 P0）。
      sameAs: [
        "https://www.youtube.com/@IFANGroup-plumbing",
        "https://www.facebook.com/IFANPlus13656666030",
        "https://www.linkedin.com/company/99164793/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "IFAN Group",
      alternateName: "IFAN",
      publisher: { "@id": ORG_ID },
      inLanguage: ["en", "es", "pt", "ru", "ar", "fr"],
    },
    {
      "@type": "Service",
      name: opts.serviceName,
      serviceType: opts.serviceType,
      provider: { "@id": ORG_ID },
      areaServed: opts.areaServed ?? ["Africa", "Latin America", "Middle East", "Southeast Asia"],
      description: opts.serviceDescription,
      url,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: opts.breadcrumbName, item: url },
      ],
    },
  ];
  if (opts.faqs && opts.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: opts.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
