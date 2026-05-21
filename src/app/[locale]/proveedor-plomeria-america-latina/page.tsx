import type { Metadata } from "next";
import Script from "next/script";
import LatinAmericaPlumbingLanding from "@/components/landing/LatinAmericaPlumbingLanding";

export const metadata: Metadata = {
  title: "Proveedor mayorista de plomería y tuberías para América Latina | IFAN Group",
  description:
    "Tuberías PE/HDPE, PPR, PVC y PPH, conexiones, válvulas de latón y sistemas multicapa para distribuidores y proyectos en América Latina.",
  alternates: {
    canonical: "https://ifanholding.com/es/proveedor-plomeria-america-latina",
    languages: {
      en: "https://ifanholding.com/latin-america-plumbing-supplier",
      es: "https://ifanholding.com/es/proveedor-plomeria-america-latina",
      "x-default": "https://ifanholding.com/latin-america-plumbing-supplier",
    },
  },
  openGraph: {
    title: "Proveedor mayorista de plomería y tuberías para América Latina",
    description:
      "Tuberías, conexiones, válvulas de latón y sistemas multicapa para compradores B2B en América Latina.",
    url: "https://ifanholding.com/es/proveedor-plomeria-america-latina",
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
};

export default function ProveedorPlomeriaAmericaLatinaPage() {
  return (
    <>
      <Script
        id="proveedor-plomeria-america-latina-google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('event', 'conversion', {
              'send_to': 'AW-18159357442/3eAGCLaeqK0cEIKch9ND',
              'value': 1.0,
              'currency': 'CNY'
            });
          `,
        }}
      />
      <LatinAmericaPlumbingLanding language="es" />
    </>
  );
}
