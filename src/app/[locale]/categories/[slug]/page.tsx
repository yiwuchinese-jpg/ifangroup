import { client } from "@/lib/sanity";
import { getCategoryCopy } from "@/lib/categoryCopywriting";
import CategoryClientPage from "./CategoryClientPage";
import { Metadata } from "next";
import { localeAlternates, localeUrl } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const copy = getCategoryCopy(slug);
    return {
        title: copy.heroTitle,
        description: copy.heroDescription,
        alternates: localeAlternates(locale, `/categories/${slug}`),
        openGraph: {
            title: copy.heroTitle,
            description: copy.heroDescription,
            url: localeUrl(locale, `/categories/${slug}`),
            siteName: "IFAN Group",
        },
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
