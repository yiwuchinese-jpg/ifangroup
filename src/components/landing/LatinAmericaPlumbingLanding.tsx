"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  Factory,
  Globe2,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  PhoneCall,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";

type Language = "en" | "es";

const whatsappNumber = "8617369685997";
const email = "ifanholding@gmail.com";
const formspreeEndpoint = "https://formspree.io/f/xjglqzvz";
const googleAdsConversion = {
  send_to: "AW-18159357442/gurQCOy8yrQcEIKch9ND",
  value: 1.0,
  currency: "CNY",
};

const productImages = {
  hero: "/latin-america-plumbing/hero-plumbing-products.jpg",
  ppr: "/latin-america-plumbing/product-ppr.jpg",
  pe: "/latin-america-plumbing/product-pe-pp.jpg",
  pvc: "/latin-america-plumbing/product-pvc.jpg",
  pph: "/latin-america-plumbing/product-pph.jpg",
  multilayer: "/latin-america-plumbing/product-multilayer.jpg",
  gas: "/latin-america-plumbing/product-gas-multilayer.jpg",
  brassValves: "/latin-america-plumbing/product-brass-valves.jpg",
  brassTaps: "/latin-america-plumbing/product-brass-taps.jpg",
};

const catalogImages = [
  "/latin-america-plumbing/catalog-mexico.jpg",
  "/latin-america-plumbing/catalog-chile.jpg",
  "/latin-america-plumbing/catalog-panama.jpg",
  "/latin-america-plumbing/catalog-costa-rica.jpg",
];

const factoryImages = [
  "/latin-america-plumbing/factory-gate.jpg",
  "/latin-america-plumbing/factory-line.jpg",
  "/latin-america-plumbing/factory-production.jpg",
  "/latin-america-plumbing/factory-warehouse.jpg",
  "/latin-america-plumbing/factory-workshop.jpg",
];

const projectImages = [
  "/latin-america-plumbing/project-supply-1.jpg",
  "/latin-america-plumbing/project-supply-2.jpg",
  "/latin-america-plumbing/project-supply-3.jpg",
  "/latin-america-plumbing/project-supply-4.jpg",
  "/latin-america-plumbing/project-supply-5.jpg",
  "/latin-america-plumbing/project-supply-6.jpg",
  "/latin-america-plumbing/project-supply-7.jpg",
];

const copy = {
  en: {
    meta: {
      languageUrl: "/latin-america-plumbing-supplier",
      languageLabel: "Español",
    },
    nav: {
      products: "Products",
      markets: "Markets",
      cases: "Cases",
      factory: "Factory",
      catalogs: "Catalogs",
      quote: "Quote",
    },
    hero: {
      eyebrow: "For Latin American distributors, wholesalers and project buyers",
      title: "Wholesale Plumbing & Pipe Products Supplier for Latin America",
      subtitle:
        "Source PE/HDPE, PPR, PVC and PPH pipes, plumbing fittings, brass valves, faucets and multilayer pipe systems from IFAN Group.",
      quote: "Request a Quote",
      priceList: "Get Price List",
      whatsapp: "WhatsApp",
      proof: ["Direct factory supply", "Catalog support by market", "OEM / ODM available", "Quality inspection before shipment"],
    },
    stats: [
      ["1993", "Manufacturing experience since"],
      ["120,000m²", "Smart manufacturing base"],
      ["10,000+", "Plumbing SKUs available"],
      ["120+", "Export markets served"],
    ],
    productsTitle: "Plumbing products matched to your keyword demand",
    productsSubtitle:
      "The page is built for buyers searching for plumbing wholesalers, pipe manufacturers, fittings suppliers and price lists.",
    productContact: "Request quote",
    products: [
      {
        title: "PE / HDPE Pipe & PP Fittings",
        text: "Pipe and fitting supply for water distribution, irrigation, infrastructure and wholesale plumbing channels.",
        image: productImages.pe,
        tags: ["HDPE ISO 4427", "PE100 / PE80 PN16", "PP Compression Fittings"],
      },
      {
        title: "PPR Pipe & Fittings",
        text: "PPR plumbing systems for hot and cold water projects, residential supply and distributor stock programs.",
        image: productImages.ppr,
        tags: ["PPR DIN 8077/8078", "PN12.5 - PN25", "Hot/Cold Water"],
      },
      {
        title: "PVC Pipe & Fittings",
        text: "PVC pipe products for drainage, water systems and construction supply with wholesale order support.",
        image: productImages.pvc,
        tags: ["PVC ASTM D2241", "SCH40 / SCH80", "ASTM D2466 Standard"],
      },
      {
        title: "PPH Pipe & Fittings",
        text: "PPH piping solutions for specialized systems, industrial applications and specification-driven buyers.",
        image: productImages.pph,
        tags: ["PPH DIN 8077/8078", "PN10 Industrial", "Acid/Alkali Resistant"],
      },
      {
        title: "Aluminum-Plastic Multilayer Pipe",
        text: "Multilayer pipe options for plumbing, heating and flexible installation requirements.",
        image: productImages.multilayer,
        tags: ["PEX-AL-PEX Pipe", "ISO 21003 Certified", "Overlapped / Butt-Welded"],
      },
      {
        title: "Gas Multilayer Pipe Systems",
        text: "Gas pipe systems, compression fittings and press fittings for professional distribution programs.",
        image: productImages.gas,
        tags: ["PE-AL-PE Gas Pipe", "Brass Press Fittings", "Yellow Jacket Gas Standard"],
      },
      {
        title: "Brass Valves, Filters & Taps",
        text: "Brass valve and faucet supply for hardware stores, wholesalers and plumbing distributors.",
        image: productImages.brassValves,
        tags: ["NPT / BSP Thread", "Gate / Ball Valves PN25", "ISO 228 Standard Brass"],
      },
      {
        title: "Brass Faucets & Water Taps",
        text: "Durable brass faucet products for retail channels, project buyers and private label programs.",
        image: productImages.brassTaps,
        tags: ["Standard Basin Taps", "OEM Packing Available", "Heavy Duty Brass Body"],
      },
    ],
    buyersTitle: "Built for Latin American B2B buyers",
    buyersText:
      "We support distributors, importers, hardware chains, contractors and construction project teams that need reliable plumbing materials at wholesale scale.",
    buyers: ["Distributors", "Wholesalers", "Hardware stores", "Contractors", "Construction companies", "Project buyers"],
    marketsTitle: "Serving buyers across Latin America",
    marketsText:
      "Focused support for Mexico, Colombia, Peru, Chile, Ecuador, Bolivia and Argentina, with catalog programs adaptable to local market needs.",
    marketChips: ["Mexico", "Colombia", "Peru", "Chile", "Ecuador", "Bolivia", "Argentina"],
    marketSupport: [
      ["Market catalog support", "Product catalogs can be matched by country, channel and buyer type."],
      ["Mixed-category orders", "Combine pipe, fittings, valves, faucets and accessories in one inquiry."],
      ["Export-ready coordination", "Packaging, documents and shipment planning for B2B importers."],
    ],
    casesTitle: "Cooperation cases and project supply records",
    casesText:
      "Real-world supply visuals help buyers evaluate packing, order handling and product mix before starting a wholesale cooperation.",
    cases: [
      "Distributor stock supply",
      "Mixed plumbing material orders",
      "Project procurement support",
      "Catalog-based product matching",
      "Wholesale packing review",
      "Export order preparation",
      "On-site supply confirmation",
    ],
    factoryTitle: "More factory views for supplier evaluation",
    factoryText:
      "For B2B buyers, factory visibility matters. Review our gate, production line, workshop and material handling visuals before requesting a quote.",
    catalogsTitle: "Request catalogs and price lists by product category",
    catalogsText:
      "Send your destination country, product list and estimated quantities. Our sales team will prepare a suitable catalog and quotation.",
    whyTitle: "Why importers choose IFAN Group",
    why: [
      {
        icon: Factory,
        title: "Factory supply",
        text: "Direct manufacturer support for pipe, fittings, brass products and private label programs.",
      },
      {
        icon: PackageCheck,
        title: "Wholesale packaging & Customs coordination",
        text: "Customs-cleared document support (CO, BL, certificates) and reinforced export packing to survive Latin American transits.",
      },
      {
        icon: ClipboardList,
        title: "Price list support",
        text: "Quotation by product category, size, material, destination and estimated order quantity.",
      },
      {
        icon: ShieldCheck,
        title: "Quality control",
        text: "Inspection and product consistency control before shipment for international B2B orders.",
      },
    ],
    processTitle: "A simple buying process",
    process: [
      ["Send requirements", "Share product category, sizes, quantities and destination country."],
      ["Confirm catalog", "We match suitable products, packaging options and technical details."],
      ["Get quotation", "Receive price list, MOQ, lead time and shipment planning information."],
      ["Start order", "Confirm samples, private label details or bulk order arrangement."],
    ],
    form: {
      title: "Request plumbing materials price list",
      text: "Tell us what you need. Excel / PDF lists are highly preferred - you can upload/send them directly to our email or WhatsApp.",
      name: "Name",
      country: "Country",
      company: "Company",
      contact: "Email / phone / WhatsApp",
      contactMethod: "Preferred contact method",
      methodOptions: ["Email", "Phone call", "WhatsApp"],
      products: "Products needed",
      quantity: "Estimated quantity",
      submit: "Send inquiry",
      email: "Email sales team",
      noWhatsapp: "No WhatsApp required - email or phone is fine.",
      sending: "Sending inquiry...",
      sent: "Inquiry sent. Our sales team will reply by your preferred contact method.",
      error: "The form could not send. Please use the email button as backup.",
      defaults: {
        products: "HDPE / PPR / brass fittings / valves",
        country: "Mexico",
      },
    },
    faqTitle: "Common questions",
    faqs: [
      ["Can I get a price list?", "Yes. Send product categories, sizes, quantities and destination country so we can prepare a relevant quotation."],
      ["Do you support OEM or private label?", "Yes. We can support private label packaging, customized specifications and OEM / ODM requirements."],
      ["What is the MOQ?", "MOQ depends on product category, size and packaging requirements. Send your list and we will confirm item by item."],
      ["Can you ship and clear customs to Latin America?", "Yes. We have rich experience coordinating export documentation, SGS/BV pre-shipment inspections, and robust palletizing to meet Latin American customs requirements."],
    ],
    finalCta: {
      title: "Ready to compare supplier pricing?",
      text: "Send your product list and destination country. We will help you match the right plumbing materials for your market.",
      button: "Send inquiry",
    },
  },
  es: {
    meta: {
      languageUrl: "/latin-america-plumbing-supplier?lang=en",
      languageLabel: "English",
    },
    nav: {
      products: "Productos",
      markets: "Mercados",
      cases: "Casos",
      factory: "Fábrica",
      catalogs: "Catálogos",
      quote: "Cotización",
    },
    hero: {
      eyebrow: "Para distribuidores, mayoristas y compradores de proyectos en América Latina",
      title: "Proveedor mayorista de productos de plomería y tuberías para América Latina",
      subtitle:
        "Suministre tuberías PE/HDPE, PPR, PVC y PPH, conexiones, válvulas de latón, grifería y sistemas multicapa con IFAN Group.",
      quote: "Solicitar cotización",
      priceList: "Obtener lista de precios",
      whatsapp: "WhatsApp",
      proof: ["Suministro directo de fábrica", "Catálogos por mercado", "OEM / ODM disponible", "Inspección antes del envío"],
    },
    stats: [
      ["1993", "Experiencia de fabricación desde"],
      ["120,000m²", "Base de fabricación inteligente"],
      ["10,000+", "SKUs de plomería disponibles"],
      ["120+", "Mercados de exportación"],
    ],
    productsTitle: "Productos de plomería alineados con la demanda B2B",
    productsSubtitle:
      "La página está diseñada para compradores que buscan mayoristas, fabricantes de tuberías, proveedores de conexiones y listas de precios.",
    productContact: "Solicitar cotización",
    products: [
      {
        title: "Tubería PE / HDPE y conexiones PP",
        text: "Suministro para distribución de agua, riego, infraestructura y canales mayoristas de plomería.",
        image: productImages.pe,
        tags: ["HDPE ISO 4427", "PE100 / PE80 PN16", "Conexiones de Compresión PP"],
      },
      {
        title: "Tubería y conexiones PPR",
        text: "Sistemas PPR para agua fría y caliente, proyectos residenciales y programas de stock para distribuidores.",
        image: productImages.ppr,
        tags: ["PPR DIN 8077/8078", "PN12.5 - PN25", "Agua Fría y Caliente"],
      },
      {
        title: "Tubería y conexiones PVC",
        text: "Productos PVC para drenaje, sistemas de agua y construcción con soporte para pedidos al por mayor.",
        image: productImages.pvc,
        tags: ["PVC ASTM D2241", "SCH40 / SCH80", "Norma ASTM D2466"],
      },
      {
        title: "Tubería y conexiones PPH",
        text: "Soluciones PPH para sistemas especializados, aplicaciones industriales y compradores técnicos.",
        image: productImages.pph,
        tags: ["PPH DIN 8077/8078", "PN10 Industrial", "Resistente a Ácidos y Álcalis"],
      },
      {
        title: "Tubería multicapa aluminio-plástico",
        text: "Opciones multicapa para plomería, calefacción e instalaciones flexibles.",
        image: productImages.multilayer,
        tags: ["Tubería PEX-AL-PEX", "Certificación ISO 21003", "Traslapado / Soldado a Tope"],
      },
      {
        title: "Sistemas multicapa para gas",
        text: "Sistemas de gas, conexiones de compresión y conexiones press para distribución profesional.",
        image: productImages.gas,
        tags: ["Tubería de Gas PE-AL-PE", "Conexiones Press de Latón", "Norma de Gas Chaqueta Amarilla"],
      },
      {
        title: "Válvulas, filtros y grifos de latón",
        text: "Suministro de válvulas y grifería de latón para ferreterías, mayoristas y distribuidores.",
        image: productImages.brassValves,
        tags: ["Rosca NPT / BSP", "Compuerta / Bola PN25", "Latón Norma ISO 228"],
      },
      {
        title: "Grifos y llaves de agua de latón",
        text: "Productos de latón duraderos para canales retail, compradores de proyectos y marca privada.",
        image: productImages.brassTaps,
        tags: ["Grifos de Lavabo Estándar", "Empaque OEM Disponible", "Cuerpo de Latón Pesado"],
      },
    ],
    buyersTitle: "Pensado para compradores B2B de América Latina",
    buyersText:
      "Apoyamos a distribuidores, importadores, ferreterías, contratistas y equipos de construcción que necesitan materiales confiables a escala mayorista.",
    buyers: ["Distribuidores", "Mayoristas", "Ferreterías", "Contratistas", "Constructoras", "Compradores de proyectos"],
    marketsTitle: "Atendemos compradores en América Latina",
    marketsText:
      "Soporte para México, Colombia, Perú, Chile, Ecuador, Bolivia y Argentina, con programas de catálogo adaptables al mercado local.",
    marketChips: ["México", "Colombia", "Perú", "Chile", "Ecuador", "Bolivia", "Argentina"],
    marketSupport: [
      ["Soporte de catálogos", "Catálogos adaptados por país, canal y tipo de comprador."],
      ["Pedidos mixtos", "Combine tuberías, conexiones, válvulas, grifería y accesorios en una consulta."],
      ["Coordinación de exportación", "Empaque, documentos y planificación de envío para importadores B2B."],
    ],
    casesTitle: "Casos de cooperación y suministro para proyectos",
    casesText:
      "Las imágenes reales de suministro ayudan a evaluar empaque, manejo de pedidos y mezcla de productos antes de iniciar una cooperación mayorista.",
    cases: [
      "Suministro para distribuidores",
      "Pedidos mixtos de plomería",
      "Soporte para proyectos",
      "Selección por catálogo",
      "Revisión de empaque mayorista",
      "Preparación de exportación",
      "Confirmación de suministro",
    ],
    factoryTitle: "Más imágenes de fábrica para evaluar al proveedor",
    factoryText:
      "Para compradores B2B, la visibilidad de fábrica importa. Revise nuestra entrada, línea de producción, taller y manejo de materiales antes de cotizar.",
    catalogsTitle: "Solicite catálogos y listas de precios por categoría",
    catalogsText:
      "Envíe su país de destino, lista de productos y cantidades estimadas. Nuestro equipo preparará el catálogo y la cotización adecuados.",
    whyTitle: "Por qué los importadores eligen IFAN Group",
    why: [
      {
        icon: Factory,
        title: "Suministro de fábrica",
        text: "Soporte directo del fabricante para tuberías, conexiones, productos de latón y marca privada.",
      },
      {
        icon: PackageCheck,
        title: "Empaque reforzado y coordinación aduanera",
        text: "Documentación aduanera completa (CO, BL, certificados) y empaque reforzado de exportación apto para el tránsito marítimo a Latinoamérica.",
      },
      {
        icon: ClipboardList,
        title: "Soporte de precios",
        text: "Cotización por categoría, tamaño, material, destino y cantidad estimada.",
      },
      {
        icon: ShieldCheck,
        title: "Control de calidad",
        text: "Inspección y control de consistencia antes del envío para pedidos B2B internacionales.",
      },
    ],
    processTitle: "Proceso de compra simple",
    process: [
      ["Envíe requisitos", "Comparta categoría, tamaños, cantidades y país de destino."],
      ["Confirme catálogo", "Relacionamos productos, empaque y detalles técnicos adecuados."],
      ["Reciba cotización", "Obtenga lista de precios, MOQ, plazo y planificación de envío."],
      ["Inicie pedido", "Confirme muestras, marca privada o pedido al por mayor."],
    ],
    form: {
      title: "Solicite lista de precios de materiales de plomería",
      text: "Cuéntenos qué necesita. Preferimos listas de compra en Excel o PDF - puede enviarlas directamente a nuestro correo o por WhatsApp.",
      name: "Nombre",
      country: "País",
      company: "Empresa",
      contact: "Email / teléfono / WhatsApp",
      contactMethod: "Método de contacto preferido",
      methodOptions: ["Email", "Llamada telefónica", "WhatsApp"],
      products: "Productos requeridos",
      quantity: "Cantidad estimada",
      submit: "Enviar solicitud",
      email: "Enviar email",
      noWhatsapp: "No necesita WhatsApp - email o teléfono está bien.",
      sending: "Enviando solicitud...",
      sent: "Solicitud enviada. Nuestro equipo responderá por el método de contacto preferido.",
      error: "El formulario no pudo enviarse. Use el botón de email como respaldo.",
      defaults: {
        products: "HDPE / PPR / conexiones de latón / válvulas",
        country: "México",
      },
    },
    faqTitle: "Preguntas frecuentes",
    faqs: [
      ["¿Puedo recibir una lista de precios?", "Sí. Envíe categorías, tamaños, cantidades y país de destino para preparar una cotización relevante."],
      ["¿Hacen OEM o marca privada?", "Sí. Podemos apoyar empaque de marca privada, especificaciones personalizadas y requisitos OEM / ODM."],
      ["¿Cuál es el MOQ?", "Depende de la categoría, tamaño y empaque. Envíe su lista y confirmaremos producto por producto."],
      ["¿Tienen experiencia exportando a América Latina?", "Sí, contamos con amplia experiencia lidiando con los requerimientos aduaneros de la región (documentación, certificados de origen, regulaciones técnicas, paletizado de exportación e inspecciones previas SGS/BV)."],
    ],
    finalCta: {
      title: "¿Listo para comparar precios de proveedor?",
      text: "Envíe su lista de productos y país de destino. Le ayudaremos a elegir los materiales adecuados para su mercado.",
      button: "Enviar solicitud",
    },
  },
} satisfies Record<Language, Record<string, unknown>>;

type LandingCopy = typeof copy.en;

function SectionInquiryButton({
  label,
  dark = false,
  onClick,
}: {
  label: string;
  dark?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href="#quote"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${
        dark
          ? "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950"
          : "bg-brand-600 text-white hover:bg-brand-700"
      }`}
    >
      <Send className="h-4 w-4" />
      {label}
    </a>
  );
}

function reportInquiryConversion() {
  const browserWindow = window as Window & {
    gtag?: (command: string, action: string, params: Record<string, string | number>) => void;
  };

  browserWindow.gtag?.("event", "conversion", googleAdsConversion);
}

function QuoteForm({ c, language, selectedProduct }: { c: LandingCopy; language: Language; selectedProduct: string }) {
  const [form, setForm] = useState({
    name: "",
    country: c.form.defaults.country,
    company: "",
    contact: "",
    contactMethod: c.form.methodOptions[0],
    products: c.form.defaults.products,
    quantity: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const message = useMemo(() => {
    const intro =
      language === "en"
        ? "Hello IFAN, I need a plumbing materials price list for Latin America."
        : "Hola IFAN, necesito una lista de precios de materiales de plomería para América Latina.";

    return [
      intro,
      `Name: ${form.name || "-"}`,
      `Country: ${form.country || "-"}`,
      `Company: ${form.company || "-"}`,
      `Contact: ${form.contact || "-"}`,
      `Preferred contact method: ${form.contactMethod || "-"}`,
      `Products: ${form.products || "-"}`,
      `Estimated quantity: ${form.quantity || "-"}`,
    ].join("\n");
  }, [form, language]);

  const emailSubject =
    language === "en"
      ? "Latin America plumbing materials inquiry"
      : "Consulta de materiales de plomería para América Latina";
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!selectedProduct) return;
    setForm((current) => ({ ...current, products: selectedProduct }));
  }, [selectedProduct]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    const payload = new FormData(event.currentTarget);
    payload.set("Message", message);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("Inquiry submission failed");
      }

      setSubmitState("sent");
      reportInquiryConversion();
    } catch {
      setSubmitState("error");
    }
  }

  const inputClass =
    "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

  return (
    <form action={formspreeEndpoint} method="POST" onSubmit={submit} className="grid gap-4">
      <input type="hidden" name="_subject" value={emailSubject} />
      <input type="hidden" name="Message" value={message} />
      <input type="hidden" name="Landing page" value="Latin America plumbing supplier" />
      <div className="grid gap-4 md:grid-cols-2">
        <input required name="Name" className={inputClass} placeholder={c.form.name} value={form.name} onChange={(event) => updateField("name", event.target.value)} />
        <input name="Country" className={inputClass} placeholder={c.form.country} value={form.country} onChange={(event) => updateField("country", event.target.value)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="Company" className={inputClass} placeholder={c.form.company} value={form.company} onChange={(event) => updateField("company", event.target.value)} />
        <input required name="Email / phone / WhatsApp" className={inputClass} placeholder={c.form.contact} value={form.contact} onChange={(event) => updateField("contact", event.target.value)} />
      </div>
      <label className="grid gap-2">
        <span className="text-xs font-black uppercase tracking-wide text-slate-500">{c.form.contactMethod}</span>
        <select
          name="Preferred contact method"
          className={inputClass}
          value={form.contactMethod}
          onChange={(event) => updateField("contactMethod", event.target.value)}
        >
          {c.form.methodOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <textarea name="Products needed" className={`${inputClass} min-h-28 resize-y`} placeholder={c.form.products} value={form.products} onChange={(event) => updateField("products", event.target.value)} />
      <input name="Estimated quantity" className={inputClass} placeholder={c.form.quantity} value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)} />
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <CheckCircle2 className="h-4 w-4 text-brand-700" />
        {c.form.noWhatsapp}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={submitState === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-700"
        >
          <Send className="h-4 w-4" />
          {c.form.submit}
        </button>
        <a
          href={mailtoHref}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-800 transition hover:border-brand-600 hover:text-brand-700"
        >
          <Mail className="h-4 w-4" />
          {c.form.email}
        </a>
      </div>
      {submitState !== "idle" && (
        <p
          role="status"
          className={`text-sm font-semibold ${
            submitState === "error" ? "text-red-600" : "text-slate-600"
          }`}
        >
          {submitState === "sending" && c.form.sending}
          {submitState === "sent" && c.form.sent}
          {submitState === "error" && c.form.error}
        </p>
      )}
    </form>
  );
}

export default function LatinAmericaPlumbingLanding({ language = "en" }: { language?: Language }) {
  const c = copy[language] as LandingCopy;
  const [selectedProduct, setSelectedProduct] = useState("");
  const quoteMessage =
    language === "en"
      ? "Hello IFAN, please send me a plumbing materials price list for Latin America."
      : "Hola IFAN, por favor envíeme una lista de precios de materiales de plomería para América Latina.";
  const sectionCtaLabel = c.hero.quote;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="relative h-10 w-36" aria-label="IFAN Group">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="144px" className="object-contain object-left" priority />
          </Link>
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.18em] text-white/75 lg:flex">
            <a href="#products" className="transition hover:text-white">{c.nav.products}</a>
            <a href="#markets" className="transition hover:text-white">{c.nav.markets}</a>
            <a href="#cases" className="transition hover:text-white">{c.nav.cases}</a>
            <a href="#factory" className="transition hover:text-white">{c.nav.factory}</a>
            <a href="#catalogs" className="transition hover:text-white">{c.nav.catalogs}</a>
            <a href="#quote" className="transition hover:text-white">{c.nav.quote}</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={c.meta.languageUrl}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/20 px-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-slate-950"
            >
              <Languages className="h-4 w-4" />
              {c.meta.languageLabel}
            </a>
            <a
              href="#quote"
              className="hidden min-h-10 items-center justify-center gap-2 rounded-md bg-brand-500 px-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-400 sm:inline-flex"
            >
              <Send className="h-4 w-4" />
              {c.nav.quote}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-slate-950 pt-24 text-white">
          <Image
            src={productImages.hero}
            alt="IFAN plumbing pipes, valves and fittings for wholesale buyers"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_52%] opacity-95"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96),rgba(2,6,23,0.76),rgba(2,6,23,0.18))]" />
          <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-5 py-20 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-100">
                <Globe2 className="h-4 w-4" />
                {c.hero.eyebrow}
              </p>
              <h1 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-normal text-white md:text-7xl">
                {c.hero.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
                {c.hero.subtitle}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quote"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-brand-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400"
                >
                  {c.hero.quote}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#quote"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                >
                  <ClipboardList className="h-4 w-4" />
                  {c.hero.priceList}
                </a>
              </div>
              <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {c.hero.proof.map((item) => (
                  <div key={item} className="flex min-h-14 items-center gap-3 border-l border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {c.stats.map(([value, label]) => (
                <div key={value} className="border-slate-200 py-6 sm:border-l sm:pl-8 first:border-l-0 first:pl-0">
                  <p className="text-3xl font-black text-brand-700">{value}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{label}</p>
                </div>
              ))}
            </div>
            <SectionInquiryButton label={sectionCtaLabel} />
          </div>
        </section>

        <section id="products" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Product range</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.productsTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{c.productsSubtitle}</p>
              </div>
              <SectionInquiryButton label={sectionCtaLabel} />
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {c.products.map((product) => (
                <article key={product.title} className="group flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-slate-100">
                    <Image src={product.image} alt={product.title} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-black text-slate-950">{product.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{product.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-5">
                      <a
                        href="#quote"
                        onClick={() => setSelectedProduct(product.title)}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-brand-700"
                      >
                        <Send className="h-4 w-4" />
                        {c.productContact}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <SectionInquiryButton label={sectionCtaLabel} />
            </div>
          </div>
        </section>

        <section id="markets" className="border-y border-slate-200 bg-slate-50 py-24 text-slate-950">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Latin America</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">{c.buyersTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{c.buyersText}</p>
              <div className="mt-8">
                <SectionInquiryButton label={sectionCtaLabel} />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {c.buyers.map((buyer) => (
                  <div key={buyer} className="flex min-h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 shadow-sm">
                    <Building2 className="h-4 w-4 text-brand-700" />
                    {buyer}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid content-start gap-6">
              <div className="rounded-md border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand-700" />
                  <div>
                    <h3 className="text-2xl font-black">{c.marketsTitle}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{c.marketsText}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {c.marketChips.map((market) => (
                    <span key={market} className="rounded-full border border-brand-600/20 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800">
                      {market}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {c.marketSupport.map(([title, text], index) => {
                  const Icon = [Globe2, PackageCheck, Truck][index] ?? Globe2;
                  return (
                    <div key={title} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                      <Icon className="h-6 w-6 text-brand-700" />
                      <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Cooperation cases</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.casesTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{c.casesText}</p>
              </div>
              <SectionInquiryButton label={sectionCtaLabel} />
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {projectImages.map((src, index) => (
                <article
                  key={src}
                  className={`group overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden bg-slate-100 ${index === 0 ? "aspect-[4/3] h-full min-h-[360px]" : "aspect-[4/3]"}`}>
                    <Image
                      src={src}
                      alt={`${c.cases[index]} - IFAN cooperation case`}
                      fill
                      sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-4">
                      <p className="text-sm font-black uppercase tracking-wide text-white">{c.cases[index]}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <SectionInquiryButton label={sectionCtaLabel} />
            </div>
          </div>
        </section>

        <section id="factory" className="bg-slate-950 py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-300">Factory capability</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">{c.factoryTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">{c.factoryText}</p>
                <div className="mt-8">
                  <SectionInquiryButton label={sectionCtaLabel} dark />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {factoryImages.map((src, index) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-md bg-slate-800 ${
                      index === 0 ? "aspect-[16/10] sm:col-span-2 lg:col-span-2" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`IFAN Group factory view ${index + 1}`}
                      fill
                      sizes={index === 0 ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="catalogs" className="bg-slate-50 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Catalog and price list</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.catalogsTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{c.catalogsText}</p>
              <div className="mt-8">
                <SectionInquiryButton label={sectionCtaLabel} />
              </div>
              <div className="mt-8 grid gap-4">
                {c.why.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 border-t border-slate-200 pt-5 first:border-t-0 first:pt-0">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                      <div>
                        <h3 className="font-black text-slate-950">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {catalogImages.map((src, index) => (
                <div key={src} className={`relative overflow-hidden rounded-md bg-white shadow-sm ${index === 0 ? "col-span-2 aspect-[16/8]" : "aspect-[4/3]"}`}>
                  <Image src={src} alt={`Latin America catalog cover ${index + 1}`} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Buying workflow</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.processTitle}</h2>
                <div className="mt-8">
                  <SectionInquiryButton label={sectionCtaLabel} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {c.process.map(([title, text], index) => (
                  <div key={title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-black text-white">{index + 1}</div>
                    <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="quote" className="bg-slate-100 py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Request quote</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.form.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{c.form.text}</p>
              <div className="mt-8 space-y-4">
                <p className="flex items-center gap-3 text-base font-bold text-slate-800">
                  <PhoneCall className="h-5 w-5 text-brand-700" />
                  +86 1736 9685 997
                </p>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-base font-bold text-slate-800 transition hover:text-brand-700">
                  <Mail className="h-5 w-5 text-brand-700" />
                  {email}
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base font-bold text-slate-800 transition hover:text-brand-700"
                >
                  <MessageCircle className="h-5 w-5 text-brand-700" />
                  {c.hero.whatsapp}: +86 1736 9685 997
                </a>
                <p className="flex items-center gap-3 text-base font-bold text-slate-800">
                  <Truck className="h-5 w-5 text-brand-700" />
                  Mexico, Colombia, Peru, Chile, Ecuador, Bolivia, Argentina
                </p>
              </div>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <QuoteForm c={c} language={language} selectedProduct={selectedProduct} />
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.faqTitle}</h2>
                <div className="mt-8">
                  <SectionInquiryButton label={sectionCtaLabel} />
                </div>
              </div>
              <div className="grid gap-4">
                {c.faqs.map(([question, answer]) => (
                  <div key={question} className="rounded-md border border-slate-200 p-6">
                    <h3 className="flex items-start gap-3 text-lg font-black text-slate-950">
                      <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                      {question}
                    </h3>
                    <p className="mt-3 pl-8 text-sm leading-7 text-slate-600">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
          <Image src="/latin-america-plumbing/project-supply-1.jpg" alt="IFAN project supply case" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-black tracking-normal md:text-5xl">{c.finalCta.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">{c.finalCta.text}</p>
            </div>
            <a
              href="#quote"
              className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-md bg-brand-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400"
            >
              <Send className="h-4 w-4" />
              {c.finalCta.button}
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="relative h-9 w-32">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="128px" className="object-contain object-left" />
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-300">
            <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp: +86 1736 9685 997
            </a>
            <Link href="/privacy" className="hover:text-white">
              {language === "es" ? "Política de privacidad" : "Privacy Policy"}
            </Link>
          </div>
        </div>
      </footer>

      <a
        href="#quote"
        className="fixed bottom-4 left-4 right-4 z-[70] inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-2xl shadow-brand-900/25 transition hover:bg-brand-700 md:hidden"
      >
        <Send className="h-5 w-5" />
        {c.form.submit}
      </a>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${c.hero.whatsapp}: +86 1736 9685 997`}
        className="group fixed bottom-24 right-4 z-[75] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 md:bottom-6 md:right-6 md:h-13 md:w-13"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-slate-950 px-3 py-2 text-xs font-black uppercase tracking-wide text-white opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          {c.hero.whatsapp}
        </span>
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
      </a>
    </div>
  );
}
