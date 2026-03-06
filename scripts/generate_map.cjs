const fs = require('fs');

async function createEarthMap() {
  const { createCanvas } = await import('canvas');

  // 1. Setup Canvas
  const width = 2048;
  const height = 1024;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background - transparent
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, width, height);

  // 2. Load GeoJSON
  const rawData = fs.readFileSync('/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/public/models/countries.json', 'utf8');
  const data = JSON.parse(rawData);

  // 3. Drawing functions
  function project(lon, lat) {
    // Equirectangular projection
    const x = (lon + 180) * (width / 360);
    const y = (90 - lat) * (height / 180);
    return [x, y];
  }

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  data.features.forEach((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return;

    if (geometry.type === 'Polygon') {
      drawPolygon(geometry.coordinates);
    } else if (geometry.type === 'MultiPolygon') {
      geometry.coordinates.forEach(drawPolygon);
    }
  });

  function drawPolygon(rings) {
    rings.forEach((ring) => {
      ctx.beginPath();
      ring.forEach((coord, i) => {
        const [x, y] = project(coord[0], coord[1]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
  }

  // 4. Save Image
  const out = fs.createWriteStream('/Users/justin/Desktop/文件分类/独立站/ifan 集团/ifangroup-web/public/models/earth-map-lines.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
  return new Promise((resolve) => {
      out.on('finish', () => resolve('Map generated!'));
  });
}

createEarthMap()
  .then(console.log)
  .catch(err => {
     console.log("Canvas module might be missing, error:", err.message);
  });
