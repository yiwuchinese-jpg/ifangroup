import type { FaqItem } from "@/components/pillar/types";
import type { CategoryPillar } from "../pillarTypes";

const pvcFaqs: FaqItem[] = [
    {
        q: "What is the difference between PVC, uPVC and CPVC?",
        a: "uPVC is unplasticised PVC — rigid pipe with no plasticiser added, used for drainage and cold pressure lines. 'PVC' in trade usage normally means the same thing. CPVC is chlorinated PVC, which raises the temperature limit to around 90 °C so it can carry hot water where uPVC cannot.",
    },
    {
        q: "Which standard applies to uPVC drainage pipe?",
        a: "EN 1401 covers buried non-pressure drainage and sewerage, EN 1329 covers soil and waste inside buildings, and ISO 4435 is the international equivalent for buried systems. Always state the standard on the order, because a pipe made to one is not automatically compliant with the other.",
    },
    {
        q: "What does the SN stiffness class mean on drainage pipe?",
        a: "SN is ring stiffness in kN/m², and it measures resistance to crushing under soil and traffic load. SN4 is typical for normal burial, SN8 for deeper cover or trafficked ground. Stiffness class is chosen from the burial condition, not from the fluid pressure.",
    },
    {
        q: "Why do solvent-cemented PVC joints leak?",
        a: "Almost always process, not product. The usual causes are the wrong cement for the diameter, no primer on pressure work, insufficient interference fit, or the joint being disturbed before the cement has set. A correctly made solvent weld fuses the two surfaces into one material.",
    },
    {
        q: "Can PVC drainage pipe and fittings from different suppliers be mixed?",
        a: "Not safely. Socket depth and taper tolerances vary between manufacturers even within the same nominal standard, and a marginal fit is what produces a slow leak two years later. Buy pipe, fittings and the matched cement as one schedule from one source.",
    },
    {
        q: "Is PVC still specified for sewers, or has concrete replaced it?",
        a: "Both are in use. PVC wins on weight, installation speed, hydraulic smoothness and resistance to sulphide attack, which is the usual failure mode in concrete sewers. Concrete still wins on very large diameters where PVC is not produced.",
    },
    {
        q: "Do you supply the cement and primer as well as the pipe?",
        a: "Yes. IFAN quotes pipe, every fitting shape, and the matched cement and primer as one schedule, which removes the most common site problem — the wrong-material glue being bought locally and used on a system it was not formulated for.",
    },
    {
        q: "Can a mixed container carry several PVC product lines?",
        a: "Yes. IFAN ships mixed containers of uPVC drainage pipe, fittings, traps and stacks with per-shipment batch certificates referencing EN 1401, EN 1329 and ISO 4435, so a project bill of materials can be consolidated into one shipment.",
    },
];

export const pvcPillar: CategoryPillar = {
    slug: "pvc",
    seo: {
        title: "uPVC Drainage Pipe Manufacturer | EN 1401 / EN 1329 Factory",
        description:
            "Factory-direct uPVC drainage pipe, fittings, traps and stacks to EN 1401, EN 1329 and ISO 4435, with matched solvent cement and batch certificates.",
    },
    schema: {
        serviceName: "uPVC Drainage Pipe and Fitting Manufacturing",
        serviceType: "uPVC drainage and conduit manufacturing and B2B export",
        serviceDescription:
            "Factory-direct uPVC drainage pipe, fittings, traps, wastes and stacks manufactured to EN 1401, EN 1329 and ISO 4435, supplied with matched solvent cement and primer. Produced under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 at a 120,000 m² plant in Zhejiang operating since 1993, shipped B2B in mixed containers with batch certificates per shipment.",
    },
    faqs: pvcFaqs,
    sections: [
        {
            type: "prose",
            id: "overview",
            heading: "uPVC Drainage: What IFAN Manufactures",
            body: [
                "Drainage is where most plumbing supply chains quietly go wrong. The pipe is cheap, so it gets bought on price, from whoever is nearest — and then the fittings come from a second source, the cement from a third, and the joints that fail two years later are the ones where those three did not quite match.",
                "IFAN manufactures the whole drainage schedule in one place: uPVC pipe, every fitting shape, traps, wastes, bends, wyes and stacks, plus the solvent cement and primer formulated for them. Production runs at a 120,000 m² plant in Zhejiang, operating since 1993 under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018, with batch certificates issued per shipment.",
                "The practical consequence is that a mixed container can carry a complete building's drainage bill of materials — sized, matched and certified together — rather than three partial deliveries that have to be reconciled on site.",
            ],
        },
        {
            type: "prose",
            id: "standards",
            heading: "EN 1401, EN 1329 and ISO 4435: Which One Your Order Needs",
            body: [
                "uPVC drainage is not governed by a single standard, and the difference matters at customs as much as on site. EN 1401 covers buried non-pressure drainage and sewerage outside the building. EN 1329 covers soil and waste discharge inside the building. ISO 4435 is the international equivalent for buried systems.",
                "A pipe manufactured to EN 1329 is not automatically acceptable where EN 1401 is specified — the wall construction, impact requirement and marking differ. Inspectors in several of our markets check the printed line on the pipe against the drawing, and a mismatch stops the job.",
                "State the standard explicitly on the purchase order, per line item. IFAN references EN 1401, EN 1329 and ISO 4435 on the batch documentation for every shipment, so the paperwork matches what is printed on the pipe when it is inspected.",
            ],
            aside: "If you are importing into a market with its own conformity scheme, tell us the destination at quotation stage rather than at shipping. Marking and documentation are set during the production run; changing them afterwards means a new run.",
        },
        {
            type: "prose",
            id: "stiffness",
            heading: "Ring Stiffness: Choosing SN Class From the Trench, Not the Fluid",
            body: [
                "The most common specification mistake in buried drainage is choosing pipe by pressure thinking. Gravity drainage carries almost no internal pressure; what the pipe has to survive is external load — the weight of backfill and whatever drives over it.",
                "That resistance is ring stiffness, expressed as an SN class in kilonewtons per square metre. SN4 suits normal burial depths in non-trafficked ground. SN8 is specified for deeper cover, for trafficked areas, or where the bedding cannot be controlled well. Higher stiffness costs more material, so over-specifying across a whole project is real money.",
                "Bedding matters as much as the class. A correctly bedded SN4 pipe in compacted granular material can outperform an SN8 pipe dropped into an unprepared trench, because the surrounding soil carries part of the load. Specify the class and the bedding together.",
            ],
        },
        {
            type: "specTable",
            id: "specs",
            heading: "IFAN uPVC Drainage Specification",
            intro: "What we can confirm about how this range is made and documented. Rows awaiting a verified production figure are not published.",
            rows: [
                {
                    label: "Product standards",
                    value: "EN 1401 (buried), EN 1329 (soil & waste), ISO 4435",
                    note: "Referenced on batch documentation per shipment",
                    verified: true,
                },
                {
                    label: "Range supplied",
                    value: "Pipe, fittings, traps, wastes, bends, wyes and stacks",
                    verified: true,
                },
                {
                    label: "Consumables",
                    value: "Matched solvent cement and primer quoted with the schedule",
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
                    note: "Combined across all product lines, not uPVC alone",
                    verified: true,
                },
                {
                    label: "Quality systems",
                    value: "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018",
                    verified: true,
                },
                { label: "Conformity marking", value: "CE marked; SGS third-party tested", verified: true },
                { label: "In-house testing", value: "CNAS-accredited laboratory", verified: true },
                { label: "Shipment", value: "Mixed containers by SKU spec and stiffness class", verified: true },
                { label: "Documentation", value: "Batch certificate issued per shipment", verified: true },
                { label: "Standard lead time", value: "45 days from order confirmation", verified: true },
                { label: "Channel", value: "B2B wholesale only — no direct-to-consumer sales", verified: true },
                // ↓ 等 00-信息收集表.md 填实
                { label: "Diameter range", value: "", verified: false },
                { label: "Stiffness classes produced", value: "", verified: false },
                { label: "Colour options", value: "", verified: false },
                { label: "Standard lengths", value: "", verified: false },
                { label: "Minimum order quantity", value: "", verified: false },
            ],
            caption:
                "Ask our engineering desk for the current diameter and stiffness-class list against your drawing before issuing a purchase order.",
        },
        {
            type: "comparison",
            id: "compare",
            heading: "uPVC vs Concrete for Buried Sewers",
            intro: "The comparison that decides most municipal drainage tenders. IFAN does not make concrete pipe, so this is where each material genuinely wins.",
            alternativeLabel: "Concrete",
            rows: [
                {
                    label: "Sulphide attack",
                    ifan: "uPVC: chemically inert, unaffected by sewer gas",
                    alternative: "Crown corrosion from H₂S is the classic failure mode",
                },
                {
                    label: "Hydraulic performance",
                    ifan: "uPVC: smooth bore, roughness holds over service life",
                    alternative: "Rougher bore; surface degrades as it corrodes",
                },
                {
                    label: "Installation",
                    ifan: "uPVC: light enough to place by hand in most diameters",
                    alternative: "Lifting plant required; slower placement",
                },
                {
                    label: "Load capacity",
                    ifan: "uPVC: flexible — relies on correct bedding to carry load",
                    alternative: "Rigid — carries load in the pipe wall itself",
                },
                {
                    label: "Very large diameters",
                    ifan: "uPVC: not produced above the extrusion range",
                    alternative: "Available well beyond plastic pipe sizes",
                },
                {
                    label: "Governing standard",
                    ifan: "uPVC: EN 1401 / ISO 4435",
                    alternative: "EN 1916 / regional concrete pipe standards",
                },
            ],
        },
        {
            type: "applications",
            id: "applications",
            heading: "Where IFAN uPVC Is Specified",
            items: [
                {
                    title: "Building soil and waste stacks",
                    icon: "building",
                    body: "Internal discharge systems to EN 1329, with the trap, branch and stack fittings supplied as one matched schedule so socket tolerances agree.",
                },
                {
                    title: "Buried drainage and sewerage",
                    icon: "waves",
                    body: "EN 1401 / ISO 4435 systems for site and municipal drainage, specified by stiffness class against the burial and traffic condition.",
                },
                {
                    title: "Electrical conduit",
                    icon: "wrench",
                    body: "Rigid uPVC conduit for cable protection where the mechanical requirement is impact and crush resistance rather than pressure.",
                },
                {
                    title: "Sanitaryware connection",
                    icon: "droplets",
                    body: "P-traps, toilet flanges, wastes and pan connectors — the small parts that decide whether a fit-out finishes on schedule.",
                },
            ],
        },
        {
            type: "standards",
            id: "certs",
            heading: "Certifications and Testing",
            intro: "Only certifications currently held are listed. Certificate numbers are published as they are confirmed.",
            items: [
                { code: "EN 1401", scope: "Buried non-pressure uPVC drainage and sewerage", verified: true },
                { code: "EN 1329", scope: "uPVC soil and waste discharge inside buildings", verified: true },
                { code: "ISO 4435", scope: "Buried thermoplastic drainage systems", verified: true },
                { code: "ISO 9001:2015", scope: "Quality management system", verified: true },
                { code: "ISO 14001:2015", scope: "Environmental management system", verified: true },
                { code: "ISO 45001:2018", scope: "Occupational health and safety management", verified: true },
                { code: "CE", scope: "European conformity marking", verified: true },
                { code: "SGS", scope: "Third-party inspection and testing", verified: true },
                { code: "CNAS", scope: "In-house laboratory accreditation", verified: true },
            ],
        },
        { type: "faq", id: "faq", heading: "uPVC Drainage Sourcing FAQ", items: pvcFaqs },
        {
            type: "relatedReading",
            id: "reading",
            heading: "uPVC and PVC Technical Guides",
            links: [
                {
                    href: "/news/pvc-drainage-complete-guide",
                    label: "uPVC Drainage: Complete Buyer Guide",
                    blurb: "Standards, sizing and specification in one place",
                },
                {
                    href: "/news/pvc-drainage-pipe-sizes",
                    label: "PVC Drainage Pipe Sizes",
                    blurb: "Diameter and stiffness-class reference",
                },
                {
                    href: "/news/pvc-vs-upvc-vs-cpvc",
                    label: "PVC vs uPVC vs CPVC",
                    blurb: "Which material for which duty",
                },
                {
                    href: "/news/pvc-dwv-system-design",
                    label: "PVC DWV System Design",
                    blurb: "Drain, waste and vent layout principles",
                },
                {
                    href: "/news/pvc-vs-concrete-sewer-pipe",
                    label: "PVC vs Concrete Sewer Pipe",
                    blurb: "How the two materials actually compare",
                },
                {
                    href: "/news/pvc-joint-leak",
                    label: "Why PVC Joints Leak",
                    blurb: "The process errors behind solvent-weld failures",
                },
                {
                    href: "/news/pvc-glue",
                    label: "PVC Cement and Primer Guide",
                    blurb: "Matching the consumable to the pipe",
                },
                {
                    href: "/news/pvc-pipe-installation",
                    label: "PVC Pipe Installation Guide",
                    blurb: "Bedding, jointing and testing",
                },
            ],
        },
        {
            type: "relatedProducts",
            id: "products",
            heading: "uPVC Products in the IFAN Catalogue",
            // Sanity 分类名与路由 slug 是两套词汇，按 title 集合取
            sanityCategoryTitles: ["UPVC / PVC Series"],
            limit: 8,
        },
    ],
};
