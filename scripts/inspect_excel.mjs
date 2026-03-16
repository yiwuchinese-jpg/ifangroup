import * as xlsx from 'xlsx';
import fs from 'fs';

const filePath = process.argv[2];
if (!filePath || !fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

const workbook = xlsx.readFile(filePath);
console.log('--- Sheet Names ---');
console.log(workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
    console.log(`\n--- First Row of [${sheetName}] ---`);
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    if (data.length > 0) {
        console.log(data[0]);
    }
});
