"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Calendar, Tag, Search, ChevronLeft, ChevronRight, BookOpen, FlaskConical, X, Clock, Play } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export type NewsArticle = {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    topic?: string;
    isPillar?: boolean;
    series?: string;
    publishedAt?: string;
    excerpt?: string;
    readingTime?: number;
    authorName?: string;
    authorImage?: string;
    mainImage?: {
        asset?: {
            url?: string;
        };
    };
};

type SortOrder = "newest" | "oldest" | "az";

/* ---------- shared bits ---------- */

function fmtDate(d?: string) {
    if (!d) return null;
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function MetaRow({ a, light = false }: { a: NewsArticle; light?: boolean }) {
    return (
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest ${light ? "text-slate-300" : "text-slate-400"}`}>
            {a.publishedAt && (
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{fmtDate(a.publishedAt)}</span>
            )}
            {a.readingTime && (
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{a.readingTime} min read</span>
            )}
        </div>
    );
}

function AuthorChip({ a }: { a: NewsArticle }) {
    if (!a.authorName) return null;
    return (
        <span className="flex items-center gap-2">
            {a.authorImage ? (
                <img src={a.authorImage} alt={a.authorName} className="w-6 h-6 rounded-full object-cover border border-slate-200" loading="lazy" />
            ) : (
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-black">{a.authorName.charAt(0)}</span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{a.authorName}</span>
        </span>
    );
}

/* ---------- main component ---------- */

export default function NewsArchiveClient({ initialArticles }: { initialArticles: NewsArticle[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");   // axis 1: product line
    const [activeTopic, setActiveTopic] = useState("All");         // axis 2: function
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
    const [currentPage, setCurrentPage] = useState(1);

    // Deep-link support: /news?category=HDPE&topic=Comparison lands pre-filtered.
    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        const cat = p.get("category");
        const top = p.get("topic");
        if (cat && initialArticles.some((a) => a.category === cat)) setActiveCategory(cat);
        if (top && initialArticles.some((a) => a.topic === top)) setActiveTopic(top);
    }, [initialArticles]);

    // Write both axes back to the URL so any filtered view is shareable.
    const syncUrl = (cat: string, top: string) => {
        const url = new URL(window.location.href);
        cat === "All" ? url.searchParams.delete("category") : url.searchParams.set("category", cat);
        top === "All" ? url.searchParams.delete("topic") : url.searchParams.set("topic", top);
        window.history.replaceState(null, "", url.toString());
    };
    // 切换产品线时，若当前主题在新产品线下不存在则自动归位 All
    const selectCategory = (cat: string) => {
        const topicStillValid =
            activeTopic === "All" ||
            initialArticles.some((a) => a.topic === activeTopic && (cat === "All" || a.category === cat));
        const nextTopic = topicStillValid ? activeTopic : "All";
        setActiveCategory(cat); setActiveTopic(nextTopic); setCurrentPage(1); syncUrl(cat, nextTopic);
    };
    const selectTopic = (top: string) => { setActiveTopic(top); setCurrentPage(1); syncUrl(activeCategory, top); };
    const clearAll = () => { setSearchQuery(""); setActiveCategory("All"); setActiveTopic("All"); setCurrentPage(1); syncUrl("All", "All"); };

    /* ---------- derived collections ---------- */

    const isSearching = searchQuery.length > 0 || activeCategory !== "All" || activeTopic !== "All";

    // Latest editorial block (Stripe-style): newest non-pillar articles, 1 lead + 4 compact
    const latest = useMemo(() => initialArticles.filter((a) => !a.isPillar).slice(0, 5), [initialArticles]);

    // Product Test series row (Ahrefs video-section pattern)
    const testSeries = useMemo(
        () => initialArticles.filter((a) => a.series === "product-tests" && a.slug !== "product-tests"),
        [initialArticles]
    );

    // Pillar guides: pinned band (filtered only by product line).
    const pillars = useMemo(
        () => initialArticles.filter((a) => a.isPillar && (activeCategory === "All" || a.category === activeCategory)),
        [initialArticles, activeCategory]
    );

    const categories = useMemo(() => {
        const s = new Set<string>();
        initialArticles.forEach((a) => { if (a.category) s.add(a.category); });
        return ["All", ...Array.from(s)];
    }, [initialArticles]);

    // 主题 chips 跟随当前产品线联动
    const topics = useMemo(() => {
        const s = new Set<string>();
        initialArticles.forEach((a) => {
            if (a.topic && (activeCategory === "All" || a.category === activeCategory)) s.add(a.topic);
        });
        return ["All", ...Array.from(s).sort()];
    }, [initialArticles, activeCategory]);

    // Browse-all grid — 搜索覆盖标题/摘要/产品线/主题，多关键词 AND
    const filteredArticles = useMemo(() => {
        const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
        const list = initialArticles.filter((article) => {
            if (article.isPillar) return false;
            const matchesCategory = activeCategory === "All" || article.category === activeCategory;
            const matchesTopic = activeTopic === "All" || article.topic === activeTopic;
            const haystack = `${article.title ?? ""} ${article.excerpt ?? ""} ${article.category ?? ""} ${article.topic ?? ""}`.toLowerCase();
            const matchesSearch = terms.every((t) => haystack.includes(t));
            return matchesCategory && matchesTopic && matchesSearch;
        });
        if (sortOrder === "oldest") return [...list].sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));
        if (sortOrder === "az") return [...list].sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
        return list; // newest = server order
    }, [initialArticles, searchQuery, activeCategory, activeTopic, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
    const effectivePage = Math.min(currentPage, totalPages);
    const itemsForGrid = filteredArticles.slice((effectivePage - 1) * ITEMS_PER_PAGE, effectivePage * ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            const el = document.getElementById("browse-all");
            window.scrollTo({ top: el ? el.offsetTop - 140 : 0, behavior: "smooth" });
        }
    };

    // Compact numbered pagination: 1 … n-1 n n+1 … N
    const pageItems = useMemo(() => {
        const pages: (number | "…")[] = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - effectivePage) <= 1) pages.push(i);
            else if (pages[pages.length - 1] !== "…") pages.push("…");
        }
        return pages;
    }, [totalPages, effectivePage]);

    const lead = latest[0];

    return (
        <div className="relative z-10">
            {/* ============ STICKY TOOLBAR — category tabs + search (Stripe/Ahrefs pattern) ============ */}
            <div className="sticky top-[64px] lg:top-[76px] z-30 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 shrink-0">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => selectCategory(cat)}
                                    className={`px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest border whitespace-nowrap transition-colors ${activeCategory === cat
                                        ? "bg-brand-600 text-white border-brand-600"
                                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative ml-auto w-56 lg:w-72 shrink-0">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="SEARCH…"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full bg-white border border-slate-200 py-2.5 pl-10 pr-9 font-mono text-xs uppercase tracking-widest text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all rounded-none"
                            />
                            {searchQuery && (
                                <button onClick={() => { setSearchQuery(""); setCurrentPage(1); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl pt-12">
                {/* ============ EDITORIAL SECTIONS (hidden while filtering/searching) ============ */}
                {!isSearching && (
                    <>
                        {/* --- Latest: 1 lead story + 4 compact (Stripe-style editorial top) --- */}
                        {lead && (
                            <section className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-2 h-2 bg-brand-600" />
                                    <h2 className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-900 font-bold">Latest</h2>
                                </div>
                                <div className="grid lg:grid-cols-5 gap-6">
                                    {/* Lead story */}
                                    <Link href={`/news/${lead.slug}`} className="group lg:col-span-3 flex flex-col bg-white border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-brand-600 transition-colors z-20" />
                                        <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                                            {lead.mainImage?.asset?.url && (
                                                <Image src={lead.mainImage.asset.url} alt={lead.title} fill sizes="(min-width:1024px) 60vw, 100vw"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                                            )}
                                            {lead.category && (
                                                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-brand-500 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-brand-500/30">
                                                    <Tag className="w-3 h-3" />{lead.category}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <MetaRow a={lead} />
                                            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter leading-tight uppercase my-4 group-hover:text-brand-600 transition-colors">
                                                {lead.title}
                                            </h3>
                                            {lead.excerpt && <p className="text-slate-500 font-medium leading-relaxed line-clamp-2 mb-6">{lead.excerpt}</p>}
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                                <AuthorChip a={lead} />
                                                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-xs text-slate-900 group-hover:text-brand-600 transition-colors">
                                                    Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* Compact list of the next 4 */}
                                    <div className="lg:col-span-2 flex flex-col divide-y divide-slate-200 border border-slate-200 bg-white">
                                        {latest.slice(1, 5).map((a) => (
                                            <Link key={a._id} href={`/news/${a.slug}`} className="group flex gap-4 p-5 hover:bg-slate-50 transition-colors flex-1">
                                                <div className="relative w-24 h-20 shrink-0 bg-slate-900 overflow-hidden">
                                                    {a.mainImage?.asset?.url && (
                                                        <Image src={a.mainImage.asset.url} alt={a.title} fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex flex-col">
                                                    {a.category && <span className="font-mono text-[9px] uppercase tracking-widest text-brand-600 mb-1">{a.category}</span>}
                                                    <h4 className="font-black text-sm text-slate-900 tracking-tight leading-snug uppercase line-clamp-2 group-hover:text-brand-600 transition-colors">
                                                        {a.title}
                                                    </h4>
                                                    <div className="mt-auto pt-1"><MetaRow a={a} /></div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* --- Product Test series row (Ahrefs video-section pattern) --- */}
                        {testSeries.length > 0 && (
                            <section className="mb-16">
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <FlaskConical className="w-4 h-4 text-brand-600 shrink-0" />
                                        <h2 className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-900 font-bold">Product Test Series</h2>
                                        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-widest text-slate-400 truncate">— filmed bench tests, replicable on samples</span>
                                    </div>
                                    <Link href="/news/product-tests" className="shrink-0 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-900 hover:text-brand-600 transition-colors">
                                        View the series <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {testSeries.slice(0, 4).map((a) => (
                                        <Link key={a._id} href={`/news/${a.slug}`} className="group flex flex-col bg-slate-900 overflow-hidden border border-slate-800 hover:border-brand-600 transition-colors">
                                            <div className="relative aspect-video overflow-hidden">
                                                {a.mainImage?.asset?.url && (
                                                    <Image src={a.mainImage.asset.url} alt={a.title} fill sizes="(min-width:1024px) 25vw, 50vw"
                                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" unoptimized />
                                                )}
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <span className="w-12 h-12 rounded-full bg-brand-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-black text-xs md:text-sm text-white tracking-tight leading-snug uppercase line-clamp-2 group-hover:text-brand-500 transition-colors">
                                                    {a.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* --- Complete Guides band --- */}
                        {pillars.length > 0 && (
                            <section className="mb-16">
                                <div className="flex items-center gap-2 mb-6">
                                    <BookOpen className="w-4 h-4 text-brand-600" />
                                    <h2 className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-900 font-bold">Complete Guides</h2>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">— start here</span>
                                </div>
                                <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                                    {pillars.map((p) => (
                                        <Link key={p._id} href={`/news/${p.slug}`}
                                            className="group flex flex-col border-2 border-brand-600 bg-white overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className="relative aspect-video bg-slate-900 overflow-hidden">
                                                {p.mainImage?.asset?.url ? (
                                                    <img src={p.mainImage.asset.url} alt={p.title} loading="lazy"
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-black text-3xl tracking-tighter">IFAN</div>
                                                )}
                                                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-brand-600 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2.5 py-1">
                                                    <BookOpen className="w-3 h-3" /> {p.category || "Guide"}
                                                </span>
                                            </div>
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h3 className="text-sm md:text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors tracking-tight leading-snug uppercase mb-3 line-clamp-2">
                                                    {p.title}
                                                </h3>
                                                <span className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-900 group-hover:text-brand-600 transition-colors">
                                                    Read guide <ArrowRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* --- Mid-page conversion band (Stripe newsletter-slot pattern, B2B version) --- */}
                        <section className="mb-16 bg-slate-900 border border-slate-800 px-8 py-10 lg:px-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />
                            <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-500 font-bold mb-2">Sourcing for a project?</p>
                                    <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase leading-tight max-w-xl">
                                        Get factory pricing on the systems these articles cover
                                    </h2>
                                </div>
                                <div className="flex flex-wrap gap-3 shrink-0">
                                    <Link href="/ppr-supplier#quote" className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold uppercase tracking-[0.15em] text-xs px-6 py-4 hover:bg-brand-500 transition-colors">
                                        Request a quote <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link href="/products" className="inline-flex items-center gap-2 border border-white/30 text-white font-bold uppercase tracking-[0.15em] text-xs px-6 py-4 hover:border-white transition-colors">
                                        Browse products
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* ============ BROWSE ALL ============ */}
                <section id="browse-all" className="mb-24 scroll-mt-32">
                    <div className="border-b-2 border-slate-900 pb-6 mb-8 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-900 font-bold">
                                    {isSearching ? "Results" : "All Briefings"}
                                </h2>
                                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-slate-500">
                                    <span className="text-brand-600 font-bold">{filteredArticles.length}</span> article{filteredArticles.length === 1 ? "" : "s"}
                                </span>
                                {isSearching && (
                                    <button onClick={clearAll}
                                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 border border-slate-200 bg-white px-3 py-1.5 hover:border-brand-600 hover:text-brand-600 transition-colors">
                                        <X className="w-3 h-3" /> Clear filters
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Sort</span>
                                {([["newest", "Newest"], ["oldest", "Oldest"], ["az", "A–Z"]] as [SortOrder, string][]).map(([key, label]) => (
                                    <button key={key} onClick={() => { setSortOrder(key); setCurrentPage(1); }}
                                        className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-colors ${sortOrder === key
                                            ? "bg-slate-900 text-white border-slate-900"
                                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {topics.length > 2 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mr-1 shrink-0">Topic</span>
                                {topics.map(top => (
                                    <button key={top} onClick={() => selectTopic(top)}
                                        className={`px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-colors ${activeTopic === top
                                            ? "bg-slate-900 text-white border-slate-900"
                                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}>
                                        {top}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {filteredArticles.length === 0 ? (
                        <div className="py-32 text-center border-2 border-dashed border-slate-200 bg-white">
                            <p className="text-slate-900 font-black text-2xl uppercase tracking-tighter mb-4">No results acquired</p>
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-8">Adjust filters or search parameters</p>
                            <button onClick={clearAll}
                                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white bg-brand-600 px-6 py-3 hover:bg-brand-500 transition-colors">
                                <X className="w-4 h-4" /> Clear all filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
                                {itemsForGrid.map((article) => (
                                    <Link key={article._id} href={`/news/${article.slug}`}
                                        className="group flex flex-col border-b border-r border-slate-200 overflow-hidden hover:bg-slate-50 transition-colors duration-500 h-full relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-brand-600 transition-colors duration-500 z-20" />
                                        <div className="h-56 w-full bg-slate-900 relative overflow-hidden border-b border-slate-200">
                                            {article.mainImage?.asset?.url ? (
                                                <Image src={article.mainImage.asset.url} alt={article.title} fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                    className="object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                                    unoptimized />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-800 relative">
                                                    <span className="font-black text-5xl tracking-tighter relative z-10">IFAN</span>
                                                </div>
                                            )}
                                            {article.category && (
                                                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-md text-brand-500 font-mono text-[10px] uppercase tracking-widest border border-brand-500/30">
                                                    <Tag className="w-3 h-3" />{article.category}
                                                </div>
                                            )}
                                            {article.series === "product-tests" && (
                                                <span className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-brand-600/90 flex items-center justify-center">
                                                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-7 flex flex-col flex-grow">
                                            <MetaRow a={article} />
                                            <h3 className="text-lg lg:text-xl font-black text-slate-900 tracking-tighter leading-snug uppercase my-4 group-hover:text-brand-600 transition-colors line-clamp-3">
                                                {article.title}
                                            </h3>
                                            {article.excerpt && (
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-6 flex-grow">{article.excerpt}</p>
                                            )}
                                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <AuthorChip a={article} />
                                                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination — compact with ellipsis */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-14">
                                    <button onClick={() => handlePageChange(effectivePage - 1)} disabled={effectivePage === 1}
                                        className="w-11 h-11 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    {pageItems.map((p, i) => p === "…" ? (
                                        <span key={`e${i}`} className="w-11 h-11 flex items-center justify-center font-mono text-sm text-slate-400">…</span>
                                    ) : (
                                        <button key={p} onClick={() => handlePageChange(p)}
                                            className={`w-11 h-11 flex items-center justify-center font-mono text-sm font-bold border transition-colors ${effectivePage === p
                                                ? "bg-brand-600 border-brand-600 text-white"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600"}`}>
                                            {p}
                                        </button>
                                    ))}
                                    <button onClick={() => handlePageChange(effectivePage + 1)} disabled={effectivePage === totalPages}
                                        className="w-11 h-11 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
