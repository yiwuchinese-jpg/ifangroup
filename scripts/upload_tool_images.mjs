/**
 * upload_tool_images.mjs
 * 把 732/733 操作图片批量上传到 Sanity CDN，
 * 完成后打印新的 URL 映射，可直接替换 tools.ts 里的路径。
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error('❌ SANITY_AUTH_TOKEN 未设置');
  process.exit(1);
}

const client = createClient({
  projectId: 'm2e07kon',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token,
});

// 要上传的工具 ID 列表
const TOOLS = ['731', '732', '733'];

async function uploadAll() {
  const urlMap = {}; // { '731': { '1': 'https://...', ... }, ... }

  for (const toolId of TOOLS) {
    const stepsDir = path.resolve(`./public/images/tools/${toolId}/steps`);
    if (!fs.existsSync(stepsDir)) {
      console.log(`⚠️  跳过 ${toolId}，目录不存在: ${stepsDir}`);
      continue;
    }

    const files = fs.readdirSync(stepsDir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort((a, b) => parseInt(a) - parseInt(b));

    console.log(`\n📁 工具 ${toolId} — 找到 ${files.length} 张图片`);
    urlMap[toolId] = {};

    for (const filename of files) {
      const stepNum = path.parse(filename).name; // "1", "2", ...
      const filePath = path.join(stepsDir, filename);
      const sanityFilename = `tool-${toolId}-step-${stepNum}.jpg`;

      try {
        process.stdout.write(`  ⬆️  上传 ${filename} → ${sanityFilename} ... `);
        const asset = await client.assets.upload(
          'image',
          fs.createReadStream(filePath),
          { filename: sanityFilename, contentType: 'image/jpeg' }
        );
        const cdnUrl = asset.url;
        urlMap[toolId][stepNum] = cdnUrl;
        console.log(`✅`);
      } catch (err) {
        console.log(`❌ ${err.message}`);
      }
    }
  }

  // 输出结果
  console.log('\n\n========== ✅ 上传完成，URL 映射如下 ==========\n');
  for (const [toolId, steps] of Object.entries(urlMap)) {
    console.log(`\n// Tool ${toolId}`);
    for (const [step, url] of Object.entries(steps)) {
      console.log(`  step ${step}: "${url}"`);
    }
  }

  // 自动更新 tools.ts
  console.log('\n\n🔄 正在自动更新 src/lib/data/tools.ts ...\n');
  const toolsPath = path.resolve('./src/lib/data/tools.ts');
  let content = fs.readFileSync(toolsPath, 'utf8');

  for (const [toolId, steps] of Object.entries(urlMap)) {
    for (const [stepNum, cdnUrl] of Object.entries(steps)) {
      const localPath = `/images/tools/${toolId}/steps/${stepNum}.jpg`;
      content = content.replaceAll(`"${localPath}"`, `"${cdnUrl}"`);
    }
  }

  fs.writeFileSync(toolsPath, content, 'utf8');
  console.log('✅ tools.ts 已自动更新为 Sanity CDN URL！');
  console.log('\n下一步：运行以下命令清理本地图片并推送代码：');
  console.log('  git rm -r --cached public/images/tools');
  console.log('  echo "public/images/tools/" >> .gitignore');
  console.log('  git add -A && git commit -m "feat: migrate tool images to Sanity CDN" && git push');
}

uploadAll();
