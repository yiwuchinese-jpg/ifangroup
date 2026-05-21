import type { Metadata } from "next";
import Script from "next/script";
import LatinAmericaPlumbingLanding from "@/components/landing/LatinAmericaPlumbingLanding";

export const metadata: Metadata = {
  title: "Wholesale Plumbing & Pipe Products Supplier for Latin America | IFAN Group",
  description:
    "Source PE/HDPE, PPR, PVC and PPH pipes, plumbing fittings, brass valves and multilayer pipe systems for Latin American distributors and project buyers.",
  alternates: {
    canonical: "https://ifanholding.com/latin-america-plumbing-supplier",
    languages: {
      en: "https://ifanholding.com/latin-america-plumbing-supplier",
      es: "https://ifanholding.com/es/proveedor-plomeria-america-latina",
      "x-default": "https://ifanholding.com/latin-america-plumbing-supplier",
    },
  },
  openGraph: {
    title: "Wholesale Plumbing & Pipe Products Supplier for Latin America",
    description:
      "PE/HDPE, PPR, PVC and PPH pipes, plumbing fittings, brass valves and multilayer pipe systems for B2B buyers.",
    url: "https://ifanholding.com/latin-america-plumbing-supplier",
    siteName: "IFAN Group",
    images: [
      {
        url: "https://ifanholding.com/latin-america-plumbing/product-pe-pp.jpg",
        width: 1200,
        height: 800,
        alt: "IFAN wholesale PE and HDPE pipe products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function LatinAmericaPlumbingSupplierPage() {
  return (
    <>
      <Script
        id="latin-america-plumbing-google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('event', 'conversion', {
              'send_to': 'AW-18159357442/3eAGCLaeqK0cEIKch9ND',
              'value': 1.0,
              'currency': 'CNY'
            });
          `,
        }}
      />
      <LatinAmericaPlumbingLanding language="en" />
    </>
  );
}
