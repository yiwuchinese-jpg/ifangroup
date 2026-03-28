import fs from 'fs';
import path from 'path';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            // 不处理定义了路由组件的本身
            if (fullPath.includes('navigation.ts')) continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            const regex = /import\s+Link\s+from\s+['"]next\/link['"];?/g;
            if (regex.test(content)) {
                content = content.replace(regex, 'import { Link } from "@/i18n/navigation";');
                fs.writeFileSync(fullPath, content);
                console.log('✅ 修复成功:', fullPath);
            }
        }
    }
}

try {
    walkDir('./src');
    console.log('🎉 所有 Link 组件全局修正完毕！');
} catch (error) {
    console.error('修复过程中遇到错误:', error);
}
