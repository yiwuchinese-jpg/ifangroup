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
    packagingMaterials[] {
        asset->{
            url
        }
    },
    marketingMaterials[] {
        asset->{
            url
        }
    },
    advantages,
    externalUrl
}`;

export const relatedBrandsQuery = groq`*[_type == "brand" && slug.current != $slug] {
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
    coverImage {
        asset->{
            url
        }
    }
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
    topic,
    isPillar,
    publishedAt,
    excerpt,
    // 无 excerpt 的文章用正文首段兜底（服务端剥标签生成摘要，供卡片展示 + 站内搜索）
    "snippet": string::split(coalesce(htmlContent, ""), "</p>")[0],
    mainImage {
        asset->{
            url
        }
    },
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    translations {
        es { title },
        pt { title },
        ru { title },
        ar { title },
        fr { title }
    }
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    topic,
    publishedAt,
    _updatedAt,
    "excerpt": description,
    seoTitle,
    seoDescription,
    htmlContent,
    mainImage {
        asset->{
            url
        }
    },
    body,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    translations {
        es { title, htmlContent, description, body },
        pt { title, htmlContent, description, body },
        ru { title, htmlContent, description, body },
        ar { title, htmlContent, description, body },
        fr { title, htmlContent, description, body }
    }
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
