export interface RegionData {
    id: string;
    name: string;
    coordinates: [number, number]; // [lat, lon]
    problem: string;
    agitate: string;
    feature: string;
    advantage: string;
    benefit: string;
    color: string;
    images?: string[];
    details: {
        intro: string;
        infrastructureSpecs: string[];
        certifications: string[];
    }
}

export const REGIONS_DATA: RegionData[] = [
    {
        id: "mena",
        name: "MENA (Middle East & N. Africa)",
        coordinates: [25, 45],
        problem: "Extreme UV radiation, 40°C+ heat, and highly corrosive desalinated water.",
        agitate: "Standard plastics degrade rapidly, turning brittle under intense sun, risking catastrophic high-pressure leaks and massive project liabilities.",
        feature: "PPR-AL-PPR Composite Pipes + Heavy-duty Forged Brass Valves.",
        advantage: "Armored anti-UV resin blocks sun damage, while the middle aluminum layer provides metallic strength and zero oxygen permeation.",
        benefit: "Lifetime outdoor durability. Total immunity to softening, guaranteeing zero-defect approvals on luxury villas and municipal networks.",
        color: "#f59e0b",
        images: [
            "https://cdn.sanity.io/images/m2e07kon/production/966190299581547e2d029b775be4baa93efc76ae-1000x751.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/ebfccb028632f2fe0b4a1e3b1985ff5dfd3f93f0-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/8170baee91d8ea785f294a8b0a3ba018b59a5088-1000x751.jpg",
        ],
        details: {
            intro: "The MENA region punishes generic plumbing. Coastal desalination plants produce aggressive, mineral-heavy water that corrodes ordinary fittings, while inland sites face 40°C+ heat and relentless UV that turn unprotected plastic brittle within a few seasons. IFAN's armored multi-layer systems are built for exactly these conditions: an anti-UV outer skin, an aluminium core for strength and zero oxygen ingress, and forged lead-free brass at every stress point. From Gulf luxury villas to municipal desalination networks, the objective is the same — pipework that clears inspection and lasts decades in the desert, not a system that softens and fails through its first summer.",
            infrastructureSpecs: [
                "Anti-UV external resin layer rated for 50-year desert exposure.",
                "PPR-AL-PPR composite risers with an aluminium core for zero oxygen permeation and low thermal expansion.",
                "High-pressure brass manifolds in CW617N for luxury high-rise water distribution.",
                "Forged brass ball and angle valves rated for chlorinated, mineral-heavy desalinated water.",
                "HDPE underground networks engineered for municipal sand-bed movement and ground shift.",
                "Per-shipment batch certificates with SABER and ESMA documentation prepared for Gulf customs."
            ],
            certifications: ["ISO 9001", "SABER (Saudi Arabia)", "ESMA (UAE)"]
        }
    },
    {
        id: "north-america",
        name: "North America",
        coordinates: [40, -100],
        problem: "Severe winter freezes, wood-frame construction, and strict zero-lead (NSF/cUPC) regulations.",
        agitate: "Frozen burst pipes cause millions in water damage. Hot-work welding in wooden frames creates immense fire hazards and incurs exorbitant skilled labor costs.",
        feature: "Cold Expansion PEX-a + Push-Fit Fittings + 304/316L Stainless Steel Press.",
        advantage: "PEX-a thermal memory expands rather than cracks when frozen. Push-fit requires zero flames or tools. Stainless steel ensures absolute medical-grade hygiene.",
        benefit: "Freeze-proof, fire-proof, and lead-free compliance. Slashes installation time by 60% while meeting the highest commercial safety standards.",
        color: "#3b82f6",
        images: [
            "https://cdn.sanity.io/images/m2e07kon/production/1782650a46f74ecc170495cfff71cd400e7ddbf4-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/c93e1d6659ee50966f05ec4c7b640139261f1f2d-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/21577957c789aaa1b79b79de6d86078c07f13480-1000x667.jpg",
        ],
        details: {
            intro: "North America pairs the world's strictest drinking-water rules with uniquely brutal freeze-thaw cycles and some of the highest skilled-labor costs anywhere. A single frozen burst can cause six figures of water damage, and open-flame soldering inside wood-frame construction is both a fire hazard and a labor sink. IFAN's North American matrix answers all three: shape-memory PEX-a that expands instead of cracking when it freezes, push-fit and press connections that need no flame or torch, and fully lead-free wetted parts certified to NSF. The result is a system that installs far faster, passes the toughest potable-water audits, and protects the contractor from freeze and fire liability alike.",
            infrastructureSpecs: [
                "Shape-memory PEX-a tubing engineered to survive freeze expansion without bursting.",
                "DZR lead-free brass push-fit couplings — no flame, no tools, NSF 372 compliant.",
                "304/316L stainless steel press-fit for hospital and commercial hygienic lines.",
                "Cold-expansion (ASTM F1960) fittings for permanent, creep-resistant PEX-a joints.",
                "Manifold home-run layouts that cut fittings and callbacks in wood-frame builds.",
                "Full NSF/cUPC documentation supplied per shipment for frictionless inspection."
            ],
            certifications: ["NSF 61", "NSF 372 (Lead Free)", "cUPC", "ASTM F1960"]
        }
    },
    {
        id: "europe",
        name: "European Union & UK",
        coordinates: [48, 15],
        problem: "Relentless energy efficiency mandates, mandatory underfloor heating, and strict non-toxic material certifications.",
        agitate: "Oxygen permeation in standard pipes causes rust in expensive boilers. Micro-plastics in old systems threaten drinking water purity.",
        feature: "EVOH Anti-Oxygen PEX-b/PERT + DVGW Certified Thin-walled Stainless Steel + TRVs.",
        advantage: "Nano-level EVOH layer achieves zero oxygen permeability. Stainless steel completely eliminates micro-plastics and chemical leaching.",
        benefit: "Absolute protection for premium heating matrices and ultra-pure residential drinking water, securing the highest-tier real estate contracts.",
        color: "#10b981",
        images: [
            "https://cdn.sanity.io/images/m2e07kon/production/1782650a46f74ecc170495cfff71cd400e7ddbf4-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/a718308a35254900733daa81dd911178ed7ae5f0-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/57a6549ec7046142d0cdac087144494608bd73df-1000x667.jpg",
        ],
        details: {
            intro: "Europe sets the global bar for low-carbon hydronic heating, potable-water purity and micro-plastic elimination, and the certification regime is unforgiving. Oxygen creeping through ordinary pipe walls quietly rusts expensive condensing boilers, while legacy lead and copper lines fail modern purity rules. IFAN supplies the pieces that pass an A++ energy audit: EVOH oxygen-barrier PEX and PE-RT for underfloor heating, thermostatic controls for room-by-room efficiency, and thin-wall stainless for lead-free potable risers. Every line carries the German and UK approvals — DVGW, WRAS, SKZ, CE — that specifiers demand before a product reaches a premium residential or commercial contract.",
            infrastructureSpecs: [
                "EVOH oxygen-barrier PEX and PE-RT for zero boiler corrosion in sealed heating loops.",
                "Smart thermostatic radiator valves (TRV) for precise room-by-room climate control.",
                "DVGW-approved stainless steel networks for replacing legacy lead and copper pipe.",
                "PE-RT underfloor-heating circuits sized for A++ energy-efficiency ratings.",
                "Lead-free DZR brass manifolds and mixing valves for hydronic distribution.",
                "Full DVGW / WRAS / SKZ / CE certification packs supplied for EU and UK tenders."
            ],
            certifications: ["DVGW (Germany)", "WRAS (UK)", "CE", "SKZ"]
        }
    },
    {
        id: "asia",
        name: "East & Southeast Asia",
        coordinates: [20, 115],
        problem: "High heat and humidity breed bacteria; rapid urbanization demands both extreme cost-efficiency and emerging luxury upgrades.",
        agitate: "Intense sunlight penetrates standard pipes, turning water green with algae. Aging infrastructure suffers from 'red water' rust contamination.",
        feature: "Nano-Silver Anti-bacterial PPR + Premium 304/316 Stainless Steel Networks.",
        advantage: "Dual-color PPR blocks light while nano-silver ions actively destroy bacteria. Stainless steel offers a lifetime zero-rust guarantee.",
        benefit: "Captures both mass-market high-rises (with cost-effective antimicrobial PPR) and elite luxury developments (with premium stainless steel).",
        color: "#ec4899",
        images: [
            "https://cdn.sanity.io/images/m2e07kon/production/652824310cdbe7f4c48eb5a887974abb33dc32fe-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/f984abdaceab4d856a2cd2586d35ede3e3ef1602-1000x608.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/3ea62cc8ce082c37e90af35fdf66a20e6449955e-1000x562.jpg",
        ],
        details: {
            intro: "From the hyper-dense mega-cities of China, Japan and Korea to the tropical build-out of Southeast Asia, this region needs two things at once: rock-bottom cost for mass housing and uncompromising hygiene for luxury towers. Heat and humidity breed bacteria, direct sunlight turns clear pipe green with algae, and aging mains bleed 'red-water' rust into supply. IFAN covers the full spread — light-blocking, nano-silver antibacterial PPR for high-volume residential, bulk UPVC and CPVC for drainage and industrial flow, and premium 304/316 stainless press systems for elite developments. One supplier serves both the value tier and the luxury tier without a channel gap.",
            infrastructureSpecs: [
                "Light-blocking antibacterial green/white co-extruded PPR for algae-free supply.",
                "Mass-volume UPVC and CPVC systems for rapid urban drainage and industrial flows.",
                "High-end 304/316 stainless press systems for commercial 'red-water' eradication.",
                "PPR-AL-PPR composite risers for high-rise pressure zoning in dense towers.",
                "HDPE mains and fittings for buried municipal and campus distribution.",
                "Compact-fusion fittings tuned for fast install in tight high-rise risers."
            ],
            certifications: ["WaterMark", "ISO", "Local Quality Standards"]
        }
    },
    {
        id: "cis",
        name: "Russia & CIS Area",
        coordinates: [60, 90],
        problem: "Brutal sub-zero winters demand highly pressurized, extreme-temperature central district heating systems (often >95°C).",
        agitate: "Normal plastics soften, expand, and contort like snakes under such boiling surges, leading to catastrophic system blowouts.",
        feature: "Fiberglass-Reinforced High-Pressure PPR (PPR-GF-PPR) + Large-bore Forged Manifolds.",
        advantage: "The rigid fiberglass skeleton slashes thermal expansion to 1/4 of standard PPR, maintaining structural integrity at scalding temperatures.",
        benefit: "Rock-solid, perfectly straight pipelines. Built to permanently withstand the ruthless pressure of massive district heating grids.",
        color: "#8b5cf6",
        images: [
            "https://cdn.sanity.io/images/m2e07kon/production/652824310cdbe7f4c48eb5a887974abb33dc32fe-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/a33688fd490fec1e980c25b17bbb4cc3d3653c5e-1000x549.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/3660936ae89c0d7a15ce5ef1867ab020f93365a1-1000x667.jpg",
        ],
        details: {
            intro: "The CIS region runs on some of the largest high-temperature district-heating networks on earth, often circulating water above 95°C under heavy pressure. Ordinary plastic softens, stretches and snakes under that load, and the same lines must then survive external cold shock deep below freezing. IFAN's fiberglass-reinforced PPR-GF-PPR is engineered for exactly this duty: the glass skeleton cuts thermal expansion to roughly a quarter of standard PPR, so pipes stay straight and dimensionally stable through boiling surges. Paired with large-bore forged manifolds and thick-wall fusion joints built for concrete encasement, it delivers pipelines that hold their shape and pressure for the full life of a municipal heating grid.",
            infrastructureSpecs: [
                "PPR-GF-PPR tri-layer pipe with fiberglass core for minimal thermal expansion.",
                "Heavy-duty forged brass manifolds rated for intense district-heating pressure spikes.",
                "Large-bore socket-fusion systems designed for thick concrete encasement.",
                "High-PN (PN20–PN25) hot-water classes rated for sustained >95°C circulation.",
                "Insulated pre-lagged line options to cut heat loss across long buried runs.",
                "GOST-documented batch testing for Russian and CIS project acceptance."
            ],
            certifications: ["GOST (Russia)"]
        }
    },
    {
        id: "latam",
        name: "Latin & South America",
        coordinates: [-15, -60],
        problem: "Deeply entrenched US standard (ASTM) legacy systems, heavily relying on traditional PVC glue joints.",
        agitate: "High long-distance shipping costs crush margins. Migrating local contractors away from legacy 40-year-old glue systems is notoriously difficult.",
        feature: "Complete ASTM Sch40/Sch80 PVC Glue-Joint Systems + Accessible Green PPR.",
        advantage: "100% compatible with local contractor habits. Aggressive cost-to-performance ratio for mass market volume.",
        benefit: "Unbeatable wholesale velocity. Immediately replaces inferior rusty iron pipes with modern polymers without retraining the local workforce.",
        color: "#eab308",
        images: [
            "https://cdn.sanity.io/images/m2e07kon/production/3ca80723d6de9d17bd64d31d306f245cae5824fc-1000x667.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/37e467f653e92fb465fda3f10aefebed92407299-1000x750.jpg",
            "https://cdn.sanity.io/images/m2e07kon/production/3ca80723d6de9d17bd64d31d306f245cae5824fc-1000x667.jpg",
        ],
        details: {
            intro: "Latin America is a high-volume wholesale market shaped by cost pressure and deep-rooted installation habits. Contractors have relied on US-standard ASTM PVC glue-joint systems for decades, and long ocean freight already squeezes importer margins — so a supplier has to win on price without asking the local workforce to relearn its trade. IFAN fits that reality precisely: perfectly compliant ASTM Sch40/Sch80 PVC that drops straight into existing solvent-weld practice, plus aggressively priced green PPR that lets projects retire rusting galvanized iron for modern polymer. The play is simple — unbeatable wholesale velocity, full ASTM compliance, and zero retraining friction for the crews on site.",
            infrastructureSpecs: [
                "ASTM Sch40/Sch80 white and grey PVC in full pipe-and-fitting ranges.",
                "Traditional solvent-weld (glue) fittings for zero-retraining local adoption.",
                "High-value green PPR replacing outdated galvanized iron supply lines.",
                "CPVC hot-water lines for residential and light-commercial upgrades.",
                "Container-optimized mixed loads that cut per-unit freight on long routes.",
                "ASTM and ISO 9001 documentation supplied per shipment for customs."
            ],
            certifications: ["ASTM", "ISO 9001"]
        }
    }
];
