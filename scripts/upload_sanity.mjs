// scripts/upload_sanity.mjs
import fs from "fs/promises";
import path from "path";
import { createReadStream } from "fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "m2e07kon",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN || "skv96JDQU6h6xgZMQf3oUk32RZ7d3roArJ3mzUsgrasppdL5Mhx6zCk8ldvMjji6o4fRvhUF7ojzZmW9eY7NJxjfWEPpNbOVCW7xo8ts6P9DdyzciBWb6C6bNiVRFaqPx7z3OYOnSfYlq2jaCN2VVhRgulKvSUdpRMVWnoPmPODRjsph5t3H"
});

const DIR = "./public/images";
let map = {};

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

async function uploadAll() {
  console.log("准备将压缩后的本地图片上传至 Sanity 云端媒体库...");
  const files = await walk(DIR);
  let count = 0;
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"].includes(ext)) continue;
    
    // 相对路径，如 /images/static/abc.png
    const relativePath = file.substring(file.indexOf("/public/images")).replace("/public", "");
    
    try {
      const rs = createReadStream(file);
      const asset = await client.assets.upload('image', rs, { filename: path.basename(file) });
      map[relativePath] = asset.url; // 记录映射
      console.log(`✅ 上传成功 [${++count}]: ${relativePath} -> ${asset.url}`);
    } catch (e) {
      console.error(`❌ 上传失败: ${relativePath} -`, e.message);
    }
  }
  
  // 保存映射字典以备全局替换使用
  await fs.writeFile("./image-map.json", JSON.stringify(map, null, 2), "utf-8");
  console.log("🎉 全部上传完成！映射字典已保存到 image-map.json");
}

uploadAll();
