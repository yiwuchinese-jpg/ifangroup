"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";

export default function ArticleTOC() {
    const [headings, setHeadings] = useState<{ id: string, text: string, level: string }[]>([]);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        // Find all injected h2 and h3 elements within the article body
        const elements = Array.from(document.querySelectorAll("h2[id], h3[id]"));

        const extractedHeadings = elements.map((elem) => ({
            id: elem.id,
            text: (elem as HTMLElement).innerText || "",
            level: elem.tagName.toLowerCase()
        }));

        setHeadings(extractedHeadings);

        const observer = new IntersectionObserver(
            (entries) => {
                // Determine which headings are currently visible
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" } // trigger when near top
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-2">Index</span>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`transition-colors duration-300 flex items-start gap-2 ${heading.level === "h3" ? "pl-4" : ""
                            }`}
                    >
                        {activeId === heading.id && <ArrowDownRight className="w-3 h-3 text-brand-600 shrink-0 mt-0.5" />}
                        <a
                            href={`#${heading.id}`}
                            className={`${activeId === heading.id ? "text-brand-600 font-bold" : "text-slate-500 hover:text-slate-900"} block leading-tight`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
