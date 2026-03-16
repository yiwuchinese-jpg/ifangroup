"use client";

import { motion } from "framer-motion";
import { Youtube, Play, ExternalLink, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// Placeholder data representing future CMS content (duplicated for pagination)
const YOUTUBE_VIDEOS = [
    {
        id: "1",
        videoId: "dQw4w9WgXcQ",
        imageUrl: "/images/media/yt-cover-1.webp",
        title: "Inside the IFAN Mega-Factory: 2024 Automation Tour",
        category: "Factory Tour",
        duration: "12:45",
        views: "124K",
        date: "2 weeks ago",
        featured: true,
        link: "#",
    },
    {
        id: "2",
        imageUrl: "/images/media/yt-cover-2.webp",
        title: "How It's Made: PPR Piping Systems",
        category: "Product Tech",
        duration: "08:20",
        views: "45K",
        date: "1 month ago",
        featured: false,
        link: "#",
    },
    {
        id: "3",
        imageUrl: "/images/media/yt-cover-3.webp",
        title: "Understanding CW617N Brass Certification",
        category: "Engineering",
        duration: "05:15",
        views: "89K",
        date: "3 months ago",
        featured: false,
        link: "#",
    },
    {
        id: "4",
        imageUrl: "/images/media/yt-cover-4.webp",
        title: "IFAN Group Corporate Profile 2024",
        category: "Corporate",
        duration: "03:45",
        views: "210K",
        date: "6 months ago",
        featured: false,
        link: "#",
    },
    {
        id: "5",
        imageUrl: "/images/media/yt-cover-5.webp",
        title: "Global Distribution Network Explained",
        category: "Logistics",
        duration: "06:30",
        views: "34K",
        date: "7 months ago",
        featured: false,
        link: "#",
    },
    {
        id: "6",
        imageUrl: "/images/media/yt-cover-6.webp",
        title: "Quality Control: The 50-Point Inspection",
        category: "Engineering",
        duration: "09:12",
        views: "56K",
        date: "8 months ago",
        featured: false,
        link: "#",
    },
    {
        id: "7",
        imageUrl: "/images/media/yt-cover-7.webp",
        title: "Installation Guide: PEX vs PPR",
        category: "Product Tech",
        duration: "14:20",
        views: "189K",
        date: "9 months ago",
        featured: false,
        link: "#",
    },
    {
        id: "8",
        imageUrl: "/images/media/yt-cover-8.webp",
        title: "Future of Heating: Radiant Systems",
        category: "Innovation",
        duration: "11:05",
        views: "72K",
        date: "10 months ago",
        featured: false,
        link: "#",
    },
    {
        id: "9",
        imageUrl: "/images/media/yt-cover-9.webp",
        title: "Behind the Scenes: R&D Laboratory",
        category: "Innovation",
        duration: "07:45",
        views: "41K",
        date: "11 months ago",
        featured: false,
        link: "#",
    }
];

const ITEMS_PER_PAGE = 6;

export default function YouTubeGallery() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        YOUTUBE_VIDEOS.forEach(v => {
            if (v.category) cats.add(v.category);
        });
        return ["All", ...Array.from(cats)];
    }, []);

    // Reset pagination on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory]);

    // Filter videos
    const filteredVideos = useMemo(() => {
        return YOUTUBE_VIDEOS.filter(video => {
            const matchesCategory = activeCategory === "All" || video.category === activeCategory;
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    // Layout logic
    const isSearching = searchQuery.length > 0 || activeCategory !== "All";

    // Only show the massive featured hero on page 1, and only if we aren't filtering/searching
    const featuredVideo = YOUTUBE_VIDEOS.find(v => v.featured);
    const showFeatured = !isSearching && currentPage === 1 && featuredVideo;

    // Remove featured video from grid if it's being shown at the top
    const gridSourceVideos = useMemo(() => {
        if (showFeatured && featuredVideo) {
            return filteredVideos.filter(v => v.id !== featuredVideo.id);
        }
        return filteredVideos;
    }, [filteredVideos, showFeatured, featuredVideo]);

    const totalPages = Math.max(1, Math.ceil(gridSourceVideos.length / ITEMS_PER_PAGE));
    const currentGridVideos = gridSourceVideos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({
                top: document.getElementById('youtube-gallery')?.offsetTop ? document.getElementById('youtube-gallery')!.offsetTop - 100 : 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="youtube-gallery" className="mb-24 scroll-mt-24">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 border-b-2 border-slate-900 pb-6 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 font-mono text-[10px] uppercase tracking-widest border border-brand-200 mb-4">
                        <Youtube className="w-3.5 h-3.5" />
                        Video Library
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
                        Featured <span className="text-brand-600">Broadcasts</span>
                    </h2>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="SEARCH VIDEOS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 py-3 pl-12 pr-4 font-mono text-xs uppercase tracking-widest text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all rounded-none"
                        />
                    </div>
                    <a
                        href="#"
                        className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-brand-600 transition-colors group flex-shrink-0"
                    >
                        Subscribe IFAN Channel
                        <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
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

            <div className="bg-slate-50 p-6 lg:p-8 border border-slate-200">
                {/* Featured Main Video */}
                {showFeatured && featuredVideo && (
                    <div className="flex flex-col group mb-12 border-b border-slate-200 pb-12">
                        <a href={featuredVideo.link} className="relative aspect-video w-full bg-slate-900 overflow-hidden mb-6 block border border-slate-200">
                            <img
                                src={featuredVideo.imageUrl}
                                alt={featuredVideo.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-20 h-20 bg-brand-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-white fill-white ml-2" />
                                </div>
                            </div>
                            {/* Duration Badge */}
                            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 text-white font-mono text-xs font-bold border border-white/10">
                                {featuredVideo.duration}
                            </div>
                        </a>

                        <div>
                            {featuredVideo.category && (
                                <div className="inline-block px-2 py-1 bg-brand-100 text-brand-700 font-mono text-[10px] uppercase tracking-widest mb-3">
                                    {featuredVideo.category}
                                </div>
                            )}
                            <h3 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase mb-4 group-hover:text-brand-600 transition-colors">
                                {featuredVideo.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                                <span>{featuredVideo.views} Views</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span>{featuredVideo.date}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grid Videos */}
                {currentGridVideos.length === 0 ? (
                    <div className="py-24 text-center border-2 border-dashed border-slate-200 bg-white">
                        <p className="text-slate-900 font-black text-xl uppercase tracking-tighter mb-4">No videos found</p>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Try adjusting your filters</p>
                    </div>
                ) : (
                    <>
                        {showFeatured && (
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 font-mono">
                                Latest Uploads
                            </h4>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentGridVideos.map((video, index) => (
                                <motion.a
                                    key={video.id}
                                    href={video.link}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex flex-col"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video w-full bg-slate-900 mb-4 border border-slate-200 overflow-hidden">
                                        <img
                                            src={video.imageUrl}
                                            alt={video.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                                <Play className="w-5 h-5 text-white fill-white ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-white font-mono text-[10px] font-bold">
                                            {video.duration}
                                        </div>
                                        {video.category && (
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-brand-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                                {video.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-lg text-slate-900 group-hover:text-brand-600 leading-tight mb-2 line-clamp-2 transition-colors">
                                            {video.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                                            <span>{video.views} Views</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <span>{video.date}</span>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-slate-200">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-10 h-10 flex items-center justify-center font-mono text-sm font-bold border transition-colors ${currentPage === i + 1
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
                                    className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:border-brand-600 hover:text-brand-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <a
                href="#"
                className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-4 border border-slate-200 bg-white text-sm font-bold uppercase tracking-widest text-slate-900 hover:border-brand-600 hover:text-brand-600 transition-colors group"
            >
                Subscribe Channel
                <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
        </section>
    );
}
