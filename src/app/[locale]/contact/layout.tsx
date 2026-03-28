import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | B2B Inquiry | IFAN Group",
    description:
        "Contact IFAN Group for factory-direct B2B wholesale pricing, OEM manufacturing inquiries, and regional distributorship applications. Our sales director responds within 12 hours.",
    keywords: [
        "IFAN Group contact",
        "B2B plumbing inquiry",
        "plumbing OEM wholesale contact China",
        "factory direct plumbing supplier",
        "IFAN sales team",
    ],
    openGraph: {
        title: "Contact IFAN Group | Factory-Direct B2B Inquiry",
        description:
            "Skip the middleman. Contact our regional sales directors directly for wholesale pricing, OEM manufacturing, and custom project procurement.",
        url: "https://ifanholding.com/en/contact",
    },
    alternates: {
        canonical: "https://ifanholding.com/en/contact",
        languages: {
            en: "https://ifanholding.com/en/contact",
            es: "https://ifanholding.com/es/contact",
            pt: "https://ifanholding.com/pt/contact",
            ru: "https://ifanholding.com/ru/contact",
            ar: "https://ifanholding.com/ar/contact",
            fr: "https://ifanholding.com/fr/contact",
        },
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
