import sharp from "sharp";
export default class ImageProcessingJob {
    static async process({ inputPath, outputPath, width = 1200, height = 1200, quality = 85, }) {
        await sharp(inputPath)
            .resize(width, height, {
            fit: "inside",
            withoutEnlargement: true,
        })
            .webp({
            quality,
        })
            .toFile(outputPath);
        return outputPath;
    }
}
//# sourceMappingURL=ImageProcessingJob.js.map