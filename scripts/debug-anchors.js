const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { execSync } = require('child_process');

const file = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/20，ifan及风帆旗下品牌价格/Bekaatherm/BEKAATHERM 128 PPR GREY 163 2026-2-11 美员更新.XLSX';
const TEMP_EXTRACT_DIR = '/tmp/ifangroup-excel-extract-debug';

async function run() {
    let workbook = XLSX.readFile(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

    const rowToSPU = new Map();
    for (let i = 0; i < data.length; i++) {
        const rowData = data[i];
        if (!rowData || rowData.length < 2) continue;
        const nameCell = rowData[1] ? String(rowData[1]).trim() : '';
        if (nameCell && nameCell.length > 2 && nameCell !== 'Name') {
            const cleanName = nameCell.split('\n')[0].trim();
            rowToSPU.set(i + 1, cleanName);
        }
    }

    if (fs.existsSync(TEMP_EXTRACT_DIR)) {
        fs.rmSync(TEMP_EXTRACT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_EXTRACT_DIR, { recursive: true });
    try {
        execSync(`unzip -o "${file}" "xl/drawings/drawing1.xml" "xl/drawings/_rels/drawing1.xml.rels" "xl/media/*" -d "${TEMP_EXTRACT_DIR}"`, { stdio: 'ignore' });
    } catch (e) { }

    const rels = {};
    const anchors = [];

    const drawingXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/drawings/drawing1.xml');
    const relsXmlPath = path.join(TEMP_EXTRACT_DIR, 'xl/drawings/_rels/drawing1.xml.rels');
    if (fs.existsSync(drawingXmlPath) && fs.existsSync(relsXmlPath)) {
        const drawingXml = fs.readFileSync(drawingXmlPath, 'utf8');
        const relsXml = fs.readFileSync(relsXmlPath, 'utf8');

        const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image[^"]+)"/g);
        for (const match of relMatches) { rels[match[1]] = match[2]; }

        const anchorBlocks = drawingXml.split(/<xdr:(two|one)CellAnchor/);
        for (const block of anchorBlocks) {
            const fromRowMatch = block.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/);
            const blipMatch = block.match(/<a:blip r:embed="(rId\d+)"/);
            if (fromRowMatch && blipMatch) {
                anchors.push({ row: parseInt(fromRowMatch[1]) + 1, rId: blipMatch[1] });
            }
        }
    }

    anchors.sort((a, b) => a.row - b.row);
    console.log("Anchors found:", anchors);

    for (const [sRow, spuName] of rowToSPU.entries()) {
        if (spuName.includes('Male Thread plug') || spuName.includes('Elbow')) {
            console.log(`\nProduct: ${spuName} (Row ${sRow})`);
            let closestAnchor = null;
            for (const anch of anchors) {
                if (anch.row <= sRow + 2) {
                    if (!closestAnchor || anch.row > closestAnchor.row) {
                        closestAnchor = anch;
                    }
                }
            }
            if (closestAnchor) {
                console.log(`  -> Closest Anchor: row ${closestAnchor.row}, image: ${rels[closestAnchor.rId]}`);
                const imagePath = path.join(TEMP_EXTRACT_DIR, 'xl/media', rels[closestAnchor.rId]);
                console.log(`  -> Image Exists on Disk? ${fs.existsSync(imagePath)}`);
            } else {
                console.log(`  -> NO ANCHOR FOUND`);
            }
        }
    }
}

run();
