const XLSX = require('xlsx');
const { createClient } = require('@sanity/client');
const slugify = require('slugify');

const client = createClient({
    projectId: 'm2e07kon',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
    apiVersion: '2024-02-26',
});

async function seedBrands() {
    const excelPath = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/IFANGroup 2025-2-7 Justin更新.xlsx';
    const workbook = XLSX.readFile(excelPath);
    const sheet = workbook.Sheets['IFANGroup'];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log('Starting improved brand seeding...');

    let currentSeries = '其他';

    for (let i = 1; i < data.length; i++) {
        const row = data[i];

        // Check for series name in Column B (index 1)
        if (row[1] && row[1].toString().trim()) {
            currentSeries = row[1].toString().trim();
        }

        const brandName = row[3];
        const brandDescription = row[5] || '';

        if (brandName && brandName !== '品牌名称') {
            const slug = slugify(brandName.toString(), { lower: true });

            const doc = {
                _type: 'brand',
                _id: `brand-${slug}`,
                name: brandName.toString(),
                series: currentSeries,
                slug: { _type: 'slug', current: slug },
                description: brandDescription.toString(),
            };

            try {
                await client.createOrReplace(doc);
                console.log(`✅ [${currentSeries}] Seeded brand: ${brandName}`);
            } catch (err) {
                console.error(`❌ Failed to seed ${brandName}:`, err.message);
            }
        }
    }

    console.log('Seeding complete!');
}

seedBrands();
