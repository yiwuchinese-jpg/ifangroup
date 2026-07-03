import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-4">404</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
                Page not found
            </h1>
            <p className="max-w-md text-slate-500 mb-10">
                The page you are looking for does not exist or has been moved. Explore our
                product catalog or head back to the homepage.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    href="/"
                    className="rounded-full bg-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-600"
                >
                    Homepage
                </Link>
                <Link
                    href="/products"
                    className="rounded-full border border-slate-300 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 transition-colors hover:border-brand-600 hover:text-brand-600"
                >
                    Browse Products
                </Link>
            </div>
        </main>
    );
}
