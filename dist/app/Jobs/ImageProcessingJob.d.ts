export default class ImageProcessingJob {
    static process({ inputPath, outputPath, width, height, quality, }: {
        inputPath: string;
        outputPath: string;
        width?: number;
        height?: number;
        quality?: number;
    }): Promise<string>;
}
//# sourceMappingURL=ImageProcessingJob.d.ts.map