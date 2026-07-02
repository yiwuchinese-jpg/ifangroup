import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";

  return {
    title: isSpanish ? "Política de privacidad | IFAN Group" : "Privacy Policy | IFAN Group",
    description: isSpanish
      ? "Política de privacidad de IFAN Group para consultas B2B, formularios, WhatsApp, email, cookies, analítica y campañas publicitarias."
      : "IFAN Group privacy policy for B2B inquiries, forms, WhatsApp, email, cookies, analytics and advertising campaigns.",
    alternates: {
      canonical: isSpanish ? "https://www.ifanholding.com/es/privacy" : "https://www.ifanholding.com/privacy",
      languages: {
        en: "https://www.ifanholding.com/privacy",
        es: "https://www.ifanholding.com/es/privacy",
        "x-default": "https://www.ifanholding.com/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyPolicyContent locale={locale} />;
}
