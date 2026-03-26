import fs from "fs/promises";
import path from "path";

const SRC_DIRS = ["./src", "./messages"]; // 我们只替换 src 和 messages 目录

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

async function replaceAllUrls() {
  console.log("加载映射文件...");
  const mapData = await fs.readFile("./image-map.json", "utf-8");
  const imageMap = JSON.parse(mapData);
  
  let filesToProcess = [];
  for (const dir of SRC_DIRS) {
    filesToProcess = filesToProcess.concat(await walk(dir));
  }
  
  // 只处理文本文件 .ts, .tsx, .json, .css 等
  filesToProcess = filesToProcess.filter(f => /\.(tsx|ts|json|jsx|js|css)$/.test(f));
  
  let totalReplacedFiles = 0;
  
  for (const file of filesToProcess) {
    try {
      let content = await fs.readFile(file, "utf-8");
      let originalContent = content;
      let fileChanged = false;
      
      for (const [localPath, remoteUrl] of Object.entries(imageMap)) {
        // 全局替换纯字符串路径
        if (content.includes(localPath)) {
          content = content.replaceAll(localPath, remoteUrl);
          fileChanged = true;
        }
      }
      
      if (fileChanged) {
        await fs.writeFile(file, content, "utf-8");
        console.log(`📝 已更新: ${file}`);
        totalReplacedFiles++;
      }
    } catch (e) {
      console.error(`无法处理: ${file} - ${e.message}`);
    }
  }
  console.log(`\n✅ 代码内图片全量替换完成，共修改了 ${totalReplacedFiles} 个文件！`);
}

replaceAllUrls();
