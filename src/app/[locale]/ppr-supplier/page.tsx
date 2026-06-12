import type { Metadata } from "next";
import PPRLanding from "@/components/landing/PPRLanding";

const englishUrl = "https://ifanholding.com/ppr-supplier";

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
        url: "https://ifanholding.com/images/ppr-landing/横幅海报7.webp",
        width: 1200,
        height: 800,
        alt: "IFAN PPR pipes and fittings for African B2B buyers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function PPRSupplierPage() {
  return <PPRLanding />;
}
