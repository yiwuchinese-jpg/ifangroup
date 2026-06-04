import * as xlsx from 'xlsx'
import path from 'path'
import { getCliClient } from 'sanity/cli'

const client = getCliClient()
const excelFilePath = path.resolve('../ifangroup-web/IFANGroup 2025-13 WANG更新(1).xlsx1.xlsx')

function parseExcel() {
    const workbook = xlsx.readFile(excelFilePath)
    const sheetName = workbook.SheetNames[0]
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }) as any[][]

    const brands = []
    for (let i = 2; i < rows.length; i++) {
        const row = rows[i]
        if (!row || row.length === 0) continue
        const brandNameCol = row[3]
        if (brandNameCol && typeof brandNameCol === 'string' && brandNameCol.trim() !== '') {
            brands.push(brandNameCol.trim())
        }
    }
    return brands
}

async function main() {
    const validBrandNames = parseExcel()
    console.log(`Found ${validBrandNames.length} valid brands in Excel.`)

    const existingBrands = await client.fetch(`*[_type == "brand"]{_id, name}`)
    console.log(`Found ${existingBrands.length} brands in Sanity.`)

    for (const b of existingBrands) {
        // We do case-insensitive comparison just in case
        const isValid = validBrandNames.find(v => v.toLowerCase() === b.name.toLowerCase())
        if (!isValid) {
            console.log(`Deleting obsolete brand: ${b.name} (ID: ${b._id})`)
            await client.delete(b._id)
        }
    }

    console.log('Cleanup finished.')
}

main().catch(console.error)
