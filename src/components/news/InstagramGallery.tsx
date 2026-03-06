"use client";

import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// Placeholder data representing future CMS content (duplicated to show pagination)
const INSTAGRAM_POSTS = [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
        caption: "Precision engineering at our core. State-of-the-art CNC machining ensuring perfect tolerances for our new CW617N brass valve series.",
        category: "Factory",
        likes: 342,
        comments: 18,
        link: "#",
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
        caption: "Global infrastructure built on IFAN reliability. Over 10,000 km of our PPR pipes installed this year alone.",
        category: "Projects",
        likes: 512,
        comments: 24,
        link: "#",
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1631427508375-7bc07b815cdb?q=80&w=800&auto=format&fit=crop",
        caption: "Our automated assembly line pushing the boundaries of daily production output without compromising a single quality check.",
        category: "Factory",
        likes: 289,
        comments: 12,
        link: "#",
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop",
        caption: "Team IFAN at the 2024 International Builders' Show. Thank you to everyone who stopped by our booth!",
        category: "Events",
        likes: 678,
        comments: 45,
        link: "#",
    },
    {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1517594422361-5e182312b988?q=80&w=800&auto=format&fit=crop",
        caption: "Quality control is not an afterthought, it's our foundation. Every batch tested to exceed international standards.",
        category: "Quality",
        likes: 421,
        comments: 31,
        link: "#",
    },
    {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1416879598446-e40212aa219e?q=80&w=800&auto=format&fit=crop",
        caption: "The scale of our logistics network ensures your project stays on schedule, no matter where in the world you are.",
        category: "Logistics",
        likes: 890,
        comments: 62,
        link: "#",
    },
    {
        id: "7",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        caption: "Innovation never sleeps. Our R&D team testing the next generation of radiant heating systems.",
        category: "R&D",
        likes: 534,
        comments: 29,
        link: "#",
    },
    {
        id: "8",
        imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=800&auto=format&fit=crop",
        caption: "Seamless integration. See how our PEX systems provide flexibility and durability in complex installations.",
        category: "Projects",
        likes: 412,
        comments: 15,
        link: "#",
    },
    {
        id: "9",
        imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
        caption: "Sustainability in manufacturing. We're proud to announce our new water recycling initiative on the factory floor.",
        category: "Sustainability",
        likes: 921,
        comments: 88,
        link: "#",
    },
    {
        id: "10",
        imageUrl: "https://images.unsplash.com/photo-1541888086925-0c13bb3bed29?q=80&w=800&auto=format&fit=crop",
        caption: "Throwback to our founding in 1993. Over 30 years of engineering excellence.",
        category: "Culture",
        likes: 645,
        comments: 42,
        link: "#",
    },
    {
        id: "11",
        imageUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop",
        caption: "Molding the future. Inside our high-pressure injection molding facility.",
        category: "Factory",
        likes: 312,
        comments: 14,
        link: "#",
    },
    {
        id: "12",
        imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
        caption: "Every single fitting matters to the master architect. Build with IFAN.",
        category: "Projects",
        likes: 723,
        comments: 51,
        link: "#",
    }
];

const ITEMS_PER_PAGE = 9;

export default function InstagramGallery() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set<string>();
        INSTAGRAM_POSTS.forEach(p => {
            if (p.category) cats.add(p.category);
        });
        return ["All", ...Array.from(cats)];
    }, []);

    // Reset pagination on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return INSTAGRAM_POSTS.filter(post => {
            const matchesCategory = activeCategory === "All" || post.category === activeCategory;
            const matchesSearch = post.caption.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll back up to the instagram section
            window.scrollTo({
                top: document.getElementById('instagram-gallery')?.offsetTop ? document.getElementById('instagram-gallery')!.offsetTop - 100 : 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="instagram-gallery" className="mb-24 scroll-mt-24">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 border-b-2 border-slate-900 pb-6 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 font-mono text-[10px] uppercase tracking-widest border border-brand-200 mb-4">
                        <Instagram className="w-3.5 h-3.5" />
                        Corporate Culture
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
                        Life at <span className="text-brand-600">IFAN</span>
                    </h2>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="SEARCH CULTURE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 py-3 pl-12 pr-4 font-mono text-xs uppercase tracking-widest text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 transition-all rounded-none"
                        />
                    </div>
                    <a
                        href="#"
                        className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-brand-600 transition-colors group flex-shrink-0"
                    >
                        Follow @ifangroup
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

            {currentPosts.length === 0 ? (
                <div className="py-32 text-center border-2 border-dashed border-slate-200 bg-slate-50">
                    <p className="text-slate-900 font-black text-2xl uppercase tracking-tighter mb-4">No content found</p>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Try adjusting your category or search</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-slate-200 p-1 border border-slate-200">
                        {currentPosts.map((post, index) => (
                            <motion.a
                                key={post.id}
                                href={post.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative aspect-square block bg-slate-900 overflow-hidden"
                            >
                                {/* Image */}
                                <img
                                    src={post.imageUrl}
                                    alt="Instagram post"
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-6 mb-6">
                                        <span className="flex items-center gap-2 text-white font-bold text-lg">
                                            <Heart className="w-6 h-6 fill-white" />
                                            {post.likes}
                                        </span>
                                        <span className="flex items-center gap-2 text-white font-bold text-lg">
                                            <MessageCircle className="w-6 h-6 fill-white" />
                                            {post.comments}
                                        </span>
                                    </div>
                                    <p className="text-white/90 text-sm font-medium line-clamp-4 text-center">
                                        {post.caption}
                                    </p>
                                </div>

                                {/* Top Right Icon */}
                                <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-0 transition-opacity">
                                    <Instagram className="w-6 h-6 text-white" />
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
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
                </>
            )}

            <a
                href="#"
                className="md:hidden mt-8 flex items-center justify-center gap-2 w-full py-4 border border-slate-200 bg-white text-sm font-bold uppercase tracking-widest text-slate-900 hover:border-brand-600 hover:text-brand-600 transition-colors group"
            >
                Follow @ifangroup
                <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
        </section>
    );
}
