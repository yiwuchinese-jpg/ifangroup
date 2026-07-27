"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "./Section";
import type { FaqItem } from "./types";

/**
 * 唯一需要客户端交互的 section。
 * 注意：答案始终在 DOM 里（靠 grid-rows 折叠而非条件渲染）——
 * Google 要求 FAQPage schema 里的问答必须在 HTML 中可见，条件渲染会导致结构化数据违规。
 */
export default function FaqAccordion({
    id,
    heading,
    items,
    tone,
}: {
    id: string;
    heading: string;
    items: FaqItem[];
    tone?: "light" | "muted";
}) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <Section id={id} heading={heading} tone={tone}>
            <div className="border border-slate-200 divide-y divide-slate-200">
                {items.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={item.q} className="bg-white">
                            <h3>
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-${id}-${i}`}
                                    className="w-full flex items-start justify-between gap-4 text-start px-5 py-4 hover:bg-slate-50 transition-colors"
                                >
                                    <span className="text-base font-semibold text-slate-900">{item.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 mt-0.5 text-brand-600 transition-transform ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                        aria-hidden
                                    />
                                </button>
                            </h3>
                            <div
                                id={`faq-${id}-${i}`}
                                className={`grid transition-all duration-200 ${
                                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-5 pb-5 text-sm lg:text-base text-slate-700 leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
