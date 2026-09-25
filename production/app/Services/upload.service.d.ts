import multer from "multer";
export declare function upload(): multer.Multer;
export declare function uploadSingle(fieldName: string): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare function uploadMultiple(fieldName: string, maxCount: number): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare function removeFile(fieldName: string): boolean;
export declare function storageLink(name: string): string;
//# sourceMappingURL=upload.service.d.ts.map