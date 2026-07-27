import Section, { Num } from "./Section";
import { resolveIcon } from "./icons";
import type { ApplicationItem } from "./types";

export default function ApplicationGrid({
    id,
    heading,
    intro,
    items,
    tone,
}: {
    id: string;
    heading: string;
    intro?: string;
    items: ApplicationItem[];
    tone?: "light" | "muted";
}) {
    return (
        <Section id={id} heading={heading} intro={intro} tone={tone}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => {
                    const Icon = resolveIcon(item.icon);
                    return (
                        <div
                            key={item.title}
                            className="border border-slate-200 bg-white p-6 hover:border-brand-600 transition-colors"
                        >
                            <Icon className="w-8 h-8 text-brand-600 mb-4" aria-hidden />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                            {item.sizeHint && (
                                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <Num>{item.sizeHint}</Num>
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
