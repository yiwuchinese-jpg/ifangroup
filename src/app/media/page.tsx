import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MediaCenter from "@/components/news/MediaCenter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Media Center | IFAN Group",
    description: "Explore IFAN Group's corporate culture, manufacturing highlights, and interactive video galleries.",
};

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
