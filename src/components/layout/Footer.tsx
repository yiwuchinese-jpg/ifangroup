import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-600 py-24 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Info */}
                    <div>
                        <Link href="/" className="inline-block mb-8 relative w-36 h-12 md:w-44 md:h-14">
                            <img
                                src="/logo-green.png"
                                alt="IFAN Group"
                                className="absolute inset-0 w-full h-full object-contain object-left"
                            />
                        </Link>
                        <p className="mb-8 text-sm leading-relaxed font-medium">
                            Global manufacturer of comprehensive plumbing, heating systems, and smart factory solutions since 1993. Engineered for absolute scale and reliability.
                        </p>
                        <div className="space-y-4 text-sm font-bold text-slate-700">
                            <p className="flex items-center gap-4"><MapPin className="w-5 h-5 text-brand-600" /> Zhuji City, Zhejiang, China</p>
                            <p className="flex items-center gap-4"><Phone className="w-5 h-5 text-brand-600" /> +86 000 0000 0000</p>
                            <p className="flex items-center gap-4"><Mail className="w-5 h-5 text-brand-600" /> export@ifangroup.com</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-900 font-black mb-8 uppercase tracking-widest text-sm">Products Universe</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="/products/ppr-piping" className="hover:text-brand-600 transition-colors">PPR Piping Systems</Link></li>
                            <li><Link href="/products/pex-systems" className="hover:text-brand-600 transition-colors">PEX & Radiant Heating</Link></li>
                            <li><Link href="/products/brass-valves" className="hover:text-brand-600 transition-colors">Forged Brass Valves</Link></li>
                            <li><Link href="/products/hdpe-pvc" className="hover:text-brand-600 transition-colors">HDPE & PVC Infrastructure</Link></li>
                        </ul>
                    </div>

                    {/* Corporate */}
                    <div>
                        <h4 className="text-slate-900 font-black mb-8 uppercase tracking-widest text-sm">The Enterprise</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="/brands" className="hover:text-brand-600 transition-colors">Our Brands Matrix</Link></li>
                            <li><Link href="/manufacturing-oem" className="hover:text-brand-600 transition-colors">Mega-Factory & OEM</Link></li>
                            <li><Link href="/about-us" className="hover:text-brand-600 transition-colors">About IFAN</Link></li>
                            <li><Link href="/news" className="hover:text-brand-600 transition-colors">News & Insights</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-600 transition-colors">Global Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-slate-900 font-black mb-8 uppercase tracking-widest text-sm">Sourcing Intelligence</h4>
                        <p className="text-sm font-medium mb-6">
                            Get raw material price alerts, global logistics updates, and exclusive B2B reports securely delivered to your inbox.
                        </p>
                        <form className="flex group shadow-sm">
                            <input
                                type="email"
                                placeholder="Work email address"
                                className="bg-white border-y border-l border-slate-200 text-slate-900 px-5 py-3 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 w-full text-sm font-medium transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-brand-600 hover:bg-brand-700 px-5 py-3 transition-colors flex items-center justify-center cursor-pointer shadow-[0_5px_15px_rgba(0,127,60,0.3)]"
                            >
                                <ArrowRight className="w-5 h-5 text-white" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-slate-400">
                    <p>© {new Date().getFullYear()} IFAN Group. All rights reserved. ISO 9001 / CE Certified.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
