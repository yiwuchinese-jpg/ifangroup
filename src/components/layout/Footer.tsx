import Link from "next/link";
import { useTranslations } from "next-intl";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <img src="/logo-white.png" alt="IFAN Group" className="h-10 mb-8" />
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
                            {t("desc")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-brand-500" />
                             {t("products")}
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/categories/ppr" className="text-slate-400 hover:text-white transition-colors">{t("pprPipes")}</Link></li>
                            <li><Link href="/categories/pex-ppsu" className="text-slate-400 hover:text-white transition-colors">{t("compositePipes")}</Link></li>
                            <li><Link href="/categories/brass-fittings" className="text-slate-400 hover:text-white transition-colors">{t("brassFittings")}</Link></li>
                            <li><Link href="/categories/hvac-valves" className="text-slate-400 hover:text-white transition-colors">{t("brassValves")}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-brand-500" />
                             {t("company")}
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/about-us" className="text-slate-400 hover:text-white transition-colors">{t("aboutUs")}</Link></li>
                            <li><Link href="/brands" className="text-slate-400 hover:text-white transition-colors">{t("brandMatrix")}</Link></li>
                            <li><Link href="/resources" className="text-slate-400 hover:text-white transition-colors">{t("resources")}</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">{t("contact")}</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-500" />
                            {t("newsletterTitle")}
                        </h4>
                        <p className="text-sm font-medium mb-6 text-slate-400 leading-relaxed">
                            {t("newsletterDesc")}
                        </p>
                        <NewsletterForm />
                    </div>

                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500">
                    <p>© {new Date().getFullYear()} IFAN GROUP. {t("allRightsReserved")}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">{t("privacyPolicy")}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{t("termsConditions")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
