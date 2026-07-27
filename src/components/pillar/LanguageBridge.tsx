import { Languages, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { localeUrl } from "@/lib/seo";

/**
 * 非英文语言看到的桥接提示。
 *
 * 支柱正文是英文撰写的。与其拼一个「本语言标题 + 英文正文」的混搭页（体验差、
 * 也是 Google 眼里的质量问题），不如老实告诉用户完整技术版在英文站，并给一个直达链接。
 * 某语言正文真翻译完后，把它加进 PILLAR_BODY_LOCALES，这个提示自动消失。
 */
export default async function LanguageBridge({ locale, path }: { locale: string; path: string }) {
    const t = await getTranslations({ locale, namespace: "pillar.bridge" });

    return (
        <section className="py-12 bg-brand-50 border-y border-brand-100">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <Languages className="w-8 h-8 text-brand-600 shrink-0" aria-hidden />
                    <div className="flex-1">
                        <p className="text-lg font-bold text-slate-900">{t("title")}</p>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t("body")}</p>
                    </div>
                    <a
                        href={localeUrl("en", path)}
                        hrefLang="en"
                        className="group inline-flex items-center justify-center gap-2 shrink-0 bg-brand-600 text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-700 transition-colors"
                    >
                        {t("link")}
                        <ArrowRight
                            className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                            aria-hidden
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
