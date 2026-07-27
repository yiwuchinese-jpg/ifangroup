import { ReactNode } from "react";

/**
 * 所有支柱 section 的统一外壳：容器宽度、上下留白、深浅交错背景、H2 与引言。
 * 集中在这里，是为了让新增 section 类型不用重新猜排版。
 */
export default function Section({
    id,
    heading,
    intro,
    tone = "light",
    children,
}: {
    id: string;
    heading: string;
    intro?: string;
    tone?: "light" | "muted";
    children: ReactNode;
}) {
    return (
        <section
            id={`section-${id}`}
            className={`py-16 lg:py-20 ${tone === "muted" ? "bg-slate-50" : "bg-white"}`}
        >
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-4">
                    {heading}
                </h2>
                {intro && (
                    <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-3xl">{intro}</p>
                )}
                {!intro && <div className="mb-10" />}
                {children}
            </div>
        </section>
    );
}

/**
 * 规格数值专用包裹。
 * "DN110–DN630"、"PN12.5" 这类值在阿语 RTL 上下文里会被 bidi 算法重排成乱码，
 * 必须显式声明 ltr 并成为独立的 inline-block 才能保住顺序。
 */
export function Num({ children }: { children: ReactNode }) {
    return (
        <span dir="ltr" className="inline-block">
            {children}
        </span>
    );
}
