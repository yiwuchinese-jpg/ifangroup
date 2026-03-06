const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

const articles = [
    {
        _type: 'article',
        _id: 'article-1',
        title: 'IFAN Group Announces $50M Expansion of Zhejiang Mega-Factory',
        slug: { _type: 'slug', current: 'ifan-group-announces-50m-expansion' },
        category: 'Corporate Updates',
        publishedAt: '2025-06-15T08:00:00Z',
        authorName: 'Board of Directors',
        excerpt: 'To meet surging global demand for industrial-grade PPR and PVC systems, IFAN Group is breaking ground on a state-of-the-art 100,000m² automated manufacturing facility.',
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Zhejiang, China – IFAN Group, a global leader in premium plumbing and HVAC systems, today announced a massive $50 million investment to expand its primary manufacturing hub.' }]
            },
            {
                _type: 'block',
                style: 'blockquote',
                children: [{ _type: 'span', text: 'This isn\'t just an expansion; it\'s a complete redefining of our production capabilities. We are preparing for the next decade of infrastructure.' }]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Zero-Defect Quality at Scale' }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'The new facility will prioritize advanced European extrusion lines running 24/7, all monitored by deep-learning defect detection software.' }]
            }
        ]
    },
    {
        _type: 'article',
        _id: 'article-2',
        title: 'How IFAN Systems Defeated Extreme Desert Heat in the Saudi NEOM Project',
        slug: { _type: 'slug', current: 'ifan-systems-desert-heat-neom' },
        category: 'Engineering Scenarios',
        publishedAt: '2025-05-22T08:00:00Z',
        authorName: 'Dr. Klaus Muller',
        excerpt: 'Operating in 50°C (122°F) environments requires materials that won\'t compromise. Read how IFAN\'s thermal-resistant cross-linked polyethylene outlasted competitor stress tests.',
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Infrastructure in the Middle East poses unique thermal and UV degradation challenges to standard piping systems.' }]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'The 50-Year Guarantee' }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Through proprietary compounding, IFAN engineers have verified a 50-year structural lifespan even when exposed to relentless desert conditions, securing a massive contract for future smart cities.' }]
            }
        ]
    },
    {
        _type: 'article',
        _id: 'article-3',
        title: 'Next-Generation CNAS Testing Protocols Go Live',
        slug: { _type: 'slug', current: 'next-gen-cnas-testing-protocols' },
        category: 'Quality Assurance',
        publishedAt: '2025-04-10T08:00:00Z',
        authorName: 'Quality Control Dept',
        excerpt: 'IFAN upgrades its national-level laboratories with hydrostatic burst-pressure rigs capable of simulating 100 years of fluid hammer stress in under 48 hours.',
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Quality is not inspected; it is engineered. Our new CNAS-certified rig represents a $2M investment into absolute reliability.' }]
            }
        ]
    }
];

async function seed() {
    console.log('Starting to seed articles...', !!client.config().token);
    for (const article of articles) {
        try {
            await client.createOrReplace(article);
            console.log('✅ Seeded article:', article.title);
        } catch (e) {
            console.error('❌ Failed to seed article:', article.title, e.message);
        }
    }
}

seed();
