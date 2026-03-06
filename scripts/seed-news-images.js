const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

async function uploadImageFromUrl(url) {
    console.log(`Downloading ${url.split('?')[0]}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`Uploading to Sanity...`);
    const asset = await client.assets.upload('image', buffer, {
        filename: 'article-image.jpg'
    });
    return asset._id;
}

const articlesData = [
    {
        _type: 'article',
        _id: 'article-1',
        title: 'IFAN Group Announces $50M Expansion of Zhejiang Mega-Factory',
        slug: { _type: 'slug', current: 'ifan-group-announces-50m-expansion' },
        category: 'Corporate Updates',
        publishedAt: '2025-06-15T08:00:00Z',
        authorName: 'Board of Directors',
        excerpt: 'To meet surging global demand for industrial-grade PPR and PVC systems, IFAN Group is breaking ground on a state-of-the-art 100,000m² automated manufacturing facility.',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop',
        body: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Zhejiang, China – IFAN Group, a global leader in premium plumbing and HVAC systems, today announced a massive $50 million investment to expand its primary manufacturing hub.' }] },
            { _type: 'block', style: 'blockquote', children: [{ _type: 'span', text: 'This isn\'t just an expansion; it\'s a complete redefining of our production capabilities. We are preparing for the next decade of infrastructure.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Zero-Defect Quality at Scale' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The new facility will prioritize advanced European extrusion lines running 24/7, all monitored by deep-learning defect detection software.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Phase 1: Foundation and Robotics' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'The first phase will exclusively focus on autonomous guided vehicles (AGVs) navigating the warehouse, significantly reducing manual handling errors.' }] }
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
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop',
        body: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Infrastructure in the Middle East poses unique thermal and UV degradation challenges to standard piping systems.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'The 50-Year Guarantee' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Through proprietary compounding, IFAN engineers have verified a 50-year structural lifespan even when exposed to relentless desert conditions, securing a massive contract for future smart cities.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'UV Resistance Breakthrough' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'By incorporating carbon black nanocomposites, our pipes now repel 99.9% of harmful ultraviolet radiation, preventing the embrittlement typically seen in competitors.' }] }
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
        imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2000&auto=format&fit=crop',
        body: [
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Engineering Absolute Reliability' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Quality is not inspected; it is engineered. Our new CNAS-certified rig represents a $2M investment into absolute reliability.' }] },
            { _type: 'block', style: 'blockquote', children: [{ _type: 'span', text: 'We push our polymers to the absolute breaking point so that our clients never have to.' }] }
        ]
    },
    {
        _type: 'article',
        _id: 'article-4',
        title: 'Global Supply Chain Optimization: The IFAN Approach',
        slug: { _type: 'slug', current: 'global-supply-chain-optimization' },
        category: 'Logistics',
        publishedAt: '2025-07-01T08:00:00Z',
        authorName: 'Logistics Division',
        excerpt: 'How IFAN Group is utilizing predictive AI modeling to completely eliminate global shipping delays across 120 countries.',
        imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop',
        body: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Shipping logistics in the post-pandemic era require absolute precision. We have integrated deep-learning algorithms into our global distribution hubs.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Predictive Inventory Matrix' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'By analyzing historical data and global macroeconomic indicators, IFAN can predict regional demand surges with 94% accuracy, preemptively positioning stock.' }] }
        ]
    },
    {
        _type: 'article',
        _id: 'article-5',
        title: 'Zero-Carbon Extrusion: The Future of Manufacturing',
        slug: { _type: 'slug', current: 'zero-carbon-extrusion-future' },
        category: 'Sustainability',
        publishedAt: '2025-08-12T08:00:00Z',
        authorName: 'ESG Committee',
        excerpt: 'IFAN commits to 100% renewable energy across all European and Asian manufacturing bases by 2030, reducing our carbon footprint by 2 million tons annually.',
        imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2000&auto=format&fit=crop',
        body: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Heavy industry does not have to mean a heavy carbon footprint. We are systematically replacing gas-powered furnaces with advanced electric induction systems powered by offshore wind.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'The 2030 Transition Plan' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'This aggressive timeline sets a new standard for the hardware manufacturing sector worldwide.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Phase 2: Closed-Loop Water Recycling' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Cooling our extrusion lines requires millions of gallons of water. Our new filtration system recycles 99% of this coolant.' }] }
        ]
    },
    {
        _type: 'article',
        _id: 'article-6',
        title: 'Introducing IoT-Enabled Industrial Valves',
        slug: { _type: 'slug', current: 'introducing-iot-enabled-industrial-valves' },
        category: 'Product Innovation',
        publishedAt: '2025-09-05T08:00:00Z',
        authorName: 'R&D Department',
        excerpt: 'The next frontier in fluid control. Our new line of smart valves provides real-time telemetry, pressure drops, and predictive maintenance alerts directly to your control room.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop',
        body: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Passive hardware is becoming obsolete. Infrastructure managers demand real-time situational awareness of their pipelines.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Sensors Meets Heavy Machinery' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Embedded with military-grade pressure transducers and LTE-M transmitters, these valves detect micro-leaks months before a catastrophic failure occurs.' }] }
        ]
    }
];

async function seed() {
    console.log('Starting to seed fully-featured articles...');

    for (const item of articlesData) {
        try {
            let imageAssetId = null;
            if (item.imageUrl) {
                imageAssetId = await uploadImageFromUrl(item.imageUrl);
            }

            const doc = {
                _type: item._type,
                _id: item._id,
                title: item.title,
                slug: item.slug,
                category: item.category,
                publishedAt: item.publishedAt,
                authorName: item.authorName,
                excerpt: item.excerpt,
                body: item.body,
            };

            if (imageAssetId) {
                doc.mainImage = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAssetId
                    }
                };
            }

            await client.createOrReplace(doc);
            console.log(`✅ Fully seeded: ${item.title}`);
        } catch (e) {
            console.error(`❌ Failed on ${item.title}:`, e.message);
        }
    }

    console.log('Done!');
}

seed();
