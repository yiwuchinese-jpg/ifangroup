"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";

type ArticleHeading = { id: string; text: string };

function slugify(text: string): string {
    return (text || "")
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/(^-|-$)+/g, "")
        .slice(0, 60);
}

export default function ArticleTOC() {
    const [headings, setHeadings] = useState<ArticleHeading[]>([]);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        // The article body renders inside .prose (raw HTML or Portable Text).
        // Its H2s usually have no id, so assign a stable slug id on the fly.
        const container = document.querySelector(".prose");
        if (!container) return;
        const els = Array.from(container.querySelectorAll("h2")) as HTMLElement[];
        const used = new Set<string>();
        const items: ArticleHeading[] = [];
        els.forEach((el, i) => {
            if (!el.id) {
                const base = slugify(el.textContent || "") || `section-${i + 1}`;
                let id = base;
                let n = 2;
                while (used.has(id) || (document.getElementById(id) && document.getElementById(id) !== el)) {
                    id = `${base}-${n++}`;
                }
                el.id = id;
            }
            used.add(el.id);
            el.style.scrollMarginTop = "96px"; // clear the fixed navbar on jump
            items.push({ id: el.id, text: el.innerText || el.textContent || "" });
        });
        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    function jump(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        setActiveId(id);
    }

    if (headings.length === 0) return null;

    return (
        <nav aria-label="Table of contents" className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-2">
                On this page
            </span>
            <ul className="space-y-3 text-sm">
                {headings.map((h) => (
                    <li key={h.id} className="flex items-start gap-2 leading-snug">
                        {activeId === h.id && <ArrowDownRight className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-1" />}
                        <a
                            href={`#${h.id}`}
                            onClick={(e) => jump(e, h.id)}
                            className={`block transition-colors ${activeId === h.id ? "text-brand-600 font-bold" : "text-slate-500 hover:text-slate-900"}`}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
