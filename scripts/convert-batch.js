const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_EXCEL_DIR = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/20，ifan及风帆旗下品牌价格';
const TEMP_CONVERT_DIR = '/tmp/ifangroup-excel-converted';

async function run() {
    console.log('--- Starting Legacy .xls conversion ---');
    if (fs.existsSync(TEMP_CONVERT_DIR)) {
        fs.rmSync(TEMP_CONVERT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_CONVERT_DIR, { recursive: true });

    const getFiles = (dir) => {
        let filesList = [];
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const fullPath = path.join(dir, f);
            if (fs.statSync(fullPath).isDirectory()) {
                filesList = filesList.concat(getFiles(fullPath));
            } else if (fullPath.toLowerCase().endsWith('.xls')) {
                // Ensure we don't accidentally convert .xlsx if named weirdly, strictly .xls
                if (!fullPath.toLowerCase().endsWith('.xlsx') && !fullPath.includes('~$')) {
                    filesList.push(fullPath);
                }
            }
        }
        return filesList;
    };

    const xlsFiles = getFiles(BASE_EXCEL_DIR);
    console.log(`Found ${xlsFiles.length} legacy .xls files.`);

    const sofficePath = '/Applications/LibreOffice.app/Contents/MacOS/soffice';

    for (const file of xlsFiles) {
        console.log(`Converting: ${path.basename(file)}`);

        // Output directory per file to maintain parent folder structure context (useful for Brand parsing later)
        const parentFolderName = path.basename(path.dirname(file));
        const outDir = path.join(TEMP_CONVERT_DIR, parentFolderName);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        try {
            // Note: --outdir must be an existing directory
            execSync(`"${sofficePath}" --headless --invisible --nocrashreport --nodefault --nofirststartwizard --nologo --norestore --convert-to xlsx "${file}" --outdir "${outDir}"`, { stdio: 'ignore' });
            console.log(`  -> Converted to ${outDir}`);
        } catch (e) {
            console.error(`  -> Failed to convert ${file}`);
        }
    }

    console.log('\n--- Conversion Complete ---');
}

run();
