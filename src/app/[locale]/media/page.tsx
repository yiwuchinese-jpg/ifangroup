import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MediaCenter from "@/components/news/MediaCenter";
import { Metadata } from "next";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Media Center",
        description: "Explore IFAN Group's corporate culture, manufacturing highlights, and interactive video galleries.",
        alternates: localeAlternates(locale, "/media"),
    };
}

export default function MediaPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            <main className="flex-grow">
                {/* Embedded Media Center (Instagram & YouTube) */}
                <MediaCenter />
            </main>

            <Footer />
        </div>
    );
}
