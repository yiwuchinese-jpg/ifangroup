import { client } from "@/lib/sanity";
import { articleBySlugQuery, relatedArticlesQuery } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Metadata } from "next";
import Image from "next/image";
import ReadingProgress from "@/components/news/ReadingProgress";
import ArticleTOC from "@/components/news/ArticleTOC";
import ArticleShare from "@/components/news/ArticleShare";
import { ReactNode } from "react";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const article = await client.fetch(articleBySlugQuery, { slug: resolvedParams.slug });

    if (!article) return { title: "Article Not Found" };

    return {
        title: `${article.title} | IFAN News & Insights`,
        description: article.excerpt || `Read the latest insights from IFAN Group about ${article.title}.`,
    };
}

// Custom Portable Text Components for rich styling
type PortableTextImageValue = {
    asset?: {
        _ref?: string;
    };
};

type PortableTextChild = {
    text?: string;
};

type PortableTextHeadingValue = {
    children?: PortableTextChild[];
};

type PortableTextLinkValue = {
    href?: string;
};

type PortableTextComponentProps<T = unknown> = {
    children?: ReactNode;
    value?: T;
};

type RelatedArticle = {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    publishedAt?: string;
    mainImage?: {
        asset?: {
            url?: string;
        };
    };
};

const components = {
    types: {
        image: ({ value }: PortableTextComponentProps<PortableTextImageValue>) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <div className="my-16 w-full aspect-video bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
                    <span className="font-mono uppercase tracking-[0.3em] text-[10px] bg-black/50 px-4 py-2 border border-slate-800 backdrop-blur-sm">Image Asset Placeholder</span>
                </div>
            );
        },
    },
    block: {
        h2: ({ children, value }: PortableTextComponentProps<PortableTextHeadingValue>) => {
            const id = value?.children?.map((child) => child.text ?? '').join('')
                .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || '';
            return <h2 id={id} className="scroll-mt-32 text-4xl md:text-5xl font-black text-slate-900 mt-20 mb-8 tracking-tighter uppercase border-b-2 border-slate-900 pb-4 inline-block">{children}</h2>;
        },
        h3: ({ children, value }: PortableTextComponentProps<PortableTextHeadingValue>) => {
            const id = value?.children?.map((child) => child.text ?? '').join('')
                .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || '';
            return <h3 id={id} className="scroll-mt-32 text-2xl lg:text-3xl font-black text-slate-800 mt-16 mb-6 tracking-tighter uppercase">{children}</h3>;
        },
        normal: ({ children }: PortableTextComponentProps) => <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8">{children}</p>,
        blockquote: ({ children }: PortableTextComponentProps) => (
            <blockquote className="border-l-[6px] border-brand-600 pl-8 lg:pl-12 py-6 my-12 bg-slate-50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-8xl text-brand-600 pointer-events-none leading-none select-none">&quot;</div>
                <div className="relative z-10 text-xl lg:text-2xl font-medium text-slate-900 leading-relaxed italic">{children}</div>
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }: PortableTextComponentProps) => <strong className="font-black text-slate-900 bg-slate-100 px-1">{children}</strong>,
        link: ({ children, value }: PortableTextComponentProps<PortableTextLinkValue>) => (
            <a href={value?.href ?? '#'} target="_blank" rel="noreferrer" className="text-brand-600 font-bold hover:text-slate-900 underline decoration-2 underline-offset-4 transition-colors">
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }: PortableTextComponentProps) => <ul className="list-none space-y-4 mb-12 text-lg md:text-xl text-slate-600 font-medium">{children}</ul>,
        number: ({ children }: PortableTextComponentProps) => <ol className="list-decimal pl-6 space-y-4 mb-12 text-lg md:text-xl text-slate-600 font-medium font-mono">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: PortableTextComponentProps) => (
            <li className="relative pl-8">
                <span className="absolute left-0 top-3 w-3 h-3 bg-brand-600" />
                {children}
            </li>
        ),
    }
};

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const article = await client.fetch(articleBySlugQuery, { slug: resolvedParams.slug });
    const relatedArticles: RelatedArticle[] = await client.fetch(relatedArticlesQuery, { slug: resolvedParams.slug });

    if (!article) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow pt-24 lg:pt-32">
                <article>
                    {/* Massive Typographic Hero */}
                    <header className="pt-12 lg:pt-16 pb-12 lg:pb-16 border-b border-slate-200">
                        <div className="container mx-auto px-6 max-w-7xl">
                            <Link href="/news" className="group inline-flex items-center gap-4 text-slate-400 hover:text-brand-600 font-bold tracking-[0.2em] uppercase text-xs transition-colors mb-10 lg:mb-12">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                                Return to Briefings
                            </Link>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
                                <div className="lg:col-span-8">
                                    {article.category && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-600 text-white font-mono text-[10px] uppercase tracking-widest mb-8">
                                            <Tag className="w-3 h-3" />
                                            {article.category}
                                        </div>
                                    )}
                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter leading-[0.85] uppercase break-words">
                                        {article.title}
                                    </h1>
                                </div>

                                <div className="lg:col-span-4 flex flex-col gap-6 font-mono text-xs text-slate-500 uppercase tracking-widest border-l-2 border-slate-200 pl-6 lg:pl-10 lg:pb-4">
                                    {article.publishedAt && (
                                        <div>
                                            <span className="block text-slate-400 mb-2 text-[10px]">Transmission Date</span>
                                            <span className="flex items-center gap-2 text-slate-900 font-bold">
                                                <Calendar className="w-4 h-4 text-brand-600" />
                                                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                                            </span>
                                        </div>
                                    )}
                                    {article.authorName && (
                                        <div>
                                            <span className="block text-slate-400 mb-2 text-[10px]">Authorizing Officer</span>
                                            <span className="flex items-center gap-2 text-slate-900 font-bold">
                                                {article.authorImage ? (
                                                    <Image src={article.authorImage} alt={article.authorName} width={24} height={24} className="w-6 h-6 object-cover grayscale" unoptimized />
                                                ) : (
                                                    <User className="w-4 h-4 text-brand-600" />
                                                )}
                                                {article.authorName}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Full-Bleed Structural Image Divider */}
                    {article.mainImage?.asset?.url && (
                        <div className="w-full h-[60vh] lg:h-[75vh] bg-slate-900 border-b border-slate-200 relative group overflow-hidden">
                            <Image
                                src={article.mainImage.asset.url}
                                alt={article.title}
                                fill
                                sizes="100vw"
                                className="object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none mix-blend-overlay" />
                        </div>
                    )}
                    {!article.mainImage?.asset?.url && <div className="h-16 w-full border-b border-slate-200 bg-slate-50" />}

                    {/* Centralized Reading Column */}
                    <div className="bg-white py-24 lg:py-32 relative">
                        <ReadingProgress />
                        <div className="container mx-auto px-6 max-w-7xl">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                                {/* TOC Sidebar */}
                                <aside className="hidden lg:block lg:col-span-3">
                                    <div className="sticky top-32">
                                        <ArticleTOC />
                                    </div>
                                </aside>

                                {/* Main Content */}
                                <div className="lg:col-span-6 lg:col-start-4">
                                    {article.excerpt && (
                                        <p className="text-2xl lg:text-3xl font-bold text-slate-900 leading-[1.4] mb-16 pb-16 border-b-2 border-slate-100">
                                            {article.excerpt}
                                        </p>
                                    )}

                                    <div className="prose prose-xl prose-slate max-w-none">
                                        {article.body ? (
                                            <PortableText value={article.body} components={components as never} />
                                        ) : (
                                            <div className="text-center py-32 border-2 border-dashed border-slate-200 bg-slate-50">
                                                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Content Matrix Empty</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Share Sidebar */}
                                <aside className="lg:col-span-3">
                                    <div className="sticky top-32">
                                        <ArticleShare />
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>

                    {/* Related Articles Matrix */}
                    {relatedArticles?.length > 0 && (
                        <div className="bg-slate-50 py-24 lg:py-32 border-t border-slate-200">
                            <div className="container mx-auto px-6 max-w-7xl">
                                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-12">
                                    Related Briefings
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 bg-white">
                                    {relatedArticles.map((relArticle) => (
                                        <Link
                                            key={relArticle._id}
                                            href={`/news/${relArticle.slug}`}
                                            className="group flex flex-col border-b border-r border-slate-200 overflow-hidden hover:bg-slate-50 transition-colors duration-500 h-full relative"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-brand-600 transition-colors duration-500 z-20" />

                                            <div className="h-56 w-full bg-slate-900 relative overflow-hidden border-b border-slate-200">
                                                {relArticle.mainImage?.asset?.url ? (
                                                    <Image
                                                        src={relArticle.mainImage.asset.url}
                                                        alt={relArticle.title}
                                                        fill
                                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                        className="object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-800">
                                                        <span className="font-black text-4xl tracking-tighter">IFAN</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none mix-blend-overlay" />
                                            </div>

                                            <div className="p-8 flex flex-col flex-grow">
                                                <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-4">
                                                    {relArticle.publishedAt && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {new Date(relArticle.publishedAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className="text-xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase mb-4 group-hover:text-brand-600 transition-colors line-clamp-2">
                                                    {relArticle.title}
                                                </h4>

                                                {relArticle.excerpt && (
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-6 flex-grow">
                                                        {relArticle.excerpt}
                                                    </p>
                                                )}

                                                <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between font-bold uppercase tracking-[0.2em] text-[10px] text-slate-900 group-hover:text-brand-600 transition-colors">
                                                    <span>Access Briefing</span>
                                                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-2 transition-transform duration-300 rotate-180" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </main>

            <Footer />
        </div>
    );
}
