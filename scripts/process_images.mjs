import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/2026-03-19';
const targetBaseDir = path.resolve('./public/images/categories');

// 强制对应映射字典 (处理了用户中文不规范或者连字问题)
const slugMap = {
    'Angle Valves &Hoses': 'angle-valves',
    'Brass Fittings': 'brass-fittings',
    'Brass Valves &Manifolds': 'hvac-valves',
    'Faucets &Accessories': 'faucets',
    'Gas System Products': 'gas-systems',
    'HDPE': 'hdpe',
    'PEXA': 'pexa',
    'PEXPPSU': 'pex-ppsu',
    'PP': 'pp',
    'PPH': 'pph',
    'PPR': 'ppr',
    'PVC': 'pvc',
    'Stainless Steel Corrugated Pipes': 'stainless-corrugated',
    'Stainless SteelPress Fittings': 'stainless-press'
};

async function processImages() {
    if (!fs.existsSync(targetBaseDir)) {
        fs.mkdirSync(targetBaseDir, { recursive: true });
    }

    const folders = fs.readdirSync(sourceDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const folder of folders) {
        const slug = slugMap[folder];
        if (!slug) {
            console.warn(`[Skip] 没有找到对应的分类 slug 映射：${folder}`);
            continue;
        }

        const inputDir = path.join(sourceDir, folder);
        const outputDir = path.join(targetBaseDir, slug);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // 拿图片文件
        let files = fs.readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
        if (files.length === 0) {
            console.log(`[Empty] 目录 ${folder} 下无图片`);
            continue;
        }
        
        // 尽量取大的图或排在前面的图做 hero
        files = files.sort((a, b) => fs.statSync(path.join(inputDir, b)).size - fs.statSync(path.join(inputDir, a)).size);

        console.log(`\n⏳ 准备洗图 -> ${folder} (${files.length} 张)...`);
        
        for (let i = 0; i < files.length; i++) {
            if (i > 9) break; // 最多要 10 张（1背景，1签名，8 gallery）
            
            const file = files[i];
            const inputPath = path.join(inputDir, file);
            let targetName = '';
            let targetWidth = 1000; // 默认 Gallery 宽度

            if (i === 0) {
                targetName = 'hero-bg.webp';
                targetWidth = 1920; 
            } else if (i === 1) {
                targetName = 'signature.webp';
                targetWidth = 800;
            } else {
                targetName = `gallery-${i - 1}.webp`;
            }

            const outputPath = path.join(outputDir, targetName);

            try {
                await sharp(inputPath)
                    .resize({ width: targetWidth, withoutEnlargement: true })
                    .webp({ quality: 70 })
                    .toFile(outputPath);
                
                console.log(`  ✅ ${targetName} 包装完毕`);
            } catch (err) {
                console.error(`  ❌ 处理 ${file} 出现错误:`, err);
            }
        }
    }
    
    console.log('\n🎉 所有类别共 14x10 余张极简超清 WebP 洗图压制完美收工！');
}

processImages();
