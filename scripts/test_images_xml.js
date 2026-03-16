const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../temp_excel_products');
const rels = {};
const anchors = [];

if (fs.existsSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'))) {
    const drawingXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/drawing1.xml'), 'utf8');
    const relsXml = fs.readFileSync(path.join(TEMP_DIR, 'xl/drawings/_rels/drawing1.xml.rels'), 'utf8');

    const relMatches = relsXml.matchAll(/Id="(rId\d+)"[^>]+Target="\.\.\/media\/(image\d+\.\w+)"/g);
    for (const match of relMatches) {
        rels[match[1]] = match[2];
    }
    console.log("Found", Object.keys(rels).length, "relationships.");

    // Better way to parse anchors
    // Split by <xdr:twoCellAnchor> or <xdr:oneCellAnchor>
    const anchorBlocks = drawingXml.split(/<xdr:(two|one)CellAnchor/);
    for (const block of anchorBlocks) {
        const fromRowMatch = block.match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/);
        const blipMatch = block.match(/<a:blip r:embed="(rId\d+)"/);
        if (fromRowMatch && blipMatch) {
            anchors.push({
                row: parseInt(fromRowMatch[1]) + 1,
                rId: blipMatch[1]
            });
        }
    }
    console.log("Found", anchors.length, "anchors.");
    console.log("Sample Anchors:", anchors.slice(0, 5));

    // Test the original regex logic:
    const originalAnchors = [];
    const anchorMatches = drawingXml.matchAll(/<xdr:row>(\d+)<\/xdr:row>[\s\S]*?<a:blip r:embed="(rId\d+)"/g);
    for (const match of anchorMatches) {
        originalAnchors.push({
            row: parseInt(match[1]) + 1,
            rId: match[2]
        });
    }
    console.log("Original regex found:", originalAnchors.length, "anchors.");
} else {
    console.log('drawing1.xml not found. Please run seed-products.js first or unzip manually.');
}
