import type { Metadata } from "next";
import LatinAmericaPlumbingLanding from "@/components/landing/LatinAmericaPlumbingLanding";

type LandingLanguage = "en" | "es";
type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const pageUrl = "https://ifanholding.com/latin-america-plumbing-supplier";
const englishUrl = `${pageUrl}?lang=en`;

const metadataByLanguage = {
  es: {
    title: "Proveedor mayorista de plomería y tuberías para América Latina | IFAN Group",
    description:
      "Tuberías PE/HDPE, PPR, PVC y PPH, conexiones, válvulas de latón y sistemas multicapa para distribuidores y proyectos en América Latina.",
    alternates: {
      canonical: pageUrl,
      languages: {
        en: englishUrl,
        es: pageUrl,
        "x-default": pageUrl,
      },
    },
    openGraph: {
      title: "Proveedor mayorista de plomería y tuberías para América Latina",
      description:
        "Tuberías, conexiones, válvulas de latón y sistemas multicapa para compradores B2B en América Latina.",
      url: pageUrl,
      siteName: "IFAN Group",
      images: [
        {
          url: "https://ifanholding.com/latin-america-plumbing/product-ppr.jpg",
          width: 1200,
          height: 800,
          alt: "Productos de plomería IFAN para América Latina",
        },
      ],
      locale: "es_ES",
      type: "website",
    },
  },
  en: {
    title: "Wholesale Plumbing & Pipe Products Supplier for Latin America | IFAN Group",
    description:
      "Source PE/HDPE, PPR, PVC and PPH pipes, plumbing fittings, brass valves and multilayer pipe systems for Latin American distributors and project buyers.",
    alternates: {
      canonical: englishUrl,
      languages: {
        en: englishUrl,
        es: pageUrl,
        "x-default": pageUrl,
      },
    },
    openGraph: {
      title: "Wholesale Plumbing & Pipe Products Supplier for Latin America",
      description:
        "PE/HDPE, PPR, PVC and PPH pipes, plumbing fittings, brass valves and multilayer pipe systems for B2B buyers.",
      url: englishUrl,
      siteName: "IFAN Group",
      images: [
        {
          url: "https://ifanholding.com/latin-america-plumbing/product-pe-pp.jpg",
          width: 1200,
          height: 800,
          alt: "IFAN wholesale PE and HDPE pipe products",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  },
} satisfies Record<LandingLanguage, Metadata>;

function getLandingLanguage(
  locale: string,
  searchParams?: Record<string, string | string[] | undefined>
): LandingLanguage {
  // 1. 如果路径里明确包含了 locale（如 es、pt、ru 等），或者 next-intl 路由分发的 locale 为 es
  if (locale === "es") {
    return "es";
  }

  // 2. 如果是其他 locale，再降级去读取 ?lang= 临时参数（维持原有兼容逻辑）
  const lang = searchParams?.lang;
  const paramLang = Array.isArray(lang) ? lang[0] : lang;
  
  if (paramLang === "es") {
    return "es";
  }
  if (paramLang === "en") {
    return "en";
  }

  // 3. 默认情况下，将该特定英文路由展示为 es 默认语种（遵循原代码设计，无参数即默认显示西班牙语）
  return "es";
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return metadataByLanguage[getLandingLanguage(locale, await searchParams)];
}

export default async function LatinAmericaPlumbingSupplierPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const language = getLandingLanguage(locale, await searchParams);

  return <LatinAmericaPlumbingLanding language={language} />;
}
