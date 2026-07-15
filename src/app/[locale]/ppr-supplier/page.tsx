import type { Metadata } from "next";
import PPRLanding from "@/components/landing/PPRLanding";
import { pprFaq } from "@/components/landing/pprData";

const englishUrl = "https://www.ifanholding.com/ppr-supplier";

export const metadata: Metadata = {
  title: "PPR Pipes and Fittings Manufacturer & Supplier",
  description:
    "Factory direct supply of PPR pipes and fittings for plumbing, water supply and construction. Bulk orders, OEM, product catalog and export service for Ghana, Cameroon, Nigeria, Kenya and other African markets.",
  alternates: {
    canonical: englishUrl,
  },
  openGraph: {
    title: "PPR Pipe Manufacturer & Supplier for African Markets",
    description:
      "Factory direct PPR pipes and fittings for B2B buyers. Bulk orders, OEM, export service to Ghana, Cameroon, Nigeria, Kenya and across Africa.",
    url: englishUrl,
    siteName: "IFAN Group",
    images: [
      {
        url: "https://www.ifanholding.com/images/ppr-landing/横幅海报7.webp",
        width: 1200,
        height: 800,
        alt: "IFAN PPR pipes and fittings for African B2B buyers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.ifanholding.com/#organization",
      name: "IFAN Group",
      url: "https://www.ifanholding.com",
      logo: "https://www.ifanholding.com/icon.png",
      foundingDate: "1993",
      description:
        "Chinese manufacturer of PPR, PVC, HDPE and PEX pipes, fittings and brass valves, exporting B2B wholesale to 120+ countries.",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Zhejiang",
        addressCountry: "CN",
      },
      areaServed: "Worldwide",
      sameAs: ["https://www.youtube.com/@IFANGroup-plumbing"],
    },
    {
      "@type": "Service",
      name: "PPR Pipe & Fitting Manufacturing and Wholesale Supply",
      serviceType: "PPR pipe manufacturing and B2B export",
      provider: { "@id": "https://www.ifanholding.com/#organization" },
      areaServed: ["Africa", "Latin America", "Middle East", "Southeast Asia"],
      description:
        "Factory-direct PPR pipes (DN20–DN160, PN12.5–PN25) and fittings, 100% virgin PP-R to ISO 15874 and DIN 8077/8078, strictly B2B wholesale with MOQ of one mixed container.",
      url: englishUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: pprFaq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.ifanholding.com" },
        { "@type": "ListItem", position: 2, name: "PPR Supplier", item: englishUrl },
      ],
    },
  ],
};

export default function PPRSupplierPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PPRLanding />
    </>
  );
}
