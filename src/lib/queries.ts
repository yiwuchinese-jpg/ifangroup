import { groq } from "next-sanity";

export const allBrandsQuery = groq`*[_type == "brand"] {
    _id,
    name,
    series,
    "slug": slug.current,
    logo {
        asset->{
            url
        }
    },
    description,
    advantages,
    externalUrl
}`;

export const brandBySlugQuery = groq`*[_type == "brand" && slug.current == $slug][0] {
    _id,
    name,
    series,
    "slug": slug.current,
    logo {
        asset->{
            url
        }
    },
    heroImage {
        asset->{
            url
        }
    },
    description,
    coverImage {
        asset->{
            url
        }
    },
    packaging3dModel {
        asset->{
            url
        }
    },
    advantages,
    externalUrl
}`;

export const productsByBrandQuery = groq`*[_type == "product" && brand->slug.current == $slug] {
    _id,
    name,
    "slug": slug.current,
    description,
    mainImage {
        asset->{
            url
        }
    },
    "categoryTitle": category->title,
    variants[] {
        _key,
        code,
        size,
        packing,
        weight,
        volume
    }
}`;

export const allArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    mainImage {
        asset->{
            url
        }
    },
    "authorName": author->name,
    "authorImage": author->image.asset->url
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    mainImage {
        asset->{
            url
        }
    },
    body,
    "authorName": author->name,
    "authorImage": author->image.asset->url
}`;

export const relatedArticlesQuery = groq`*[_type == "article" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    mainImage {
        asset->{
            url
        }
    },
    "authorName": author->name,
    "authorImage": author->image.asset->url
}`;
