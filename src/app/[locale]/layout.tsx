import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
    title: {
        template: "%s | IFAN Group",
        default: "IFAN Group | Top Plumbing Manufacturer & Wholesale Supplier",
    },
    description: "Direct from our 120,000m² smart factory. Source 10,000+ PPR, PEX, and brass valves at unbeatable wholesale prices. Request your custom B2B quote today!",
    keywords: ["Plumbing System Manufacturer", "PPR pipe wholesale", "Brass valves factory", "PEX manufacturer China", "OEM plumbing supplier"],
    openGraph: {
        title: "IFAN Group | Top Plumbing Manufacturer & Wholesale Supplier",
        description: "Source 10,000+ PPR, PEX, and brass valves directly from our 120,000m² mega-factory.",
        url: "https://ifangroup.com",
        siteName: "IFAN Group",
        images: [
            {
                url: "/images/static/og-image.webp",
                width: 1200,
                height: 630,
                alt: "IFAN Group Manufacturing Facility",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "IFAN Group | B2B Plumbing Manufacturer",
        description: "Direct B2B wholesale plumbing supplies. PPR, PEX & Brass.",
    },
    alternates: {
        canonical: "/",
        languages: {
            "en": "/",
            "es": "/es",
            "pt": "/pt",
            "ru": "/ru",
            "ar": "/ar",
            "fr": "/fr",
        },
    },
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    // Providing all messages to the client side
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="flex-1 flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </NextIntlClientProvider>
    );
}
