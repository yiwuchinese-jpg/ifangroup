"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag, Search, ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function NewsArchiveClient({ initialArticles }: { initialArticles: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        initialArticles.forEach(a => {
            if (a.category) cats.add(a.category);
        });
        return ["All", ...Array.from(cats)];
    }, [initialArticles]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory]);

    // Filter articles
    const filteredArticles = useMemo(() => {
        return initialArticles.filter(article => {
            const matchesCategory = activeCategory === "All" || article.category === activeCategory;
            const searchTerm = searchQuery.toLowerCase();
            const matchesSearch =
                (article.title?.toLowerCase().includes(searchTerm)) ||
                (article.excerpt?.toLowerCase().includes(searchTerm));

            return matchesCategory && matchesSearch;
        });
    }, [initialArticles, searchQuery, activeCategory]);

    // Pagination logic
    const isSearching = searchQuery.length > 0 || activeCategory !== "All";

    // Determine layout: if not searching and on page 1, show hero feature + 9 grid items. 
    // Otherwise, just show a straight grid of items.
    const showFeatured = !isSearching && currentPage === 1 && filteredArticles.length > 0;

    // Calculate items for current page
    const itemsForGrid = useMemo(() => {
        let startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        if (showFeatured) {
            // If showing featured, the first item is taken by the hero, so grid starts from index 1
            startIndex = startIndex === 0 ? 1 : startIndex + 1;
        }
        return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredArticles, currentPage, showFeatured]);

    const featuredArticle = showFeatured ? filteredArticles[0] : null;

    // Total pages calculation
    const totalPages = useMemo(() => {
        let itemsCount = filteredArticles.length;
        if (itemsCount === 0) return 1;

        // If we have a featured item, the first page holds 1 (featured) + 9 (grid) = 10 items.
        // Subsequent pages hold 9 items.
        if (!isSearching && itemsCount > 0) {
            if (itemsCount <= ITEMS_PER_PAGE + 1) return 1;
            return Math.ceil((itemsCount - 1) / ITEMS_PER_PAGE);
        }

        return Math.ceil(itemsCount / ITEMS_PER_PAGE);
    }, [filteredArticles.length, isSearching]);

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
            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b-2 border-slate-900 pb-8">
                {/* Categories */}
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest border transition-colors ${activeCategory === cat
                                ? "bg-brand-600 text-white border-brand-600"
                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="SEARCH BRIEFINGS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 py-3 pl-12 pr-4 font-mono text-xs uppercase tracking-widest text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all rounded-none"
                    />
                </div>
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
                                    <img
                                        src={featuredArticle.mainImage.asset.url}
                                        alt={featuredArticle.title}
                                        className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
                                        <ArrowDownRight className="w-16 h-16 text-slate-800 mb-4" />
                                        <span className="font-mono text-xs text-slate-700 uppercase tracking-[0.3em]">Featured Media</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none mix-blend-overlay" />
                            </div>
                        </Link>
                    )}

                    {/* Standard Grid Database */}
                    {itemsForGrid.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
                            {itemsForGrid.map((article: any) => (
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
                                            <img
                                                src={article.mainImage.asset.url}
                                                alt={article.title}
                                                className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-800">
                                                <span className="font-black text-6xl tracking-tighter">IFAN</span>
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
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-12 h-12 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-12 h-12 flex items-center justify-center font-mono text-sm font-bold border transition-colors ${currentPage === i + 1
                                                ? 'bg-brand-600 border-brand-600 text-white'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
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
