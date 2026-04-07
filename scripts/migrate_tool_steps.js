const fs = require('fs');
const path = require('path');

const srcBase = "/Users/justin/Desktop/文件分类/独立站/ifan 集团/技术二维码";
const destBase = path.join(__dirname, '../public/images/tools');

const toolDirs = [
  { id: "731", dir: " 731/滑径工具ifan-731", videoId: "AE7_clkBmOg" },
  { id: "732", dir: "732/滑径工具ifan-732", videoId: "YPhPM9uQ-6w" },
  { id: "733", dir: "733/滑径工具ifan-733", videoId: "orpM7pjsjO8" }
];

const toolsData = {};

toolDirs.forEach(t => {
  const fullPath = path.join(srcBase, t.dir);
  if (!fs.existsSync(fullPath)) return;
  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.jpg'));
  
  // Sort files by numeral at beginning
  files.sort((a, b) => {
    const numA = parseInt(a.match(/^(\d+)/)?.[1] || 0);
    const numB = parseInt(b.match(/^(\d+)/)?.[1] || 0);
    return numA - numB;
  });

  const stepsDir = path.join(destBase, t.id, 'steps');
  if (!fs.existsSync(stepsDir)) {
    fs.mkdirSync(stepsDir, { recursive: true });
  }

  const steps = files.map((file, index) => {
    const stepNumber = index + 1;
    
    // Extract base text
    const baseName = file.replace(/\.jpg\.jpg$/, '').replace(/\.jpg$/, '');
    const match = baseName.match(/^(\d+)\.(.+?)([\u4e00-\u9fa5].*)$/);
    let enText = baseName, zhText = "";
    if (match) {
      enText = match[2].trim();
      zhText = match[3].trim();
    } else {
      enText = baseName.replace(/^\d+\./, '').trim();
    }
    
    // Check if there is some weird empty English text situation
    if(!enText || enText === "") enText = zhText;

    const newFileName = `step-${stepNumber}.jpg`;
    const targetPath = path.join(stepsDir, newFileName);
    fs.copyFileSync(path.join(fullPath, file), targetPath);

    return {
      step: stepNumber,
      image: `/images/tools/${t.id}/steps/${newFileName}`,
      textEn: enText,
      // textZh: zhText // Not currently used directly in UI as per requirements, but we have english fallback
    };
  });

  toolsData[t.id] = {
    id: t.id,
    videoId: t.videoId,
    steps: steps
  };
});

const tsContent = `export interface ToolStep {
  step: number;
  image: string;
  textEn: string;
}

export interface ToolData {
  id: string;
  videoId: string; // YouTube video ID
  steps: ToolStep[];
}

export const toolsData: Record<string, ToolData> = ${JSON.stringify(toolsData, null, 2)};

export const getToolById = (id: string): ToolData | undefined => {
  return toolsData[id];
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/data/tools.ts'), tsContent, 'utf-8');
console.log('Script completed successfully!');
