import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getToolById, toolsData } from "@/lib/data/tools";
import { client } from "@/lib/sanity";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolSliderViewer from "@/components/tools/ToolSliderViewer";

const locales = ['en', 'es', 'pt', 'ru', 'ar', 'fr'];

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    Object.keys(toolsData).map((id) => ({ locale, id }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return {
    title: `${t("title", { id })} | IFAN Group`,
    description: `Official operation manual and tutorial video for IFAN tool ${id}.`,
  };
}

export default async function ToolManualStraightPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // 1. Try to fetch dynamic data from Sanity CMS first
  // The schema is expected to be: _type: "toolManual", slug.current: id, videoId, steps: [ { step, image(url), textEn, marketingCopy } ]
  let sanityData = null;
  try {
    sanityData = await client.fetch(
      `*[_type == "toolManual" && slug.current == $id][0]{
        "id": slug.current,
        videoId,
        steps[] {
          step,
          "image": image.asset->url,
          textEn,
          marketingCopy
        }
      }`,
      { id }
    );
  } catch (error) {
    console.error("Sanity fetch failed, falling back to local static JSON", error);
  }

  // 2. Fallback to local hardcoded configurations if CMS data is missing (User hasn't created the document yet)
  const tool = sanityData || getToolById(id);

  if (!tool) {
    notFound();
  }

  const t = await getTranslations("tools");
  const pageTitle = t("title", { id });

  // Pack translations for the Client Component
  const labels = {
    video: t("video"),
    manual: t("manual"),
    next: "Next Step",
    prev: "Previous",
    complete: "Task Complete",
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/87/10px_Grid.svg')] bg-opacity-20 relative">
        <div className="absolute inset-0 bg-white/95 z-0"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-[1600px] relative z-10">
          
          {/* Breadcrumb / Title Area */}
          <div className="mb-6 pt-6 border-b-2 border-slate-900 pb-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase relative inline-block">
              {pageTitle}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-slate-600 font-bold uppercase tracking-widest text-xs">
              <span className="px-2 py-1 bg-slate-100 border border-slate-300">System Operations Manual</span>
            </div>
          </div>

          <ToolSliderViewer 
            videoId={tool.videoId}
            steps={tool.steps}
            totalSteps={tool.steps.length}
            labels={labels}
            locale={locale}
          />
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
