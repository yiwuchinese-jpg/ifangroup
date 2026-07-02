"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Calendar, User, Tag, Search, ArrowDownRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const ITEMS_PER_PAGE = 9;

type NewsArticle = {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    topic?: string;
    isPillar?: boolean;
    publishedAt?: string;
    excerpt?: string;
    authorName?: string;
    mainImage?: {
        asset?: {
            url?: string;
        };
    };
};

export default function NewsArchiveClient({ initialArticles }: { initialArticles: NewsArticle[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");   // axis 1: product line
    const [activeTopic, setActiveTopic] = useState("All");         // axis 2: function
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
    const selectCategory = (cat: string) => { setActiveCategory(cat); setCurrentPage(1); syncUrl(cat, activeTopic); };
    const selectTopic = (top: string) => { setActiveTopic(top); setCurrentPage(1); syncUrl(activeCategory, top); };

    // Pillar guides: pinned at the top, always visible (filtered only by product line).
    const pillars = useMemo(
        () => initialArticles.filter((a) => a.isPillar && (activeCategory === "All" || a.category === activeCategory)),
        [initialArticles, activeCategory]
    );

    // Filter chips for each axis
    const categories = useMemo(() => {
        const s = new Set<string>();
        initialArticles.forEach((a) => { if (a.category) s.add(a.category); });
        return ["All", ...Array.from(s)];
    }, [initialArticles]);
    const topics = useMemo(() => {
        const s = new Set<string>();
        initialArticles.forEach((a) => { if (a.topic) s.add(a.topic); });
        return ["All", ...Array.from(s)];
    }, [initialArticles]);

    // Main grid = non-pillar articles matching both axes + search (pillars live in the pinned band).
    const filteredArticles = useMemo(() => {
        const term = searchQuery.toLowerCase();
        return initialArticles.filter((article) => {
            if (article.isPillar) return false;
            const matchesCategory = activeCategory === "All" || article.category === activeCategory;
            const matchesTopic = activeTopic === "All" || article.topic === activeTopic;
            const matchesSearch =
                article.title?.toLowerCase().includes(term) || article.excerpt?.toLowerCase().includes(term);
            return matchesCategory && matchesTopic && matchesSearch;
        });
    }, [initialArticles, searchQuery, activeCategory, activeTopic]);

    // Pagination logic
    const isSearching = searchQuery.length > 0 || activeCategory !== "All" || activeTopic !== "All";

    // Determine layout: if not searching and on page 1, show hero feature + 9 grid items. 
    // Otherwise, just show a straight grid of items.
    const totalPages = useMemo(() => {
        const itemsCount = filteredArticles.length;
        if (itemsCount === 0) return 1;

        if (!isSearching && itemsCount > 0) {
            if (itemsCount <= ITEMS_PER_PAGE + 1) return 1;
            return Math.ceil((itemsCount - 1) / ITEMS_PER_PAGE);
        }

        return Math.ceil(itemsCount / ITEMS_PER_PAGE);
    }, [filteredArticles.length, isSearching]);

    const effectivePage = Math.min(currentPage, totalPages);
    const showFeatured = !isSearching && effectivePage === 1 && filteredArticles.length > 0;

    // Calculate items for current page
    const itemsForGrid = useMemo(() => {
        let startIndex = (effectivePage - 1) * ITEMS_PER_PAGE;
        if (showFeatured) {
            // If showing featured, the first item is taken by the hero, so grid starts from index 1
            startIndex = startIndex === 0 ? 1 : startIndex + 1;
        }
        return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredArticles, effectivePage, showFeatured]);

    const featuredArticle = showFeatured ? filteredArticles[0] : null;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll to top of the archive section smoothly
            window.scrollTo({
                top: document.getElementById('archive-top')?.offsetTop ? document.getElementById('archive-top')!.offsetTop - 100 : 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div id="archive-top" className="container mx-auto px-6 max-w-7xl relative z-10 scroll-mt-24">
            {/* Pinned pillar guides — the most comprehensive articles, always at the top */}
            {pillars.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-5">
                        <BookOpen className="w-4 h-4 text-brand-600" />
                        <span className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-slate-900 font-bold">Complete Guides</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">— start here</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pillars.map((p) => (
                            <Link
                                key={p._id}
                                href={`/news/${p.slug}`}
                                className="group relative flex flex-col justify-between p-6 border-2 border-brand-600 bg-white hover:bg-brand-600 transition-colors duration-300 min-h-[160px]"
                            >
                                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-600 group-hover:text-white/80 mb-4">
                                    <BookOpen className="w-3.5 h-3.5" /> {p.category || "Guide"} · Pillar
                                </div>
                                <h3 className="text-lg font-black text-slate-900 group-hover:text-white tracking-tight leading-snug uppercase">
                                    {p.title}
                                </h3>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-900 group-hover:text-white">
                                    Read guide <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Filter & Search Bar — two axes: product line + function */}
            <div className="mb-12 border-b-2 border-slate-900 pb-8 space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mr-1 w-16 shrink-0">Product</span>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => selectCategory(cat)}
                                className={`px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest border transition-colors ${activeCategory === cat
                                    ? "bg-brand-600 text-white border-brand-600"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    {/* Search Input */}
                    <div className="relative w-full lg:w-80 shrink-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="SEARCH BRIEFINGS..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full bg-white border border-slate-200 py-3 pl-12 pr-4 font-mono text-xs uppercase tracking-widest text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all rounded-none"
                        />
                    </div>
                </div>
                {topics.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mr-1 w-16 shrink-0">Topic</span>
                        {topics.map(top => (
                            <button
                                key={top}
                                onClick={() => selectTopic(top)}
                                className={`px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest border transition-colors ${activeTopic === top
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}
                            >
                                {top}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {filteredArticles.length === 0 ? (
                <div className="py-32 text-center border-2 border-dashed border-slate-200 bg-white mb-24">
                    <p className="text-slate-900 font-black text-2xl uppercase tracking-tighter mb-4">No results acquired</p>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Adjust filters or search parameters</p>
                </div>
            ) : (
                <div className="space-y-0 relative mb-24">
                    {/* Featured Article Hero (Page 1 Only) */}
                    {featuredArticle && (
                        <Link
                            href={`/news/${featuredArticle.slug}`}
                            className="group grid grid-cols-1 lg:grid-cols-2 border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-500 relative overflow-hidden mb-12 shadow-sm"
                        >
                            <div className="absolute top-0 left-0 w-full lg:w-1 h-1 lg:h-full bg-transparent group-hover:bg-brand-600 transition-colors duration-500 z-20" />

                            <div className="p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                                {featuredArticle.category && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-900 font-mono text-[10px] uppercase tracking-widest border border-slate-200 self-start mb-8">
                                        <Tag className="w-3 h-3 text-brand-600" />
                                        {featuredArticle.category}
                                    </div>
                                )}
                                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase mb-8 group-hover:text-brand-600 transition-colors">
                                    {featuredArticle.title}
                                </h2>
                                {featuredArticle.excerpt && (
                                    <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12">
                                        {featuredArticle.excerpt}
                                    </p>
                                )}
                                <div className="mt-auto flex items-center justify-between font-bold uppercase tracking-[0.2em] text-xs text-slate-900 group-hover:text-brand-600 transition-colors pt-6 border-t border-slate-200">
                                    <span>Read Featured Briefing</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </div>

                            <div className="h-[40vh] lg:h-full w-full bg-slate-900 relative border-l border-slate-200 order-1 lg:order-2 overflow-hidden">
                                {featuredArticle.mainImage?.asset?.url ? (
                                    <Image
                                        src={featuredArticle.mainImage.asset.url}
                                        alt={featuredArticle.title}
                                        fill
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
                                        <Image
                                            src="/images/media/news-placeholder.webp"
                                            alt="IFAN News Placeholder"
                                            fill
                                            sizes="(min-width: 1024px) 50vw, 100vw"
                                            className="object-cover opacity-30 grayscale"
                                        />
                                        <ArrowDownRight className="w-16 h-16 text-slate-800 mb-4 relative z-10" />
                                        <span className="font-mono text-xs text-slate-700 uppercase tracking-[0.3em] relative z-10">Featured Media</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none mix-blend-overlay" />
                            </div>
                        </Link>
                    )}

                    {/* Standard Grid Database */}
                    {itemsForGrid.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
                            {itemsForGrid.map((article) => (
                                <Link
                                    key={article._id}
                                    href={`/news/${article.slug}`}
                                    className="group flex flex-col border-b border-r border-slate-200 overflow-hidden hover:bg-slate-50 transition-colors duration-500 h-full relative"
                                >
                                    {/* Industrial Hover Line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-brand-600 transition-colors duration-500 z-20" />

                                    {/* Image Container */}
                                    <div className="h-64 sm:h-72 w-full bg-slate-900 relative overflow-hidden border-b border-slate-200">
                                        {article.mainImage?.asset?.url ? (
                                            <Image
                                                src={article.mainImage.asset.url}
                                                alt={article.title}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                className="object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-800 relative">
                                                <Image
                                                    src="/images/media/news-placeholder.webp"
                                                    alt="IFAN News Placeholder"
                                                    fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                    className="object-cover opacity-20 grayscale"
                                                />
                                                <span className="font-black text-6xl tracking-tighter relative z-10">IFAN</span>
                                            </div>
                                        )}
                                        {/* High-tech Overlay Grid */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none mix-blend-overlay" />

                                        {article.category && (
                                            <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-brand-500 font-mono text-[10px] uppercase tracking-widest border border-brand-500/30">
                                                <Tag className="w-3 h-3" />
                                                {article.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                                        <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                                            {article.publishedAt && (
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(article.publishedAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                                                </span>
                                            )}
                                            {article.authorName && (
                                                <span className="flex items-center gap-1.5 border-l border-slate-200 pl-4 text-brand-600">
                                                    <User className="w-3.5 h-3.5" />
                                                    {article.authorName}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase mb-6 group-hover:text-brand-600 transition-colors line-clamp-3">
                                            {article.title}
                                        </h2>

                                        {article.excerpt && (
                                            <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8 flex-grow">
                                                {article.excerpt}
                                            </p>
                                        )}

                                        {/* Action Row */}
                                        <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between font-bold uppercase tracking-[0.2em] text-xs text-slate-900 group-hover:text-brand-600 transition-colors">
                                            <span>Access Briefing</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-16">
                            <button
                                onClick={() => handlePageChange(effectivePage - 1)}
                                disabled={effectivePage === 1}
                                className="w-12 h-12 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-12 h-12 flex items-center justify-center font-mono text-sm font-bold border transition-colors ${effectivePage === i + 1
                                                ? 'bg-brand-600 border-brand-600 text-white'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(effectivePage + 1)}
                                disabled={effectivePage === totalPages}
                                className="w-12 h-12 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
