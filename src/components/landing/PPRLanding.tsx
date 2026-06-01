"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Factory,
  Globe2,
  Mail,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldCheck,
  TrendingDown,
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
const googleAdsWhatsAppConversion = {
  send_to: "AW-18159357442/hKhxCMLyyrQcEIKch9ND",
  value: 1.0,
  currency: "CNY",
};

const heroBg = "/images/ppr-landing/横幅海报7.jpeg";

const pipeImages = [
  { src: "/images/ppr-landing/ppr 管产品图2.webp", alt: "PPR pipes DN20-DN160 green color for plumbing systems" },
  { src: "/images/ppr-landing/ppr 管产品图5.webp", alt: "PPR pipes white color factory direct wholesale" },
  { src: "/images/ppr-landing/ppr 管产品图6.webp", alt: "PPR pipes bundle for B2B export wholesale" },
  { src: "/images/ppr-landing/ppr 管产品图7.webp", alt: "PPR pipes DN20-DN160 various sizes factory stock" },
  { src: "/images/ppr-landing/ppr 管产品图8.webp", alt: "PPR pipes close-up showing material quality" },
];

const seriesImages = [
  { src: "/images/ppr-landing/ppr 管产品组合图1.webp", alt: "PPR fittings and pipe complete system" },
  { src: "/images/ppr-landing/ppr 管产品组合图2.webp", alt: "PPR plumbing system components and accessories" },
  { src: "/images/ppr-landing/ppr 管产品组合图3.webp", alt: "PPR pipe and fitting combination for water supply" },
];

const carouselImages = [
  { src: "/images/ppr-landing/横幅海报2.jpeg", alt: "PPR plumbing products showcase for B2B wholesale export" },
  { src: "/images/ppr-landing/横幅海报6.webp", alt: "PPR pipe and fitting factory direct from China" },
  { src: "/images/mexico-landing/products/管子包装.jpg", alt: "Plumbing pipes packaging for Mexico export" },
  { src: "/images/mexico-landing/products/管件包装.jpg", alt: "Plumbing fittings packaging for wholesale export" },
  { src: "/images/ppr-landing/横幅海报4.jpeg", alt: "IFAN factory exterior and logistics center" },
  { src: "/images/ppr-landing/横幅海报5.jpeg", alt: "IFAN warehouse and inventory management" },
];

const factoryImages = [
  { src: "/images/ppr-landing/工厂效果图1.webp", alt: "IFAN PPR pipe manufacturing factory workshop" },
  { src: "/images/ppr-landing/工厂效果图2.webp", alt: "IFAN automated extrusion production line" },
];

const mexicoFactoryImages = [
  { src: "/images/mexico-landing/factory/厂区大门.jpg", alt: "IFAN factory entrance and main gate" },
  { src: "/images/mexico-landing/factory/生产线.jpg", alt: "IFAN automated production line manufacturing" },
  { src: "/images/mexico-landing/factory/08947223d686d957a5a79367ee69a6d0.jpg", alt: "IFAN factory workshop and equipment" },
  { src: "/images/mexico-landing/factory/157a23182b6cdb27826c9029db1aac22.jpg", alt: "IFAN production facility and quality control" },
  { src: "/images/mexico-landing/factory/e1d737752eafb0df8875016822c01e2a.jpg", alt: "IFAN manufacturing plant and storage" },
];

const caseImages = [
  { src: "/images/mexico-landing/cases/03c9f37b1c5aef4c3519269cdc9c9555.jpg", alt: "IFAN Mexico market project case study - plumbing installation" },
  { src: "/images/mexico-landing/cases/07f917d1ff4712130d304aa741c869ae.jpg", alt: "IFAN Mexico export project reference - building plumbing" },
  { src: "/images/mexico-landing/cases/61c2f8105f3adce99ce6516451add850.jpg", alt: "IFAN Mexico wholesale client case - pipe supply" },
  { src: "/images/mexico-landing/cases/6430229fd9208b1770328d99fbb0b854.jpg", alt: "IFAN Mexico market cooperation case - water system" },
  { src: "/images/mexico-landing/cases/7e10c2bfd679c4525ca5012eb72b3fa6.jpg", alt: "IFAN Mexico B2B client project - plumbing products" },
  { src: "/images/mexico-landing/cases/c45139cfc798101975d9dd121bc18ded.jpg", alt: "IFAN Mexico export success case - factory direct" },
  { src: "/images/mexico-landing/cases/f9bbf6735109b583d53faf1f0eda3dd0.jpg", alt: "IFAN Mexico market reference - wholesale supply" },
];

const certImages = [
  "/images/ppr-landing/证书1.webp",
  "/images/ppr-landing/证书2.webp",
  "/images/ppr-landing/证书3.webp",
  "/images/ppr-landing/证书4.webp",
];

const landingCopy = {
  nav: {
    products: "Products",
    factory: "Factory",
    cases: "Cases",
    certs: "Certifications",
    quote: "Get Quote",
  },
  hero: {
    badge: "B2B PPR Manufacturer — Factory Direct from China",
    title: "China's Lowest Price PPR Pipe & Fittings Manufacturer",
    subtitle:
      "DIN 8077/8078 certified · 100% virgin PP-R · DN20–DN160 · PN12.5–PN25 · Factory-direct, no middlemen, strictly B2B wholesale.",
    cta1: "Get Lowest China Price",
    cta2: "Free PPR Price List",
    whatsapp: "WhatsApp",
    proofs: [
      "Lowest PPR pricing in China — guaranteed",
      "100% virgin PP-R raw material",
      "Full DIN 8077/8078 compliance",
      "B2B only — MOQ 1 container",
    ],
  },
  stats: [
    { value: "1993", label: "Manufacturing since" },
    { value: "120,000m²", label: "Smart factory" },
    { value: "3,000+", label: "PPR SKUs" },
    { value: "120+", label: "Export countries" },
  ],
  products: {
    title: "PPR & Plumbing Product Lines",
    subtitle: "All products below are B2B wholesale only — no retail, no consumer sales. Click any image to enlarge.",
    pipes: {
      title: "PPR Pipes",
      label: "DN20–DN160 · PN12.5–PN25 · Green/White/Custom · 100% virgin PP-R",
    },
    series: {
      title: "PPR Fittings & Systems",
      label: "Complete PPR plumbing systems: fittings, composite pipes, floor heating components",
    },
  },
  why: {
    badge: "Why B2B Buyers Choose IFAN",
    title: "Factory-direct pricing with no channel conflict",
    subtitle: "We are a 120,000m² manufacturer serving 120+ countries. Strictly B2B — no retail, no Amazon, no channel competition.",
    items: [
      {
        icon: TrendingDown,
        title: "China's Lowest PPR Pricing",
        text: "Manufacturer-direct, no trading company markup. Container-level pricing beats any broker quote.",
      },
      {
        icon: ShieldCheck,
        title: "100% Virgin Raw Material",
        text: "PP-R 100 grade only. Batch certificates and third-party lab reports available for every shipment.",
      },
      {
        icon: Factory,
        title: "120,000m² Smart Factory",
        text: "Automated extrusion lines, injection molding workshop, ISO-certified in-house testing lab. Factory audits welcome.",
      },
      {
        icon: Globe2,
        title: "B2B-Only Supply Chain",
        text: "No retail, no marketplace selling, no end-consumer sales. Your territory and margins stay protected.",
      },
    ],
  },
  cases: {
    badge: "Proven Track Record",
    title: "Mexico Market Cooperation Cases",
    subtitle: "Real projects, real clients. IFAN plumbing products trusted across Latin America.",
  },
  cert: {
    badge: "Quality Certified",
    title: "International Certifications",
    subtitle: "DIN 8077/8078 · ISO 15874 · CE · SGS tested. Regional certs (SASO, SONCAP, etc.) arranged per destination.",
  },
  process: {
    badge: "4-Step Sourcing",
    title: "How to source PPR from IFAN",
    steps: [
      { title: "Send Requirements", text: "Share pipe sizes, fittings, quantities and destination." },
      { title: "Get Catalog & Quote", text: "Tailored PPR catalog with China's lowest factory pricing." },
      { title: "Confirm Samples", text: "Review physical samples and test reports before order." },
      { title: "Production & Ship", text: "QC inspection, container loading, full export documentation." },
    ],
  },
  form: {
    title: "Request China's Lowest PPR Price List",
    subtitle: "Tell us your PPR needs — Excel/PDF import lists preferred.",
    name: "Name *",
    country: "Country",
    company: "Company",
    contact: "Email / Phone / WhatsApp *",
    contactMethod: "Preferred contact",
    methodOptions: ["Email", "Phone call", "WhatsApp"],
    products: "PPR products needed",
    quantity: "Estimated quantity",
    submit: "Send PPR Inquiry",
    emailBtn: "Email Sales Team",
    noWhatsapp: "No WhatsApp required — email or phone is fine.",
    sending: "Sending...",
    sent: "Sent! Our PPR team replies within 24 hours.",
    error: "Send failed. Please use the email button.",
  },
  faq: {
    title: "PPR Sourcing FAQ",
    items: [
      {
        q: "Is IFAN PPR pricing really the lowest in China?",
        a: "Yes — we are the manufacturer. No trading company layers, no broker fees. Compare our quote against any China PPR supplier.",
      },
      {
        q: "How do you guarantee 100% virgin PP-R material?",
        a: "We use only PP-R 100 grade raw material. Every batch includes a material certificate — third-party lab reports available on request.",
      },
      {
        q: "What is the MOQ for PPR products?",
        a: "Standard: 3,000–5,000m pipes (mix sizes), 5,000pcs fittings (mix types). OEM/private label MOQ negotiable.",
      },
      {
        q: "What certifications do your PPR products have?",
        a: "DIN 8077/8078, ISO 15874, CE, SGS. Regional certs (SASO, SONCAP) arranged per destination country requirements.",
      },
    ],
  },
  finalCta: {
    title: "Ready to get China's lowest PPR factory pricing?",
    subtitle: "Send your product list — we reply with a tailored quotation within 24 hours.",
    button: "Get PPR Price List Now",
  },
  footer: {
    privacy: "Privacy Policy",
  },
};

function reportInquiryConversion() {
  const w = window as Window & { gtag?: (cmd: string, action: string, params: Record<string, string | number>) => void };
  w.gtag?.("event", "conversion", googleAdsConversion);
}

function reportWhatsAppConversion() {
  const w = window as Window & { gtag?: (cmd: string, action: string, params: Record<string, string | number>) => void };
  w.gtag?.("event", "conversion", googleAdsWhatsAppConversion);
}

function CtaButton({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <a
      href="#quote"
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

function QuoteForm({ selectedProduct }: { selectedProduct: string }) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    company: "",
    contact: "",
    contactMethod: landingCopy.form.methodOptions[0],
    products: "",
    quantity: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const message = useMemo(() => {
    const intro = "Hello IFAN, I need a PPR products price list at China's lowest factory pricing.";
    return [
      intro,
      `Name: ${form.name || "-"}`,
      `Country: ${form.country || "-"}`,
      `Company: ${form.company || "-"}`,
      `Contact: ${form.contact || "-"}`,
      `Preferred contact: ${form.contactMethod || "-"}`,
      `Products: ${form.products || "-"}`,
      `Quantity: ${form.quantity || "-"}`,
    ].join("\n");
  }, [form]);

  const emailSubject = "PPR products inquiry — lowest China factory pricing";
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!selectedProduct) return;
    setForm((c) => ({ ...c, products: selectedProduct }));
  }, [selectedProduct]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((c) => ({ ...c, [field]: value }));
  }

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("sending");
    const payload = new FormData(e.currentTarget);
    payload.set("Message", message);
    try {
      const res = await fetch(formspreeEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: payload });
      if (!res.ok) throw new Error("failed");
      setSubmitState("sent");
      reportInquiryConversion();
    } catch {
      setSubmitState("error");
    }
  }

  const inputCls = "w-full rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

  return (
    <form action={formspreeEndpoint} method="POST" onSubmit={submit} className="grid gap-3">
      <input type="hidden" name="_subject" value={emailSubject} />
      <input type="hidden" name="Message" value={message} />
      <input type="hidden" name="Landing page" value="PPR supplier" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="Name" className={inputCls} placeholder={landingCopy.form.name} value={form.name} onChange={(e) => updateField("name", e.target.value)} />
        <input name="Country" className={inputCls} placeholder={landingCopy.form.country} value={form.country} onChange={(e) => updateField("country", e.target.value)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="Company" className={inputCls} placeholder={landingCopy.form.company} value={form.company} onChange={(e) => updateField("company", e.target.value)} />
        <input required name="Email / phone / WhatsApp" className={inputCls} placeholder={landingCopy.form.contact} value={form.contact} onChange={(e) => updateField("contact", e.target.value)} />
      </div>
      <select name="Preferred contact method" className={inputCls} value={form.contactMethod} onChange={(e) => updateField("contactMethod", e.target.value)}>
        {landingCopy.form.methodOptions.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <textarea name="Products needed" className={`${inputCls} min-h-20 resize-y`} placeholder={landingCopy.form.products} value={form.products} onChange={(e) => updateField("products", e.target.value)} />
      <input name="Estimated quantity" className={inputCls} placeholder={landingCopy.form.quantity} value={form.quantity} onChange={(e) => updateField("quantity", e.target.value)} />
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
        {landingCopy.form.noWhatsapp}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="submit" disabled={submitState === "sending"} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-700">
          <Send className="h-4 w-4" />
          {landingCopy.form.submit}
        </button>
        <a href={mailtoHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-slate-800 transition hover:border-brand-600 hover:text-brand-700">
          <Mail className="h-4 w-4" />
          {landingCopy.form.emailBtn}
        </a>
      </div>
      {submitState !== "idle" && (
        <p role="status" className={`text-sm font-semibold ${submitState === "error" ? "text-red-600" : "text-slate-600"}`}>
          {submitState === "sending" && landingCopy.form.sending}
          {submitState === "sent" && landingCopy.form.sent}
          {submitState === "error" && landingCopy.form.error}
        </p>
      )}
    </form>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onQuote,
}: {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onQuote: () => void;
}) {
  const current = images[currentIndex];
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-80 flex flex-col bg-slate-950/95 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Image preview">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <span className="text-xs font-bold uppercase tracking-wide text-white/60">
          {currentIndex + 1} / {images.length}
        </span>
        <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close preview">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4">
        {images.length > 1 && (
          <button onClick={onPrev} className="mr-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:mr-4" aria-label="Previous image">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <figure className="relative h-[65vh] w-full max-w-4xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain"
            priority
          />
          <figcaption className="sr-only">{current.alt}</figcaption>
        </figure>

        {images.length > 1 && (
          <button onClick={onNext} className="ml-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:ml-4" aria-label="Next image">
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 px-4 py-4">
        <button
          onClick={onQuote}
          className="inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400"
        >
          <Send className="h-4 w-4" />
          Get Quote for This Product
        </button>
        <button onClick={onClose} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/20">
          Back to Gallery
        </button>
      </div>
    </div>
  );
}

function Carousel({ images, interval = 4000 }: { images: { src: string; alt: string }[]; interval?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-sm">
      <div className="relative aspect-[16/7] md:aspect-[21/7]">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover" priority={i === 0} />
            <figcaption className="sr-only">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-5 bg-white" : "w-2 bg-white/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductGrid({
  title,
  label,
  images,
  onImageClick,
}: {
  title: string;
  label: string;
  images: { src: string; alt: string }[];
  onImageClick: (index: number) => void;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-black tracking-normal text-slate-900">{title}</h3>
      <p className="mt-1.5 mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            onClick={() => onImageClick(i)}
          >
            <div className="relative aspect-square bg-slate-100">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                className="object-contain p-2 transition duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="sr-only">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PPRLanding() {
  const [lightboxGroup, setLightboxGroup] = useState<{ src: string; alt: string }[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const ctaLabel = landingCopy.hero.cta1;
  const quoteMessage = "Hello IFAN, please send me a PPR products price list with China's lowest factory pricing.";

  function openLightbox(images: { src: string; alt: string }[], index: number) {
    setLightboxGroup(images);
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxGroup(null);
  }

  function lightboxPrev() {
    if (!lightboxGroup) return;
    setLightboxIndex((i) => (i === 0 ? lightboxGroup.length - 1 : i - 1));
  }

  function lightboxNext() {
    if (!lightboxGroup) return;
    setLightboxIndex((i) => (i === lightboxGroup.length - 1 ? 0 : i + 1));
  }

  function handleLightboxQuote() {
    if (!lightboxGroup) return;
    const current = lightboxGroup[lightboxIndex];
    setSelectedProduct(current.alt);
    closeLightbox();
    setTimeout(() => {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="relative h-9 w-32" aria-label="IFAN Group">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="128px" className="object-contain object-left" priority />
          </Link>
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.16em] text-white/70 lg:flex">
            <a href="#products" className="transition hover:text-white">{landingCopy.nav.products}</a>
            <a href="#factory" className="transition hover:text-white">{landingCopy.nav.factory}</a>
            <a href="#cases" className="transition hover:text-white">{landingCopy.nav.cases}</a>
            <a href="#certs" className="transition hover:text-white">{landingCopy.nav.certs}</a>
            <a href="#quote" className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-brand-500 px-4 text-white transition hover:bg-brand-400">
              <Send className="h-3.5 w-3.5" />
              {landingCopy.nav.quote}
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ===== A – ATTENTION: Hero ===== */}
        <section className="relative flex min-h-[600px] items-center overflow-hidden bg-slate-950 pt-16 text-white md:min-h-[680px]">
          <Image src={heroBg} alt="PPR pipes and fittings factory wholesale" fill priority sizes="100vw" className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96),rgba(2,6,23,0.78),rgba(2,6,23,0.2))]" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-200">
              <Globe2 className="h-3.5 w-3.5" />
              {landingCopy.hero.badge}
            </span>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.06] tracking-normal md:text-6xl lg:text-7xl">
              {landingCopy.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
              {landingCopy.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400">
                {landingCopy.hero.cta1}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#quote" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-slate-950">
                <ClipboardList className="h-4 w-4" />
                {landingCopy.hero.cta2}
              </a>
            </div>
            <div className="mt-8 grid max-w-3xl gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {landingCopy.hero.proofs.map((p) => (
                <div key={p} className="flex items-center gap-2.5 border-l border-white/20 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white/85">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-300" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-5 py-6 lg:flex-nowrap lg:gap-8 lg:px-8">
            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
              {landingCopy.stats.map((s) => (
                <div key={s.value} className="border-l border-slate-200 pl-5 first:border-l-0 first:pl-0">
                  <p className="text-2xl font-black text-brand-700 md:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
            <CtaButton label={ctaLabel} />
          </div>
        </section>

        {/* ===== I – INTEREST: All Products (direct display, no tabs) ===== */}
        <section id="products" className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-normal md:text-4xl">{landingCopy.products.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{landingCopy.products.subtitle}</p>
              </div>
              <CtaButton label={ctaLabel} />
            </div>

            <div className="mt-8">
              <ProductGrid
                title={landingCopy.products.pipes.title}
                label={landingCopy.products.pipes.label}
                images={pipeImages}
                onImageClick={(i) => openLightbox(pipeImages, i)}
              />
              <ProductGrid
                title={landingCopy.products.series.title}
                label={landingCopy.products.series.label}
                images={seriesImages}
                onImageClick={(i) => openLightbox(seriesImages, i)}
              />

            </div>
          </div>
        </section>

        {/* ===== D – DESIRE: Why IFAN + Factory ===== */}
        <section id="factory" className="border-t border-slate-200 bg-slate-950 py-16 text-white md:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-300">{landingCopy.why.badge}</span>
                <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.why.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300">{landingCopy.why.subtitle}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {landingCopy.why.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
                        <Icon className="h-5 w-5 text-brand-400" />
                        <h3 className="mt-3 text-sm font-black">{item.title}</h3>
                        <p className="mt-1.5 text-xs leading-5 text-slate-400">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {factoryImages.map((img, i) => (
                  <figure key={img.src} className={`overflow-hidden rounded-lg ${i === 0 ? "col-span-2" : ""}`}>
                    <div className={`relative bg-slate-800 ${i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
                      <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} className="object-cover" />
                    </div>
                    <figcaption className="sr-only">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Mexico factory images */}
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-black text-white/80">Factory Facilities — Mexico Export Base</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {mexicoFactoryImages.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3] bg-slate-800">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw" className="object-cover" />
                    </div>
                    <figcaption className="sr-only">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== D – DESIRE: Case Studies ===== */}
        <section id="cases" className="py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.cases.badge}</span>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.cases.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{landingCopy.cases.subtitle}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {caseImages.slice(0, 4).map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="sr-only">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {caseImages.slice(4).map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="sr-only">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certs" className="py-14 md:py-18 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.cert.badge}</span>
                <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.cert.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{landingCopy.cert.subtitle}</p>
                <div className="mt-6">
                  <CtaButton label={ctaLabel} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {certImages.map((src) => (
                  <div key={src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="relative aspect-[4/3]">
                      <Image src={src} alt="PPR certification" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product showcase carousel */}
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Carousel images={carouselImages} interval={4000} />
          </div>
        </section>

        {/* ===== A – ACTION: Process + Form ===== */}
        <section id="quote" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.process.badge}</span>
                <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.process.title}</h2>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {landingCopy.process.steps.map((step, i) => (
                    <div key={step.title} className="rounded-lg border border-slate-200 p-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-black text-white">{i + 1}</span>
                      <h3 className="mt-3 text-sm font-black">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">{step.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <PhoneCall className="h-4 w-4 text-brand-700" />+86 1736 9685 997
                  </p>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm font-bold transition hover:text-brand-700">
                    <Mail className="h-4 w-4 text-brand-700" />{email}
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={reportWhatsAppConversion}
                    className="flex items-center gap-2 text-sm font-bold transition hover:text-brand-700"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-700" />WhatsApp: +86 1736 9685 997
                  </a>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-normal md:text-3xl">{landingCopy.form.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{landingCopy.form.subtitle}</p>
                <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-lg md:p-6">
                  <QuoteForm selectedProduct={selectedProduct} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="text-3xl font-black tracking-normal md:text-4xl">{landingCopy.faq.title}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {landingCopy.faq.items.map((item) => (
                <div key={item.q} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="flex items-start gap-2.5 text-base font-black">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    {item.q}
                  </h3>
                  <p className="mt-2 pl-6.5 text-sm leading-6 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-slate-950 py-14 text-white md:py-16">
          <Image src={heroBg} alt="" fill sizes="100vw" className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-slate-950/80" />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 lg:flex-row lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-black tracking-normal md:text-3xl">{landingCopy.finalCta.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{landingCopy.finalCta.subtitle}</p>
            </div>
            <a
              href="#quote"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-md bg-brand-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-400"
            >
              <Send className="h-4 w-4" />
              {landingCopy.finalCta.button}
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-5 py-8 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="relative h-8 w-28">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="112px" className="object-contain object-left" />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
            <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" onClick={reportWhatsAppConversion} className="hover:text-white">WhatsApp</a>
            <Link href="/privacy" className="hover:text-white">{landingCopy.footer.privacy}</Link>
          </div>
        </div>
      </footer>

      {/* Lightbox overlay */}
      {lightboxGroup && (
        <Lightbox
          images={lightboxGroup}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
          onQuote={handleLightboxQuote}
        />
      )}

      {/* Mobile sticky CTA */}
      <a
        href="#quote"
        className="fixed bottom-4 left-4 right-4 z-70 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-2xl transition hover:bg-brand-700 md:hidden"
      >
        <Send className="h-4 w-4" />
        {landingCopy.form.submit}
      </a>

      {/* WhatsApp floating */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`}
        target="_blank" rel="noopener noreferrer"
        onClick={reportWhatsAppConversion}
        className="group fixed bottom-20 right-4 z-75 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-0.5 md:bottom-6 md:right-6 md:h-12 md:w-12"
        aria-label="WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="pointer-events-none absolute right-full mr-2.5 hidden whitespace-nowrap rounded-md bg-slate-950 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white opacity-0 shadow-xl transition group-hover:opacity-100 md:block">
          {landingCopy.hero.whatsapp}
        </span>
        <MessageCircle className="relative z-10 h-5 w-5 md:h-6 md:w-6" />
      </a>
    </div>
  );
}
