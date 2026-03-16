const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const BASE_EXCEL_DIR = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/20，ifan及风帆旗下品牌价格';
const TEMP_CONVERT_DIR = '/tmp/ifangroup-excel-converted';

function findInExcel(filePath, source) {
    let workbook;
    try { workbook = XLSX.readFile(filePath); } catch (e) { return; }

    for (let sheetIdx = 0; sheetIdx < workbook.SheetNames.length; sheetIdx++) {
        const sheetName = workbook.SheetNames[sheetIdx];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];
            if (!rowData || rowData.length < 2) continue;

            const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
            const clean = nameCell.toLowerCase();
            if (clean.includes('butterfly handle') || clean.includes('2layer 4m')) {
                console.log(`\n✅ FOUND: ${nameCell.split('\n')[0].trim()}`);
                console.log(`   Source: ${source}`);
                console.log(`   File: ${filePath}`);
                console.log(`   Tab: ${sheetName} (Index ${sheetIdx})`);
                console.log(`   Row: ${i + 1}`);
            }
        }
    }
}

function run() {
    const getNative = (dir) => {
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getNative(fullPath);
            } else if (fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                findInExcel(fullPath, 'native .xlsx');
            }
        }
    };
    getNative(BASE_EXCEL_DIR);

    const getConverted = (dir) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                getConverted(fullPath);
            } else if (fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                findInExcel(fullPath, 'converted legacy .xlsx');
            }
        }
    };
    getConverted(TEMP_CONVERT_DIR);
}

run();
