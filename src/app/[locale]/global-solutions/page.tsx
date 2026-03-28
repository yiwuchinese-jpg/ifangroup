import GlobalSolutionsClient from"@/components/solutions/GlobalSolutionsClient";
import Navbar from"@/components/layout/Navbar";

export const metadata = {
 title: "Global B2B Plumbing Solutions by Region | IFAN Group",
 description: "Explore IFAN Group's interactive regional solutions map. Engineered plumbing systems for MENA, Europe, North America, CIS, Asia, and Latin America — each tailored for local climate and compliance standards.",
 keywords: ["global plumbing solutions", "regional piping systems", "MENA plumbing manufacturer", "Europe PEX supplier", "B2B plumbing global", "IFAN regional solutions"],
 alternates: {
  canonical: "https://ifanholding.com/en/global-solutions",
  languages: {
   en: "https://ifanholding.com/en/global-solutions",
   es: "https://ifanholding.com/es/global-solutions",
   pt: "https://ifanholding.com/pt/global-solutions",
   ru: "https://ifanholding.com/ru/global-solutions",
   ar: "https://ifanholding.com/ar/global-solutions",
   fr: "https://ifanholding.com/fr/global-solutions",
  },
 },
};

export default function GlobalSolutionsPage() {
 return (
 <main className="w-full h-screen bg-slate-900 border-b border-transparent">
 {/* The entire page is a viewport-height canvas container */}
 <Navbar />
 <GlobalSolutionsClient />
 </main>
 );
}
