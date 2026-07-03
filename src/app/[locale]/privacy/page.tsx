import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";

  return {
    // 品牌后缀由 [locale]/layout 的 title.template 追加。
    title: isSpanish ? "Política de privacidad" : "Privacy Policy",
    description: isSpanish
      ? "Política de privacidad de IFAN Group para consultas B2B, formularios, WhatsApp, email, cookies, analítica y campañas publicitarias."
      : "IFAN Group privacy policy for B2B inquiries, forms, WhatsApp, email, cookies, analytics and advertising campaigns.",
    alternates: localeAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyPolicyContent locale={locale} />;
}
