import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/pillar";
import { localeAlternates, localeUrl } from "@/lib/seo";
import { buildPageSchema } from "@/lib/schema";
import { hasLocalizedBody } from "@/lib/pillar";
import { getAllFaqs, getFaqGroups } from "@/lib/pillar/faqHub";

export const revalidate = 3600;

const TITLE = "Plumbing Sourcing FAQ | PPR, HDPE, uPVC, PEX, Brass";
const DESCRIPTION =
    "What B2B buyers actually ask before a first order: grades, standards, sizing, certification and jointing across PPR, HDPE, uPVC, PEX and brass valves.";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: { absolute: TITLE },
        description: DESCRIPTION,
        alternates: localeAlternates(locale, "/faq"),
        openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            url: localeUrl(locale, "/faq"),
            siteName: "IFAN Group",
        },
    };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const groups = getFaqGroups();

    // 与支柱页同一条纪律：问答是英文撰写的，非英文语言不渲染英文正文，
    // 也就不该输出 FAQPage schema（Google 要求 schema 内容在页面上可见）。
    const showBody = hasLocalizedBody(locale);
    const t = await getTranslations({ locale, namespace: "pillar" });

    const schema = showBody
        ? buildPageSchema({
              path: "/faq",
              breadcrumbName: "FAQ",
              serviceName: "B2B Plumbing Product Sourcing",
              serviceType: "Plumbing pipe, fitting and valve manufacturing",
              serviceDescription: DESCRIPTION,
              faqs: getAllFaqs(),
          })
        : null;

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
            <Navbar />

            <main className="flex-grow">
                <section className="bg-slate-950 pt-36 pb-20 lg:pt-44 lg:pb-24">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <span className="inline-block text-brand-400 font-bold tracking-[0.3em] uppercase text-xs mb-6">
                            Sourcing FAQ
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">
                            The questions buyers ask before the first order
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl">
                            Grades, standards, sizing, certification and jointing — grouped by material.
                            Every answer here is the same one our engineering desk gives on a call.
                        </p>
                    </div>
                </section>

                {showBody ? (
                    <>
                        {/* 组内导航：五个材料组，页面较长，给读者一个跳转入口 */}
                        <nav className="border-b border-slate-200 bg-slate-50 sticky top-0 z-30">
                            <div className="container mx-auto px-6 max-w-5xl flex gap-2 overflow-x-auto py-4">
                                {groups.map((g) => (
                                    <a
                                        key={g.id}
                                        href={`#section-faq-${g.id}`}
                                        className="shrink-0 px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-300 hover:border-brand-600 hover:text-brand-700 transition-colors"
                                    >
                                        {g.heading}
                                    </a>
                                ))}
                            </div>
                        </nav>

                        {groups.map((g, i) => (
                            <div key={g.id}>
                                <FaqAccordion
                                    id={`faq-${g.id}`}
                                    heading={g.heading}
                                    items={g.items}
                                    tone={i % 2 ? "muted" : "light"}
                                />
                                <div
                                    className={`${i % 2 ? "bg-slate-50" : "bg-white"} pb-14 -mt-8`}
                                >
                                    <div className="container mx-auto px-6 max-w-5xl">
                                        <Link
                                            href={g.href}
                                            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-700 hover:text-brand-800"
                                        >
                                            {g.heading} — full specification
                                            <ArrowRight
                                                className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                                                aria-hidden
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <section className="py-16 bg-brand-50 border-y border-brand-100">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <p className="text-lg font-bold text-slate-900">{t("bridge.title")}</p>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
                                {t("bridge.body")}
                            </p>
                            <a
                                href={localeUrl("en", "/faq")}
                                hrefLang="en"
                                className="mt-6 inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors"
                            >
                                {t("bridge.link")}
                            </a>
                        </div>
                    </section>
                )}

                <section className="py-16 lg:py-24 bg-slate-950">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white mb-5">
                            {t("cta.heading")}
                        </h2>
                        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-10">
                            {t("cta.body")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact?intent=wholesale"
                                className="group inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors"
                            >
                                {t("cta.primary")}
                                <ArrowRight
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                                    aria-hidden
                                />
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center gap-3 border border-white/25 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
                            >
                                {t("cta.secondary")}
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
