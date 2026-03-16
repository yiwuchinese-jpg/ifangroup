import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-24 border-t border-slate-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 hidden md:block" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Info */}
                    <div className="flex flex-col">
                        <Link href="/" className="inline-block mb-10 relative w-40 h-10 md:w-48 md:h-12">
                            <img
                                src="/logo-white.png"
                                alt="IFAN Group"
                                className="absolute inset-0 w-full h-full object-contain object-left"
                            />
                        </Link>
                        <p className="mb-10 text-sm leading-relaxed font-medium text-slate-400">
                            Global manufacturer of comprehensive plumbing, heating systems, and smart factory solutions since 1993. Engineered for absolute scale and reliability.
                        </p>
                        <div className="space-y-5 text-sm font-medium text-slate-300">
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-brand-500/50 group-hover:bg-brand-900/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-brand-500" />
                                </div>
                                <span className="group-hover:text-white transition-colors">Zhuji City, Zhejiang, China</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-brand-500/50 group-hover:bg-brand-900/20 transition-colors">
                                    <Phone className="w-4 h-4 text-brand-500" />
                                </div>
                                <span className="group-hover:text-white transition-colors">+86 000 0000 0000</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-default">
                                <div className="p-2 rounded-full bg-slate-900 border border-slate-800 group-hover:border-brand-500/50 group-hover:bg-brand-900/20 transition-colors">
                                    <Mail className="w-4 h-4 text-brand-500" />
                                </div>
                                <span className="group-hover:text-white transition-colors">export@ifangroup.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-500" />
                            Products Universe
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/categories/ppr" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">PPR Piping Systems</Link></li>
                            <li><Link href="/categories/pex-ppsu" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">PEX & Radiant Heating</Link></li>
                            <li><Link href="/categories/hvac-valves" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">Forged Brass Valves</Link></li>
                            <li><Link href="/categories/hdpe" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">HDPE & PVC Infrastructure</Link></li>
                        </ul>
                    </div>

                    {/* Corporate */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-500" />
                            The Enterprise
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/brands" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">Our Brands Matrix</Link></li>
                            <li><Link href="/manufacturing-oem" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">Mega-Factory & OEM</Link></li>
                            <li><Link href="/about-us" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">About IFAN</Link></li>
                            <li><Link href="/news" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">News & Insights</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-400 hover:translate-x-1 inline-block transition-all duration-300">Global Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-500" />
                            Sourcing Intelligence
                        </h4>
                        <p className="text-sm font-medium mb-6 text-slate-400 leading-relaxed">
                            Get raw material price alerts, global logistics updates, and exclusive B2B reports securely delivered to your inbox.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-slate-500">
                    <p>© {new Date().getFullYear()} IFAN Group. All rights reserved. ISO 9001 / CE Certified.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
