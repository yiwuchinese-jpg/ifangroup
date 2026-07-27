import type { CategorySlug } from "./index";
import type { CategoryPillar } from "./pillarTypes";
import { hdpePillar } from "./pillars/hdpe";
import { pvcPillar } from "./pillars/pvc";
import { valvesPillar } from "./pillars/valves";
import { pexPillar } from "./pillars/pex";
import { pprPillar } from "./pillars/ppr";

export type { CategoryPillar } from "./pillarTypes";

/** 支柱页注册表。加新品类：在 ./pillars/ 建文件，然后在这里登记 + 更新 PILLAR_SLUGS。 */
const PILLARS: Partial<Record<CategorySlug, CategoryPillar>> = {
    ppr: pprPillar,
    hdpe: hdpePillar,
    pvc: pvcPillar,
    "hvac-valves": valvesPillar,
    "pex-ppsu": pexPillar,
};

export function getPillar(slug: string): CategoryPillar | undefined {
    return PILLARS[slug as CategorySlug];
}
