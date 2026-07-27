import {
    Droplets,
    Flame,
    Factory,
    Sprout,
    Building2,
    ShieldCheck,
    Thermometer,
    Waves,
    Wrench,
    Gauge,
    type LucideIcon,
} from "lucide-react";

/**
 * 数据文件用字符串引用图标，不直接 import 组件——
 * 这样 categoryPillars.ts 保持纯数据，可以安全地跨 server/client 边界传。
 */
export const PILLAR_ICONS: Record<string, LucideIcon> = {
    droplets: Droplets,
    flame: Flame,
    factory: Factory,
    sprout: Sprout,
    building: Building2,
    shield: ShieldCheck,
    thermometer: Thermometer,
    waves: Waves,
    wrench: Wrench,
    gauge: Gauge,
};

export function resolveIcon(name?: string): LucideIcon {
    return (name && PILLAR_ICONS[name]) || ShieldCheck;
}
