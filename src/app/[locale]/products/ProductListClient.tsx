"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProductVariant {
    _key: string;
    code: string;
    size: string;
    packing: string;
    weight: string;
    volume: string;
}

interface Product {
    _id: string;
    name: string;
    slug: string;
    categoryTitle?: string;
    brandName?: string;
    description?: string;
    mainImage?: {
        asset?: {
            url?: string;
        }
    };
    variants: ProductVariant[];
}

export default function ProductListClient({ initialProducts }: { initialProducts: Product[] }) {
    const t = useTranslations("products");
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 30;

    const brands = Array.from(new Set(initialProducts.map(p => p.brandName).filter(Boolean)));

    const filteredProducts = initialProducts.filter(p => {
        if (selectedBrand && p.brandName !== selectedBrand) return false;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const handleQuoteClick = (productName: string) => {
        window.location.assign(`/contact?interest=${encodeURIComponent(productName)}`);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-16 lg:pb-32">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex flex-col gap-8 shrink-0">
                {/* Search Box */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 text-sm font-medium outline-none focus:border-brand-500 shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div>
                    <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">{t("brands")}</h3>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => { setSelectedBrand(null); setCurrentPage(1); }}
                            className={`text-left px-4 py-2 text-sm font-bold uppercase transition-colors ${selectedBrand === null ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}
                        >
                            {t("allBrands")}
                        </button>
                        {brands.map(brand => brand && brand.trim() !== '' && (
                            <button
                                key={brand}
                                onClick={() => { setSelectedBrand(brand); setCurrentPage(1); }}
                                className={`text-left px-4 py-2 text-sm font-bold uppercase transition-colors ${selectedBrand === brand ? 'bg-brand-600 text-white' : 'bg-transparent text-slate-600 hover:bg-slate-100'}`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(product => {
                        const isExpanded = expandedProduct === product._id;

                        return (
                            <motion.div
                                layout
                                key={product._id}
                                className={`bg-white transition-all overflow-hidden flex flex-col ${isExpanded ? 'ring-2 ring-brand-600 shadow-2xl col-span-1 md:col-span-2 xl:col-span-3' : 'shadow-sm hover:shadow-xl'}`}
                            >
                                <div
                                    className="flex flex-col sm:flex-row cursor-pointer group h-full"
                                    onClick={() => setExpandedProduct(isExpanded ? null : product._id)}
                                >
                                    <div className="w-full sm:w-32 sm:min-w-[128px] lg:w-36 lg:min-w-[144px] sm:min-h-[144px] bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {product.mainImage?.asset?.url || `/images/products/${product.slug}/main.webp` ? (
                                            <img
                                                src={product.mainImage?.asset?.url || `/images/products/${product.slug}/main.webp`}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-110 select-none"
                                                draggable={false}
                                                onContextMenu={(e) => e.preventDefault()}
                                            />
                                        ) : (
                                            <div className="text-slate-300 absolute inset-0 flex items-center justify-center"><FileText size={48} /></div>
                                        )}
                                    </div>

                                    <div className="flex flex-col flex-grow p-4 sm:p-5 justify-center min-w-0">
                                        <div className="flex justify-between items-start mb-1.5 gap-3">
                                            <div className="flex flex-col gap-1.5 min-w-0">
                                                {product.brandName && (
                                                    <span className="w-fit px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold tracking-widest uppercase whitespace-nowrap">
                                                        {product.brandName}
                                                    </span>
                                                )}
                                                <h2 className="text-base font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors line-clamp-1 leading-tight pr-2">
                                                    {product.name}
                                                </h2>
                                            </div>
                                            <div className={`w-7 h-7 border border-slate-200 shrink-0 flex items-center justify-center transition-all ${isExpanded ? 'bg-slate-900 border-slate-900 text-white rotate-180' : 'text-slate-400 group-hover:border-brand-600 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                                                <ChevronDown size={14} />
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed pr-2">
                                            {product.description || t("defaultProductDescription")}
                                        </p>

                                        <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between w-full">
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 border border-slate-100 whitespace-nowrap">
                                                <span className="text-brand-600">{product.variants?.length || 0} {t("variants")}</span>
                                            </div>
                                            <Link 
                                                href={`/products/${product.slug}`}
                                                className="text-[9px] font-bold tracking-widest uppercase text-brand-600 hover:text-slate-900 transition-colors flex items-center gap-1 whitespace-nowrap"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t("details")} <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-slate-100 bg-slate-50"
                                        >
                                            <div className="p-6 md:p-8 flex flex-col xl:flex-row gap-8">
                                                <div className="flex-grow overflow-x-auto">
                                                    <h3 className="text-sm font-bold tracking-widest text-slate-900 uppercase mb-4 flex items-center gap-2">
                                                        <FileText size={16} className="text-brand-600" /> {t("completeSpecMatrix")}
                                                    </h3>
                                                    {product.variants && product.variants.length > 0 ? (
                                                        <table className="w-full text-left text-sm whitespace-nowrap">
                                                            <thead>
                                                                <tr className="border-b-2 border-slate-200 text-slate-500">
                                                                    <th className="py-3 pr-4 font-bold">{t("code")}</th>
                                                                    <th className="py-3 px-4 font-bold">{t("dimensionsSize")}</th>
                                                                    <th className="py-3 px-4 font-bold">{t("packaging")}</th>
                                                                    <th className="py-3 pl-4 font-bold tracking-tight">{t("cbm")}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-100">
                                                                {product.variants.map(v => (
                                                                    <tr key={v._key} className="hover:bg-white transition-colors">
                                                                        <td className="py-3 pr-4 font-mono font-medium text-slate-900">{v.code || '-'}</td>
                                                                        <td className="py-3 px-4 font-bold text-slate-700">{v.size || '-'}</td>
                                                                        <td className="py-3 px-4 text-slate-600">{v.packing || '-'}</td>
                                                                        <td className="py-3 pl-4 text-slate-500 font-mono text-xs">{v.volume || '-'}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        <div className="p-6 text-center text-slate-500 border border-slate-200 border-dashed bg-white">
                                                            No specific dimension variants recorded.
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="w-full xl:w-80 shrink-0">
                                                    <div className="bg-slate-900 p-6 shadow-2xl sticky top-24">
                                                        <h4 className="text-white font-black text-2xl tracking-tight mb-2">{t("volumeProcurement")}</h4>
                                                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                                            {t("procurementNote")}
                                                        </p>

                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleQuoteClick(product.name); }}
                                                            className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-brand-50 text-slate-900 font-black tracking-widest uppercase text-sm transition-colors group/btn"
                                                        >
                                                            {t("getPricing")}
                                                            <ArrowRight size={18} className="text-brand-600 group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>

                                                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500 font-bold tracking-widest uppercase">
                                                            <span>{t("globalShipping")}</span>
                                                            <span className="text-brand-500">{t("available")}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    className="xl:hidden w-full py-3 mt-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 border border-slate-200"
                                                    onClick={(e) => { e.stopPropagation(); setExpandedProduct(null); }}
                                                >
                                                    <X size={16} /> {t("closeMatrix")}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center text-slate-500">
                        {t("noProductsMatch")}
                    </div>
                )}

                {/* Pagination Controls */}
                {filteredProducts.length > ITEMS_PER_PAGE && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                            className="px-4 py-2 font-bold text-sm bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                        >
                            {t("previous")}
                        </button>

                        <div className="text-sm font-medium text-slate-500">
                            {t("page")} <span className="font-bold text-slate-900">{currentPage}</span> {t("of")} <span className="font-bold text-slate-900">{Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}</span>
                        </div>

                        <button
                            disabled={currentPage >= Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                            onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                            className="px-4 py-2 font-bold text-sm bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                        >
                            {t("next")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
