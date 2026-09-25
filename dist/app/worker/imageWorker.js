import { parentPort, workerData } from 'worker_threads';
import sharp from 'sharp';
import path from 'path';
const watermarkPath = process.cwd() + '/storage/uploads/logo.png';
import crypto from "crypto";
async function processImage() {
    try {
        const { inputPath, outputPath, fileName, label, size } = workerData;
        const imageSize = size || 400;
        const name = (fileName || `${crypto.randomBytes(16).toString("hex")}`) + ".webp";
        const newPath = path.join(outputPath, name);
        let transparentWatermarkBuffer;
        try {
            const resizedWatermarkBuffer = await sharp(watermarkPath)
                .resize({ height: imageSize, width: imageSize })
                .toBuffer();
            transparentWatermarkBuffer = await sharp(resizedWatermarkBuffer)
                .resize({ width: 40, height: 40 })
                .ensureAlpha()
                .linear([1, 1, 1, 0.6], [0, 0, 0, 0])
                .toBuffer();
        }
        catch {
            transparentWatermarkBuffer = undefined;
        }
        const shar = sharp(inputPath)
            .resize(imageSize, imageSize, { fit: 'inside' })
            .toFormat('webp');
        if (transparentWatermarkBuffer !== undefined && label == true) {
            shar.composite([
                {
                    input: transparentWatermarkBuffer,
                    gravity: 'center',
                    blend: 'over',
                }
            ]);
        }
        await shar.jpeg({ quality: 80 })
            .toFile(newPath);
        if (parentPort) {
            parentPort.postMessage({
                success: true,
                path: newPath,
                name
            });
        }
    }
    catch (error) {
        console.log(error);
        if (parentPort) {
            parentPort.postMessage({ success: false, error: error instanceof Error ? error.message : String(error) });
        }
    }
}
processImage();
//# sourceMappingURL=imageWorker.js.map