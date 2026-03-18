import GlobalSolutionsClient from"@/components/solutions/GlobalSolutionsClient";
import Navbar from"@/components/layout/Navbar";

export const metadata = {
 title:"Global Solutions | IFAN Group",
 description:"Interactive regional pipeline solutions mapped for optimal B2B engineering and infrastructure compliance worldwide.",
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
