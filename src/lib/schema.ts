// Shared JSON-LD schema builder for IFAN architecture pages.
// Emits an @graph with Organization + Service + BreadcrumbList, and an optional FAQPage
// (only pass faqs when the same Q&A is VISIBLE on the page, per Google's structured-data policy).

const SITE = "https://www.ifanholding.com";

export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
/** 官方网站声明页。Organization.subjectOf 指向它，让「谁是官方」这件事
 *  在结构化数据里也有一个可解析的落点，而不只是正文里的一句话。 */
export const OFFICIAL_PAGE_ID = `${SITE}/official-website#webpage`;

type Faq = { q: string; a: string };

/**
 * 全站唯一的 Organization 节点。
 *
 * 之前首页自己内联了一个没有 @id 的 ManufacturingBusiness，和这里的 #organization
 * 互不相认——等于告诉谷歌「ifanholding.com 上有两个实体」，正好和我们要做的
 * 实体收敛相反。所有页面必须复用这一个节点。
 */
function organizationNode(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    // GSC 显示非博客页的曝光几乎全部来自品牌词（ifan / ifan group / ifan ppr / ifan company），
    // 而「ifan」只排到 9.5。把实体属性写足，是让谷歌把 ifanholding.com 认成 IFAN 本体的直接手段。
    name: "IFAN Group",
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
    // 1000 = 三个厂区合计。此前首页写 1000+、这里写 600、业务员站写 610，
    // 三处打架。事实冲突会直接压低实体置信度，口径必须全站一致。
    numberOfEmployees: { "@type": "QuantitativeValue", value: 1000 },
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
    // 至少 8 个站点声称属于同一个法人（ifanpiping.com 等），AI 只能挑最老的那个。
    // subjectOf 把官方网站声明页挂进实体本身，机器读 Organization 时会一并拿到它。
    subjectOf: { "@id": OFFICIAL_PAGE_ID },
    // sameAs 是实体消歧最强的信号。「ifan」是个高歧义词（还有风扇品牌、同名机构），
    // 官方账号列得越全，谷歌越容易把 ifanholding.com 认成 IFAN 本体。
    // LinkedIn 用数字 ID 形式：公开可访问且永久有效，改 vanity slug 也不会失效。
    // TODO 待补：Alibaba 旺铺、Google Business Profile（方法论 2.9 列为 P0）。
    // 注意：这份清单必须和 officialSite.ts 的 OFFICIAL_CHANNELS 保持一致——
    // 页面上可见的「官方账号」和结构化数据对不上，等于自己削弱消歧信号。
    sameAs: [
      "https://www.youtube.com/@IFANGroup-plumbing",
      "https://www.facebook.com/IFANPlus13656666030",
      "https://www.linkedin.com/company/99164793/",
    ],
  };
}

function websiteNode(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: "IFAN Group",
    alternateName: "IFAN",
    publisher: { "@id": ORG_ID },
    inLanguage: ["en", "es", "pt", "ru", "ar", "fr"],
  };
}

function faqNode(faqs: Faq[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

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
    organizationNode(),
    websiteNode(),
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
    graph.push(faqNode(opts.faqs));
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * 官方网站声明页专用图谱。
 *
 * 和 buildPageSchema 的区别：这页卖的不是某项服务，而是「哪个域名是官方」这条事实，
 * 所以用 WebPage 承载，并让 Organization.subjectOf 反向指回来形成闭环。
 * FAQPage 是这页最重要的部分——AI 助手实际抓取和复述的就是这些问答对，
 * 所以问题必须写成用户真会问的原句（"Is ifanpiping.com the official IFAN website?"）。
 */
export function buildOfficialSiteSchema(opts: {
  locale: string;
  url: string; // 当前语言的完整 URL
  name: string;
  description: string;
  breadcrumbName: string;
  faqs: Faq[];
}) {
  const graph: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(),
    {
      "@type": "WebPage",
      // @id 固定用英文 URL：六个语言版本讲的是同一件事，指向同一个 WebPage 实体，
      // 由 hreflang 负责语言分发。
      "@id": OFFICIAL_PAGE_ID,
      url: opts.url,
      name: opts.name,
      description: opts.description,
      inLanguage: opts.locale,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntity: { "@id": ORG_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: opts.breadcrumbName, item: opts.url },
      ],
    },
    faqNode(opts.faqs),
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}
