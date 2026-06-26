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
import {
  pipeImages,
  seriesImages,
  factoryImages,
  mexicoFactoryImages,
  carouselImages,
  caseImages,
  certImages,
} from "./pprData";

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
const landingPageName = "ppr-supplier";

type BrowserWindow = Window & {
  gtag?: (cmd: string, action: string, params: Record<string, string | number>) => void;
  fbq?: (...args: unknown[]) => void;
};

const landingCopy = {
  nav: {
    products: "Products",
    factory: "Factory",
    compare: "Compare",
    quote: "Get Quote",
  },
  hero: {
    badge: "B2B Factory-Direct — No Trading Company Markup",
    title: "Looking for a PPR Pipes and Fittings Manufacturer That Ships to Africa?",
    subtitle:
      "Factory direct supply of PPR pipes and fittings for plumbing, water supply and construction projects. We support bulk orders, OEM requirements, product catalog requests and export service for buyers in Ghana, Cameroon, Nigeria, Kenya and other African markets.",
    cta1: "Request a Quote",
    cta2: "Get Product Catalog",
    whatsapp: "Contact on WhatsApp",
    proofs: [
      "Manufacturer-direct pricing — no broker layer",
      "100% virgin PP-R — batch certificates provided",
      "DIN 8077/8078 · ISO 15874 · CE · SGS tested",
      "Strictly B2B — MOQ 1 container",
    ],
  },
  stats: [
    { value: "1993", label: "Manufacturing since" },
    { value: "120,000m²", label: "Smart factory" },
    { value: "3,000+", label: "PPR SKUs" },
    { value: "120+", label: "Export countries" },
  ],
  pain: {
    badge: "The Hidden Cost",
    title: "Most B2B Importers Overpay 15–30% On PPR — Without Knowing It",
    subtitle: "Three hidden costs of sourcing PPR through trading companies instead of directly from the manufacturer.",
    items: [
      {
        title: "Trading Company Markup",
        text: "Every middleman adds 8–15% to your unit cost. That margin comes out of your profit — and you're paying for an office you've never visited.",
      },
      {
        title: "Recycled Material Mixed In",
        text: "Some suppliers blend recycled PP-R to cut costs. The pipes look the same — until they fail under pressure. Without batch certificates, you're gambling on every container.",
      },
      {
        title: "No Production Visibility",
        text: "When you buy through a broker, you don't know which factory made your pipes. Lead times stretch, quality drifts, and there's no one to hold accountable.",
      },
    ],
  },
  why: {
    badge: "How IFAN Is Different",
    title: "One Factory. Lower Prices. Higher Quality.",
    subtitle: "We eliminated every layer between production and your container. The savings go to you — not distributors, agents, or trading desks.",
    items: [
      {
        icon: TrendingDown,
        title: "No Middleman Markup",
        text: "You pay the factory price. No agent commission, no trading company margin. Compare our quote against any China supplier.",
      },
      {
        icon: ShieldCheck,
        title: "Lab-Verified Virgin PP-R",
        text: "PP-R 100 grade only. Batch certificates per shipment. Third-party SGS reports available on request — standard for every export order.",
      },
      {
        icon: Factory,
        title: "You Can Audit The Factory",
        text: "120,000m² facility in Zhejiang. 30+ extrusion lines, injection molding, in-house ISO testing lab. Send your QC team anytime.",
      },
      {
        icon: Globe2,
        title: "Your Market Stays Protected",
        text: "We do not sell on Amazon, Alibaba retail, or to end-consumers. No channel conflict. Your import territory and margins are secure.",
      },
    ],
  },
  factory: {
    badge: "See The Factory",
    title: "PPR Pipe Manufacturing / Factory",
    subtitle: "30+ automated extrusion lines. In-house mold workshop. ISO-certified testing lab. Warehouse capacity for 200+ containers.",
  },
  proof: {
    badge: "Trusted Across 120+ Countries",
    title: "Certifications, Export Cases & Real Projects",
    subtitle: "DIN 8077/8078 · ISO 15874 · CE · SGS. Proven across Latin America, Middle East, Africa, and Southeast Asia.",
  },
  products: {
    subtitle: "B2B wholesale only — click any image to enlarge and request a quote.",
    pipes: {
      title: "PPR Pipe Supplier",
      label: "DN20–DN160 · PN12.5–PN25 · Green / White / Custom · 100% virgin PP-R",
    },
    series: {
      title: "PPR Pipe Fittings Supplier",
      label: "PPR plumbing fittings: elbows, tees, couplings, valves, composite pipes, floor heating components",
    },
  },
  compare: {
    badge: "Apples To Apples",
    title: "IFAN vs Typical China PPR Supplier",
    subtitle: "Not all 'factory prices' are equal. Here's what actually differs when you go direct with IFAN.",
    rows: [
      { label: "Pricing Model", ifan: "Ex-factory price — no layers", typical: "Factory + agent + trading co. markup" },
      { label: "Raw Material", ifan: "100% virgin PP-R, batch cert", typical: "Unverified — may contain recycled" },
      { label: "MOQ Flexibility", ifan: "1 container, mix sizes OK", typical: "Often 3–5 containers minimum" },
      { label: "QC Reports", ifan: "SGS / in-house per shipment", typical: "On request only, often delayed" },
      { label: "Factory Audit", ifan: "Welcome — send your QC team", typical: "Discouraged, 'agent will handle'" },
      { label: "Channel Conflict", ifan: "No retail, no Amazon", typical: "Same supplier sells to your competitors" },
    ],
  },
  process: {
    badge: "How To Start",
    title: "From Inquiry To Container In 4 Steps",
    steps: [
      { title: "Send Your Product List", text: "Pipe sizes, fitting types, quantities. Excel or PDF — we handle both." },
      { title: "Review Quote & Samples", text: "Factory pricing within 24h. Physical samples shipped to your office." },
      { title: "Confirm & Produce", text: "Deposit → production → QC inspection → lab report." },
      { title: "Ship To Your Port", text: "FCL/LCL, full export docs, customs clearance support." },
    ],
  },
  risk: {
    badge: "Zero Risk",
    title: "You're Protected At Every Step",
    items: [
      { icon: ShieldCheck, title: "Sample First, Order Later", text: "Request physical samples before committing to a container. Test the quality in your own hands." },
      { icon: BadgeCheck, title: "QC Report Per Shipment", text: "Every container includes batch test certificates. Third-party SGS or BV inspection arranged on request." },
      { icon: CheckCircle2, title: "Factory Audit Welcome", text: "Send your QC team or hire a third-party inspector. We encourage transparency." },
    ],
  },
  faq: {
    title: "PPR Sourcing Questions — Answered Directly",
    items: [
      {
        q: "How do you guarantee the lowest price?",
        a: "We are the manufacturer — no agents, no trading desks. Compare our ex-factory quote against any China PPR supplier. If you find a lower genuine factory price for equivalent spec, we match it.",
      },
      {
        q: "How do I verify the PP-R material is 100% virgin?",
        a: "Every batch ships with a material certificate. Third-party SGS or BV lab reports on request. Pre-shipment inspection or send samples to your own lab — we encourage it.",
      },
      {
        q: "What is the MOQ for PPR pipes and fittings?",
        a: "Standard: 3,000–5,000m pipes (mix sizes DN20–DN160), 5,000pcs fittings (mix types). Trial orders with lower quantities available at a small surcharge.",
      },
      {
        q: "Do you sell on Amazon, Alibaba, or to end-consumers?",
        a: "No. Strictly B2B wholesale. No retail, no marketplace, no consumer sales. Your import market stays protected from channel conflict.",
      },
      {
        q: "Can I customize pipe color or branding?",
        a: "Yes. OEM/ODM: custom colors (green, white, grey, blue), private label printing, custom packaging. MOQ applies — ask your sales contact for details.",
      },
      {
        q: "What certifications do you have for my country?",
        a: "DIN 8077/8078, ISO 15874, CE, SGS as standard. Regional certs — SASO, SONCAP, NOM — arranged per destination. Tell us your market and we'll confirm.",
      },
    ],
  },
  finalCta: {
    title: "Request a Quote for PPR Pipes and Fittings",
    subtitle: "Send your product list. We reply with a tailored quotation within 24 hours — no obligation.",
    button: "Get Factory Price List",
  },
  form: {
    title: "Request Factory-Direct PPR Pricing",
    subtitle: "Tell us what you need. Excel/PDF import lists preferred — we quote within 24 hours.",
    name: "Name *",
    country: "Country",
    company: "Company",
    email: "Email *",
    whatsapp: "WhatsApp (with country code) *",
    products: "PPR products needed",
    quantity: "Estimated quantity",
    submit: "Get PPR Factory Price",
    emailBtn: "Email Sales Team",
    replyNote: "We reply by email and WhatsApp within 24 hours.",
    sending: "Sending...",
    sent: "Quote request received. Our team replies within 24 hours.",
    error: "Send failed. Please email us directly.",
  },
  footer: {
    privacy: "Privacy Policy",
  },
};

function reportInquiryConversion() {
  const w = window as BrowserWindow;
  w.gtag?.("event", "conversion", googleAdsConversion);
}

function reportWhatsAppConversion() {
  const w = window as BrowserWindow;
  w.gtag?.("event", "conversion", googleAdsWhatsAppConversion);
}

function createEventId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const target = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));
  return target?.slice(name.length + 1);
}

function reportMetaBrowserEvent(eventName: "Lead" | "Contact", eventId: string) {
  const w = window as BrowserWindow;
  w.fbq?.("track", eventName, { landing_page: landingPageName }, { eventID: eventId });
}

async function reportMetaServerEvent({
  eventName,
  eventId,
  userData,
  customData,
}: {
  eventName: "Lead" | "Contact";
  eventId: string;
  userData?: {
    email?: string;
    whatsapp?: string;
    name?: string;
  };
  customData?: Record<string, string | number | boolean>;
}) {
  try {
    await fetch("/api/meta-conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        landingPage: landingPageName,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
        userData,
        customData,
      }),
    });
  } catch (error) {
    console.error("Meta conversion report failed:", error);
  }
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
    email: "",
    whatsapp: "",
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
      `Email: ${form.email || "-"}`,
      `WhatsApp: ${form.whatsapp || "-"}`,
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
      const eventId = createEventId("ppr-lead");
      reportMetaBrowserEvent("Lead", eventId);
      void reportMetaServerEvent({
        eventName: "Lead",
        eventId,
        userData: {
          email: form.email,
          whatsapp: form.whatsapp,
          name: form.name,
        },
        customData: {
          content_name: "PPR supplier inquiry",
        },
      });
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
      <input name="Company" className={inputCls} placeholder={landingCopy.form.company} value={form.company} onChange={(e) => updateField("company", e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <input required type="email" name="Email" className={inputCls} placeholder={landingCopy.form.email} value={form.email} onChange={(e) => updateField("email", e.target.value)} />
        <input required type="tel" name="WhatsApp" className={inputCls} placeholder={landingCopy.form.whatsapp} value={form.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} />
      </div>
      <textarea name="Products needed" className={`${inputCls} min-h-20 resize-y`} placeholder={landingCopy.form.products} value={form.products} onChange={(e) => updateField("products", e.target.value)} />
      <input name="Estimated quantity" className={inputCls} placeholder={landingCopy.form.quantity} value={form.quantity} onChange={(e) => updateField("quantity", e.target.value)} />
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
        {landingCopy.form.replyNote}
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
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover" priority={i === 0} loading={i === 0 ? undefined : "lazy"} />
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
      {title && (
        <>
          <h3 className="text-lg font-black tracking-normal text-slate-900">{title}</h3>
          <p className="mt-1.5 mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        </>
      )}
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
                loading="lazy"
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

  function handleWhatsAppClick() {
    reportWhatsAppConversion();
    const eventId = createEventId("ppr-whatsapp");
    reportMetaBrowserEvent("Contact", eventId);
    void reportMetaServerEvent({
      eventName: "Contact",
      eventId,
      customData: {
        content_name: "PPR supplier WhatsApp click",
      },
    });
  }

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
      {/* ===== HEADER ===== */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="relative h-9 w-32" aria-label="IFAN Group">
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="128px" className="object-contain object-left" priority />
          </Link>
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.16em] text-white/70 lg:flex">
            <a href="#products" className="transition hover:text-white">{landingCopy.nav.products}</a>
            <a href="#factory" className="transition hover:text-white">{landingCopy.nav.factory}</a>
            <a href="#compare" className="transition hover:text-white">{landingCopy.nav.compare}</a>
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
          <Image
            src="/images/ppr-landing/mfg-engineering.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
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
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteMessage)}`}
                target="_blank" rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                {landingCopy.hero.whatsapp}
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

        {/* ===== I – INTEREST: Products - PPR Pipe Supplier ===== */}
        <section id="products" className="py-14 md:py-18 bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-normal md:text-4xl">{landingCopy.products.pipes.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{landingCopy.products.subtitle}</p>
              </div>
              <CtaButton label={ctaLabel} />
            </div>
            <div className="mt-8">
              <ProductGrid
                title=""
                label=""
                images={pipeImages}
                onImageClick={(i) => openLightbox(pipeImages, i)}
              />
            </div>
          </div>
        </section>

        {/* ===== I – INTEREST: Products - PPR Pipe Fittings Supplier ===== */}
        <section className="border-t border-slate-200 py-14 md:py-18 bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-normal md:text-4xl">{landingCopy.products.series.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{landingCopy.products.series.label}</p>
              </div>
              <CtaButton label={ctaLabel} />
            </div>
            <div className="mt-8">
              <ProductGrid
                title=""
                label=""
                images={seriesImages}
                onImageClick={(i) => openLightbox(seriesImages, i)}
              />
            </div>
          </div>
        </section>

        {/* ===== P – PROBLEM: Pain Points ===== */}
        <section className="border-t border-slate-200 bg-white py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-red-600">{landingCopy.pain.badge}</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal md:text-4xl">{landingCopy.pain.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{landingCopy.pain.subtitle}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {landingCopy.pain.items.map((item, i) => (
                <div key={item.title} className="group rounded-xl border border-red-100 bg-red-50/50 p-6 transition hover:border-red-200 hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-lg font-black text-red-600">{i + 1}</span>
                  <h3 className="mt-4 text-base font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== D – DESIRE: Why IFAN ===== */}
        <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.why.badge}</span>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal md:text-4xl">{landingCopy.why.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{landingCopy.why.subtitle}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {landingCopy.why.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                      <Icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <h3 className="mt-4 text-sm font-black text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{item.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <CtaButton label={ctaLabel} />
            </div>
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-black uppercase tracking-wide text-brand-700">Factory Facilities — See Our Production Lines</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {mexicoFactoryImages.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="relative aspect-[4/3]">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw" className="object-cover" loading="lazy" />
                    </div>
                    <figcaption className="sr-only">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== D – DESIRE: Factory Proof ===== */}
        <section id="factory" className="bg-slate-950 py-16 text-white md:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-300">{landingCopy.factory.badge}</span>
            <div className="mt-3 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="text-3xl font-black tracking-normal md:text-4xl">{landingCopy.factory.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300">{landingCopy.factory.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {factoryImages.map((img, i) => (
                  <figure key={img.src} className={`overflow-hidden rounded-lg ${i === 0 ? "col-span-2" : ""}`}>
                    <div className={`relative bg-slate-800 ${i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
                      <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} className="object-cover" loading="lazy" />
                    </div>
                    <figcaption className="sr-only">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== D – DESIRE: Proof (Certs + Cases) ===== */}
        <section className="py-14 md:py-18 bg-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.proof.badge}</span>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.proof.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{landingCopy.proof.subtitle}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-black">
                  <ShieldCheck className="h-5 w-5 text-brand-600" />
                  International Certifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {certImages.map((src) => (
                    <div key={src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                      <div className="relative aspect-[4/3]">
                        <Image src={src} alt="PPR certification" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-black">
                  <Globe2 className="h-5 w-5 text-brand-600" />
                  Global Export Cooperation Cases
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {caseImages.slice(0, 4).map((img) => (
                    <figure key={img.src} className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                      <div className="relative aspect-square">
                        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" loading="lazy" />
                      </div>
                      <figcaption className="sr-only">{img.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {caseImages.slice(4).map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" loading="lazy" />
                  </div>
                  <figcaption className="sr-only">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase Carousel */}
        <section className="bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Carousel images={carouselImages} interval={4000} />
          </div>
        </section>

        {/* ===== D – DESIRE: Comparison ===== */}
        <section id="compare" className="border-t border-slate-200 bg-slate-50 py-14 md:py-18">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.compare.badge}</span>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.compare.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{landingCopy.compare.subtitle}</p>
            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="grid grid-cols-[2fr_3fr_3fr] border-b border-slate-200 bg-slate-100 px-6 py-3 text-xs font-black uppercase tracking-wide text-slate-500">
                <span></span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" /> IFAN
                </span>
                <span className="text-slate-400">Typical Supplier</span>
              </div>
              {landingCopy.compare.rows.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-[2fr_3fr_3fr] px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <span className="font-bold text-slate-800">{row.label}</span>
                  <span className="font-semibold text-brand-700">{row.ifan}</span>
                  <span className="text-slate-500">{row.typical}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== A – ACTION: Process + Form ===== */}
        <section id="quote" className="py-16 md:py-20 bg-white">
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
                    onClick={handleWhatsAppClick}
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

        {/* ===== A – ACTION: Risk Reversal ===== */}
        <section className="border-t border-slate-200 bg-brand-50/50 py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-brand-700">{landingCopy.risk.badge}</span>
            <h2 className="mt-3 text-3xl font-black tracking-normal md:text-4xl">{landingCopy.risk.title}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {landingCopy.risk.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                      <Icon className="h-5 w-5 text-brand-700" />
                    </div>
                    <h3 className="mt-4 text-base font-black text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
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
          <Image src="/images/ppr-landing/mfg-engineering.webp" alt="" fill sizes="100vw" className="object-cover opacity-15" loading="lazy" />
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
            <Image src="/logo-white.png" alt="IFAN Group" fill sizes="112px" className="object-contain object-left" loading="lazy" />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
            <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} className="hover:text-white">WhatsApp</a>
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
        onClick={handleWhatsAppClick}
        className="group fixed bottom-20 right-4 z-75 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-0.5 md:bottom-6 md:right-6 md:h-12 md:w-12"
        aria-label="WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="pointer-events-none absolute right-full mr-2.5 hidden whitespace-nowrap rounded-md bg-slate-950 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white opacity-0 shadow-xl transition group-hover:opacity-100 md:block">
          {landingCopy.hero.cta2}
        </span>
        <MessageCircle className="relative z-10 h-5 w-5 md:h-6 md:w-6" />
      </a>
    </div>
  );
}
