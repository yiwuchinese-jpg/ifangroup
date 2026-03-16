const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const client = createClient({ projectId: 'm2e07kon', dataset: 'production', useCdn: false, apiVersion: '2024-02-26', token: process.env.SANITY_AUTH_TOKEN });

const BASE_EXCEL_DIR = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/20，ifan及风帆旗下品牌价格';
const TEMP_CONVERT_DIR = '/tmp/ifangroup-excel-converted';

function normalize(str) {
    return String(str).toLowerCase().replace(/[\s\r\n\t_]+/g, '');
}

async function run() {
    const missing = await client.fetch('*[_type == "product" && !defined(mainImage)]{name, "brandName": brand->name}');
    console.log(`Missing count: ${missing.length}`);

    const missingNamesNormalized = missing.map(p => ({
        sanityName: p.name,
        norm: normalize(p.name),
        brand: normalize(p.brandName || '')
    }));

    let foundMatches = 0;

    const findInExcel = (filePath, source, parentFolder) => {
        let workbook;
        try { workbook = XLSX.readFile(filePath); } catch (e) { return; }

        for (let sheetIdx = 0; sheetIdx < workbook.SheetNames.length; sheetIdx++) {
            const sheet = workbook.Sheets[workbook.SheetNames[sheetIdx]];
            const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

            for (let i = 0; i < data.length; i++) {
                const rowData = data[i];
                if (!rowData || rowData.length < 2) continue;

                const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
                if (nameCell.length > 2) {

                    // Attempt 1: First line only (old logic)
                    const clean1 = normalize(nameCell.split('\n')[0].trim());
                    // Attempt 2: All lines flattened
                    const clean2 = normalize(nameCell);

                    const folderNorm = normalize(parentFolder);

                    for (const m of missingNamesNormalized) {
                        if (m.brand === folderNorm) {
                            if (m.norm === clean1 || m.norm === clean2 || clean2.includes(m.norm) || m.norm.includes(clean2)) {
                                console.log(`✅ MATCH: Sanity "${m.sanityName}" <-> Excel "${nameCell.replace(/\n/g, '\\n')}"`);
                                foundMatches++;
                                m.found = true;
                            }
                        }
                    }
                }
            }
        }
    };

    const runDir = (dir, source) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                runDir(fullPath, source);
            } else if (fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                findInExcel(fullPath, source, path.basename(path.dirname(fullPath)));
            }
        }
    };

    runDir(BASE_EXCEL_DIR, 'native');
    runDir(TEMP_CONVERT_DIR, 'converted');

    console.log(`\nMatched ${foundMatches} out of ${missing.length} missing products with new logic.`);
}

run();
