"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Thank you for subscribing!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Subscription failed");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex group shadow-sm bg-slate-900/50 backdrop-blur-sm rounded-none border border-slate-800 hover:border-brand-500/50 transition-colors duration-300">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                        }}
                        disabled={status === "loading" || status === "success"}
                        placeholder="Work email address"
                        className="bg-transparent text-slate-200 px-5 py-3 outline-none w-full text-sm font-medium disabled:opacity-50 placeholder:text-slate-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 disabled:cursor-not-allowed px-5 py-3 transition-colors flex items-center justify-center cursor-pointer"
                    >
                        {status === "loading" ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : status === "success" ? (
                            <CheckCircle2 className="w-5 h-5 text-brand-400" />
                        ) : (
                            <ArrowRight className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
                {status === "success" && (
                    <p className="text-brand-400 text-xs font-medium animate-in fade-in slide-in-from-top-1">{message}</p>
                )}
                {status === "error" && (
                    <p className="text-red-400 text-xs font-medium animate-in fade-in slide-in-from-top-1">{message}</p>
                )}
            </form>
        </div>
    );
}
