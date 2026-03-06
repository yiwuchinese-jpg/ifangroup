"use client";

import { Share2, Printer, Check } from "lucide-react";
import { useState } from "react";

export default function ArticleShare() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2 mb-2">Actions</span>
            <button
                onClick={handleCopy}
                className="group flex items-center justify-between p-4 border border-slate-200 bg-slate-50 hover:bg-slate-900 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-xs text-slate-900"
            >
                <div className="flex items-center gap-3">
                    {copied ? <Check className="w-4 h-4 text-brand-500" /> : <Share2 className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />}
                    <span>{copied ? "Link Copied" : "Copy Link"}</span>
                </div>
            </button>
            <button
                onClick={handlePrint}
                className="group flex items-center justify-between p-4 border border-slate-200 bg-slate-50 hover:bg-slate-900 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-xs text-slate-900"
            >
                <div className="flex items-center gap-3">
                    <Printer className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    <span>Export PDF</span>
                </div>
            </button>
        </div>
    );
}
