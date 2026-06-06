import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Link } from "@/i18n/navigation";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";

type PrivacyLanguage = "en" | "es";

const privacyCopy = {
  en: {
    badge: "Privacy Policy",
    title: "Privacy Policy",
    updated: "Last updated: May 23, 2026",
    intro:
      "This Privacy Policy explains how IFAN Group collects, uses and protects information submitted through our websites, landing pages, inquiry forms, WhatsApp links, email links and related advertising campaigns.",
    controllerTitle: "Who We Are",
    controllerText:
      "IFAN Group provides plumbing, pipe, valve, fitting and related building material products for distributors, wholesalers, importers and project buyers.",
    sections: [
      {
        title: "Information We Collect",
        items: [
          "Contact information such as name, company name, email address, phone number, WhatsApp number and country.",
          "Inquiry details such as product category, sizes, quantities, destination country, project needs and quotation requirements.",
          "Technical and usage data such as IP address, browser type, device information, pages viewed, referring URL and interaction events.",
          "Advertising and analytics data from tools such as Google Tag Manager, Google Ads, Meta Pixel, Microsoft Clarity and similar measurement technologies.",
        ],
      },
      {
        title: "How We Use Information",
        items: [
          "To respond to inquiries, prepare quotations, send catalogs and provide B2B sales support.",
          "To communicate through email, WhatsApp or other contact methods requested by the buyer.",
          "To improve our website, landing pages, product information, advertising campaigns and user experience.",
          "To detect misuse, maintain website security and comply with applicable legal or business obligations.",
        ],
      },
      {
        title: "Cookies, Analytics and Advertising Pixels",
        items: [
          "Our website may use cookies, tags and similar technologies to understand traffic sources, measure advertising performance and improve page experience.",
          "Third-party tools may process limited device and usage data according to their own privacy policies.",
          "You can control cookies through your browser settings. Disabling cookies may affect some measurement or website features.",
        ],
      },
      {
        title: "Sharing of Information",
        items: [
          "We do not sell personal information.",
          "We may share information with service providers that help us operate forms, hosting, analytics, advertising, email or business communication.",
          "We may disclose information when required by law, regulation, legal process or to protect our rights and security.",
        ],
      },
      {
        title: "International Transfers",
        items: [
          "Because IFAN Group serves international B2B buyers, inquiry information may be processed across countries where our team, hosting providers or service providers operate.",
          "We take reasonable steps to protect information during such processing and transfers.",
        ],
      },
      {
        title: "Data Retention",
        items: [
          "We keep inquiry and contact information only as long as reasonably necessary for sales communication, business records, customer support and legal compliance.",
          "You may request deletion or correction of your contact information by contacting us.",
        ],
      },
      {
        title: "Your Choices",
        items: [
          "You may request access, correction or deletion of personal information you provided to us.",
          "You may opt out of non-essential marketing communication at any time.",
          "You may adjust browser settings to limit cookies and tracking technologies.",
        ],
      },
    ],
    contactTitle: "Contact Us",
    contactText: "For privacy questions or requests, contact us using the details below.",
    email: "ifanholding@gmail.com",
    whatsapp: "+86 1736 9685 997",
    cta: "Contact IFAN Group",
  },
  es: {
    badge: "Política de privacidad",
    title: "Política de privacidad",
    updated: "Última actualización: 23 de mayo de 2026",
    intro:
      "Esta Política de privacidad explica cómo IFAN Group recopila, utiliza y protege la información enviada a través de nuestros sitios web, landing pages, formularios de consulta, enlaces de WhatsApp, enlaces de email y campañas publicitarias relacionadas.",
    controllerTitle: "Quiénes somos",
    controllerText:
      "IFAN Group suministra productos de plomería, tuberías, válvulas, conexiones y materiales relacionados para distribuidores, mayoristas, importadores y compradores de proyectos.",
    sections: [
      {
        title: "Información que recopilamos",
        items: [
          "Datos de contacto como nombre, empresa, email, teléfono, número de WhatsApp y país.",
          "Detalles de la consulta como categoría de producto, medidas, cantidades, país de destino, necesidades del proyecto y requisitos de cotización.",
          "Datos técnicos y de uso como dirección IP, navegador, dispositivo, páginas visitadas, URL de referencia e interacciones.",
          "Datos de publicidad y analítica de herramientas como Google Tag Manager, Google Ads, Meta Pixel, Microsoft Clarity y tecnologías similares de medición.",
        ],
      },
      {
        title: "Cómo usamos la información",
        items: [
          "Para responder consultas, preparar cotizaciones, enviar catálogos y ofrecer soporte comercial B2B.",
          "Para comunicarnos por email, WhatsApp u otros medios solicitados por el comprador.",
          "Para mejorar nuestro sitio web, landing pages, información de productos, campañas publicitarias y experiencia de usuario.",
          "Para detectar uso indebido, mantener la seguridad del sitio y cumplir obligaciones legales o comerciales.",
        ],
      },
      {
        title: "Cookies, analítica y píxeles publicitarios",
        items: [
          "Nuestro sitio puede usar cookies, etiquetas y tecnologías similares para entender fuentes de tráfico, medir campañas y mejorar la experiencia.",
          "Herramientas de terceros pueden procesar datos limitados del dispositivo y uso según sus propias políticas de privacidad.",
          "Puede controlar cookies desde la configuración del navegador. Desactivar cookies puede afectar algunas funciones de medición o del sitio.",
        ],
      },
      {
        title: "Compartir información",
        items: [
          "No vendemos información personal.",
          "Podemos compartir información con proveedores que nos ayudan con formularios, hosting, analítica, publicidad, email o comunicación comercial.",
          "Podemos divulgar información cuando sea requerido por ley, proceso legal o para proteger nuestros derechos y seguridad.",
        ],
      },
      {
        title: "Transferencias internacionales",
        items: [
          "Como IFAN Group atiende compradores B2B internacionales, la información de consulta puede procesarse en países donde opera nuestro equipo o proveedores.",
          "Tomamos medidas razonables para proteger la información durante dicho procesamiento y transferencia.",
        ],
      },
      {
        title: "Conservación de datos",
        items: [
          "Conservamos datos de contacto y consultas solo durante el tiempo razonablemente necesario para comunicación comercial, registros, soporte y cumplimiento legal.",
          "Puede solicitar eliminación o corrección de sus datos de contacto escribiéndonos.",
        ],
      },
      {
        title: "Sus opciones",
        items: [
          "Puede solicitar acceso, corrección o eliminación de la información personal que nos proporcionó.",
          "Puede dejar de recibir comunicaciones de marketing no esenciales en cualquier momento.",
          "Puede ajustar la configuración del navegador para limitar cookies y tecnologías de seguimiento.",
        ],
      },
    ],
    contactTitle: "Contáctenos",
    contactText: "Para preguntas o solicitudes de privacidad, contáctenos usando los datos siguientes.",
    email: "ifanholding@gmail.com",
    whatsapp: "+86 1736 9685 997",
    cta: "Contactar a IFAN Group",
  },
} satisfies Record<PrivacyLanguage, {
  badge: string;
  title: string;
  updated: string;
  intro: string;
  controllerTitle: string;
  controllerText: string;
  sections: Array<{ title: string; items: string[] }>;
  contactTitle: string;
  contactText: string;
  email: string;
  whatsapp: string;
  cta: string;
}>;

export function PrivacyPolicyContent({ locale }: { locale: string }) {
  const language: PrivacyLanguage = locale === "es" ? "es" : "en";
  const c = privacyCopy[language];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <section className="border-b border-slate-200 bg-slate-950 px-5 pb-20 pt-36 text-white lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-300">{c.badge}</p>
            <h1 className="mt-4 text-5xl font-black tracking-normal md:text-7xl">{c.title}</h1>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{c.updated}</p>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200">{c.intro}</p>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="h-fit rounded-md border border-slate-200 bg-slate-50 p-6">
              <ShieldCheck className="h-8 w-8 text-brand-700" />
              <h2 className="mt-5 text-2xl font-black text-slate-950">{c.controllerTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{c.controllerText}</p>
              <div className="mt-6 space-y-3 text-sm font-bold text-slate-800">
                <a href={`mailto:${c.email}`} className="flex items-center gap-3 hover:text-brand-700">
                  <Mail className="h-4 w-4 text-brand-700" />
                  {c.email}
                </a>
                <a href="https://wa.me/8617369685997" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-700">
                  <MessageCircle className="h-4 w-4 text-brand-700" />
                  {c.whatsapp}
                </a>
              </div>
              <Link
                href="/contact"
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-brand-700"
              >
                {c.cta}
              </Link>
            </aside>

            <div className="space-y-6">
              {c.sections.map((section) => (
                <article key={section.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-black text-slate-950">{section.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              <article className="rounded-md border border-brand-100 bg-brand-50 p-6">
                <h2 className="text-2xl font-black text-slate-950">{c.contactTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{c.contactText}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href={`mailto:${c.email}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700">
                    <Mail className="h-4 w-4" />
                    {c.email}
                  </a>
                  <a href="https://wa.me/8617369685997" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-600 px-5 py-3 text-sm font-bold text-brand-800 transition hover:bg-brand-600 hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
