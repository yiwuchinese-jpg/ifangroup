const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: 'm2e07kon',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

async function main() {
  const glbPath = '/Users/justin/Desktop/文件分类/独立站/ifan 集团/gw4.glb';
  
  const stats = fs.statSync(glbPath);
  console.log(`File: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  console.log('Uploading gw4.glb...');
  
  const asset = await client.assets.upload('file', fs.createReadStream(glbPath), {
    filename: 'gw4.glb',
    contentType: 'model/gltf-binary',
  });
  
  console.log('Uploaded:', asset.url);

  await client.patch('brand-ifanpro')
    .set({
      packaging3dModel: {
        _type: 'file',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit();
  
  console.log('SUCCESS! packaging3dModel updated with gw4.glb');
}

main().catch(err => { console.error(err.message); process.exit(1); });
