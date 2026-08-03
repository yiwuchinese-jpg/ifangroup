import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { CategoryTarget } from "@/lib/internalLinks";

/**
 * 文章正文收口处的品类桥接卡片。
 *
 * 正文内链解决「读到一半想看货」，这块解决「读完了往哪走」——此前文章末尾只有相关文章卡片，
 * 读者在博客层内部循环，永远到不了 money page。
 *
 * 文案复用 categories.items.<slug> 命名空间（六语言全译），不新增品类文案维护面。
 */
export default async function CategoryBridge({
    targets,
    locale,
}: {
    targets: CategoryTarget[];
    locale: string;
}) {
    if (targets.length === 0) return null;

    const t = await getTranslations({ locale, namespace: "categories" });
    const tn = await getTranslations({ locale, namespace: "news" });

    return (
        <aside className="mt-16 pt-8 border-t-2 border-slate-200">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-3">
                {tn("bridgeLabel")}
            </div>
            <p className="text-lg font-bold text-slate-900 mb-6">{tn("bridgeHeading")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-slate-200">
                {targets.map((target) => (
                    <Link
                        key={target.slug}
                        href={`/categories/${target.slug}`}
                        className="group flex flex-col border-b border-r border-slate-200 p-6 hover:bg-slate-50 transition-colors"
                    >
                        <span className="text-base font-black uppercase tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                            {t(`items.${target.slug}.heroTitle`)}
                        </span>
                        <span className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                            {t(`items.${target.slug}.tagline`)}
                        </span>
                        <span className="mt-auto inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[10px] text-slate-900 group-hover:text-brand-600 transition-colors">
                            {tn("bridgeCta")}
                            <ArrowRight
                                className="w-3 h-3 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                                aria-hidden
                            />
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
