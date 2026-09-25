import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFolder: string = 'production';

const itemsToCopy: string[] = [
    'public',
    'package-lock.json',
    'package.json',
    'storage',
    '.env'
];

if (fs.existsSync(targetFolder)) {
    fs.rmSync(targetFolder, { recursive: true, force: true });
}
fs.mkdirSync(targetFolder);

const distPath: string = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    const distItems = fs.readdirSync(distPath); 
    
    distItems.forEach((item: string) => {
        // 'database' ফোল্ডারটি ইগনোর করা হচ্ছে
        if (item === 'database') {
            console.log(`🚫 Ignored: ${item} (from dist)`);
            return; 
        }

        const src: string = path.join(distPath, item);
        const dest: string = path.join(__dirname, targetFolder, item);
        fs.cpSync(src, dest, { recursive: true });
    });
    console.log(`✅ Copied contents inside 'dist' directly to '${targetFolder}'`);
} else {
    console.log(`⚠️ Warning: 'dist' folder not found!`);
}

itemsToCopy.forEach((item: string) => {
    const srcPath: string = path.join(__dirname, item);
    const destPath: string = path.join(__dirname, targetFolder, item);

    if (fs.existsSync(srcPath)) {
        fs.cpSync(srcPath, destPath, { recursive: true });
        console.log(`✅ Copied: ${item}`);
    } else {
        console.log(`⚠️ Warning: '${item}' not found!`);
    }
});

console.log(`🎉 Production files copied successfully! path: ${targetFolder}`);