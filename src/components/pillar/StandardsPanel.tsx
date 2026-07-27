import { BadgeCheck } from "lucide-react";
import Section, { Num } from "./Section";
import type { StandardItem } from "./types";

export default function StandardsPanel({
    id,
    heading,
    intro,
    items,
    labels,
    tone,
}: {
    id: string;
    heading: string;
    intro?: string;
    items: StandardItem[];
    labels: { verifiedCert: string };
    tone?: "light" | "muted";
}) {
    // 同规格表：未确认的认证不摆出来
    const visible = items.filter((i) => i.verified);
    if (!visible.length) return null;

    return (
        <Section id={id} heading={heading} intro={intro} tone={tone}>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                {visible.map((item) => (
                    <div key={item.code} className="bg-white p-5">
                        <dt className="flex items-center gap-2 text-base font-bold text-slate-900">
                            <BadgeCheck className="w-5 h-5 text-brand-600 shrink-0" aria-hidden />
                            <Num>{item.code}</Num>
                        </dt>
                        <dd className="mt-2 text-sm text-slate-600 leading-relaxed">
                            {item.scope}
                            {item.certNumber && (
                                <span className="block mt-2 text-xs font-mono text-slate-500">
                                    {labels.verifiedCert}: <Num>{item.certNumber}</Num>
                                </span>
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </Section>
    );
}
