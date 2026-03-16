const XLSX = require('xlsx');
const workbook = XLSX.readFile('/Users/justin/Desktop/文件分类/独立站/ifan 集团/IFANGroup 2025-2-7 Justin更新.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const brands = {};
let currentBrand = null;

for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    const brandName = row[3]; // __EMPTY_2 column based on index, let's just search
    
    // Actually, header: 1 gives an array of arrays.
    // Row 0 is roughly: ["IFANGroup 品牌整理", "__EMPTY", "__EMPTY_1", "__EMPTY_2", "__EMPTY_3", "__EMPTY_4"]
    // Let's just find the column indices manually.
    // Oh wait, let's just print the first 20 rows of header:1 to see the exact structure.
}
console.log(JSON.stringify(rawData.slice(0, 20), null, 2));
