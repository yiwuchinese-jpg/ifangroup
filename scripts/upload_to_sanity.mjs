import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// 从 .env.local 提取 token (简单起见，这里先读系统环境，我们会在 run_command 塞进去)
const token = process.env.SANITY_AUTH_TOKEN;

const client = createClient({
  projectId: 'm2e07kon',
  dataset: 'production', // 此处假设是 production，如果有异等下再改
  useCdn: false,
  apiVersion: '2023-05-03',
  token: token
});

async function uploadVideo() {
  const filePath = path.resolve('./public/images/static/home-hero.mp4');
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
  }

  console.log('Uploading home-hero.mp4 (', fs.statSync(filePath).size / 1024 / 1024, 'MB ) to Sanity...');
  try {
    const asset = await client.assets.upload('file', fs.createReadStream(filePath), {
      filename: 'home-hero.mp4'
    });
    console.log('Upload successful!');
    console.log('--- REPLACEMENT URL ---');
    console.log(asset.url);
    console.log('-----------------------');
  } catch (err) {
    console.error('Upload failed:', err);
    process.exit(1);
  }
}

uploadVideo();
