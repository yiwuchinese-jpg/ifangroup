import { ReactNode } from "react";

export interface CategoryCopy {
  heroTitle: string;
  tagline: string;
  heroDescription: string;
  technicalSuperiority: {
    title: string;
    description: string;
  };
  applications: {
    title: string;
    description: string;
  };
}

export const categoryCopyData: Record<string, CategoryCopy> = {
  "ppr": {
    heroTitle: "PPR Piping Systems",
    tagline: "The Global Standard for Potable Water & Heating",
    heroDescription: "IFAN's Polypropylene Random Copolymer (PPR) systems represent the bedrock of pure, safe, and durable fluid transportation. Engineered for extreme thermal stability and seamless heat fusion, our PPR pipes are the trusted choice for residential and commercial infrastructure worldwide.",
    technicalSuperiority: {
      title: "Molecular Engineering & Seamless Fusion",
      description: "Manufactured from premium Hyosung raw materials, our PPR products boast impenetrable molecular integrity. Through homogeneous heat fusion, joints become as strong as the pipe itself, guaranteeing a 100% leak-proof system with a lifespan exceeding 50 years. They resist corrosion, scaling, and bacterial growth—delivering water as pure as its source."
    },
    applications: {
      title: "Versatile Infrastructure Domination",
      description: "From luxury skyscraper potable water grids to extreme-condition industrial fluid transport, IFAN PPR systems excel across the board. They are the premier choice for hot and cold internal plumbing, central heating networks, and chilled water lines."
    }
  },
  "brass-fittings": {
    heroTitle: "Premium Brass Fittings",
    tagline: "Unbreakable Connections. Solid Brass Authority.",
    heroDescription: "Forged from high-grade CW617N brass, IFAN's masterfully machined fittings guarantee structural dominance in any piping network. Designed for high pressure, aggressive environments, and rapid installation, they are the anchor points of professional plumbing.",
    technicalSuperiority: {
      title: "Precision Machining & Metallurgical Purity",
      description: "Our brass fittings are the result of rigorous hot forging and ultra-precise CNC machining. This ensures zero porosity and perfect threading. The high copper content provides unparalleled resistance to dezincification and corrosion, surviving pressure spikes that would shatter lesser materials."
    },
    applications: {
      title: "The Backbone of Complex Fluid Networks",
      description: "Essential for linking disparate systems, executing sharp turns, or managing high-torque junctions. IFAN brass fittings are heavily deployed in extreme HVAC setups, municipal water distribution, and heavy-duty gas line installations where failure is not an option."
    }
  },
  "pp": {
    heroTitle: "PP Compression Systems",
    tagline: "Rapid Deployment. Agricultural & Urban Resilience.",
    heroDescription: "IFAN Polypropylene (PP) compression fittings are the ultimate solution for high-speed, heavy-duty outdoor and underground water distribution. Designed for zero-tool, instant connections, they empower massive infrastructural rollouts with unprecedented efficiency.",
    technicalSuperiority: {
      title: "High-Impact Resistance & UV Shielding",
      description: "Engineered with advanced UV stabilizers and high-impact copolymers. These fittings shrug off harsh sunlight, sudden ground shifts, and mechanical stress. The advanced O-ring compression mechanics ensure a hermetic seal against severe hydraulic pressure without the need for heat or glue."
    },
    applications: {
      title: "Commanding the Great Outdoors",
      description: "The undisputed king of agricultural irrigation, municipal landscaping, and heavy-duty water mains. Whenever water needs to be pushed across vast distances quickly and reliably, IFAN PP systems answer the call."
    }
  },
  "pvc": {
    heroTitle: "PVC Drainage & Conduit",
    tagline: "Flawless Flow. Century-Long Drainage Power.",
    heroDescription: "The absolute standard in municipal, residential, and industrial wastewater management. IFAN PVC pipes and fittings offer immense structural rigidity while ensuring a smooth, frictionless core that accelerates flow and eliminates blockages.",
    technicalSuperiority: {
      title: "Chemical Immunity & Structural Rigidity",
      description: "Formulated with un-plasticized polyvinyl chloride (uPVC), our drainage solutions are entirely immune to harsh environmental alkalis, ground acids, and caustic industrial effluents. The hyper-smooth interior wall dramatically reduces friction, guaranteeing maximum flow velocity."
    },
    applications: {
      title: "Subterranean & Vertical Dominance",
      description: "Universally deployed for residential soil and waste discharge, major municipal sewerage, underground conduit protection, and massive rainwater harvesting networks."
    }
  },
  "pex-ppsu": {
    heroTitle: "PEX & PPSU Piping",
    tagline: "Hyper-Flexible Thermal Dominance.",
    heroDescription: "The absolute apex of radiant heating and potable water dynamics. IFAN cross-linked polyethylene (PEX) paired with aerospace-grade PPSU fittings creates an indestructible, hyper-flexible nervous system for modern buildings.",
    technicalSuperiority: {
      title: "Thermal Memory & Extreme Flexibility",
      description: "PEX's unique cross-linked molecular structure allows it to expand without shattering during freezes and bend aggressively around structural obstacles without compromising flow rate. Paired with our PPSU fittings—which offer metal-like strength with zero corrosion—this system is future-proof."
    },
    applications: {
      title: "The Core of Radiant Comfort",
      description: "The premium standard for immersive underfloor heating manifolds, complex potable water manifolds, and retrofitting historical buildings where rigid pipes cannot operate."
    }
  },
  "hvac-valves": {
    heroTitle: "Brass Valves & Manifolds",
    tagline: "Absolute Control Over Pressure and Flow.",
    heroDescription: "The command centers of your fluid infrastructure. IFAN's heavy-duty brass valves and intricate manifold systems grant precision control, failsafe isolation, and perfectly balanced thermal distribution.",
    technicalSuperiority: {
      title: "Zero-Tolerance Sealing & Dynamic Balance",
      description: "Crafted via precision hot-forging with PTFE seals and explosion-proof stems. Our valves maintain total structural integrity under extreme PSI spikes. Our manifolds feature microscopic flow-adjustment meters to ensure every room in a radiant system receives exact thermal energy."
    },
    applications: {
      title: "Architectural & Industrial Control",
      description: "Deployed in high-rise mechanical rooms, premium residential heating distribution hubs, and industrial isolation points. Wherever fluid needs to be stopped, split, or perfectly measured."
    }
  }
};

// Generic fallback generator
export function getCategoryCopy(slug: string): CategoryCopy {
  const normalizedSlug = slug.toLowerCase();
  
  if (categoryCopyData[normalizedSlug]) {
    return categoryCopyData[normalizedSlug];
  }

  // Fallback for unknown categories
  const formattedName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    heroTitle: `${formattedName} Solutions`,
    tagline: `Premium Engineering for Elite Systems`,
    heroDescription: `IFAN's ${formattedName} series represents our relentless pursuit of manufacturing excellence. Designed via advanced material science, these components ensure flawless operation across demanding infrastructural environments.`,
    technicalSuperiority: {
      title: "Uncompromising Structural Integrity",
      description: "Built to exceed rigorous international testing standards. Our manufacturing lines utilize real-time laser calibration to ensure microscopic tolerances, resulting in components that resist thermal shock, brutal pressures, and environmental degradation."
    },
    applications: {
      title: "Global Application & Versatility",
      description: "From demanding industrial networks to high-end residential towers, these components form the silent, indestructible framework that powers modern living."
    }
  };
}
