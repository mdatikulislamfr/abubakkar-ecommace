import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// ES Module a __dirname toiri korar niom
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Jekhane copy hobe sei folder er nam
const targetFolder = 'production';
// Apni je je file ba folder copy korte chan tar list ekhane din
const itemsToCopy = [
    'dist',
    'public',
    'package-lock.json',
    'package.json',
];
// 1. Ager production folder thakle seta delete kore notun kore toiri korbe
if (fs.existsSync(targetFolder)) {
    fs.rmSync(targetFolder, { recursive: true, force: true });
}
fs.mkdirSync(targetFolder);
itemsToCopy.forEach((item) => {
    const srcPath = path.join(__dirname, item);
    const destPath = path.join(__dirname, targetFolder, item);
    if (fs.existsSync(srcPath)) {
        fs.cpSync(srcPath, destPath, { recursive: true });
        console.log(`✅ Copied: ${item}`);
    }
    else {
        console.log(`⚠️ Warning: '${item}' not found!`);
    }
});
console.log("🎉 Production files copied successfully! path:dist/src/server.js");
//# sourceMappingURL=production.js.map