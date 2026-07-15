import type { Metadata } from "next";
import GlobalPlumbingLanding from "@/components/landing/GlobalPlumbingLanding";
import { globalPlumbingFaqs } from "@/components/landing/globalPlumbingData";
import { buildPageSchema } from "@/lib/schema";

const englishUrl = "https://www.ifanholding.com/global-plumbing-supplier";
const spanishUrl = "https://www.ifanholding.com/es/global-plumbing-supplier";

const jsonLd = buildPageSchema({
  path: "/global-plumbing-supplier",
  breadcrumbName: "Global Plumbing Supplier",
  serviceName: "Global B2B Plumbing Materials Supply & Export",
  serviceType: "Wholesale plumbing materials supply and export",
  serviceDescription:
    "Factory-direct PE/HDPE, PPR, PVC, PPH, PEX and brass valve systems for global distributors and importers, strictly B2B wholesale with a one-container MOQ.",
  areaServed: ["Worldwide"],
  faqs: globalPlumbingFaqs.map(([q, a]) => ({ q, a })),
});

export const metadata: Metadata = {
  title: "Global Wholesale Plumbing & Pipe Products Supplier",
  description:
    "Source PE/HDPE, PPR, PVC and PPH pipes, plumbing fittings, brass valves and multilayer pipe systems for global distributors, with product pricing positioned at the lowest China market level.",
  alternates: {
    canonical: englishUrl,
    languages: {
      en: englishUrl,
      es: spanishUrl,
      "x-default": englishUrl,
    },
  },
  openGraph: {
    title: "Global Wholesale Plumbing & Pipe Products Supplier",
    description:
      "IFAN plumbing products for global importers and distributors, direct from China factory.",
    url: englishUrl,
    siteName: "IFAN Group",
    images: [
      {
        url: "https://www.ifanholding.com/latin-america-plumbing/product-pe-pp.jpg",
        width: 1200,
        height: 800,
        alt: "IFAN wholesale pipe and plumbing products for global markets",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function GlobalPlumbingSupplierPage({ params }: PageProps) {
  await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlobalPlumbingLanding />
    </>
  );
}
