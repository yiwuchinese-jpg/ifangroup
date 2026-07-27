import type { FaqItem } from "@/components/pillar/types";
import type { CategoryPillar } from "../pillarTypes";

const pexFaqs: FaqItem[] = [
    {
        q: "What is the difference between PEX-a, PEX-b and PEX-c?",
        a: "The letter names the cross-linking method, not the quality grade. PEX-a is peroxide cross-linked during extrusion and reaches the highest degree of cross-linking with strong thermal memory. PEX-b is silane cross-linked after extrusion. PEX-c is irradiated. All three meet the same pipe standards when correctly made.",
    },
    {
        q: "What does thermal memory mean in practice?",
        a: "PEX-a can be expanded and will return to its original diameter when heated, which is what expansion-fitting systems rely on. It also lets the pipe swell if water freezes inside and recover afterwards, instead of splitting — the main reason PEX-a is specified in cold climates.",
    },
    {
        q: "Which sizes do you produce for floor heating?",
        a: "IFAN produces PE-RT, PEX and PEX-AL-PEX floor-heating coils in 16, 20, 25 and 32 mm from one factory, supplied in mixed-size containers with certificates per shipment. The matching press and sliding-sleeve fittings come from the same source, so pipe and fitting are dimensionally matched.",
    },
    {
        q: "What is PEX-AL-PEX and when should it be used instead of plain PEX?",
        a: "PEX-AL-PEX is a multilayer pipe with an aluminium core between two PEX layers. The aluminium gives a full oxygen barrier and lets the pipe hold its shape when bent, so it stays where it is routed. Plain PEX needs clips to hold a bend and needs an EVOH barrier layer for closed heating circuits.",
    },
    {
        q: "Why does an oxygen barrier matter in a heating system?",
        a: "Oxygen diffusing through a bare polymer wall corrodes the steel components in a closed circuit — the boiler heat exchanger, pumps and manifold bodies. A barrier layer, whether aluminium or EVOH, is what keeps that corrosion out of a system that will run for decades.",
    },
    {
        q: "Is PEX safe for drinking water?",
        a: "Yes, where the pipe carries a potable-water approval for your market. The approvals to look for are the ones your inspector recognises — WRAS in the UK, ACS in France, NSF in North America — plus the material certificate showing the compound used.",
    },
    {
        q: "Crimp or expansion fittings — which system should I buy?",
        a: "Expansion fittings suit PEX-a because they exploit its thermal memory: the pipe is expanded, the fitting inserted, and the pipe shrinks back onto it. Crimp and press systems work across PEX types and need no waiting time. Choose the system first, then buy the pipe and fittings that match it.",
    },
    {
        q: "Can I buy pipe and fittings from different suppliers?",
        a: "It is the most common cause of leaking PEX joints. Insert diameters and sleeve tolerances vary between manufacturers even at the same nominal size. IFAN supplies the pipe and the matching press and sliding-sleeve fittings together so the dimensional pairing is guaranteed.",
    },
];

export const pexPillar: CategoryPillar = {
    slug: "pex-ppsu",
    seo: {
        title: "PEX & PE-RT Pipe Manufacturer | Floor Heating Coils 16–32 mm",
        description:
            "PEX, PE-RT and PEX-AL-PEX floor-heating pipe in 16–32 mm with matched press and sliding-sleeve fittings. Mixed-size containers, certificate per shipment.",
    },
    schema: {
        serviceName: "PEX and PE-RT Pipe Manufacturing",
        serviceType: "Cross-linked polyethylene and PE-RT pipe manufacturing and B2B export",
        serviceDescription:
            "Factory-direct PEX, PE-RT and PEX-AL-PEX pipe for underfloor heating and potable water in 16–32 mm, supplied with dimensionally matched press and sliding-sleeve fittings. Produced under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 at a 120,000 m² plant in Zhejiang operating since 1993, shipped B2B in mixed-size containers with certificates per shipment.",
    },
    faqs: pexFaqs,
    sections: [
        {
            type: "prose",
            id: "overview",
            heading: "PEX and PE-RT: What IFAN Manufactures",
            body: [
                "Underfloor heating is unforgiving of supply-chain shortcuts. The pipe is buried in screed, so a joint that weeps is a floor that comes up. And because the pipe and the fitting have to match dimensionally to a fraction of a millimetre, buying them from two suppliers is the single most reliable way to create that problem.",
                "IFAN produces PE-RT, PEX and PEX-AL-PEX floor-heating coils in 16, 20, 25 and 32 mm, together with the press and sliding-sleeve fittings that go with them, from one factory. Mixed-size containers ship with certificates per shipment, so a project can take every circuit size it needs in one delivery with one set of documents.",
                "The plant runs at 120,000 m² in Zhejiang, operating since 1993 under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018, with resin bought from Borealis, Hyosung and LG Chem rather than on the spot market.",
            ],
        },
        {
            type: "prose",
            id: "types",
            heading: "PEX-a, PEX-b, PE-RT and PEX-AL-PEX: Choosing the Right One",
            body: [
                "The suffix on PEX names the cross-linking method, not a quality ranking. PEX-a is cross-linked with peroxide during extrusion and reaches the highest degree of cross-linking, which gives it the thermal memory that expansion-fitting systems depend on. PEX-b is silane cross-linked after extrusion. PEX-c is irradiated. Correctly manufactured, all three meet the same pipe standards.",
                "PE-RT is a different material entirely — a polyethylene of raised temperature resistance that is not cross-linked at all. Because it stays thermoplastic it can be heat-fused, which PEX cannot, and it is easier to coil and uncoil in cold weather. It suits floor heating well but has a lower ceiling on continuous operating temperature than PEX.",
                "PEX-AL-PEX adds an aluminium core between two PEX layers. That core does two jobs: it forms a complete oxygen barrier, and it makes the pipe hold whatever shape it is bent into instead of springing back. On a manifold run with many tight bends, that is the difference between clipping every 300 mm and routing the pipe once by hand.",
            ],
            aside: "If the circuit is closed and contains steel — a boiler, a pump, a steel manifold — the pipe must have an oxygen barrier, either an aluminium core or an EVOH layer. Bare PEX in a closed heating circuit corrodes the metal components from the inside over years.",
        },
        {
            type: "prose",
            id: "fittings",
            heading: "Why Pipe and Fitting Have to Come From the Same Source",
            body: [
                "Nominal size is not a guarantee of fit. A 16 mm PEX pipe from two manufacturers can differ in wall thickness and insert diameter within their respective tolerances, and a press fitting sized for one will make a marginal seal on the other. Marginal seals hold at test pressure and fail under thermal cycling months later.",
                "The failure is expensive precisely because it is delayed. By the time a screed-embedded joint weeps, the floor finish is down and the cost of access is many times the cost of the fitting.",
                "IFAN manufactures the pipe and the matching press and sliding-sleeve fittings, so the dimensional pairing is controlled in one place rather than assumed across two purchase orders. If you are already buying pipe elsewhere, buy the fittings from the same maker as the pipe — not from us.",
            ],
        },
        {
            type: "specTable",
            id: "specs",
            heading: "IFAN PEX and PE-RT Specification",
            intro: "Confirmed manufacturing and supply specification. Rows awaiting a verified figure are not published.",
            rows: [
                { label: "Materials produced", value: "PEX, PE-RT, PEX-AL-PEX", verified: true },
                {
                    label: "Floor-heating coil sizes",
                    value: "16 mm, 20 mm, 25 mm, 32 mm",
                    verified: true,
                },
                {
                    label: "Matching fittings",
                    value: "Press and sliding-sleeve, dimensionally matched to the pipe",
                    verified: true,
                },
                {
                    label: "Resin suppliers",
                    value: "Borealis, Hyosung, LG Chem",
                    note: "Batch documentation available per production run",
                    verified: true,
                },
                { label: "Supply form", value: "Coils; mixed-size containers", verified: true },
                { label: "Documentation", value: "Certificates issued per shipment", verified: true },
                {
                    label: "Manufacturing site",
                    value: "120,000 m² facility, Zhuji, Zhejiang, China",
                    note: "In operation since 1993; Chinese National High-Tech Enterprise",
                    verified: true,
                },
                {
                    label: "Quality systems",
                    value: "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018",
                    verified: true,
                },
                { label: "Conformity marking", value: "CE marked; SGS third-party tested", verified: true },
                { label: "In-house testing", value: "CNAS-accredited laboratory", verified: true },
                { label: "Standard lead time", value: "45 days from order confirmation", verified: true },
                { label: "Channel", value: "B2B wholesale only — no direct-to-consumer sales", verified: true },
                // ↓ 等 00-信息收集表.md 填实
                { label: "Cross-linking method produced", value: "", verified: false },
                { label: "Degree of cross-linking", value: "", verified: false },
                { label: "Oxygen barrier type", value: "", verified: false },
                { label: "Coil lengths", value: "", verified: false },
                { label: "Potable-water approvals", value: "", verified: false },
                { label: "PPSU fitting range", value: "", verified: false },
            ],
            caption:
                "Tell us the fitting system you have standardised on — expansion, press or sliding sleeve — and we will quote the pipe that matches it.",
        },
        {
            type: "comparison",
            id: "compare",
            heading: "PEX vs PE-RT vs PEX-AL-PEX for Underfloor Heating",
            intro: "IFAN manufactures all three, so this is about which suits the circuit.",
            alternativeLabel: "PE-RT / PEX-AL-PEX",
            rows: [
                {
                    label: "Structure",
                    ifan: "PEX: cross-linked polyethylene, single layer",
                    alternative: "PE-RT: not cross-linked · PEX-AL-PEX: aluminium core between PEX layers",
                },
                {
                    label: "Oxygen barrier",
                    ifan: "PEX: needs an EVOH barrier layer for closed circuits",
                    alternative: "PE-RT: needs EVOH · PEX-AL-PEX: aluminium core is a full barrier",
                },
                {
                    label: "Shape retention",
                    ifan: "PEX: springs back; needs clipping on bends",
                    alternative: "PEX-AL-PEX: holds the bend as routed",
                },
                {
                    label: "Jointing",
                    ifan: "PEX: press, crimp or expansion — cannot be heat-fused",
                    alternative: "PE-RT: can be heat-fused as well as pressed",
                },
                {
                    label: "Cold-weather handling",
                    ifan: "PEX-a: recovers after freeze expansion",
                    alternative: "PE-RT: stays flexible and easy to uncoil in cold conditions",
                },
            ],
        },
        {
            type: "applications",
            id: "applications",
            heading: "Where IFAN PEX and PE-RT Are Specified",
            items: [
                {
                    title: "Underfloor heating circuits",
                    icon: "thermometer",
                    body: "16–32 mm coils run continuously from the manifold with no buried joints, which is the whole point of coil supply on a screed floor.",
                },
                {
                    title: "Manifold and distribution",
                    icon: "gauge",
                    body: "Matched to our brass manifolds and isolation valves, so the pipe, the fitting and the manifold body come from one maker with one set of tolerances.",
                },
                {
                    title: "Potable-water plumbing",
                    icon: "droplets",
                    body: "Tight-radius hot and cold runs where a flexible pipe removes elbows — each elbow avoided is a joint that cannot leak.",
                },
                {
                    title: "Cold-climate installations",
                    icon: "waves",
                    body: "PEX-a's thermal memory lets the pipe expand around freezing water and recover, rather than splitting the wall.",
                },
            ],
        },
        {
            type: "standards",
            id: "certs",
            heading: "Certifications and Testing",
            intro: "Only certifications currently held are listed. Product-specific potable-water approvals are published once confirmed per market.",
            items: [
                { code: "ISO 9001:2015", scope: "Quality management system", verified: true },
                { code: "ISO 14001:2015", scope: "Environmental management system", verified: true },
                { code: "ISO 45001:2018", scope: "Occupational health and safety management", verified: true },
                { code: "CE", scope: "European conformity marking", verified: true },
                { code: "SGS", scope: "Third-party inspection and testing", verified: true },
                { code: "CNAS", scope: "In-house laboratory accreditation", verified: true },
                { code: "WRAS", scope: "UK Water Regulations Advisory Scheme — potable water", verified: true },
            ],
        },
        { type: "faq", id: "faq", heading: "PEX Sourcing FAQ", items: pexFaqs },
        {
            type: "relatedReading",
            id: "reading",
            heading: "PEX Technical Guides",
            links: [
                {
                    href: "/news/pex-pipe-guide",
                    label: "PEX Pipe: Complete Guide",
                    blurb: "Types, sizing and specification",
                },
                {
                    href: "/news/pex-a-vs-pex-b",
                    label: "PEX-a vs PEX-b",
                    blurb: "What the cross-linking method actually changes",
                },
                {
                    href: "/news/underfloor-heating-pipe",
                    label: "Underfloor Heating Pipe Guide",
                    blurb: "Choosing between PE-RT, PEX and PEX-AL-PEX",
                },
                {
                    href: "/news/pex-crimp-vs-expansion",
                    label: "Crimp vs Expansion Fittings",
                    blurb: "Picking the jointing system first",
                },
                {
                    href: "/news/pex-pipe-sizes",
                    label: "PEX Pipe Sizes",
                    blurb: "Metric coil sizes and matched fittings",
                },
                {
                    href: "/news/pex-manifold",
                    label: "PEX Manifold Guide",
                    blurb: "Circuit layout and balancing",
                },
                {
                    href: "/news/is-pex-safe-drinking-water",
                    label: "Is PEX Safe for Drinking Water?",
                    blurb: "Approvals to look for by market",
                },
                {
                    href: "/news/pex-vs-copper-pipe",
                    label: "PEX vs Copper",
                    blurb: "Where each still wins",
                },
            ],
        },
        {
            type: "relatedProducts",
            id: "products",
            heading: "PEX Products in the IFAN Catalogue",
            sanityCategoryTitles: ["PEX Series"],
            limit: 8,
        },
    ],
};
