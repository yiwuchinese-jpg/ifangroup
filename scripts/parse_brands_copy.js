const XLSX = require('xlsx');
const workbook = XLSX.readFile('/Users/justin/Desktop/文件分类/独立站/ifan 集团/IFANGroup 2025-2-7 Justin更新.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const brands = {};
let currentBrand = null;

for (let i = 2; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row) continue;
    
    if (row[3]) {
        currentBrand = row[3];
        brands[currentBrand] = { details: [] };
    }
    
    if (currentBrand && row[5]) {
        brands[currentBrand].details.push(row[5]);
    }
}

console.log(JSON.stringify(brands, null, 2));
