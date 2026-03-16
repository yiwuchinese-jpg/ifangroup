const XLSX = require('xlsx');
const EXCEL_PATH = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/1-103-1，IFANPro 103 PPR 2103 2026-2-11 美员更新.xlsx';
const workbook = XLSX.readFile(EXCEL_PATH);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
for(let i=0; i<min(100, data.length); i++) {
    if (data[i] && data[i][1]) console.log(`Row ${i+1}: ${data[i][1].substring(0, 30)}`);
}
function min(a,b){return a<b?a:b;}
