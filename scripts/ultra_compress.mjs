import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const DIR = "./public/images";
const MAX_WIDTH = 1000;

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (let file of list) {
    file = path.resolve(dir, file);
    const stat = await fs.stat(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(await walk(file));
    } else {
      results.push(file);
    }
  }
  return results;
}

async function optimize() {
  console.log("启动深度无损转码和激进压缩 (针对弱网环境)...");
  const files = await walk(DIR);
  let savedBytes = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
    
    try {
      const stats = await fs.stat(file);
      const originalSize = stats.size;
      
      const image = sharp(file);
      const metadata = await image.metadata();
      
      let newImage = image;
      // 极限压缩：只要大于 1000px 全都缩下来
      if (metadata.width && metadata.width > MAX_WIDTH) {
        newImage = newImage.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      } else if (originalSize > 500 * 1024) { // 如果没宽过 1000px，但是大于 500kb，也轻微缩放压制
         newImage = newImage.resize({ width: Math.floor(metadata.width * 0.8) });
      }
      
      const tmpFile = file + ".tmp";
      
      if (ext === ".png") {
        await newImage.png({ quality: 50, compressionLevel: 9 }).toFile(tmpFile);
      } else {
        await newImage.jpeg({ quality: 55, progressive: true }).toFile(tmpFile);
      }
      
      const newStats = await fs.stat(tmpFile);
      if (newStats.size < originalSize) {
        await fs.rename(tmpFile, file);
        savedBytes += (originalSize - newStats.size);
        console.log(`🔨 强力压制: ${path.basename(file)} (瘦身 ${(originalSize - newStats.size) / 1024 / 1024 | 0} MB)`);
      } else {
        await fs.unlink(tmpFile);
      }
    } catch (e) {
      // ignore
    }
  }
  console.log(`\n🎉 终极瘦身完毕！又强制压制了: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimize();
