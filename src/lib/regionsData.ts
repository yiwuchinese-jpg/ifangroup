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
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop", // Desert plant/pipeline
            "https://images.unsplash.com/photo-1621535450849-c1ab6fa14828?q=80&w=2000&auto=format&fit=crop", // Heavy brass valves
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000&auto=format&fit=crop", // High-rise luxury construction
        ],
        details: {
            intro: "The MENA region demands absolute resilience. Coastal desalination plants produce highly corrosive water, while inland projects face relentless solar radiation. IFAN's armored multi-layer systems are engineered specifically to neutralize these desert conditions.",
            infrastructureSpecs: [
                "Anti-UV External Resin Layer rated for 50-year desert exposure.",
                "High-pressure Brass Manifolds (CW617N) for luxury high-rise water distribution.",
                "HDPE underground networks for municipal sand-bed resilience."
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
            "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=2000&auto=format&fit=crop", // Freezing winter trees/construction
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop", // Medical/Commercial clean pipes
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop", // Wood frame house build
        ],
        details: {
            intro: "North America features the world's strictest drinking water regulations alongside uniquely brutal freeze-thaw cycles. IFAN's North American matrix focuses entirely on lead-free compliance and ultra-fast, flame-free installation methods to bypass the massive local labor costs.",
            infrastructureSpecs: [
                "Shape-memory PEX-a tubing capable of surviving 300% expansion without bursting.",
                "DZR (Dezincification Resistant) Lead-Free Brass Push-Fit couplings.",
                "304/316L Stainless Steel Press-Fit for hospital and commercial hygienic lines."
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
            "https://images.unsplash.com/photo-1546285324-ee4f7c1bb414?q=80&w=2000&auto=format&fit=crop", // Clean boiler/heating unit
            "https://images.unsplash.com/photo-1590483863704-df61b4712776?q=80&w=2000&auto=format&fit=crop", // Underfloor heating pipes
            "https://images.unsplash.com/photo-1555358055-667b1cb41703?q=80&w=2000&auto=format&fit=crop", // Modern European architecture
        ],
        details: {
            intro: "Europe leads the world in low-carbon hydronic heating and micro-plastic elimination. IFAN supplies the heavy-duty oxygen barriers and thermostatic controls required to pass EU strict energy efficiency ratings (A++).",
            infrastructureSpecs: [
                "EVOH ultra-barrier layers for zero boiler corrosion.",
                "Smart Thermostatic Radiator Valves (TRV) for precise room-by-room climate control.",
                "DVGW-approved Stainless Steel networks for replacing legacy lead/copper pipes."
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
            "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=2000&auto=format&fit=crop", // Dense Asian mega-city highrises
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop", // Rainy/humid tropical street
            "https://images.unsplash.com/photo-1565439387600-98523ee792be?q=80&w=2000&auto=format&fit=crop", // Factory mass production pipes
        ],
        details: {
            intro: "Spanning the hyper-dense Mega-cities of China, Japan, Korea, and the tropical expansion of Southeast Asia, this region requires a dual-pronged approach: absolute cost-efficiency for mass housing and uncompromising hygiene for luxury real estate.",
            infrastructureSpecs: [
                "Anti-bacterial Green/White PPR co-extruded pipes.",
                "Mass-volume UPVC/CPVC systems for rapid urban drainage and industrial flows.",
                "High-end Stainless Steel Press systems for commercial 'red-water' eradication."
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
            "https://images.unsplash.com/photo-1628045667793-1ca4de4765be?q=80&w=2000&auto=format&fit=crop", // Massive industrial boiler/heating plant
            "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop", // Harsh Russian winter freeze
            "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop", // Huge subterranean pipes
        ],
        details: {
            intro: "The CIS region relies entirely on massive, high-temperature District Heating networks. IFAN’s fiberglass-infused systems are specifically designed to survive internal boiling temperatures while resisting massive external freeze shock.",
            infrastructureSpecs: [
                "PPR-GF-PPR tri-layer pipes with negligible thermal expansion.",
                "Heavy-duty forged brass manifolds capable of managing intense pressure spikes.",
                "Large-bore fusion systems designed for thick concrete encasements."
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
            "https://images.unsplash.com/photo-1621274312019-21c6ff1bba4e?q=80&w=2000&auto=format&fit=crop", // Construction workers building
            "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2000&auto=format&fit=crop", // PVC pipe stack
            "https://images.unsplash.com/photo-1503594384566-461fe158e797?q=80&w=2000&auto=format&fit=crop", // LATAM developing urban infrastructure
        ],
        details: {
            intro: "Latin America provides massive wholesale volume opportunities driven by cost and legacy habits. IFAN dominates this sector by providing extreme value via perfectly compliant ASTM PVC glued systems and highly aggressive pricing on standard PPR.",
            infrastructureSpecs: [
                "ASTM standard Sch40/Sch80 White and Grey PVC.",
                "Traditional solvent-weld (glue) fittings for rapid local adoption.",
                "High-value Green PPR substituting outdated galvanized iron."
            ],
            certifications: ["ASTM", "ISO 9001"]
        }
    }
];
