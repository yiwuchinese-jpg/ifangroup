export const fallbackBrands = [
    {
        _id: "ifan-brand",
        name: "IFAN",
        series: "Ifan系列",
        slug: "ifan",
        logo: { asset: { url: "/images/static/brand-logo-ifan.webp" } },
        description: "The premier piping solution for residential and commercial infrastructure.",
        advantages: ["Superior Durability", "Easy Installation", "Certified Quality"],
        externalUrl: "https://ifangroup.com"
    },
    {
        _id: "ifanplus-brand",
        name: "IFANPlus",
        series: "Ifan系列",
        slug: "ifanplus",
        logo: { asset: { url: "/images/static/brand-logo-ifanplus.webp" } },
        description: "Advanced engineering for high-performance industrial applications.",
        advantages: ["High Pressure Resistance", "Chemical Stability", "Extended Lifecycle"],
        externalUrl: "https://ifangroup.com"
    }
];

export const fallbackProducts = [
    {
        _id: "ppr-pipe-p1",
        name: "Premium PPR Pipe",
        slug: "premium-ppr-pipe",
        description: "High-quality PPR pipe for potable water systems.",
        mainImage: { asset: { url: "/images/static/product-ppr-pipe.webp" } },
        categoryTitle: "PPR Piping",
        variants: [
            { _key: "v1", code: "PPR-20", size: "20mm", packing: "100m/coil", weight: "15kg", volume: "0.08" }
        ]
    }
];

export const fallbackArticles = [
    {
        _id: "article-1",
        title: "The Future of Sustainable Plumbing",
        slug: "future-sustainable-plumbing",
        category: "Industry News",
        publishedAt: "2024-03-18",
        excerpt: "Exploring the latest innovations in green building materials and energy-efficient water grids.",
        mainImage: { asset: { url: "/images/static/news-1.webp" } },
        authorName: "IFAN Editorial Team",
        authorImage: "/images/static/author-avatar.webp"
    }
];
