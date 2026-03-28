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
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
    openGraph: {
        title: "IFAN Group | Top Plumbing Manufacturer & Wholesale Supplier",
        description: "Source 10,000+ PPR, PEX, and brass valves directly from our 120,000m² mega-factory.",
        url: "https://ifanholding.com",
        siteName: "IFAN Group",
        images: [
            {
                url: "https://cdn.sanity.io/images/m2e07kon/production/0e0247d4fdac183d018fe72ec7b5079243abf18b-1000x562.jpg",
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
        canonical: "https://ifanholding.com/en",
        languages: {
            "en": "https://ifanholding.com/en",
            "es": "https://ifanholding.com/es",
            "pt": "https://ifanholding.com/pt",
            "ru": "https://ifanholding.com/ru",
            "ar": "https://ifanholding.com/ar",
            "fr": "https://ifanholding.com/fr",
            "x-default": "https://ifanholding.com/en",
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
