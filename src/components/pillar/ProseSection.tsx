import Section from "./Section";

export default function ProseSection({
    id,
    heading,
    body,
    aside,
    tone,
}: {
    id: string;
    heading: string;
    body: string[];
    aside?: string;
    tone?: "light" | "muted";
}) {
    return (
        <Section id={id} heading={heading} tone={tone}>
            <div className="space-y-5">
                {body.map((p, i) => (
                    <p key={i} className="text-base lg:text-lg text-slate-700 leading-relaxed">
                        {p}
                    </p>
                ))}
            </div>
            {aside && (
                <aside className="mt-8 border-s-4 border-brand-600 bg-brand-50 ps-6 pe-6 py-5">
                    <p className="text-sm lg:text-base text-slate-800 leading-relaxed">{aside}</p>
                </aside>
            )}
        </Section>
    );
}
