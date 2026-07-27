import type { FaqItem } from "@/components/pillar/types";
import type { CategoryPillar } from "../pillarTypes";

const pprFaqs: FaqItem[] = [
    {
        q: "What sizes and pressure classes does IFAN produce in PPR?",
        a: "DN20 through DN160 in PN12.5, PN16, PN20 and PN25. Pipe and fittings come from the same 100% virgin PP-R batches, with a certificate issued per shipment tying the material back to the extrusion line ID and the resin lot number.",
    },
    {
        q: "Which standards govern PPR pipe?",
        a: "ISO 15874 is the international product standard for polypropylene hot and cold water systems. DIN 8077 covers dimensions and DIN 8078 covers general quality requirements. ISO 10508 sits alongside them and defines the application classes — which is the part most buyers skip.",
    },
    {
        q: "What is an ISO 10508 application class and why does it matter?",
        a: "A certificate saying 'complies with ISO 15874' is only half an answer. ISO 10508 defines what duty the pipe is certified for: Class 1 and 2 for hot water supply at 60 °C and 70 °C, Class 4 for floor heating and low-temperature radiators, Class 5 for high-temperature radiators. Match the class to the job, not just the standard.",
    },
    {
        q: "How do I tell virgin PP-R from recycled material?",
        a: "Recycled content shows up as colour inconsistency between batches, a slightly rough or streaked inner wall, and an unexplained weight difference at the same nominal wall. The reliable check is documentary: ask for the resin lot number and the batch certificate. IFAN states weight and wall spec on the quote so you can compare per kilogram, not just per metre.",
    },
    {
        q: "Two quotes for DN25 PN20 differ by 30 %. What explains it?",
        a: "Usually wall thickness or resin. Both quotes can be honest if one is a thinner wall inside tolerance, or one can be hiding recycled content. Ask both suppliers for the weight per metre and the resin lot number — a per-kilogram comparison exposes the difference that a per-metre price hides.",
    },
    {
        q: "What is the difference between PPR, PPRC and PP-RCT?",
        a: "PPR and PPRC generally refer to the same random-copolymer material. PP-RCT is a modified crystalline structure that carries higher pressure at the same temperature, so it can achieve a given class with a thinner wall. Fibreglass-composite PPR reduces thermal expansion, which matters on long exposed runs.",
    },
    {
        q: "What is your minimum order for PPR?",
        a: "One container, and sizes and product families can be mixed inside it. The more useful question than 'how low is the MOQ' is whether you can mix — a container carrying PPR pipe, fittings, valves and other IFAN lines is usually better economics than a single-SKU load.",
    },
    {
        q: "Do you supply PPR ball valves as well as pipe and fittings?",
        a: "Yes. The full-port PPR ball valve is rated PN25 at 20 °C across 20 mm to 110 mm, with factory-installed EPDM seals and a CNC-machined ball. Models from 40 mm carry a replaceable PTFE seat ring, and O-rings are available as a field kit.",
    },
];

export const pprPillar: CategoryPillar = {
    slug: "ppr",
    seo: {
        title: "IFAN PPR Pipe | DN20–DN160 PN12.5–PN25 to ISO 15874",
        description:
            "IFAN PPR pipe and fittings, DN20–DN160 in PN12.5–PN25, from 100% virgin PP-R to ISO 15874. Batch certificate per shipment, one-container mixed MOQ.",
    },
    schema: {
        serviceName: "PPR Pipe and Fitting Manufacturing",
        serviceType: "Polypropylene random copolymer pipe manufacturing and B2B export",
        serviceDescription:
            "IFAN PPR pipe, fittings and valves in DN20–DN160 across PN12.5 to PN25, extruded from 100% virgin PP-R to ISO 15874 and DIN 8077/8078 with ISO 10508 application classes. Produced at a 120,000 m² plant in Zhejiang operating since 1993, with batch certificates per shipment tied to the extrusion line and resin lot.",
    },
    faqs: pprFaqs,
    sections: [
        {
            type: "prose",
            id: "overview",
            heading: "IFAN PPR: What This Range Covers",
            body: [
                "PPR is the default material for indoor hot and cold water distribution across most of Europe, the Middle East, Africa and Asia. It is joined by socket fusion, which melts the pipe and fitting into a single piece of material, so there is no threaded joint and no gasket to age.",
                "IFAN produces PPR pipe across DN20 to DN160 in PN12.5, PN16, PN20 and PN25, plus the full fitting range and PPR ball valves. Pipe and fittings come from the same 100% virgin PP-R batches — which matters more than it sounds, because fusion quality depends on both sides of the joint having the same melt behaviour.",
                "Production runs at a 120,000 m² plant in Zhejiang, operating since 1993 under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018. Every batch is run against DIN 8077/8078 and ISO 15874, and the certificate issued with each shipment ties back to the extrusion line ID and the PP-R resin lot number.",
            ],
        },
        {
            type: "prose",
            id: "classes",
            heading: "ISO 10508 Application Classes: The Part Most Quotes Skip",
            body: [
                "A certificate that says 'complies with ISO 15874' is only half an answer. ISO 15874 is the product standard — it tells you the pipe is a legitimate PPR pressure pipe. What it does not tell you is what duty it is certified for.",
                "That is ISO 10508. It defines application classes by service condition: Class 1 for hot water supply at 60 °C, Class 2 for hot water supply at 70 °C, Class 4 for underfloor heating and low-temperature radiators, and Class 5 for high-temperature radiator circuits. Cold-water service is rated separately at 20 °C.",
                "Each class pairs with a design pressure, and the combination decides the wall thickness you need. A PN20 pipe that satisfies Class 1 at 60 °C may not satisfy Class 5 at 90 °C. When an inspector rejects a batch on site, this mismatch — right standard, wrong class — is one of the most common reasons.",
                "State the application class on the purchase order alongside the DN and PN. IFAN quotes against the class, not just the pressure rating, so the certificate you receive matches the duty the system will actually see.",
            ],
            aside: "Quick check before ordering: what is the maximum continuous service temperature, and is there a radiator circuit on the same line? Those two answers determine the class, and the class determines whether a cheaper PN rating is genuinely adequate or a false economy.",
        },
        {
            type: "prose",
            id: "virgin",
            heading: "Virgin PP-R vs Recycled: How the Difference Shows Up",
            body: [
                "Recycled or reprocessed polypropylene can be extruded into pipe that looks correct and passes a short-duration pressure test. What it cannot reproduce is long-term hydrostatic strength — the 50-year performance that the PN rating implies. The failure arrives years later as brittle cracking around fusion joints, typically on hot-water runs first.",
                "Visually there are hints: colour that drifts between batches, a streaked or slightly rough inner wall, and weight that does not match the stated wall thickness. None of these are conclusive on their own, and a careful supplier of recycled material can hide all three.",
                "The reliable check is documentary and commercial. Ask for the resin lot number and the batch certificate. Then compare quotes per kilogram rather than per metre — two honest quotes for 'DN25 PN20' can differ 30 % on wall thickness alone, and a per-metre price hides that completely.",
                "IFAN states weight and wall spec on every quote and issues a batch certificate per shipment. The point is not that we ask you to trust it; the point is that it gives you something specific to verify against, which a quote without those figures does not.",
            ],
        },
        {
            type: "specTable",
            id: "specs",
            heading: "IFAN PPR Specification",
            intro: "Confirmed manufacturing and supply specification for the PPR range.",
            rows: [
                { label: "Diameter range", value: "DN20 – DN160", verified: true },
                { label: "Pressure classes", value: "PN12.5, PN16, PN20, PN25", verified: true },
                { label: "Material", value: "100% virgin PP-R", note: "Resin lot number stated on the batch certificate", verified: true },
                {
                    label: "Product standards",
                    value: "ISO 15874; DIN 8077 / DIN 8078",
                    note: "Application classes to ISO 10508",
                    verified: true,
                },
                {
                    label: "Variants",
                    value: "Plain PP-R, fibreglass-composite, PP-RCT",
                    verified: true,
                },
                {
                    label: "PPR ball valves",
                    value: "Full port, PN25 at 20 °C, 20 mm – 110 mm",
                    note: "EPDM seals, CNC-machined ball; replaceable PTFE seat ring from 40 mm",
                    verified: true,
                },
                {
                    label: "Resin suppliers",
                    value: "Borealis, Hyosung, LG Chem",
                    verified: true,
                },
                {
                    label: "Traceability",
                    value: "Batch certificate per shipment, tied to extrusion line ID and resin lot",
                    verified: true,
                },
                {
                    label: "Manufacturing site",
                    value: "120,000 m² facility, Zhuji, Zhejiang, China",
                    note: "In operation since 1993; Chinese National High-Tech Enterprise",
                    verified: true,
                },
                { label: "Extrusion lines", value: "30+ automated lines", verified: true },
                {
                    label: "Plant output",
                    value: "≈2,000 tonnes/month (≈24,000 tonnes/year)",
                    note: "Combined across all product lines",
                    verified: true,
                },
                {
                    label: "Quality systems",
                    value: "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018",
                    verified: true,
                },
                { label: "Conformity", value: "CE marked; SGS and Bureau Veritas testing", verified: true },
                { label: "In-house testing", value: "CNAS-accredited laboratory", verified: true },
                { label: "Minimum order", value: "One container; sizes and product families may be mixed", verified: true },
                { label: "Standard lead time", value: "45 days from order confirmation", verified: true },
                { label: "Channel", value: "B2B wholesale only — no direct-to-consumer sales", verified: true },
                // ↓ 等 00-信息收集表.md 填实
                { label: "Colour options", value: "", verified: false },
                { label: "Standard lengths", value: "", verified: false },
                { label: "Certificate numbers", value: "", verified: false },
            ],
            caption:
                "Tell us the application class and the maximum service temperature with your enquiry — it changes the wall thickness we quote.",
        },
        {
            type: "comparison",
            id: "compare",
            heading: "PPR vs PP-RCT vs Fibreglass-Composite",
            intro: "Three variants of the same family. IFAN produces all three, so the choice is about duty and cost, not availability.",
            alternativeLabel: "PP-RCT / composite",
            rows: [
                {
                    label: "Pressure at temperature",
                    ifan: "Plain PP-R: baseline for the PN rating",
                    alternative: "PP-RCT: higher pressure at the same temperature, thinner wall for the same class",
                },
                {
                    label: "Thermal expansion",
                    ifan: "Plain PP-R: highest — needs expansion loops on long runs",
                    alternative: "Fibreglass composite: markedly reduced, easier on exposed runs",
                },
                {
                    label: "Bore at same PN",
                    ifan: "Plain PP-R: thicker wall, smaller bore",
                    alternative: "PP-RCT: thinner wall, larger bore, better flow",
                },
                {
                    label: "Typical use",
                    ifan: "Plain PP-R: standard hot and cold distribution",
                    alternative: "Composite: long exposed runs · PP-RCT: high-temperature or high-pressure duty",
                },
                {
                    label: "Fusion",
                    ifan: "Plain PP-R: socket fusion, standard practice",
                    alternative: "Composite: outer layer must be faced off before fusion",
                },
            ],
        },
        {
            type: "applications",
            id: "applications",
            heading: "Where IFAN PPR Is Specified",
            items: [
                {
                    title: "Building hot and cold water",
                    icon: "droplets",
                    body: "Risers and branch distribution where fusion joints remove the threaded connections that leak first. Class 1 or 2 to ISO 10508 depending on the service temperature.",
                },
                {
                    title: "Underfloor heating circuits",
                    icon: "thermometer",
                    body: "Class 4 duty for floor heating and low-temperature radiators, alongside our PE-RT and PEX floor-heating range where the circuit calls for a coil instead.",
                },
                {
                    title: "Radiator circuits",
                    icon: "flame",
                    body: "Class 5 service at higher temperature, where PP-RCT earns its price by holding pressure at temperature with a thinner wall.",
                },
                {
                    title: "Compressed air and industrial",
                    icon: "gauge",
                    body: "Corrosion-free distribution where steel pipe would scale internally and reduce flow capacity over its service life.",
                },
            ],
        },
        {
            type: "standards",
            id: "certs",
            heading: "Certifications and Testing",
            intro: "Only certifications currently held are listed. Certificate numbers are published as they are confirmed.",
            items: [
                { code: "ISO 15874", scope: "PP piping systems for hot and cold water", verified: true },
                { code: "DIN 8077 / 8078", scope: "PP pipe dimensions and quality requirements", verified: true },
                { code: "ISO 10508", scope: "Application classes for hot and cold water systems", verified: true },
                { code: "ISO 9001:2015", scope: "Quality management system", verified: true },
                { code: "ISO 14001:2015", scope: "Environmental management system", verified: true },
                { code: "ISO 45001:2018", scope: "Occupational health and safety management", verified: true },
                { code: "CE", scope: "European conformity marking", verified: true },
                { code: "SGS", scope: "Third-party inspection and testing", verified: true },
                { code: "Bureau Veritas", scope: "Third-party inspection", verified: true },
                { code: "CNAS", scope: "In-house laboratory accreditation", verified: true },
                { code: "WRAS", scope: "UK Water Regulations Advisory Scheme", verified: true },
            ],
        },
        { type: "faq", id: "faq", heading: "PPR Sourcing FAQ", items: pprFaqs },
        {
            type: "relatedReading",
            id: "reading",
            heading: "PPR Technical Guides",
            links: [
                {
                    href: "/news/ppr-pipe-complete-guide",
                    label: "PPR Pipe: Complete Guide",
                    blurb: "Material, sizing and specification in one place",
                },
                {
                    href: "/news/ppr-pipe-sizes",
                    label: "PPR Pipe Sizes & Pressure Ratings",
                    blurb: "DN20–DN160 across PN12.5–PN25",
                },
                {
                    href: "/news/ppr-pipe-certification",
                    label: "PPR Certification Explained",
                    blurb: "ISO 15874, ISO 10508 classes and what to ask for",
                },
                {
                    href: "/news/ppr-pipe-quality-control",
                    label: "PPR Quality Control",
                    blurb: "What a per-shipment inspection report shows",
                },
                {
                    href: "/news/ppr-vs-pprc-pipe",
                    label: "PPR vs PPRC vs PP-RCT",
                    blurb: "Which variant for which duty",
                },
                {
                    href: "/news/ppr-pipe-price",
                    label: "PPR Price: Comparing Quotes Honestly",
                    blurb: "Why per-kilogram beats per-metre",
                },
                {
                    href: "/news/ppr-vs-pvc-pex",
                    label: "PPR vs PVC vs PEX",
                    blurb: "Choosing the material for the duty",
                },
                {
                    href: "/news/ppr-pipe-container-loading",
                    label: "PPR Container Loading",
                    blurb: "Mixed-load planning for 20 ft and 40 ft",
                },
            ],
        },
        {
            type: "relatedProducts",
            id: "products",
            heading: "PPR Products in the IFAN Catalogue",
            // Sanity 里 PPR Series 有三个重复文档（414 / 79 / 1 个产品），按 title 取才能取全
            sanityCategoryTitles: ["PPR Series"],
            limit: 8,
        },
    ],
};
