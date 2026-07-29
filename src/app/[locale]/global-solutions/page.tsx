import GlobalSolutionsClient from"@/components/solutions/GlobalSolutionsClient";
import Navbar from"@/components/layout/Navbar";
import { Link } from "@/i18n/navigation";
import { REGIONS_DATA } from "@/lib/regionsData";
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
 {/*
  服务端渲染的区域索引。上面那个 WebGL 地球仪是纯客户端的，服务端 HTML 里
  一条 href 都没有——实测整页 SSR 只有 52 个词，导致 6 个区域子页里有 4 个
  长期停在「已发现—当前未编入索引」。爬虫和读屏软件都要靠这一段才能到达子页。
  放在 main 之后而不是内部，避免干扰 h-screen 的画布布局。
 */}
 <section className="w-full bg-slate-900 px-6 py-16" aria-label="Regional solutions index">
 <div className="mx-auto max-w-5xl">
 <h2 className="text-2xl font-medium text-white">Solutions by region</h2>
 <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
 IFAN engineers each piping system around the conditions it has to survive — desert UV and
 desalinated water in the Gulf, freeze-thaw cycles in the CIS, and the certification regimes
 that gate approval in each market. Select a region for the specifications, standards and
 material choices that apply there.
 </p>
 <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {REGIONS_DATA.map((region) => (
 <li key={region.id}>
 <Link
 href={`/global-solutions/${region.id}`}
 className="block h-full border border-slate-700 bg-slate-800/60 p-5 transition-colors hover:border-slate-400"
 >
 <span className="block text-base font-medium text-white">{region.name}</span>
 <span className="mt-2 block text-sm leading-relaxed text-slate-300">{region.feature}</span>
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </section>
 </>
 );
}
