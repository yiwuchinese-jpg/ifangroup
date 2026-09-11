import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { localeAlternates, localeUrl } from "@/lib/seo";
import { buildOfficialSiteSchema } from "@/lib/schema";
import {
    getOfficialSiteCopy,
    VISIBLE_DOMAINS,
    OFFICIAL_CHANNELS,
    OFFICIAL_DOMAIN,
    STATEMENT_EFFECTIVE_DATE,
    HEAD_OFFICE_EMAIL,
} from "@/lib/officialSite";
import { CheckCircle2, XCircle, ShieldCheck, Mail } from "lucide-react";

const PATH = "/official-website";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const copy = getOfficialSiteCopy(locale);
    return {
        title: copy.metaTitle,
        description: copy.metaDescription,
        alternates: localeAlternates(locale, PATH),
        openGraph: {
            title: copy.metaTitle,
            description: copy.metaDescription,
            url: localeUrl(locale, PATH),
            siteName: "IFAN Group",
            type: "website",
        },
    };
}

export default async function OfficialWebsitePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const copy = getOfficialSiteCopy(locale);

    const jsonLd = buildOfficialSiteSchema({
        locale,
        url: localeUrl(locale, PATH),
        name: copy.metaTitle,
        description: copy.metaDescription,
        breadcrumbName: copy.breadcrumb,
        faqs: copy.faqs,
    });

    return (
        <div className="flex min-h-screen flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            {/* Hero —— lede 是这页最重要的一句话，AI 摘录时抓的就是它，
                所以单独放大、放在 h1 正下方，不要被任何修饰性文案挤开。 */}
            <section className="bg-slate-950 text-white pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <p className="text-brand-500 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        {copy.eyebrow}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                        {copy.h1}
                    </h1>
                    <p className="text-xl md:text-2xl font-bold leading-snug text-brand-400 break-words">
                        {copy.lede}
                    </p>
                    <p className="mt-8 text-sm text-slate-500 font-medium">
                        {copy.effectiveLabel} {STATEMENT_EFFECTIVE_DATE} · IFAN Group ·{" "}
                        <a
                            href={`mailto:${HEAD_OFFICE_EMAIL}`}
                            className="hover:text-white transition-colors underline underline-offset-4"
                        >
                            {HEAD_OFFICE_EMAIL}
                        </a>
                    </p>
                </div>
            </section>

            <main className="flex-1 bg-white">
                <div className="container mx-auto px-6 max-w-4xl py-20 space-y-20">

                    {/* 声明正文 */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                            {copy.statementTitle}
                        </h2>
                        <div className="space-y-6">
                            {copy.statement.map((p, i) => (
                                <p key={i} className="text-slate-700 leading-relaxed text-lg">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* 为什么会有好几个站——先解释成因再点名，读起来是澄清而不是内斗 */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                            {copy.whyTitle}
                        </h2>
                        <div className="space-y-6">
                            {copy.whyBody.map((p, i) => (
                                <p key={i} className="text-slate-700 leading-relaxed text-lg">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* 域名对照表。只渲染 officialSite.ts 里 confirmed:true 的条目 */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                            {copy.registryTitle}
                        </h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">{copy.registryIntro}</p>

                        <div className="overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                            {copy.colDomain}
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                            {copy.colRole}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {VISIBLE_DOMAINS.map((d) => {
                                        const isOfficial = d.role === "official";
                                        return (
                                            <tr
                                                key={d.domain}
                                                className={`border-b border-slate-100 last:border-0 ${isOfficial ? "bg-brand-50/60" : ""}`}
                                            >
                                                <td className="px-6 py-5 font-mono text-sm font-bold text-slate-900 whitespace-nowrap">
                                                    {d.domain}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`inline-flex items-start gap-2 text-sm font-semibold ${isOfficial ? "text-brand-700" : "text-slate-500"}`}
                                                    >
                                                        {isOfficial ? (
                                                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                                                        ) : (
                                                            <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                        )}
                                                        {isOfficial ? copy.roleOfficial : copy.roleRep}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                            {copy.registryFootnote}
                        </p>
                    </section>

                    {/* 验证步骤 */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                            {copy.verifyTitle}
                        </h2>
                        <p className="text-slate-600 mb-10 leading-relaxed">{copy.verifyIntro}</p>
                        <ol className="space-y-8">
                            {copy.verifySteps.map((s, i) => (
                                <li key={i} className="flex gap-5">
                                    <span className="shrink-0 w-9 h-9 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{s.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* 官方账号。与 schema.ts 的 Organization.sameAs 同源 */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                            {copy.channelsTitle}
                        </h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">{copy.channelsIntro}</p>
                        <ul className="grid gap-4 sm:grid-cols-3">
                            {OFFICIAL_CHANNELS.map((c) => (
                                <li key={c.url}>
                                    <a
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer me"
                                        className="block rounded-xl border border-slate-200 px-5 py-4 hover:border-brand-500 hover:bg-brand-50/50 transition-colors"
                                    >
                                        <span className="block font-bold text-slate-900 text-sm">
                                            {c.label}
                                        </span>
                                        <span className="block text-xs text-slate-500 mt-1 truncate">
                                            {c.url.replace(/^https:\/\//, "")}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 给已有客户的话——不能砸自己的销售渠道，必须明说货是真的 */}
                    <section className="rounded-2xl bg-slate-50 border border-slate-200 p-8 md:p-10">
                        <h2 className="text-2xl font-black text-slate-900 mb-6">
                            {copy.buyersTitle}
                        </h2>
                        <div className="space-y-5">
                            {copy.buyersBody.map((p, i) => (
                                <p key={i} className="text-slate-700 leading-relaxed">
                                    {p}
                                </p>
                            ))}
                        </div>
                        <Link
                            href={copy.contactHref}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-7 py-3.5 text-sm font-bold hover:bg-brand-600 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            {copy.contactCta}
                        </Link>
                    </section>

                    {/* 可见 FAQ。必须和 FAQPage schema 逐条一致——
                        Google 的结构化数据政策要求问答在页面上可见 */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10">
                            {copy.faqTitle}
                        </h2>
                        <div className="space-y-8">
                            {copy.faqs.map((f, i) => (
                                <div key={i} className="border-b border-slate-100 pb-8 last:border-0">
                                    <h3 className="font-bold text-slate-900 text-lg mb-3">{f.q}</h3>
                                    <p className="text-slate-600 leading-relaxed">{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <p className="text-sm text-slate-400 font-medium">
                        {copy.effectiveLabel} {STATEMENT_EFFECTIVE_DATE} — IFAN Group,{" "}
                        {OFFICIAL_DOMAIN}
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
