import type { FaqItem } from "@/components/pillar/types";
import type { CategoryPillar } from "../pillarTypes";

const valveFaqs: FaqItem[] = [
    {
        q: "What is CW617N brass and why does it matter?",
        a: "CW617N is the European designation for a hot-forgeable lead-free brass alloy, roughly 57–59 % copper. It is the standard body material for potable-water valves in Europe because it resists dezincification and keeps lead migration within drinking-water limits. Ask any supplier to state the alloy, not just 'brass'.",
    },
    {
        q: "Forged or cast brass valve body — which should I specify?",
        a: "Forging aligns the grain structure and eliminates the porosity that casting can leave, so a forged body handles pressure cycling and over-torque better. Cast bodies allow more complex shapes at lower tooling cost. IFAN produces both, with cold forging in-house for the forged range.",
    },
    {
        q: "What sizes and pressure classes do you produce?",
        a: "Brass ball valves run DN8 to DN100 in PN16, PN25 and PN40, with FF, FM, MM and double-union connections, in BSP or NPT threads. Brass gate valves run DN15 to DN50 with BSP or NPT threaded ends. All in lead-free CW617N.",
    },
    {
        q: "Which certifications do the valves carry?",
        a: "CE, ACS, WRAS, SASO and potable-water approvals, manufactured under ISO 9001. That spread lets a buyer match the approval to the destination market — WRAS for the UK, ACS for France, SASO for Saudi Arabia — instead of hunting for a valve that qualifies after the order is placed.",
    },
    {
        q: "What is the difference between a ball valve and a gate valve here?",
        a: "A ball valve gives quarter-turn on/off with negligible pressure drop when open, and it seals reliably after long periods idle. A gate valve opens gradually, which suits throttling-free isolation on larger bore, but the seat is more prone to sticking if left unused for years.",
    },
    {
        q: "Do you charge a minimum order on brass valves?",
        a: "The brass valve range is stocked year-round with no MOQ and roughly a ten-day lead time, which is different from our made-to-order extrusion lines. That makes it practical to add valves to a pipe order without waiting for a production run.",
    },
    {
        q: "Can I mix valves with pipe in the same container?",
        a: "Yes, and it is usually the cheapest way to buy. IFAN manufactures the brass valves, the PPR and PE pipe and the fittings, so a single mixed container can carry the isolation, the distribution and the connection parts of one system with matching certificates.",
    },
    {
        q: "How do I verify a valve is genuinely lead-free?",
        a: "Ask for the material certificate stating CW617N and the third-party test report against the drinking-water regulation of your market. An alloy claim without documentation is not verifiable, and lead content is exactly the parameter that customs and water authorities test on arrival.",
    },
];

export const valvesPillar: CategoryPillar = {
    slug: "hvac-valves",
    seo: {
        title: "Brass Ball Valve Manufacturer | CW617N DN8–DN100 PN16–40",
        description:
            "Lead-free CW617N brass ball and gate valves, DN8–DN100 in PN16/25/40, forged and cast bodies. CE, ACS, WRAS, SASO certified. No MOQ, ~10-day lead time.",
    },
    schema: {
        serviceName: "Brass Valve and Manifold Manufacturing",
        serviceType: "Lead-free brass valve manufacturing and B2B export",
        serviceDescription:
            "Factory-direct brass ball valves, gate valves and manifolds in lead-free CW617N, DN8–DN100 in PN16, PN25 and PN40, with forged and cast bodies and in-house cold forging. Certified to CE, ACS, WRAS and SASO under ISO 9001, produced at a 120,000 m² plant in Zhejiang operating since 1993 and shipped B2B worldwide.",
    },
    faqs: valveFaqs,
    sections: [
        {
            type: "prose",
            id: "overview",
            heading: "Brass Valves: What IFAN Manufactures",
            body: [
                "A valve is the cheapest component in a plumbing system and the most expensive one to replace. It sits inside a wall or under a floor, it is expected to seal after years of never being touched, and when it fails the cost is the demolition around it rather than the part itself.",
                "IFAN manufactures the full brass small-bore range in-house: ball valves from DN8 to DN100 in PN16, PN25 and PN40, gate valves from DN15 to DN50, plus manifolds, angle valves and plumbing brass. All bodies are lead-free CW617N. We produce both forged and cast bodies, with cold forging done in-house rather than bought in.",
                "The valve range is stocked year-round with no minimum order and roughly a ten-day lead time. That is deliberately different from the extrusion lines, which are made to order on a 45-day cycle — it means valves can be added to a pipe container without holding up the shipment.",
            ],
        },
        {
            type: "prose",
            id: "alloy",
            heading: "CW617N: Why the Alloy Designation Is the Whole Specification",
            body: [
                "'Brass' is not a specification. It is a family of copper-zinc alloys whose behaviour under pressure, temperature and potable water varies enormously with composition. The designation that matters for plumbing valves is CW617N — roughly 57 to 59 percent copper, hot-forgeable, and formulated to keep lead migration inside drinking-water limits.",
                "Two failure modes drive the choice. The first is dezincification: in soft or aggressive water, zinc leaches out of an unsuitable alloy and leaves a porous copper skeleton that crumbles under pressure. The second is lead migration, which is what water authorities and customs laboratories actually test for on arrival.",
                "Neither is visible on inspection. A valve that fails on either count looks identical to one that passes, which is why the material certificate is the document to insist on. IFAN states CW617N on the certificate for every batch, verifiable against the market standard.",
            ],
            aside: "Practical check: ask for the material certificate naming the alloy, plus the third-party potable-water test report for your destination market. A supplier who can only say 'lead-free brass' has not answered the question.",
        },
        {
            type: "prose",
            id: "forging",
            heading: "Forged vs Cast: What Changes Inside the Body",
            body: [
                "In casting, molten brass fills a mould and solidifies. Shrinkage during cooling can leave microscopic voids inside the wall — porosity that a pressure test at low pressure will not find, but that becomes a leak path under thermal cycling or a surge.",
                "In hot or cold forging, solid brass is deformed under pressure. The grain structure follows the shape of the part instead of being randomly oriented, and there is no solidification shrinkage to leave voids. The result is a denser body with better resistance to over-torque during installation, which is the most common way a valve is damaged before it ever carries water.",
                "Casting is not inferior for every part — complex internal geometries are impractical to forge, and tooling cost is lower. IFAN produces both and cold-forges the forged range in-house, so the choice can be made on the duty rather than on what the supplier happens to have.",
            ],
        },
        {
            type: "specTable",
            id: "specs",
            heading: "IFAN Brass Valve Specification",
            intro: "Confirmed manufacturing and supply specification for the brass valve range.",
            rows: [
                { label: "Body material", value: "CW617N lead-free brass", verified: true },
                { label: "Body construction", value: "Forged and cast; cold forging in-house", verified: true },
                {
                    label: "Ball valve range",
                    value: "DN8 – DN100 in PN16 / PN25 / PN40",
                    note: "FF, FM, MM and double-union connections; lever and butterfly handles",
                    verified: true,
                },
                {
                    label: "Gate valve range",
                    value: "DN15 – DN50, threaded ends",
                    verified: true,
                },
                { label: "Thread standards", value: "BSP or NPT", verified: true },
                {
                    label: "Certifications",
                    value: "CE, ACS, WRAS, SASO, potable-water approvals",
                    verified: true,
                },
                { label: "Quality system", value: "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018", verified: true },
                { label: "Minimum order", value: "None on the brass valve range", verified: true },
                { label: "Lead time", value: "≈10 days — stocked year-round", verified: true },
                {
                    label: "Manufacturing site",
                    value: "120,000 m² facility, Zhuji, Zhejiang, China",
                    note: "In operation since 1993; Chinese National High-Tech Enterprise",
                    verified: true,
                },
                { label: "In-house testing", value: "CNAS-accredited laboratory", verified: true },
                { label: "Channel", value: "B2B wholesale only — no direct-to-consumer sales", verified: true },
                // ↓ 等 00-信息收集表.md 填实
                { label: "Manifold range", value: "", verified: false },
                { label: "Seat and seal materials", value: "", verified: false },
                { label: "Temperature rating", value: "", verified: false },
                { label: "Certificate numbers", value: "", verified: false },
            ],
        },
        {
            type: "comparison",
            id: "compare",
            heading: "Ball Valve vs Gate Valve for Small-Bore Isolation",
            intro: "IFAN produces both, so this is about duty rather than upsell.",
            alternativeLabel: "Gate valve",
            rows: [
                {
                    label: "Operation",
                    ifan: "Ball: quarter turn, position visible from the handle",
                    alternative: "Multi-turn, position not visible without counting",
                },
                {
                    label: "Sealing after long idle periods",
                    ifan: "Ball: PTFE seats stay serviceable; the usual choice for isolation",
                    alternative: "Seat can stick or scale; classic cause of a valve that will not close",
                },
                {
                    label: "Pressure drop when open",
                    ifan: "Ball: full-bore options give near-zero drop",
                    alternative: "Low, but wedge and seat still intrude slightly",
                },
                {
                    label: "Throttling",
                    ifan: "Ball: not suited — partial opening erodes the seat",
                    alternative: "Tolerates partial opening better, though not designed for it",
                },
                {
                    label: "IFAN range",
                    ifan: "DN8 – DN100, PN16 / PN25 / PN40",
                    alternative: "DN15 – DN50, threaded",
                },
            ],
        },
        {
            type: "applications",
            id: "applications",
            heading: "Where IFAN Brass Valves Are Specified",
            items: [
                {
                    title: "Potable water isolation",
                    icon: "droplets",
                    body: "Riser, branch and appliance isolation where the alloy and the drinking-water approval decide whether the installation passes inspection.",
                },
                {
                    title: "Heating and manifold systems",
                    icon: "thermometer",
                    body: "Manifold isolation and balancing on underfloor heating circuits, matched dimensionally to our PE-RT and PEX floor-heating range.",
                },
                {
                    title: "Distributor stock lines",
                    icon: "shield",
                    body: "No MOQ and a ten-day lead time make the range practical to hold as stock rather than order against a project.",
                },
                {
                    title: "Export markets with specific approvals",
                    icon: "globe",
                    body: "CE, ACS, WRAS and SASO across the same range, so one supplier covers the EU, France, the UK and Saudi Arabia without changing manufacturer.",
                },
            ],
        },
        {
            type: "standards",
            id: "certs",
            heading: "Certifications and Testing",
            intro: "Only certifications currently held are listed. Certificate numbers are published as they are confirmed.",
            items: [
                { code: "CE", scope: "European conformity marking", verified: true },
                { code: "ACS", scope: "French potable-water sanitary conformity", verified: true },
                { code: "WRAS", scope: "UK Water Regulations Advisory Scheme", verified: true },
                { code: "SASO", scope: "Saudi Standards, Metrology and Quality Organization", verified: true },
                { code: "ISO 9001:2015", scope: "Quality management system", verified: true },
                { code: "ISO 14001:2015", scope: "Environmental management system", verified: true },
                { code: "ISO 45001:2018", scope: "Occupational health and safety management", verified: true },
                { code: "SGS", scope: "Third-party inspection and testing", verified: true },
                { code: "CNAS", scope: "In-house laboratory accreditation", verified: true },
            ],
        },
        { type: "faq", id: "faq", heading: "Brass Valve Sourcing FAQ", items: valveFaqs },
        {
            type: "relatedReading",
            id: "reading",
            heading: "Brass Valve Technical Guides",
            links: [
                {
                    href: "/news/brass-ball-valve-guide",
                    label: "Brass Ball Valve: Complete Guide",
                    blurb: "Types, connections and how to specify",
                },
                {
                    href: "/news/cw617n-lead-free-brass",
                    label: "CW617N Lead-Free Brass Explained",
                    blurb: "Why the alloy designation is the specification",
                },
                {
                    href: "/news/forged-vs-cast-brass-valve",
                    label: "Forged vs Cast Brass Valve",
                    blurb: "What changes inside the body",
                },
                {
                    href: "/news/brass-ball-valve-sizes",
                    label: "Brass Ball Valve Sizes",
                    blurb: "DN8–DN100 dimension and pressure reference",
                },
                {
                    href: "/news/brass-ball-valve-vs-gate-valve",
                    label: "Ball Valve vs Gate Valve",
                    blurb: "Choosing by duty, not by habit",
                },
                {
                    href: "/news/brass-gate-valve",
                    label: "Brass Gate Valve Guide",
                    blurb: "DN15–DN50 threaded isolation",
                },
                {
                    href: "/news/pressure-reducing-valve",
                    label: "Pressure Reducing Valve Guide",
                    blurb: "Sizing and setting for building services",
                },
                {
                    href: "/news/types-of-valves",
                    label: "Types of Valves",
                    blurb: "The full family and what each is for",
                },
            ],
        },
        {
            type: "relatedProducts",
            id: "products",
            heading: "Brass Valves in the IFAN Catalogue",
            // Sanity 里阀门散落在三个同义分类文档中，按 title 集合一次取全
            sanityCategoryTitles: ["Brass Fittings & Valves", "Brass Valves", "Brass Fittings"],
            limit: 8,
        },
    ],
};
