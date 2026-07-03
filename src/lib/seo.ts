export const SITE_URL = "https://www.ifanholding.com";
export const LOCALES = ["en", "es", "pt", "ru", "ar", "fr"] as const;
export type AppLocale = (typeof LOCALES)[number];

// English lives at unprefixed URLs (localePrefix: "as-needed" in i18n/routing.ts),
// so canonical/hreflang/sitemap URLs must never use an /en prefix — /en/* 307s away.
export function localeUrl(locale: string, path: string = ""): string {
    const prefix = locale === "en" ? "" : `/${locale}`;
    return `${SITE_URL}${prefix}${path}`;
}

// Canonical for the current locale + full hreflang cluster (x-default → English).
export function localeAlternates(locale: string, path: string = "") {
    const languages: Record<string, string> = Object.fromEntries(
        LOCALES.map((l) => [l, localeUrl(l, path)])
    );
    languages["x-default"] = localeUrl("en", path);
    return { canonical: localeUrl(locale, path), languages };
}
