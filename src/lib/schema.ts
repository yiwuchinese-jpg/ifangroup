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
      url: SITE,
      logo: `${SITE}/icon.png`,
      foundingDate: "1993",
      description:
        "Chinese manufacturer of PPR, PVC, HDPE and PEX pipes, fittings and brass valves, exporting B2B wholesale to 120+ countries.",
      address: { "@type": "PostalAddress", addressRegion: "Zhejiang", addressCountry: "CN" },
      areaServed: "Worldwide",
      sameAs: ["https://www.youtube.com/@IFANGroup-plumbing"],
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
