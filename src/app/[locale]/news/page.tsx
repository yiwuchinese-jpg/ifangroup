import { client } from "@/lib/sanity";
import { allArticlesQuery } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsArchiveClient from "@/components/news/NewsArchiveClient";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "News & Insights | Plumbing Industry Trends | IFAN Group",
    description: "Latest news, industry insights, and technical articles from IFAN Group - a global leader in premium plumbing systems. Stay ahead with market analyses, product launches, and engineering breakthroughs.",
    keywords: ["plumbing industry news", "PPR pipe market trends", "B2B plumbing insights", "IFAN Group news", "plumbing manufacturer updates"],
    alternates: {
        canonical: "https://ifanholding.com/en/news",
        languages: {
            en: "https://ifanholding.com/en/news",
            es: "https://ifanholding.com/es/news",
            pt: "https://ifanholding.com/pt/news",
            ru: "https://ifanholding.com/ru/news",
            ar: "https://ifanholding.com/ar/news",
            fr: "https://ifanholding.com/fr/news",
        },
    },
};

export default async function NewsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const articles = await client.fetch(allArticlesQuery);
    const t = await getTranslations({ locale, namespace: 'news_page' });

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow bg-slate-50">
                {/* Immersive Spaceful-style Hero - Tighter Layout */}
                <section className="relative w-full min-h-[40vh] lg:min-h-[50vh] flex items-center justify-start overflow-hidden bg-slate-900 border-b border-slate-200 pt-24 lg:pt-32 pb-16 lg:pb-20 mb-12 lg:mb-16">
                    {/* Background Image / Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="https://cdn.sanity.io/images/m2e07kon/production/ca99458f91d585c2c71fd9a9ba4d3b1c843948d5-1000x750.jpg"
                            alt="IFAN Global Insights"
                            className="w-full h-full object-cover opacity-75 select-none scale-105"
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className="max-w-4xl">
                            <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold tracking-[0.3em] uppercase text-[10px] px-3 py-1.5 mb-8">
                                {t("hero.badge")}
                            </span>

                            <h1
                                className="text-5xl sm:text-6xl lg:text-[7rem] font-black text-white tracking-tighter leading-[0.9] uppercase mb-8 animate-fade-in-up"
                            >
                                {t("hero.title1")} <br className="hidden md:block" />
                                <span className="text-brand-500">{t("hero.title2")}</span>
                            </h1>

                            <p
                                className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed"
                            >
                                {t("hero.desc")}
                            </p>
                        </div>
                    </div>
                </section>

                <NewsArchiveClient initialArticles={articles} />
            </main>

            <Footer />
        </div>
    );
}
