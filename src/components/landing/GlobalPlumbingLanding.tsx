"use client";

declare let gtag: any;

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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
  Award,
  Ship,
  HeartHandshake,
  BarChart3,
  Ruler,
  X,
} from "lucide-react";

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

// ─── Animation Variants ──────────────────────────────────────────────

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Copy ──────────────────────────────────────────────────────────────

// FAQ rendered on the page; the same list is emitted as FAQPage JSON-LD from ./globalPlumbingData in page.tsx
const globalPlumbingFaqs: [string, string][] = [
  ["How do you handle international shipping and customs?", "We support FOB, CIF and door-to-door delivery. Our team manages all documentation: commercial invoice, packing list, bill of lading, certificate of origin, and destination-specific customs requirements."],
  ["What certifications do your products have?", "ISO 9001, CE, WRAS (UK), NSF (USA), plus regional standards for specific markets. Tell us your destination and we match the compliance requirements."],
  ["Do you support OEM, private label or custom packaging?", "Yes — this is one of our core strengths. Custom packaging, private label branding, retail-ready box design. Your brand, your specifications, your packaging."],
  ["What are your typical lead times and MOQ?", "Typically 15–30 days for standard products. MOQ is flexible — we welcome trial orders from first-time buyers to build trust before scaling up."],
  ["Can you provide samples and technical documentation?", "Absolutely. Product samples, engineering drawings, technical datasheets, and certification copies are available upon request. Sample shipment within 3–5 working days."],
  ["How does IFAN ensure quality for international orders?", "Raw material testing, in-process inspection, final QC before loading. Third-party inspection (SGS, BV, Intertek) can be arranged before shipment at your request."],
  ["Are you a plumbing manufacturer or a trading supplier?", "We are the manufacturer. IFAN has built plumbing products in Zhejiang, China since 1993 in our own 120,000 m² factory with 30+ automated extrusion lines, in-house injection molding, and a mold workshop. You buy factory-direct, at the maker's price, with a batch certificate on every shipment — no middleman markup and no trading-company handoff."],
  ["What full product range can I source from one order?", "One supplier for the whole system: PPR pipe DN20–DN160 in PN12.5–PN25, plus fittings, valves, composite pipe and floor-heating, and PVC/UPVC/CPVC, PPH, HDPE (PE100/PE80), PEX and multilayer pipe, and CW617N lead-free brass valves and faucets. MOQ is one container and you can mix sizes and products inside it."],
  ["Do you sell on Amazon or Alibaba retail, or protect distributors?", "No. We are strictly B2B wholesale and export only — no Amazon, no Alibaba retail, no sales to individual consumers. That keeps our importers and distributors from competing against our own product listed online. You deal directly with the factory as a wholesale buyer, with your market protected."],
];

const copy = {
  nav: {
    products: "Products",
    markets: "Markets",
    cases: "Projects",
    factory: "Factory",
    catalogs: "Catalogs",
    quote: "Quote",
  },
  hero: {
    eyebrow: "China's Premier Plumbing Exporter — Serving 120+ Countries Since 1993",
    title: "Global Sourcing Partner for Pipes, Fittings & Plumbing Solutions",
    subtitle:
      "Source PE/HDPE, PPR, PVC, PPH pipes, brass valves, faucets and multilayer pipe systems at China's most competitive factory pricing. ISO 9001, CE, WRAS, NSF certified — direct from our 120,000m² smart factory.",
    quote: "Request Global Quote",
    priceList: "Get Price List",
    whatsapp: "WhatsApp",
    proof: [
      "ISO 9001 / CE / WRAS / NSF Certified",
      "Factory Direct — No Middlemen",
      "Multi-Language Sales Support",
      "SGS / BV Pre-Shipment Inspection",
    ],
  },
  stats: [
    ["1993", "Manufacturing Excellence Since"],
    ["120,000m²", "Smart Manufacturing Base in China"],
    ["10,000+", "Plumbing SKUs Available"],
    ["120+", "Export Markets Served Worldwide"],
  ],
  productsTitle: "8 Product Lines — One Source for Your Global Supply Chain",
  productsSubtitle:
    "Importers and distributors worldwide trust IFAN for consistent quality, competitive pricing, and seamless cross-border logistics. Every product line supports OEM, private label, and customized packaging.",
  productContact: "Get Wholesale Pricing",
  products: [
    {
      title: "PE / HDPE Pipe & PP Fittings",
      text: "High-density polyethylene pipe systems for water distribution, irrigation, gas conveyance and infrastructure. Full PN range with ISO 4427 certification.",
      image: productImages.pe,
      tags: ["HDPE ISO 4427", "PE100 / PE80 PN16", "Butt & Electrofusion"],
    specs: ["PE100 / PE80 Grade", "DN20 \u2013 DN1200mm", "PN6 \u2013 PN25", "SDR 7.4 \u2013 SDR 33", "Black / Blue Stripe / Custom"],
    applications: ["Municipal Water Supply", "Irrigation Systems", "Gas Distribution", "Sewage & Drainage", "Industrial Piping"],
    certifications: ["ISO 4427", "ISO 9001:2015", "CE Marking", "WRAS (UK)"]  },
    {
      title: "PPR Pipe & Fittings",
      text: "The global standard for hot and cold water plumbing. PPR systems for residential, commercial and industrial projects with European DIN compliance.",
      image: productImages.ppr,
      tags: ["DIN 8077/8078", "PN12.5 – PN25", "Hot & Cold Water"],
    specs: ["PP-R 100 Raw Material", "DN20 \u2013 DN160mm", "PN12.5 \u2013 PN25", "SDR 6 \u2013 SDR 11", "Green / White / Custom"],
    applications: ["Hot & Cold Water Plumbing", "Radiator Heating Systems", "Residential Buildings", "Commercial Projects", "Industrial Plants"],
    certifications: ["DIN 8077/8078", "ISO 9001:2015", "CE Marking", "SGS Tested"]  },
    {
      title: "PVC Pipe & Fittings",
      text: "Complete PVC piping solutions for drainage, sewer, water supply and electrical conduit. Available in SCH40, SCH80 and metric standards.",
      image: productImages.pvc,
      tags: ["ASTM D2241 / D2466", "SCH40 / SCH80", "uPVC / CPVC Options"],
    specs: ["SCH40 / SCH80 / Metric", "DN15 \u2013 DN600mm", "uPVC / CPVC Options", "ASTM / BS / DIN Standards", "Grey / White / Custom"],
    applications: ["Drainage & Sewer", "Water Supply Networks", "Electrical Conduit", "Chemical Piping", "Rainwater Systems"],
    certifications: ["ASTM D1785 / D2241", "BS 3505 / 3506", "ISO 9001:2015", "CE Marking"]  },
    {
      title: "PPH Pipe & Fittings",
      text: "Polypropylene piping for industrial applications requiring chemical resistance and high-temperature performance. Ideal for processing plants.",
      image: productImages.pph,
      tags: ["DIN 8077/8078", "PN10 Industrial", "Acid & Alkali Resistant"],
    specs: ["PP-H Homopolymer", "DN20 \u2013 DN400mm", "PN10 Pressure Rating", "Natural / Custom Colors", "Metric Dimensions"],
    applications: ["Chemical Processing Plants", "Industrial Wastewater", "Electroplating Lines", "Pharmaceutical Piping", "Food Processing"],
    certifications: ["DIN 8077/8078", "ISO 9001:2015", "CE Marking", "Chemical Resistance Compliant"]  },
    {
      title: "Aluminum-Plastic Multilayer Pipe",
      text: "Advanced aluminum-plastic composite pipe combining flexibility with stability. For plumbing, heating and gas applications worldwide.",
      image: productImages.multilayer,
      tags: ["ISO 21003 Certified", "PEX-AL-PEX", "Overlapped / Butt-Welded"],
    specs: ["PEX-AL-PEX / PE-AL-PE", "DN16 \u2013 DN63mm", "Overlapped & Butt-Welded", "Oxygen Barrier Option", "Coils: 50m / 100m / 200m"],
    applications: ["Underfloor Heating", "Radiator Connections", "Domestic Plumbing", "Compressed Air", "Solar Heating"],
    certifications: ["ISO 21003", "DIN 4726", "CE Marking", "Pressure Tested"]  },
    {
      title: "Gas Multilayer Pipe Systems",
      text: "Specialized gas-grade multilayer pipe with compression and press fittings. Engineered for natural gas and LPG distribution networks.",
      image: productImages.gas,
      tags: ["PE-AL-PE Gas Pipe", "Brass Press Fittings", "Yellow Jacket Standard"],
    specs: ["PE-AL-PE Gas Grade", "DN16 \u2013 DN75mm", "Yellow Jacket Standard", "Brass Press Fittings", "Coil Lengths: 50m \u2013 200m"],
    applications: ["Natural Gas Distribution", "LPG Supply Lines", "Gas Appliances", "Commercial Kitchens", "Industrial Gas Networks"],
    certifications: ["EN 1555 / ISO 17484", "DVGW Approved", "CE Marking", "Gas Safety Certified"]  },
    {
      title: "Brass Valves, Filters & Taps",
      text: "Heavy-duty brass valves, gate valves, ball valves, filter valves. Precision-machined to international threading standards for global buyers.",
      image: productImages.brassValves,
      tags: ["NPT / BSP / ISO 228", "Gate / Ball / Check PN25", "Hot Forged Brass"],
    specs: ["Hot Forged Brass CW617N", "1/4\" \u2013 4\" NPT / BSP", "PN25 Pressure Rating", "Nickel-Plated / Natural", "PTFE Seals"],
    applications: ["Water Supply Systems", "HVAC Installations", "Industrial Pipelines", "Irrigation Control", "Gas Connections"],
    certifications: ["ISO 228 / NPT / BSP", "EN 12266 Leak Tested", "ISO 9001:2015", "CE Marking"]  },
    {
      title: "Brass Faucets & Water Taps",
      text: "Complete range of brass faucets, mixing taps, basin mixers and kitchen taps for retail, wholesale and OEM channels worldwide.",
      image: productImages.brassTaps,
      tags: ["Standard & Mixer Taps", "OEM / Private Label Ready", "Heavy-Duty Brass Body"],
    specs: ["Lead-Free Brass Body", "1/2\" \u2013 1\" Connections", "Single / Mixer / Kitchen", "Chrome / Brushed / Matte", "Ceramic Disc Cartridge"],
    applications: ["Residential Bathrooms", "Kitchen Sinks", "Commercial Washrooms", "Hotels & Hospitality", "OEM Projects"],
    certifications: ["NSF / ANSI 61 (US)", "EN 817 (Europe)", "ISO 9001:2015", "WaterMark (Australia)"]  },
  ],
  buyersTitle: "Built for Global B2B Buyers",
  buyersText:
    "We support distributors, importers, hardware chains, contractors and project teams worldwide that need reliable plumbing materials at wholesale scale.",
  buyers: ["Distributors", "Wholesalers", "Importers", "Contractors", "Project Buyers", "OEM / Private Label"],
  marketsTitle: "Serving Buyers Across 6 Continents",
  marketsText:
    "Focused support for North America, Europe, Middle East, Africa, Asia Pacific and South America. Products certified to meet local standards in every region.",
  marketChips: ["North America", "Europe", "Middle East", "Africa", "Asia Pacific", "South America"],
  marketSupport: [
    ["Regional Certification Support", "CE for Europe, WRAS for UK, NSF for US, SASO for Middle East, SON for Nigeria — we match your market's requirements."],
    ["Mixed-Category Orders", "Combine pipes, fittings, valves, faucets and accessories in a single container. We optimize the mix for your demand."],
    ["Export-Ready Coordination", "Full documentation, customs clearance, reinforced packaging for international B2B importers."],
  ],
  casesTitle: "Global Project Supply & Cooperation Records",
  casesText:
    "Real-world supply visuals help international buyers evaluate packing, order handling and product quality before starting a wholesale partnership.",
  cases: [
    "Containerized distributor stock",
    "Mixed-category wholesale orders",
    "Large-scale project procurement",
    "OEM private label production",
    "Retail-ready export packaging",
    "Cross-border logistics execution",
    "On-site supply verification",
  ],
  factoryTitle: "More Factory Views for Supplier Evaluation",
  factoryText:
    "For international B2B buyers, factory visibility matters. Review our gate, production line, workshop and material handling visuals before requesting a quote.",
  whyTitle: "Why Global Importers Choose IFAN Group",
  why: [
    {
      icon: Factory,
      title: "Direct Factory Supply",
      text: "We own the production line — pipes, fittings, brass foundry in one integrated campus. No middlemen, no markups.",
    },
    {
      icon: PackageCheck,
      title: "Export Packaging & Customs Docs",
      text: "Professional palletizing, reinforced cartons, full documentation including CO, BL, packing list and certificate of origin.",
    },
    {
      icon: Award,
      title: "Global Certifications",
      text: "ISO 9001, CE, WRAS, NSF, SGS, BV. Products certified to the standards your market requires.",
    },
    {
      icon: Globe2,
      title: "Multi-Language Support",
      text: "English, Spanish, French, Arabic, Portuguese, Russian — your dedicated export manager speaks your language.",
    },
  ],
  processTitle: "A Simple Global Sourcing Process",
  process: [
    ["Send Requirements", "Share product categories, sizes, quantities and destination country. Excel or PDF lists preferred."],
    ["Get Quotation", "We respond within 24 hours with pricing, MOQ, lead time and shipment planning information."],
    ["Samples & Certification", "Product samples, technical datasheets and certification documents provided for your approval."],
    ["Production & Shipment", "Manufacturing, QC inspection, documentation and on-time delivery — fully managed from factory to port."],
  ],
  form: {
    title: "Request Your Global Sourcing Quotation",
    text: "Tell us what you need and where you ship to. We respond within 24 hours with a detailed quotation and logistics plan.",
    name: "Name",
    country: "Country",
    company: "Company",
    contact: "Email / Phone / WhatsApp",
    contactMethod: "Preferred Contact Method",
    methodOptions: ["Email", "Phone Call", "WhatsApp"],
    products: "Products Needed",
    quantity: "Estimated Quantity",
    submit: "Send Inquiry",
    email: "Email Sales Team",
    noWhatsapp: "No WhatsApp required — email or phone is fine.",
    sending: "Sending Inquiry...",
    sent: "Inquiry sent. Our export team will respond within 24 hours.",
    error: "The form could not send. Please use the email button as backup.",
    defaults: {
      products: "HDPE / PPR / Brass Fittings / Valves",
      country: "United States",
    },
  },
  faqTitle: "Common Questions From Global Importers",
  faqs: globalPlumbingFaqs,
  finalCta: {
    title: "Ready to Build a Reliable Global Supply Chain?",
    text: "Send your product list and destination country. Our export team will prepare a competitive quotation with full specifications.",
    button: "Start Sourcing",
  },
};

// ─── Sub Components ──────────────────────────────────────────────────

function QuoteForm({ selectedProduct }: { selectedProduct: string }) {
  const c = copy;
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [products, setProducts] = useState(selectedProduct || c.form.defaults.products);
  
  // Interactive Options instead of free text
  const [businessType, setBusinessType] = useState("Distributor");

  const businessTypes = ["Distributor", "Wholesaler", "Contractor", "OEM Buyer"];

  useEffect(() => {
    if (selectedProduct) setProducts(selectedProduct);
  }, [selectedProduct]);

  const quoteMsg = useMemo(
    () => `Hi IFAN Group,

I am interested in: ${products}
Business Type: ${businessType}
Destination: ${country}

Please send me a quotation.`,
    [products, businessType, country],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      if (typeof gtag !== "undefined") {
        gtag("event", "conversion", {
          send_to: googleAdsConversion.send_to,
          value: googleAdsConversion.value,
          currency: googleAdsConversion.currency,
        });
      }
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, country, contact, products, businessType,
          market: "global", language: "en",
          _subject: `Global Inquiry - ${country} - ${name} (${businessType})`,
        }),
      });
      setFormState(res.ok ? "sent" : "error");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <CheckCircle2 className="h-14 w-14 text-green-500" />
        </motion.div>
        <p className="mt-5 text-lg font-bold text-slate-950">{c.form.sent}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name and Country */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.form.name} *</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
            className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Your Name" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.form.country} (Optional)</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}
            className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder={c.form.defaults.country} />
        </div>
      </div>

      {/* Contact Method */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.form.contact} *</label>
        <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          placeholder="Email, WhatsApp, or Phone Number" />
      </div>

      {/* Business Type (Interactive Single-Select Pills) */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">I am a *</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {businessTypes.map((type) => (
            <button key={type} type="button" onClick={() => setBusinessType(type)}
              className={`rounded-md border px-3.5 py-2 text-xs font-bold transition ${
                businessType === type
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Products Needed */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">{c.form.products}</label>
        <textarea required value={products} onChange={(e) => setProducts(e.target.value)} rows={2}
          className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          placeholder={c.form.defaults.products} />
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={formState === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-brand-700 disabled:opacity-60 shadow-lg shadow-brand-600/10">
        <Send className="h-4 w-4" />
        {formState === "sending" ? c.form.sending : c.form.submit}
      </button>

      <div className="text-center">
        <a href={`mailto:${email}?subject=${encodeURIComponent(`Global Inquiry - ${name}`)}&body=${encodeURIComponent(quoteMsg)}`}
          className="text-sm font-bold text-brand-700 underline-offset-2 hover:underline">
          {c.form.email}
        </a>
      </div>
    </form>
  );
}

function SectionInquiryButton({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <motion.a href="#quote" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${
        dark ? "bg-brand-500 text-white hover:bg-brand-400" : "bg-brand-600 text-white hover:bg-brand-700"
      }`}>
      <Send className="h-4 w-4" />
      {label}
    </motion.a>
  );
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const num = parseInt(value.replace(/\D/g, ""), 10);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const duration = 1400;
        const step = Math.max(1, Math.ceil(num / 50));
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setDisplay(value); clearInterval(timer); }
          else setDisplay(start.toString());
        }, duration / 50);
        observer.disconnect();
        return () => clearInterval(timer);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="border-slate-200 py-6 sm:border-l sm:pl-8 first:border-l-0 first:pl-0">
      <p className="text-3xl font-black text-brand-700">{display}</p>
      <p className="mt-2 text-sm font-semibold text-slate-600">{label}</p>
    </motion.div>
  );
}


// ─── Product Detail Modal ──────────────────────────────────────

function ProductDetailModal({ product, onClose, onInquiry }: {
  product: typeof copy.products[0] | null;
  onClose: () => void;
  onInquiry: (title: string) => void;
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:flex-row">
        
        {/* Close button */}
        <button onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md transition hover:bg-white hover:text-slate-950">
          <X className="h-5 w-5" />
        </button>

        {/* Image side */}
        <div className="relative aspect-[4/3] shrink-0 md:w-[45%] md:aspect-auto md:min-h-full">
          <Image src={product.image} alt={product.title} fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-black/30 md:to-transparent" />
        </div>

        {/* Content side */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-950 md:text-3xl">{product.title}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{product.text}</p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
                {tag}
              </span>
            ))}
          </div>

          {/* Specifications */}
          {'specs' in product && product.specs && (
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-500">
                <Ruler className="h-4 w-4" /> Specifications
              </h3>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Applications */}
          {'applications' in product && product.applications && (
            <div className="mt-5">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-500">
                <Globe2 className="h-4 w-4" /> Applications
              </h3>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {product.applications.map((app) => (
                  <li key={app} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {'certifications' in product && product.certifications && (
            <div className="mt-5">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-500">
                <ShieldCheck className="h-4 w-4" /> Certifications
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span key={cert} className="rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry buttons */}
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <button onClick={() => onInquiry(product.title)}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-brand-700">
              <Send className="h-4 w-4" />
              Request Wholesale Pricing
            </button>
            <a href={"https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent("Hi IFAN Group, I am interested in: " + product.title + ". Please send me a quotation.")}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-green-600 bg-green-50 px-5 py-3 text-sm font-bold uppercase tracking-wide text-green-700 transition hover:bg-green-100">
              <MessageCircle className="h-4 w-4" />
              Send Inquiry via WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export default function GlobalPlumbingLanding() {
  const c = copy;
  const [selectedProduct, setSelectedProduct] = useState("");
  const [modalProduct, setModalProduct] = useState<typeof copy.products[0] | null>(null);
  const quoteMsg = useMemo(
    () => `Hi IFAN Group, I am interested in your global plumbing supply program. Please send me a wholesale quotation.`,
    [],
  );

  const reportConversion = useCallback(() => {
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        send_to: googleAdsConversion.send_to,
        value: googleAdsConversion.value,
        currency: googleAdsConversion.currency,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      {/* ─── Navigation ─── */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="relative h-10 w-36" aria-label="IFAN Group">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="144px" className="object-contain object-left" />
          </Link>
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.18em] text-white/75 lg:flex">
            <a href="#products" className="transition hover:text-white">{c.nav.products}</a>
            <a href="#markets" className="transition hover:text-white">{c.nav.markets}</a>
            <a href="#cases" className="transition hover:text-white">{c.nav.cases}</a>
            <a href="#factory" className="transition hover:text-white">{c.nav.factory}</a>
            <a href="#quote" className="transition hover:text-white">{c.nav.quote}</a>
          </nav>
          <div className="flex items-center gap-3">
            <motion.a href="#quote" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-brand-500 px-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-400">
              <Send className="h-4 w-4" />
              {c.nav.quote}
            </motion.a>
          </div>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative min-h-[760px] overflow-hidden bg-slate-950 pt-24 text-white">
          <Image src={productImages.hero} alt="IFAN plumbing products for global wholesale buyers" fill sizes="100vw"
            className="object-cover object-[50%_52%] opacity-95" priority />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96),rgba(2,6,23,0.76),rgba(2,6,23,0.18))]" />
          <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-5 py-20 lg:px-8">
            <div className="max-w-4xl">
              <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-100">
                <Globe2 className="h-4 w-4" />
                {c.hero.eyebrow}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="max-w-5xl text-5xl font-black leading-[1.02] tracking-normal text-white md:text-7xl">
                {c.hero.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-7 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
                {c.hero.subtitle}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row">
                <motion.a href="#quote" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md bg-brand-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400">
                  {c.hero.quote}<ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a href="#quote" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                  <ClipboardList className="h-4 w-4" />{c.hero.priceList}
                </motion.a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {c.hero.proof.map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex min-h-14 items-center gap-3 border-l border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-300" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {c.stats.map(([value, label]) => (
                <AnimatedStat key={value} value={value} label={label} />
              ))}
            </div>
            <SectionInquiryButton label={c.nav.quote} />
          </div>
        </section>

        {/* ─── Products ─── */}
        <section id="products" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Product range</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.productsTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{c.productsSubtitle}</p>
              </div>
              <SectionInquiryButton label={c.nav.quote} />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={stagger} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {c.products.map((product) => (
                <motion.article key={product.title} variants={cardUp}
                  onClick={() => setModalProduct(product)}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-slate-100">
                    <Image src={product.image} alt={product.title} fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105" />
                    {/* View details overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition-all duration-300 group-hover:bg-slate-950/40 group-hover:opacity-100">
                      <span className="rounded-md bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-950 shadow-lg">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-black text-slate-950">{product.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{product.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-5">
                      <button onClick={(e) => { e.stopPropagation(); setModalProduct(product); }}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-brand-700">
                        <Send className="h-4 w-4" />View Details &amp; Pricing
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-10 flex justify-center">
              <SectionInquiryButton label={c.nav.quote} />
            </motion.div>
          </div>
        </section>

        {/* ─── Buyers / Markets ─── */}
        <section id="markets" className="border-y border-slate-200 bg-slate-50 py-24 text-slate-950">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Global buyers</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">{c.buyersTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{c.buyersText}</p>
              <div className="mt-8">
                <SectionInquiryButton label={c.nav.quote} />
              </div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {c.buyers.map((buyer) => (
                  <motion.div key={buyer} variants={cardUp}
                    className="flex min-h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 shadow-sm">
                    <Building2 className="h-4 w-4 text-brand-700" />
                    {buyer}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
              className="grid content-start gap-6">
              <div className="rounded-md border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand-700" />
                  <div>
                    <h3 className="text-2xl font-black">{c.marketsTitle}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{c.marketsText}</p>
                  </div>
                </div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                  className="mt-7 flex flex-wrap gap-3">
                  {c.marketChips.map((m) => (
                    <motion.span key={m} variants={cardUp}
                      className="rounded-full border border-brand-600/20 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-800">
                      {m}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="grid gap-4 sm:grid-cols-3">
                {c.marketSupport.map(([title, text], index) => {
                  const Icon = [Globe2, PackageCheck, Truck][index] ?? Globe2;
                  return (
                    <motion.div key={title} variants={cardUp}
                      className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                      <Icon className="h-6 w-6 text-brand-700" />
                      <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Cases ─── */}
        <section id="cases" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
              className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Global deliveries</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.casesTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{c.casesText}</p>
              </div>
              <SectionInquiryButton label={c.nav.quote} />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              variants={stagger} className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {projectImages.map((src, index) => (
                <motion.article key={src} variants={cardUp}
                  className={`group overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}>
                  <div className={`relative overflow-hidden bg-slate-100 ${index === 0 ? "aspect-[4/3] h-full min-h-[360px]" : "aspect-[4/3]"}`}>
                    <Image src={src} alt={`${c.cases[index]} - IFAN global supply`} fill
                      sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-4">
                      <p className="text-sm font-black uppercase tracking-wide text-white">{c.cases[index]}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-10 flex justify-center">
              <SectionInquiryButton label={c.nav.quote} />
            </motion.div>
          </div>
        </section>

        {/* ─── Factory ─── */}
        <section id="factory" className="bg-slate-950 py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-300">Factory capability</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">{c.factoryTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">{c.factoryText}</p>
                <div className="mt-8 space-y-4">
                  {c.why.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.4 }}
                        className="flex gap-3">
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
                        <div>
                          <h3 className="font-black text-white">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-400">{item.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-8">
                  <SectionInquiryButton label={c.nav.quote} dark />
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {factoryImages.map((src, index) => (
                  <motion.div key={src} variants={cardUp}
                    className={`relative overflow-hidden rounded-md bg-slate-800 ${
                      index === 0 ? "aspect-[16/10] sm:col-span-2 lg:col-span-2" : "aspect-[4/3]"
                    }`}>
                    <Image src={src} alt={`IFAN factory view ${index + 1}`} fill
                      sizes={index === 0 ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
                      className="object-cover" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Process ─── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">How it works</p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.processTitle}</h2>
                <div className="mt-8">
                  <SectionInquiryButton label={c.nav.quote} />
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                variants={stagger} className="grid gap-4 md:grid-cols-2">
                {c.process.map(([title, text], index) => (
                  <motion.div key={title} variants={cardUp}
                    className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Quote Form ─── */}
        <section id="quote" className="bg-slate-100 py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">Get started</p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.form.title}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{c.form.text}</p>
              <div className="mt-8 space-y-4">
                <p className="flex items-center gap-3 text-base font-bold text-slate-800">
                  <PhoneCall className="h-5 w-5 text-brand-700" />+86 1736 9685 997
                </p>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-base font-bold text-slate-800 transition hover:text-brand-700">
                  <Mail className="h-5 w-5 text-brand-700" />{email}
                </a>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMsg)}`} target="_blank"
                  rel="noopener noreferrer" onClick={reportConversion}
                  className="flex items-center gap-3 text-base font-bold text-slate-800 transition hover:text-brand-700">
                  <MessageCircle className="h-5 w-5 text-brand-700" />WhatsApp: +86 1736 9685 997
                </a>
                <p className="flex items-center gap-3 text-base font-bold text-slate-800">
                  <Truck className="h-5 w-5 text-brand-700" />We export to 120+ countries worldwide
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <QuoteForm selectedProduct={selectedProduct} />
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}>
                <h2 className="text-4xl font-black tracking-normal text-slate-950 md:text-5xl">{c.faqTitle}</h2>
                <div className="mt-8">
                  <SectionInquiryButton label={c.nav.quote} />
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                variants={stagger} className="grid gap-4">
                {c.faqs.map(([question, answer]) => (
                  <motion.div key={question} variants={cardUp}
                    className="rounded-md border border-slate-200 p-6">
                    <h3 className="flex items-start gap-3 text-lg font-black text-slate-950">
                      <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                      {question}
                    </h3>
                    <p className="mt-3 pl-8 text-sm leading-7 text-slate-600">{answer}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
          <Image src="/latin-america-plumbing/project-supply-1.jpg" alt="IFAN global supply case" fill sizes="100vw"
            className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="max-w-3xl">
              <h2 className="text-4xl font-black tracking-normal md:text-5xl">{c.finalCta.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">{c.finalCta.text}</p>
            </motion.div>
            <motion.a href="#quote" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-md bg-brand-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400">
              <Send className="h-4 w-4" />{c.finalCta.button}
            </motion.a>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-950 px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="relative h-9 w-32">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="128px" className="object-contain object-left" />
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-300">
            <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
              onClick={reportConversion} className="hover:text-white">WhatsApp: +86 1736 9685 997</a>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* ─── Mobile CTA ─── */}
      <motion.a href="#quote" initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 z-[70] inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-2xl shadow-brand-900/25 transition hover:bg-brand-700 md:hidden">
        <Send className="h-5 w-5" />{c.form.submit}
      </motion.a>

      {/* ─── WhatsApp Float ─── */}
      <motion.a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMsg)}`}
        target="_blank" rel="noopener noreferrer" aria-label="WhatsApp: +86 1736 9685 997"
        onClick={reportConversion}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
        className="group fixed bottom-24 right-4 z-[75] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 md:bottom-6 md:right-6 md:h-13 md:w-13">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-slate-950 px-3 py-2 text-xs font-black uppercase tracking-wide text-white opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          WhatsApp
        </span>
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6 relative z-10" />
      </motion.a>

      {/* ─── Product Detail Modal ─── */}
      <AnimatePresence>
      {modalProduct && (
        <ProductDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onInquiry={(title) => {
            setSelectedProduct(title);
            setModalProduct(null);
            // Scroll to quote form after a brief delay
            setTimeout(() => {
              document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
        />
      )}
      </AnimatePresence>
    </div>
  );
}
