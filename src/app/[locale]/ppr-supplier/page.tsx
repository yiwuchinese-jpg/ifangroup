import type { Metadata } from "next";
import PPRLanding from "@/components/landing/PPRLanding";

const englishUrl = "https://ifanholding.com/ppr-supplier";

export const metadata: Metadata = {
  title: "China's Lowest Price PPR Pipe & Fittings Manufacturer | IFAN Group",
  description:
    "PPR pipes DIN 8077/8078, fittings, valves, PPR-AL-PPR composite pipes and floor heating systems for B2B importers, distributors and contractors. Factory direct pricing in China.",
  alternates: {
    canonical: englishUrl,
  },
  openGraph: {
    title: "China's Lowest Price PPR Pipe & Fittings Manufacturer",
    description:
      "PPR pipes, fittings, valves and composite systems for B2B buyers. Factory direct pricing, DIN 8077/8078 certified.",
    url: englishUrl,
    siteName: "IFAN Group",
    images: [
      {
        url: "https://ifanholding.com/images/ppr-landing/横幅海报7.jpeg",
        width: 1200,
        height: 800,
        alt: "IFAN PPR pipes and fittings for B2B buyers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function PPRSupplierPage() {
  return <PPRLanding />;
}
