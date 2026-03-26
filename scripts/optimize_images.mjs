import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const DIR = "./public/images";
const MAX_WIDTH = 1920;

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
  console.log("正在扫描图片...");
  const files = await walk(DIR);
  let savedBytes = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    
    try {
      const stats = await fs.stat(file);
      const originalSize = stats.size;
      
      // 读取原图
      const image = sharp(file);
      const metadata = await image.metadata();
      
      // 设置新图参数：按比例缩小超过 1920 的图
      let newImage = image;
      if (metadata.width && metadata.width > MAX_WIDTH) {
        newImage = newImage.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      
      const tmpFile = file + ".tmp";
      
      if (ext === ".png") {
        await newImage.png({ quality: 75, compressionLevel: 9 }).toFile(tmpFile);
      } else {
        await newImage.jpeg({ quality: 75, progressive: true }).toFile(tmpFile);
      }
      
      const newStats = await fs.stat(tmpFile);
      // 如果压缩后确实变小了，替换原文件，否则删除临时文件
      if (newStats.size < originalSize) {
        await fs.rename(tmpFile, file);
        savedBytes += (originalSize - newStats.size);
        console.log(`✅ 已压缩: ${path.basename(file)} (省下 ${(originalSize - newStats.size) / 1024 / 1024 | 0} MB)`);
      } else {
        await fs.unlink(tmpFile);
      }
    } catch (e) {
      console.error(`❌ 操作失败: ${file} -`, e.message);
    }
  }
  console.log(`\n🎉 压缩完毕！总共节省了: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimize();
