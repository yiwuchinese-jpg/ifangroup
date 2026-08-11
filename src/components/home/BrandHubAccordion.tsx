"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./BrandHubAccordion.module.css";
import type { ShowcaseBrand } from "./BrandShowcaseClient";

// 每个品牌的视觉配置：背景图沿用站内已有的 Sanity 素材，accent/tint 取各品牌参考色。
// 顺序即栏位顺序，两个旗舰放最前。
const PRESETS: Record<
    string,
    { image: string; accent: string; tint: string }
> = {
    ifan: {
        image: "https://cdn.sanity.io/images/m2e07kon/production/8170baee91d8ea785f294a8b0a3ba018b59a5088-1000x751.jpg",
        accent: "#12b76a",
        tint: "rgba(0, 72, 40, 0.5)",
    },
    ifanplus: {
        image: "https://cdn.sanity.io/images/m2e07kon/production/9c84e8d39dafc37d88fc604a32f523ebfa26f874-1000x745.jpg",
        accent: "#ffffff",
        tint: "rgba(30, 41, 59, 0.45)",
    },
    ifanultra: {
        image: "https://cdn.sanity.io/images/m2e07kon/production/1782650a46f74ecc170495cfff71cd400e7ddbf4-1000x667.jpg",
        accent: "#4aa8ff",
        tint: "rgba(12, 48, 92, 0.5)",
    },
    ifanpro: {
        image: "https://cdn.sanity.io/images/m2e07kon/production/a4e07e29e1265063706bde47561d6176298b746f-1000x751.jpg",
        accent: "#ff6a4a",
        tint: "rgba(96, 24, 18, 0.48)",
    },
    ifannova: {
        image: "https://cdn.sanity.io/images/m2e07kon/production/652824310cdbe7f4c48eb5a887974abb33dc32fe-1000x667.jpg",
        accent: "#8aa0ff",
        tint: "rgba(28, 36, 92, 0.48)",
    },
};

// 栏位顺序：旗舰在前，其余按定位排。未在表内的品牌不进入本模块。
const PANEL_ORDER = ["ifan", "ifanplus", "ifanultra", "ifanpro", "ifannova"];

// Sanity CDN 按需转码：五张图同屏，压到 1200 宽 + auto format 省带宽。
function bg(url: string) {
    return `${url}?w=1200&q=68&auto=format`;
}

export default function BrandHubAccordion({ brands }: { brands: ShowcaseBrand[] }) {
    const t = useTranslations("brandShowcase");
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeSlug, setActiveSlug] = useState<string | null>(null);
    const [panelHeight, setPanelHeight] = useState<number | null>(null);

    // 收窄栏的 logo 芯片要落在栏的正中，需要知道栏的真实高度。
    // 100svh 在 min-height 生效时并不等于栏高，所以实测。
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const observer = new ResizeObserver(([entry]) => {
            setPanelHeight(entry.contentRect.height);
        });
        observer.observe(grid);
        return () => observer.disconnect();
    }, []);

    // 指针在栏之间移动（或键盘聚焦）时直接交接 active，不经过“全部收起”的中间态。
    const activateFromEvent = useCallback((event: React.SyntheticEvent) => {
        const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-brand-slug]");
        if (panel) setActiveSlug(panel.dataset.brandSlug ?? null);
    }, []);

    const panels = PANEL_ORDER
        .map((slug) => {
            const brand = brands.find((b) => b.slug === slug);
            return brand ? { brand, preset: PRESETS[slug] } : null;
        })
        .filter((item): item is { brand: ShowcaseBrand; preset: (typeof PRESETS)[string] } => item !== null);

    if (!panels.length) return null;

    return (
        <div
            className={styles.hub}
            style={panelHeight ? ({ "--panel-h": `${panelHeight}px` } as React.CSSProperties) : undefined}
        >
            <p className={styles.seriesLabel}>{t("hubLabel", { defaultMessage: "The IFAN Series" })}</p>

            <div
                ref={gridRef}
                className={`${styles.grid} ${activeSlug ? styles.hasActive : ""}`}
                onPointerMove={activateFromEvent}
                onPointerLeave={() => setActiveSlug(null)}
                onFocus={activateFromEvent}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveSlug(null);
                }}
            >
                {panels.map(({ brand, preset }) => (
                    <Link
                        key={brand._id}
                        href={`/brands/${brand.slug}`}
                        data-brand-slug={brand.slug}
                        aria-label={`View ${brand.name}`}
                        className={`${styles.panel} ${activeSlug === brand.slug ? styles.active : ""}`}
                        style={{
                            "--panel-image": `url('${bg(preset.image)}')`,
                            "--accent": preset.accent,
                            "--tint": preset.tint,
                        } as React.CSSProperties}
                    >
                        <span className={styles.shade} />
                        <div className={styles.inner}>
                            <span className={styles.chip}>
                                {brand.logo?.asset?.url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={brand.logo.asset.url}
                                        alt={brand.name}
                                        className={styles.chipLogo}
                                        draggable={false}
                                        loading="lazy"
                                    />
                                ) : (
                                    brand.name
                                )}
                            </span>
                            <p className={styles.eyebrow}>{t(`hub.${brand.slug}.eyebrow`)}</p>
                            <h3 className={styles.title}>{brand.name}</h3>
                            <p className={styles.description}>{t(`hub.${brand.slug}.desc`)}</p>
                            <span className={styles.more}>
                                {t("exploreCollection", { defaultMessage: "Explore Collection" })}
                                <ArrowRight aria-hidden="true" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
