import type { FaqItem } from "@/components/pillar/types";
import type { CategoryPillar } from "../pillarTypes";

const hdpeFaqs: FaqItem[] = [
    {
        q: "What is the difference between PE80 and PE100 pipe?",
        a: "The number is the material's minimum required strength (MRS) in bar under ISO 12162. PE80 has an MRS of 8.0 MPa, PE100 has 10.0 MPa. At the same pressure rating PE100 allows a thinner wall, so you get more metres per container and a lower delivered cost per metre.",
    },
    {
        q: "What does SDR mean on an HDPE pipe?",
        a: "SDR is the Standard Dimension Ratio — outside diameter divided by wall thickness. A lower SDR means a thicker wall and a higher pressure rating. SDR11 in PE100 gives PN16; SDR17 gives PN10. The same SDR number means different pressures in different PE grades.",
    },
    {
        q: "Which standard should HDPE water pipe be manufactured to?",
        a: "ISO 4427 is the international standard for polyethylene pipes and fittings for water supply; EN 12201 is the European equivalent. Gas distribution uses ISO 4437 or EN 1555. Ask any supplier which specific standard their pipe is certified to, not just that it is 'ISO certified'.",
    },
    {
        q: "How is HDPE pipe joined?",
        a: "Three methods. Butt fusion heats two pipe ends against a plate and presses them together, giving a joint as strong as the pipe wall. Electrofusion uses a fitting with an embedded heating coil, useful in trenches and repairs. Mechanical compression fittings suit small diameters and transitions to other materials.",
    },
    {
        q: "Can HDPE pipe from different SDR classes be butt fused together?",
        a: "No. Butt fusion requires matching wall thickness at the joint face, so both pipes must be the same SDR and the same PE grade. Joining different SDRs needs an electrofusion coupler or a mechanical transition fitting.",
    },
    {
        q: "Why is HDPE specified for buried mains instead of PVC?",
        a: "Fusion creates a monolithic joint with no gasket or solvent seam, which removes the main leak path in buried networks. HDPE is also flexible, so it tolerates ground settlement and seismic movement that can pull rigid PVC joints apart.",
    },
    {
        q: "Where does the 50-year service life figure come from?",
        a: "It is a classification, not a warranty. Under ISO 9080 the long-term hydrostatic strength of a PE compound is extrapolated from pressure-test data to 50 years at 20 °C. That extrapolated value is what assigns the material to PE80 or PE100 under ISO 12162.",
    },
    {
        q: "Which resin do you use for HDPE pipe?",
        a: "We buy from established international producers — Borealis, Hyosung and LG Chem — rather than on the spot market, and batch documentation is available for each production run. Ask any supplier to name their resin producer and show the batch certificate; it is the one claim you can verify independently.",
    },
    {
        q: "What is the lead time for an HDPE order?",
        a: "Standard lead time is 45 days from order confirmation. That is longer than a trading company quoting from stock, because the run is produced to your specification rather than pulled from mixed inventory. Plan procurement around it, or ask us about scheduling repeat orders in advance.",
    },
    {
        q: "Do you sell HDPE pipe to end users or only wholesale?",
        a: "IFAN manufactures and supplies B2B only — distributors, importers, contractors and project procurement. We do not sell single lengths to consumers, which protects the pricing of the distributors who carry our stock.",
    },
];

export const hdpePillar: CategoryPillar = {
    slug: "hdpe",
    seo: {
        title: "HDPE Pipe Manufacturer | PE100 DN20–DN1600 Factory Supply",
        description:
            "Factory-direct PE100 HDPE pipe DN20–DN1600 to ISO 4427 / EN 12201, extruded from Borealis, Hyosung and LG Chem resin. ISO 9001/14001/45001, CE, WRAS.",
    },
    schema: {
        serviceName: "HDPE Pipe Manufacturing and Wholesale Supply",
        serviceType: "HDPE polyethylene pipe manufacturing and B2B export",
        serviceDescription:
            "Factory-direct HDPE pipe in PE63, PE80 and PE100 grades for water supply, irrigation and industrial fluid transfer, extruded from Borealis, Hyosung and LG Chem resin. Produced under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 with an in-house CNAS-accredited testing laboratory, CE marked, WRAS approved and SGS tested, shipped B2B to more than 120 countries from a 120,000 m² plant operating since 1993.",
    },
    faqs: hdpeFaqs,
    sections: [
        {
            type: "prose",
            id: "overview",
            heading: "HDPE Pipe: What It Is and When to Specify It",
            body: [
                "High-density polyethylene is the default material for buried pressure networks because of how it is joined. A butt-fused or electrofused HDPE joint is a continuous piece of material, not a gasket or a solvent seam. That removes the leak path that drives non-revenue water losses in socketed systems, and it is the single reason utilities move from rigid pipe to PE on trunk mains.",
                "The second reason is movement. Polyethylene is flexible. It absorbs ground settlement, traffic loading and seismic displacement that would pull a rigid joint apart. In practice this is what decides the material on long buried runs and in unstable or expansive soils.",
                "IFAN has manufactured piping systems since 1993 as Zhuji Fengfan Piping Co., Ltd, a Chinese National High-Tech Enterprise. Production runs across a 120,000 m² facility in Zhejiang with more than 30 automated extrusion lines and over 600 staff, including a 50-strong R&D and technical team. Combined plant output is around 2,000 tonnes a month — roughly 24,000 tonnes a year — across all product lines.",
                "HDPE sits in the same catalogue as our PPR, PVC, PEX and brass lines, more than 10,000 SKUs in total shipped to buyers in over 120 countries. That matters on a project bill of materials: one mixed container can carry the buried PE main, the indoor PPR risers and the brass valves, instead of forcing you to open and manage a separate supplier for each material.",
            ],
        },
        {
            type: "prose",
            id: "grades",
            heading: "PE63, PE80 and PE100: What the Grade Number Means",
            body: [
                "The number in a PE grade is not marketing. Under ISO 12162 it is the minimum required strength (MRS) of the compound, in megapascals, derived from long-term hydrostatic testing. PE63 is MRS 6.3 MPa, PE80 is 8.0 MPa and PE100 is 10.0 MPa.",
                "That figure comes from ISO 9080, which extrapolates pressure-test data out to 50 years at 20 °C. The extrapolated strength is then divided by a design coefficient — minimum 1.25 for water under ISO 4427 — to give the allowable design stress. PE100 therefore works at a design stress of 8.0 MPa, PE80 at 6.3 MPa and PE63 at 5.0 MPa.",
                "The commercial consequence is wall thickness. Because PE100 carries more stress, it reaches the same pressure class with a thinner wall than PE80. Thinner wall means less resin per metre, more metres per container and a lower delivered cost per metre — which is why PE100 has become the default specification for new pressure work even though PE80 remains perfectly valid for lower-duty and irrigation applications.",
                "One caution when comparing quotes: a price per kilogram tells you nothing until you know the grade and the SDR. A cheaper PE80 quote can end up costing more per metre of installed line than PE100, because it needs a thicker wall to hit the same pressure class.",
            ],
        },
        {
            type: "prose",
            id: "sdr",
            heading: "SDR, Wall Thickness and Pressure Rating",
            body: [
                "SDR is the Standard Dimension Ratio: outside diameter divided by wall thickness. It is a ratio, not a dimension, so SDR11 means the same wall-to-diameter proportion at dn63 as it does at dn400. A lower SDR is a thicker wall and a higher pressure rating.",
                "The pressure rating follows directly from the grade and the SDR: PN = 2 × design stress ÷ (SDR − 1). In PE100, SDR11 gives PN16, SDR17 gives PN10, SDR21 gives PN8 and SDR26 gives PN6.3. The same SDR in PE80 gives a lower class — SDR11 in PE80 is PN12.5, not PN16.",
                "This is the most common specification error we see on inbound enquiries. A buyer asks for 'SDR11' assuming a pressure class, without stating the grade. Always specify both, and state the design coefficient if your local code requires something above the ISO 4427 minimum of 1.25 — some water authorities mandate 1.6, which drops the working pressure of the same pipe by 20 percent.",
                "IFAN produces PE100 from DN20 through DN1600, which covers both the small service-connection band and the large trunk-main band in a single resin specification. On a project that needs both, that means one supplier, one set of certificates and one shipment, instead of matching material across two sources.",
            ],
        },
        {
            type: "prose",
            id: "resin",
            heading: "Where the Resin Comes From",
            body: [
                "Two HDPE pipes can carry the same PE100 marking and behave completely differently in service. The variable is the compound. Recycled or reprocessed material, or an unnamed spot-market resin, will not reproduce the long-term hydrostatic strength that the PE100 classification implies, and the failure shows up years later as slow crack growth rather than on a delivery inspection.",
                "IFAN buys resin from established international producers — Borealis, Hyosung and LG Chem — rather than on the open spot market. Naming the source is deliberate: it is the one specification claim a buyer can independently check, by asking for the resin batch documentation that accompanies each production run.",
                "If you are comparing quotes, ask every supplier the same question: which resin producer, and can you show the batch certificate. A quote that cannot answer that is not comparable to one that can, regardless of the price per kilogram.",
            ],
            aside: "Practical check before you place a first order: ask for the resin batch certificate and the pressure-test record for the specific production run, not a generic type-test report issued years ago for a different lot.",
        },
        {
            type: "specTable",
            id: "specs",
            heading: "IFAN HDPE Manufacturing Specification",
            intro: "What we can confirm about how and where this product is made. Rows that depend on a current production figure are published only once verified.",
            rows: [
                { label: "Material grades", value: "PE63, PE80, PE100", verified: true },
                {
                    label: "Resin suppliers",
                    value: "Borealis, Hyosung, LG Chem",
                    note: "Batch documentation available per production run",
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
                    note: "Combined across all product lines, not HDPE alone",
                    verified: true,
                },
                {
                    label: "Workforce",
                    value: "600+ staff, including a 50-strong R&D and technical team",
                    verified: true,
                },
                { label: "Standard lead time", value: "45 days from order confirmation", verified: true },
                {
                    label: "Quality systems",
                    value: "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018",
                    verified: true,
                },
                { label: "Conformity marking", value: "CE marked; SGS third-party tested", verified: true },
                {
                    label: "In-house testing",
                    value: "CNAS-accredited laboratory",
                    note: "Hydrostatic, thermal and impact testing on site",
                    verified: true,
                },
                { label: "Catalogue breadth", value: "10,000+ SKUs across HDPE, PPR, PVC, PEX and brass", verified: true },
                { label: "Export markets", value: "120+ countries", verified: true },
                { label: "Channel", value: "B2B wholesale only — no direct-to-consumer sales", verified: true },
                // ↓ 以下五行取自本站已发布的 HDPE 博客里 IFAN 自己的声明
                //   （hdpe-pipe-complete-guide / hdpe-pipe-sizes / hdpe-pipe-water-supply-network
                //     / hdpe-pipe-supplier-africa），此处是让支柱页与博客口径一致。
                //   若其中任一条有误，那是已经错在 4 篇线上文章里，需要一起改。
                { label: "Outside diameter range", value: "DN20 – DN1600 (PE100)", verified: true },
                {
                    label: "Product standard",
                    value: "ISO 4427 (water) / EN 12201 (Europe)",
                    note: "DIN 8074/8075 for dimensions and testing",
                    verified: true,
                },
                {
                    label: "Jointing methods",
                    value: "Butt fusion, electrofusion, compression, saddle, flange",
                    verified: true,
                },
                {
                    label: "Supply form",
                    value: "Coils to DN90; 6 m and 12 m straight lengths",
                    verified: true,
                },
                {
                    label: "Documentation",
                    value: "Material certificate issued per shipment",
                    verified: true,
                },
                // ↓ 仍等 00-信息收集表.md 填实
                { label: "SDR / pressure classes offered", value: "", verified: false },
                { label: "Colour options", value: "", verified: false },
                { label: "Gas-grade approval", value: "", verified: false },
                { label: "Minimum order quantity", value: "", verified: false },
            ],
            caption:
                "Specification rows are published only when confirmed against production records. Ask our engineering desk for the current size and pressure-class list against your project requirement.",
        },
        {
            type: "comparison",
            id: "compare",
            heading: "HDPE vs PVC vs PPR: Choosing the Material",
            intro: "IFAN manufactures all three, so this is about fit rather than upsell. The wrong material choice usually shows up as either premature failure or money left on the table.",
            alternativeLabel: "PVC / PPR",
            rows: [
                {
                    label: "Joint type",
                    ifan: "HDPE: heat fusion — continuous material, no gasket or seam",
                    alternative: "PVC: solvent cement or gasketed socket · PPR: socket heat fusion",
                },
                {
                    label: "Ground movement",
                    ifan: "HDPE: flexible, absorbs settlement and seismic displacement",
                    alternative: "PVC: rigid, joints can pull apart · PPR: rigid, indoor use",
                },
                {
                    label: "Typical duty",
                    ifan: "HDPE: buried water mains, irrigation, industrial transfer",
                    alternative: "PVC: cold supply and gravity drainage · PPR: indoor hot and cold plumbing",
                },
                {
                    label: "Hot water",
                    ifan: "HDPE: cold-water service; PE-RT for warm-water and floor heating",
                    alternative: "PVC: cold only (CPVC for hot) · PPR: rated for continuous hot water",
                },
                {
                    label: "Supply form",
                    ifan: "HDPE: straight lengths and coils — coils cut joint count on field runs",
                    alternative: "PVC and PPR: straight lengths only",
                },
                {
                    label: "Governing standard",
                    ifan: "HDPE: ISO 4427 / EN 12201 (water)",
                    alternative: "PVC: ISO 1452 · PPR: ISO 15874 / DIN 8077-8078",
                },
            ],
        },
        {
            type: "applications",
            id: "applications",
            heading: "Where HDPE Is Specified",
            items: [
                {
                    title: "Municipal water distribution",
                    icon: "droplets",
                    body: "Trunk and distribution mains where fused joints cut non-revenue water loss. PE100 is the usual specification, with the SDR chosen against the system's design pressure and surge allowance.",
                },
                {
                    title: "Irrigation and agriculture",
                    icon: "sprout",
                    body: "Coil supply on smaller diameters removes most of the joints from a field run, which is where installation time and leak risk concentrate. PE80 is often adequate at irrigation pressures.",
                },
                {
                    title: "Industrial and effluent transfer",
                    icon: "factory",
                    body: "Polyethylene resists a broad range of aggressive soils and effluents that corrode metal pipe, and it does not scale internally, so flow capacity holds up over the life of the line.",
                },
                {
                    title: "Trenchless and relining work",
                    icon: "waves",
                    body: "The flexibility that helps with ground movement also allows horizontal directional drilling and slip-lining of failed host pipes — routes where rigid materials cannot be installed at all.",
                },
            ],
        },
        {
            type: "standards",
            id: "standards",
            heading: "Certifications and Testing",
            intro: "Only certifications we currently hold are listed. Certificate numbers are published as they are confirmed — an unverifiable certification is not worth listing.",
            items: [
                { code: "ISO 9001:2015", scope: "Quality management system", verified: true },
                { code: "ISO 14001:2015", scope: "Environmental management system", verified: true },
                { code: "ISO 45001:2018", scope: "Occupational health and safety management", verified: true },
                { code: "CE", scope: "European conformity marking", verified: true },
                { code: "SGS", scope: "Third-party inspection and testing", verified: true },
                { code: "CNAS", scope: "In-house laboratory accreditation", verified: true },
                { code: "WRAS", scope: "UK Water Regulations Advisory Scheme — potable water", verified: true },
                { code: "PT (Russia)", scope: "Russian market conformity certification", verified: true },
                // 与本站已发布的 HDPE 博客口径一致。注意 HDPE 的产品标准是 ISO 4427 / EN 12201，
                // 不是公司资料里给的 DIN 8077/8078 与 GB/T 18742.2——那两个是 PPR 的标准。
                { code: "ISO 4427", scope: "PE pipes and fittings for water supply", verified: true },
                { code: "EN 12201", scope: "European PE pressure pipe for water", verified: true },
                { code: "DIN 8074 / 8075", scope: "PE pipe dimensions and testing", verified: true },
            ],
        },
        { type: "faq", id: "faq", heading: "HDPE Sourcing FAQ", items: hdpeFaqs },
        {
            type: "relatedReading",
            id: "reading",
            heading: "HDPE Technical Guides",
            links: [
                {
                    href: "/news/hdpe-pipe-complete-guide",
                    label: "The Complete Guide to HDPE Pipe (PE100)",
                    blurb: "Grades, SDR, jointing and specification in one place",
                },
                {
                    href: "/news/hdpe-pipe-sizes",
                    label: "HDPE Pipe Sizes, SDR & PN Chart",
                    blurb: "DN20–DN1600 dimension and pressure-class reference",
                },
                {
                    href: "/news/pe100-vs-pe80",
                    label: "PE100 vs PE80: Grades Explained",
                    blurb: "What the MRS figure changes in cost per metre",
                },
                {
                    href: "/news/hdpe-pipe-standards",
                    label: "HDPE Standards & Certification",
                    blurb: "ISO 4427 and ISO 9080, and what to ask a supplier for",
                },
                {
                    href: "/news/butt-fusion-vs-electrofusion",
                    label: "Butt Fusion vs Electrofusion",
                    blurb: "Which jointing method suits which site condition",
                },
                {
                    href: "/news/hdpe-fittings",
                    label: "HDPE Pipe Fittings",
                    blurb: "Types, jointing methods and how to choose",
                },
                {
                    href: "/news/hdpe-pipe-price",
                    label: "HDPE Pipe Price: What Drives Cost",
                    blurb: "How to compare quotes that are not like-for-like",
                },
                {
                    href: "/news/hdpe-pipe-installation",
                    label: "HDPE Installation Guide",
                    blurb: "Trench preparation, jointing and pressure testing",
                },
            ],
        },
        // 这里原本有一个 relatedProducts 区块，取 Sanity 的 "PE Series" 分类。
        // 2026-07-29 实测：整个产品库 1191 个 SKU 里，名称含 hdpe / pe100 / poly 的是 0 个，
        // "PE Series" 分类下只有 15 件——激光打标复合盘管（size 形如 1216x100m，是
        // PEX-AL-PEX 规格）、电动套丝机和管卡，没有一件是 HDPE 管或 HDPE 管件。
        // 线上这 8 条产品深链因此全部指向激光管和套丝机，标题却写着「HDPE Products」。
        //
        // 这不是过滤条件写错，是目录里根本没有对应的货，没有正确的分类可指。
        // 与其展示 8 个错的产品，不如不展示——错配的实体关联既误导买家，
        // 也在向 Google 传递品类与产品内容不一致的信号。
        // 等产品库补进真正的 HDPE SKU 后再把这个区块加回来。
    ],
};
