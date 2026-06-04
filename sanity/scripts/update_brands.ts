import { createClient } from '@sanity/client'
import * as xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'

// 初始化 Sanity Client (通过 sanity exec 运行时会自动注入，但也支持直接配置)
// 如果使用 sanity exec 跑，这个 client 会默认带有 write 权限吗？
// sanity exec 需要通过 process.env 获取配置。为了保险，我们使用默认导出的 client 或者通过配置实例化。
// 更标准的做法是运行 sanity exec 取代 node 运行
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// 读取 Excel 数据
const excelFilePath = path.resolve('../ifangroup-web/IFANGroup 2025-13 WANG更新(1).xlsx1.xlsx')

const EXACT_TRANSLATIONS: Record<string, string> = {
    '参照系：绿色生命的颜色，橙色激情的颜色': 'Reference Design: Green for Life, Orange for Passion.',
    '主要产品：全系列产品': 'Main Products: Full range of comprehensive products.',
    '拟定路线：STOCK': 'Strategic Positioning: Inventory Stocking & Fast Delivery.',
    '目标市场：全球（不找代理）': 'Target Market: Global Direct (No Exclusive Agents).',
    '参照系：绿色生命的颜色，白色高级的颜色': 'Reference Design: Green for Life, White for Premium Elegance.',
    '拟定路线：顶级高端': 'Strategic Positioning: Top-tier Premium.',
    '参照系：意大利色系': 'Reference Design: Italian Color Scheme.',
    '主要产品：PPR.PEX.PP管道/阀门': 'Main Products: PPR, PEX, PP Pipes & Valves.',
    '拟定路线：性价比下的品牌': 'Strategic Positioning: Value-driven Cost-effective Brand.',
    '目标市场：西非': 'Target Market: West Africa.',
    '参照系：法国色系': 'Reference Design: French Color Scheme.',
    '拟定路线：高端品牌': 'Strategic Positioning: High-end Premium Brand.',
    '参照系：蓝色系': 'Reference Design: Blue Color Scheme.',
    '拟定路线：顶级': 'Strategic Positioning: Top-tier.',
    '目标市场：欧洲': 'Target Market: Europe.',
    '参照系：德国系列': 'Reference Design: German Series.',
    '主要产品：PPR白色，黄色，绿色+MLP+PP601+卡套+阀门': 'Main Products: PPR (White, Yellow, Green), MLP, PP601, Compression Fittings, Valves.',
    '拟定路线：精致包装 产地需求': 'Strategic Positioning: Exquisite Packaging, Origin Requirements.',
    '目标市场：全球': 'Target Market: Global.',
    '主要产品：PPR白色，黄色': 'Main Products: PPR (White, Yellow).',
    '目标市场：PPR高端客人': 'Target Market: Premium PPR Clients.',
    '主要产品：PPR绿色，黄色': 'Main Products: PPR (Green, Yellow).',
    '主要产品：PPR白色，黄色，咖啡色': 'Main Products: PPR (White, Yellow, Brown).',
    '参照系：意大利系列': 'Reference Design: Italian Series.',
    '主要产品：MLP管+PEX管+分水器+球阀+ppr白色，蓝色，黄色': 'Main Products: MLP Pipes, PEX Pipes, Manifolds, Ball Valves, PPR (White, Blue, Yellow).',
    '主要产品：PPR黄色': 'Main Products: PPR (Yellow).',
    '参照系：土耳其系列': 'Reference Design: Turkish Series.',
    '主要产品：PPR白色，绿色，咖啡色+904排水': 'Main Products: PPR (White, Green, Brown), 904 Drainage.',
    '拟定路线：性价比+包装细节': 'Strategic Positioning: High Cost-Effectiveness, Refined Packaging Details.',
    '目标市场：中亚，北非，中东（土耳其卖到的地方）': 'Target Market: Central Asia, North Africa, Middle East (Turkey Export Regions).'
};

function translateDetail(detail: string): string {
    const trimmed = detail.replace(/\s+/g, '').trim();
    // Some strings might have weird spaces, strip all spaces for matching as fallback

    // Direct match
    if (EXACT_TRANSLATIONS[detail.trim()]) {
        return EXACT_TRANSLATIONS[detail.trim()];
    }

    // Attempt normalized match
    for (const [key, value] of Object.entries(EXACT_TRANSLATIONS)) {
        if (key.replace(/\s+/g, '') === trimmed) {
            return value;
        }
    }

    // Strict fallback: just return as is if not found
    return detail;
}

function parseExcel() {
    const workbook = xlsx.readFile(excelFilePath)
    const sheetName = workbook.SheetNames[0]
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }) as any[][]

    const brands = []
    let currentSeries = ''
    let currentBrand = null

    // 从第3行开始（索引2，跳过标题和表头）
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i]
        if (!row || row.length === 0) continue

        const seriesCol = row[1]
        const brandNameCol = row[3]
        const detailsCol = row[5]

        if (seriesCol && typeof seriesCol === 'string' && seriesCol.trim() !== '') {
            currentSeries = seriesCol.trim()
        }

        if (brandNameCol && typeof brandNameCol === 'string' && brandNameCol.trim() !== '') {
            // 遇到了新品牌
            currentBrand = {
                name: brandNameCol.trim(),
                series: currentSeries,
                details: []
            }
            brands.push(currentBrand)
        }

        if (currentBrand && detailsCol && typeof detailsCol === 'string' && detailsCol.trim() !== '') {
            // Translate the detail string before pushing
            currentBrand.details.push(translateDetail(detailsCol.trim()))
        }
    }

    return brands
}

function generateSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

async function main() {
    console.log('Validating Sanity connection...')
    // 如果遇到鉴权问题，这里会报错，运行命令是 npx sanity exec scripts/update_brands.ts --with-user-token

    console.log('Parsing Excel data...')
    const excelBrands = parseExcel()
    console.log(`Found ${excelBrands.length} brands in Excel.`)

    // 获取 Sanity 现有数据
    console.log('Fetching existing brands from Sanity...')
    const existingBrands = await client.fetch(`*[_type == "brand"]{_id, name}`)

    const existingBrandsMap = new Map()
    for (const b of existingBrands) {
        existingBrandsMap.set(b.name, b._id)
    }

    // 同步数据
    for (const eb of excelBrands) {
        console.log(`Processing brand: ${eb.name}`)
        const slug = generateSlug(eb.name)

        // 整理 description 和 advantages
        const description = eb.details.join('\n')
        const advantages = eb.details

        const brandDoc = {
            _type: 'brand',
            name: eb.name,
            slug: { _type: 'slug', current: slug },
            series: eb.series,
            description: description,
            advantages: advantages,
        }

        const _id = existingBrandsMap.get(eb.name)

        if (_id) {
            // 更新
            console.log(`  -> Updating existing brand (ID: ${_id})`)
            await client.patch(_id).set(brandDoc).commit()
        } else {
            // 创建
            console.log(`  -> Creating new brand`)
            await client.create(brandDoc)
        }
    }

    console.log('All brands updated successfully!')
}

main().catch(console.error)
