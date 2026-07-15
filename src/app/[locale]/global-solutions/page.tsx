import GlobalSolutionsClient from"@/components/solutions/GlobalSolutionsClient";
import Navbar from"@/components/layout/Navbar";
import { localeAlternates } from "@/lib/seo";
import { buildPageSchema } from "@/lib/schema";

const jsonLd = buildPageSchema({
  path: "/global-solutions",
  breadcrumbName: "Global Solutions",
  serviceName: "B2B Plumbing Sourcing Solutions",
  serviceType: "B2B plumbing sourcing and supply solutions",
  serviceDescription:
    "Factory-direct plumbing sourcing solutions for distributors, contractors, project buyers and retailers — PPR, PVC, HDPE, PEX and brass valves from one manufacturer, strictly B2B wholesale.",
  areaServed: ["Worldwide"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params;
 return {
  title: "Global B2B Plumbing Solutions by Region",
  description: "Explore IFAN Group's interactive regional solutions map. Engineered plumbing systems for MENA, Europe, North America, CIS, Asia, and Latin America — each tailored for local climate and compliance standards.",
  keywords: ["global plumbing solutions", "regional piping systems", "MENA plumbing manufacturer", "Europe PEX supplier", "B2B plumbing global", "IFAN regional solutions"],
  alternates: localeAlternates(locale, "/global-solutions"),
 };
}

export default function GlobalSolutionsPage() {
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
 <main className="w-full h-screen bg-slate-900 border-b border-transparent">
 {/* The entire page is a viewport-height canvas container */}
 <Navbar />
 <GlobalSolutionsClient />
 </main>
 </>
 );
}
