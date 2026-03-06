"use client";

import InstagramGallery from "./InstagramGallery";
import YouTubeGallery from "./YouTubeGallery";

export default function MediaCenter() {
    return (
        <section id="media" className="w-full bg-white relative py-24 md:py-32 border-t-2 border-slate-900 scroll-m-20">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 border-l border-slate-100 hidden lg:block" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="w-12 h-0.5 bg-brand-600 block"></span>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                            Social Ecosystem
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-[0.9]">
                        Media <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-brand-600">
                            Center.
                        </span>
                    </h1>
                    <p className="max-w-xl text-lg text-slate-500 font-medium leading-relaxed">
                        Explore our latest corporate developments, manufacturing highlights, and global community engagement through our interactive galleries.
                    </p>
                </div>

                {/* Galleries */}
                <div className="flex flex-col gap-12 lg:gap-24">
                    <YouTubeGallery />
                    <InstagramGallery />
                </div>

            </div>
        </section>
    );
}
