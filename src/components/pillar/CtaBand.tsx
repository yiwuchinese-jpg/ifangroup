import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/** 支柱页与短版页共用的收口 CTA，文案走 i18n，六语言都有。 */
export default function CtaBand({
    id,
    primaryHref,
    secondaryHref,
    labels,
}: {
    id: string;
    primaryHref: string;
    secondaryHref: string;
    labels: { ctaHeading: string; ctaBody: string; ctaPrimary: string; ctaSecondary: string };
}) {
    return (
        <section id={`section-${id}`} className="py-16 lg:py-24 bg-slate-950">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white mb-5">
                    {labels.ctaHeading}
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-10">{labels.ctaBody}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href={primaryHref}
                        className="group inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors"
                    >
                        {labels.ctaPrimary}
                        <ArrowRight
                            className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                            aria-hidden
                        />
                    </Link>
                    <Link
                        href={secondaryHref}
                        className="inline-flex items-center justify-center gap-3 border border-white/25 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
                    >
                        {labels.ctaSecondary}
                    </Link>
                </div>
            </div>
        </section>
    );
}
