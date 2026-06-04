import { createClient } from '@sanity/client'
import * as xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'
import { getCliClient } from 'sanity/cli'
import { v4 as uuidv4 } from 'uuid'

const client = getCliClient()
const rootDir = path.resolve('../ifangroup-web/20，ifan及风帆旗下品牌价格')

// 品牌与分类缓存
const brandMap = new Map<string, string>() // Name (lowercase) -> ID
const categoryMap = new Map<string, string>() // Name -> ID

function generateSlug(name: string) {
    if (!name) return uuidv4().substring(0, 8);
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + uuidv4().substring(0, 4)
}

function cleanCategoryName(filename: string): string {
    // 例如：Bekaatherm 128 PPR Grey 163 2026-2-11 美员更新.xlsx -> Bekaatherm 128 PPR Grey
    let clean = filename.replace('.xlsx', '').replace(/[\u4e00-\u9fa5]/g, '') // 移除非中文字符（日期部分和杂项）
    clean = clean.replace(/\d{4}-\d{1,2}-\d{1,2}/g, '') // 移除类似 2026-2-11 的日期
    clean = clean.replace(/ 16[0-9] | 15[0-9] /g, ' ') // 移除类似 163 等价格/批号字段
    clean = clean.replace(/报价|更新|美员/g, '') // 兜底防止正则漏掉特定中文字段
    return clean.trim().replace(/\s{2,}/g, ' ') || 'General Pipes'
}

async function getOrCreateBrand(brandName: string): Promise<string> {
    const key = brandName.toLowerCase().trim()
    if (brandMap.has(key)) return brandMap.get(key)!

    const existing = await client.fetch(`*[_type == "brand" && name match $query][0]._id`, { query: `${brandName}*` })
    if (existing) {
        brandMap.set(key, existing)
        return existing
    }

    console.log(`[+] Auto-creating missing brand: ${brandName}`)
    const newBrand = await client.create({
        _type: 'brand',
        name: brandName,
        slug: { _type: 'slug', current: generateSlug(brandName) },
        series: '其他',
        description: `Premium plumbing solutions from ${brandName}.`
    })
    brandMap.set(key, newBrand._id)
    return newBrand._id
}

async function getOrCreateCategory(categoryName: string): Promise<string> {
    const key = categoryName.trim()
    if (categoryMap.has(key)) return categoryMap.get(key)!

    const existing = await client.fetch(`*[_type == "category" && title == $title][0]._id`, { title: key })
    if (existing) {
        categoryMap.set(key, existing)
        return existing
    }

    console.log(`[+] Auto-creating missing category: ${key}`)
    const newCat = await client.create({
        _type: 'category',
        title: key,
        slug: { _type: 'slug', current: generateSlug(key) }
    })
    categoryMap.set(key, newCat._id)
    return newCat._id
}

function processExcelFile(filePath: string, brandId: string, categoryId: string): any[] {
    const wb = xlsx.readFile(filePath)
    const sheetName = wb.SheetNames[0]
    const rows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 }) as any[][]

    const products: any[] = []
    let currentProduct: any = null

    let startRow = 0
    let codeIndex = 0
    let nameIndex = 1
    let sizeIndex = 3
    let packingIndex = 4
    let weightIndex = -1
    let volumeIndex = -1

    for (let i = 0; i < rows.length; i++) {
        const r = rows[i]
        const codeCol = r.findIndex(col => typeof col === 'string' && col.toLowerCase().includes('code'))
        if (codeCol !== -1) {
            codeIndex = codeCol
            nameIndex = r.findIndex(col => typeof col === 'string' && col.toLowerCase() === 'name')
            sizeIndex = r.findIndex(col => typeof col === 'string' && col.toLowerCase() === 'size')

            packingIndex = r.findIndex(col => typeof col === 'string' && (col.toLowerCase().includes('pcs') || col.toLowerCase().includes('bag') || col.toLowerCase().includes('/ctn') || col.toLowerCase().includes('roll')))
            if (packingIndex === -1) packingIndex = Math.max(nameIndex, sizeIndex) + 1;

            weightIndex = r.findIndex(col => typeof col === 'string' && (col.toLowerCase().includes('g/m') || col.toLowerCase().includes('g/ps') || col.toLowerCase().includes('weight')))
            volumeIndex = r.findIndex(col => typeof col === 'string' && col.toLowerCase().includes('cbm'))

            startRow = i + 1;
            break;
        }
    }

    if (startRow === 0) startRow = 7;

    for (let i = startRow; i < rows.length; i++) {
        const row = rows[i]
        if (!row || row.length === 0) continue

        const codeRaw = codeIndex !== -1 ? row[codeIndex] : row[0]
        const nameRaw = nameIndex !== -1 ? row[nameIndex] : row[1]
        const sizeRaw = sizeIndex !== -1 ? row[sizeIndex] : row[3]
        const packingRaw = packingIndex !== -1 ? row[packingIndex] : row[4]

        let weightRaw = weightIndex !== -1 ? row[weightIndex] : row[row.length - 2]
        let volumeRaw = volumeIndex !== -1 ? row[volumeIndex] : row[row.length - 1]

        const code = codeRaw ? String(codeRaw).trim().replace(/\r?\n|\r/g, ' ') : ''
        const name = nameRaw ? String(nameRaw).trim().replace(/\r?\n|\r/g, ' ') : ''
        const size = sizeRaw ? String(sizeRaw).trim().replace(/\r?\n|\r/g, ' ') : ''
        const packing = packingRaw ? String(packingRaw).trim().replace(/\r?\n|\r/g, ' ') : ''

        if (!code && !name && !size) continue;
        if (size.includes('163报价') || size.includes('PRICE') || size === 'Size') continue;
        if (code.includes('163报价') || String(row).includes('163报价')) continue;

        if (String(weightRaw).includes('报价') || String(volumeRaw).includes('报价')) {
            weightRaw = '-'; volumeRaw = '-';
        }

        const weightStr = weightRaw ? String(weightRaw).trim() : '-'
        const volumeStr = volumeRaw ? String(volumeRaw).trim() : '-'

        if (name && name.toLowerCase() !== 'name' && name !== 'Pictures') {
            if (currentProduct) {
                products.push(currentProduct)
            }

            const cleanName = name.replace(/\b[A-Z]\b$/, '').trim() || 'Component Matrix Component';

            currentProduct = {
                _id: 'product-' + generateSlug(cleanName + '-' + (code || '00' + i)).replace(/-/g, ''),
                _type: 'product',
                name: cleanName,
                slug: {
                    _type: 'slug',
                    current: generateSlug(cleanName + '-' + (code || '00' + i))
                },
                brand: { _type: 'reference', _ref: brandId },
                category: { _type: 'reference', _ref: categoryId },
                description: `Global standardized matrix for ${cleanName}. High resistance to mechanical stress and thermal fatigue. Engineered explicitly under rigid industrial compliance.`,
                variants: []
            }
        }

        if (currentProduct && (size || code)) {
            const variant = {
                _key: uuidv4(),
                code: code || currentProduct.variants[0]?.code || 'N/A',
                size: size || 'Standard',
                packing: packing || 'Bulk',
                weight: weightStr,
                volume: volumeStr
            }
            if (variant.size !== 'Standard' || currentProduct.variants.length === 0) {
                currentProduct.variants.push(variant)
            }
        }
    }

    if (currentProduct) {
        products.push(currentProduct)
    }

    return products
}

async function main() {
    console.log('--- Initializing Sanity Database Connection ---')
    const existingBrands = await client.fetch(`*[_type == "brand"]{_id, name}`)
    for (const b of existingBrands) {
        brandMap.set(b.name.toLowerCase().trim(), b._id)
    }

    let fallbackCategory = await getOrCreateCategory('General Components')

    console.log('\n--- Scanning Directories ---')
    const brandDirs = fs.readdirSync(rootDir).filter(d => fs.statSync(path.join(rootDir, d)).isDirectory())

    let totalCreated = 0

    for (const d of brandDirs) {
        console.log(`\n📁 Processing Brand Folder: ${d}`)
        const brandId = await getOrCreateBrand(d)

        const brandPath = path.join(rootDir, d)
        const files = fs.readdirSync(brandPath).filter(f => (f.endsWith('.xlsx') || f.endsWith('.xls')) && !f.includes('~$'))

        for (const file of files) {
            console.log(`  📄 Reading File: ${file}`)

            // Derive category from filename via cleaning logic
            const categoryName = cleanCategoryName(file)
            const categoryId = await getOrCreateCategory(categoryName)

            const filePath = path.join(brandPath, file)

            try {
                const products = processExcelFile(filePath, brandId, categoryId)

                console.log(`     -> Found ${products.length} product aggregates in sheet. Pushing to CMS...`)

                if (products.length === 0) continue;

                let transaction = client.transaction()
                let txCount = 0;

                for (let i = 0; i < products.length; i++) {
                    const p = products[i];
                    transaction.createOrReplace(p)
                    txCount++;

                    // 每 50 条提交一次
                    if (txCount >= 50 || i === products.length - 1) {
                        console.log(`        -> Committing batch of ${txCount}...(${i + 1}/${products.length})`)
                        await transaction.commit()
                        totalCreated += txCount

                        transaction = client.transaction()
                        txCount = 0

                        await new Promise(r => setTimeout(r, 800))
                    }
                }
            } catch (err) {
                console.error(`     [X] Failed processing ${file}: ${err instanceof Error ? err.message : String(err)}`)
            }
        }
    }

    console.log(`\n✅ Upload complete! Total product structures imported: ${totalCreated}`)
}

main().catch(console.error)
