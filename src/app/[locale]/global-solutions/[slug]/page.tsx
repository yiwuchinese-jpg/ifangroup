import { REGIONS_DATA } from"@/lib/regionsData";
import { notFound } from"next/navigation";
import Navbar from"@/components/layout/Navbar";
import Footer from"@/components/layout/Footer";
import SolutionDetailClient from"@/components/solutions/SolutionDetailClient";

export function generateStaticParams() {
 return REGIONS_DATA.map((region) => ({
 slug: region.id,
 }));
}

export async function generateMetadata(
 props: { params: Promise<{ slug: string }> }
) {
 const params = await props.params;
 const regionData = REGIONS_DATA.find((r) => r.id === params.slug);
 if (!regionData) return { title:"Solution Not Found"};
 return {
 title: `${regionData.name} Pipeline Solutions | IFAN Global Hub`,
 description: regionData.details.intro,
 };
}

export default async function RegionSolutionPage(
 props: { params: Promise<{ slug: string }> }
) {
 const params = await props.params;
 const regionData = REGIONS_DATA.find((r) => r.id === params.slug);

 if (!regionData) {
 notFound();
 }

 return (
 <div className="w-full min-h-screen bg-white">
 <Navbar />
 <SolutionDetailClient region={regionData} />
 <Footer />
 </div>
 );
}
