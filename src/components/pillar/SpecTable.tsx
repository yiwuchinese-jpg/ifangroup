import Section, { Num } from "./Section";
import type { SpecRow } from "./types";

export default function SpecTable({
    id,
    heading,
    intro,
    rows,
    caption,
    labels,
    tone,
}: {
    id: string;
    heading: string;
    intro?: string;
    rows: SpecRow[];
    caption?: string;
    labels: { specification: string; value: string };
    tone?: "light" | "muted";
}) {
    // 未确认的行直接不渲染。表短一点没关系，摆出来的每一行都必须站得住。
    const visible = rows.filter((r) => r.verified);
    if (!visible.length) return null;

    return (
        <Section id={id} heading={heading} intro={intro} tone={tone}>
            <div className="overflow-x-auto border border-slate-200">
                <table className="w-full text-start border-collapse">
                    <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="text-start text-xs font-bold uppercase tracking-widest px-5 py-4 w-1/3">
                                {labels.specification}
                            </th>
                            <th className="text-start text-xs font-bold uppercase tracking-widest px-5 py-4">
                                {labels.value}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((row, i) => (
                            <tr key={row.label} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                                <th
                                    scope="row"
                                    className="text-start align-top px-5 py-4 text-sm font-semibold text-slate-900 border-t border-slate-200"
                                >
                                    {row.label}
                                </th>
                                <td className="align-top px-5 py-4 text-sm text-slate-700 border-t border-slate-200">
                                    <Num>{row.value}</Num>
                                    {row.note && (
                                        <span className="block mt-1 text-xs text-slate-500">{row.note}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {caption && <p className="mt-4 text-xs text-slate-500">{caption}</p>}
        </Section>
    );
}
