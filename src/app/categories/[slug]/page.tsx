import { client } from "@/lib/sanity";
import { getCategoryCopy } from "@/lib/categoryCopywriting";
import CategoryClientPage from "./CategoryClientPage";
import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const copy = getCategoryCopy(resolvedParams.slug);
    return {
        title: copy.heroTitle,
        description: copy.heroDescription,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const copy = getCategoryCopy(slug);

    return (
        <CategoryClientPage 
            slug={slug} 
            copy={copy} 
        />
    );
}
