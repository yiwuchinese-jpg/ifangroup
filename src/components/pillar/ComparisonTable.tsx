import Section, { Num } from "./Section";
import type { CompareRow } from "./types";

export default function ComparisonTable({
    id,
    heading,
    intro,
    rows,
    alternativeLabel,
    labels,
    tone,
}: {
    id: string;
    heading: string;
    intro?: string;
    rows: CompareRow[];
    alternativeLabel: string;
    labels: { criterion: string; ifan: string };
    tone?: "light" | "muted";
}) {
    return (
        <Section id={id} heading={heading} intro={intro} tone={tone}>
            {/* 三列表在 380px 下必须能横向滚动，否则移动端直接挤爆 */}
            <div className="overflow-x-auto border border-slate-200">
                <table className="w-full min-w-[36rem] border-collapse">
                    <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="text-start text-xs font-bold uppercase tracking-widest px-5 py-4">
                                {labels.criterion}
                            </th>
                            <th className="text-start text-xs font-bold uppercase tracking-widest px-5 py-4 bg-brand-700">
                                {labels.ifan}
                            </th>
                            <th className="text-start text-xs font-bold uppercase tracking-widest px-5 py-4">
                                {alternativeLabel}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={row.label} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                                <th
                                    scope="row"
                                    className="text-start align-top px-5 py-4 text-sm font-semibold text-slate-900 border-t border-slate-200"
                                >
                                    {row.label}
                                </th>
                                <td className="align-top px-5 py-4 text-sm text-slate-800 border-t border-slate-200 bg-brand-50/60">
                                    <Num>{row.ifan}</Num>
                                </td>
                                <td className="align-top px-5 py-4 text-sm text-slate-600 border-t border-slate-200">
                                    <Num>{row.alternative}</Num>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
}
