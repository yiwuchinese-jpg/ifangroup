import { ReactNode } from "react";

export interface BrandCopy {
  tagline: string;
  heroDescription: string;
  valueProposition: {
    title: string;
    content: string[];
  };
  marketStrategy: {
    title: string;
    description: string;
  };
  designPhilosophy: {
    title: string;
    description: string;
  };
}

// Helper to generate generic copy based on Excel parameters
function generateGenericCopy(brandName: string, reference: string, products: string, route: string, market: string): BrandCopy {
  const isPremium = route.includes("高端") || route.includes("顶级");
  const isValue = route.includes("性价比") || route.includes("便宜");
  
  return {
    tagline: isPremium ? `Premium Excellence in Fluid Control` : `Unbeatable Value & Engineering`,
    heroDescription: `Engineered for the demands of the modern infrastructure. ${brandName} delivers uncompromising performance across its primary range of ${products}.`,
    valueProposition: {
      title: `The ${brandName} Standard`,
      content: [
        `When precision matters, ${brandName} delivers. Our manufacturing process ensures every component meets rigorous international standards.`,
        `By focusing on ${route || 'reliable execution'}, we provide our partners with scalable, dependable plumbing solutions that drive business growth and project success.`
      ]
    },
    marketStrategy: {
      title: `Strategic Dominance in ${market || 'Global Markets'}`,
      description: `Tailored specifically for the ${market} region, ${brandName} understands the unique environmental and commercial demands of the local infrastructure. Our strategic positioning guarantees optimal distribution efficiency and market penetration.`
    },
    designPhilosophy: {
      title: `Aesthetic & Engineering Reference`,
      description: `Drawing inspiration from the ${reference}, ${brandName} combines striking visual identity with battle-tested structural integrity. Every product is not just a component, but a statement of quality.`
    }
  };
}

export const brandCopyData: Record<string, BrandCopy> = {
  "IFAN": {
    tagline: "The Global Standard in Complete Fluid Systems",
    heroDescription: "The foundation of our engineering legacy. A comprehensive, stock-ready matrix of supreme quality components serving the entire globe.",
    valueProposition: {
      title: "Uncompromising Quality, Ready to Ship",
      content: [
        "IFAN is the core engine of our manufacturing might. Built on the philosophy of full-range availability, we maintain massive inventory to ensure your supply chain never breaks.",
        "From foundational PPR pipes to advanced brass valves, every item in the IFAN core series is engineered for extreme durability and 50-year longevity."
      ]
    },
    marketStrategy: {
      title: "Global Reach, Direct Factory Access",
      description: "Positioned as our ultimate 'STOCK' brand, IFAN targets the entire global market without intermediaries. By eliminating regional agencies, we offer direct factory-to-business efficiency, giving wholesale partners unparalleled pricing leverage."
    },
    designPhilosophy: {
      title: "The Colors of Passion & Life",
      description: "Defined by a deeply resonant visual identity: Green representing the source of life and sustainable engineering, paired with Orange, signifying our passion for manufacturing excellence and relentless innovation."
    }
  },
  "IFANPlus": {
    tagline: "The Zenith of Plumbing Engineering",
    heroDescription: "Our flagship ultra-premium tier. IFANPlus represents the absolute peak of material science and precision manufacturing.",
    valueProposition: {
      title: "Engineered for the Elite",
      content: [
        "When compromise is not an option, IFANPlus is the answer. Every product under the Plus moniker undergoes rigorous over-engineering to exceed every known international benchmark.",
        "Featuring superior material density, enhanced pressure ratings, and impeccable finish, this series is designed for flagship architectural projects and clients who demand the very best."
      ]
    },
    marketStrategy: {
      title: "Dominating the Premium Global Sector",
      description: "Targeting the top-tier global market, IFANPlus operates on a direct-to-buyer model. We empower supreme distributors to capture the absolute high-end segment of the construction industry without the friction of traditional agency models."
    },
    designPhilosophy: {
      title: "Purity & Perfection",
      description: "Contrasting the vitality of our signature Green with a pristine, high-end White aesthetic. The visual language of IFANPlus screams clinical precision, hygiene, and architectural supremacy."
    }
  },
  "IFANPRO": {
    tagline: "Italian Aesthetics. Unbeatable Value.",
    heroDescription: "The strategic masterclass in cost-performance. IFANPRO delivers premium European-style aesthetics engineered flawlessly for tremendous value.",
    valueProposition: {
      title: "The Ultimate Value Proposition",
      content: [
        "IFANPRO bridges the gap between high-end design and aggressive commercial pricing. Specializing in PPR, PEX, PP pipes, and robust valves, it is the ultimate tool for capturing market share.",
        "We've optimized the manufacturing pipeline to strip out bloat while retaining core structural integrity, allowing B2B partners to maximize their profit margins exponentially."
      ]
    },
    marketStrategy: {
      title: "Engineered for West African Dominance",
      description: "Strategically calibrated for the lucrative and rapidly expanding West African market. IFANPRO provides the aggressive pricing and durable performance required to outcompete local alternatives and dominate large-scale commercial tenders."
    },
    designPhilosophy: {
      title: "The Italian Color Scheme",
      description: "Adopting a striking Italian-inspired palette, IFANPRO commands attention on the shelf. The premium look and feel elevate the brand perception, making it irresistible to contractors and retailers alike."
    }
  },
  "IFANNova": {
    tagline: "French Elegance, Elite Infrastructure",
    heroDescription: "A sophisticated foray into high-end fluid management, bringing exceptional engineering to specialized premium markets.",
    valueProposition: {
      title: "Refined High-End Performance",
      content: [
        "IFANNova represents a focused selection of top-tier PPR, PEX, and PP systems. It is engineered not just to function, but to excel in demanding environments where both aesthetics and performance are scrutinized.",
        "Built for wholesale partners aiming to penetrate luxury developments and high-budget infrastructural projects."
      ]
    },
    marketStrategy: {
      title: "Premium Penetration in West Africa",
      description: "While IFANPRO captures volume, IFANNova is the tactical weapon for securing the high-end sector in West Africa. It offers regional distributors a distinct premium brand to upsell and dominate the top of the market."
    },
    designPhilosophy: {
      title: "French Color Aesthetics",
      description: "Imbued with an elegant French color scheme, the brand exudes sophistication. The visual identity reassures clients of its premium positioning before a single pipe is even installed."
    }
  },
  "IFANUltra": {
    tagline: "The Pinnacle of European Quality",
    heroDescription: "Absolute top-tier engineering designed strictly for the uncompromising standards of the European market.",
    valueProposition: {
      title: "Paramount Structural Integrity",
      content: [
        "IFANUltra is where maximum performance meets rigorous certification. Specializing in core PPR, PEX, and valve systems, this brand is built to withstand extreme pressures and thermal variations.",
        "No shortcuts. No compromises. Just pure, unadulterated manufacturing excellence tailored for the most strictly regulated environments on Earth."
      ]
    },
    marketStrategy: {
      title: "Conquering the European Landscape",
      description: "Targeted exclusively at Europe, IFANUltra provides continental distributors with a powerhouse brand that competes head-to-head with legacy European manufacturers, offering superior margins."
    },
    designPhilosophy: {
      title: "The Signature Blue Paradigm",
      description: "Anchored in a deep, authoritative Blue aesthetic. The color signifies trust, industrial confidence, and absolute reliability—critical traits for European engineering sectors."
    }
  },
  "Hitze": generateGenericCopy("Hitze", "德国系列", "PPR产品+MLP+PP+卡套+阀门", "精致包装 产地需求", "全球"),
  "Warmhaus": generateGenericCopy("Warmhaus", "意大利系列", "MLP管+PEX管+分水器+球阀", "精致包装 产地需求", "全球"),
  "Bekaatherm": generateGenericCopy("Bekaatherm", "土耳其系列", "PPR管道+904排水", "性价比+包装细节", "中亚，北非，中东"),
  // Note: Add more as needed, the component will use generateGenericCopy as a fallback for missing brands.
};

export function getBrandCopy(brandName: string, rawData?: any): BrandCopy {
  if (brandCopyData[brandName]) {
    return brandCopyData[brandName];
  }
  
  if (rawData) {
    const referenceMatch = rawData.description?.match(/参照系：(.*?)(?=\n|$)/)?.[1] || "Modern Engineering";
    const productMatch = rawData.description?.match(/主要产品：(.*?)(?=\n|$)/)?.[1] || "Core Plumbing Systems";
    const routeMatch = rawData.description?.match(/拟定路线：(.*?)(?=\n|$)/)?.[1] || "Strategic Distribution";
    const marketMatch = rawData.description?.match(/目标市场：(.*?)(?=\n|$)/)?.[1] || "Global Markets";
    
    return generateGenericCopy(brandName, referenceMatch, productMatch, routeMatch, marketMatch);
  }

  return generateGenericCopy(brandName, "Modern Engineering", "Core Plumbing Systems", "Strategic Distribution", "Global Markets");
}
