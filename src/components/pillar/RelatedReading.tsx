import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "./Section";
import type { LinkRef } from "./types";

/**
 * 支柱页 → 博客的 spoke 链接。
 * 博客那边有排名但没 money 页可去，这里补上反向的 hub-and-spoke 闭环。
 */
export default function RelatedReading({
    id,
    heading,
    links,
    tone,
}: {
    id: string;
    heading: string;
    links: LinkRef[];
    tone?: "light" | "muted";
}) {
    return (
        <Section id={id} heading={heading} tone={tone}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                {links.map((link) => (
                    <li key={link.href} className="bg-white">
                        <Link
                            href={link.href}
                            className="group flex items-start justify-between gap-4 p-5 hover:bg-brand-50 transition-colors h-full"
                        >
                            <span>
                                <span className="block text-base font-semibold text-slate-900 group-hover:text-brand-700">
                                    {link.label}
                                </span>
                                {link.blurb && (
                                    <span className="block mt-1 text-sm text-slate-500">{link.blurb}</span>
                                )}
                            </span>
                            <ArrowRight
                                className="w-5 h-5 shrink-0 mt-0.5 text-slate-400 group-hover:text-brand-600 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                                aria-hidden
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
