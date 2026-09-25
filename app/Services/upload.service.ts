import multer from "multer";
import config from "../../config/multer.js"
import { unlink } from "fs";
export function upload() {
    return multer({
        ...config.multer
    });
}
export function uploadSingle(fieldName: string) {
    return upload().single(fieldName);
}
export function uploadMultiple(fieldName: string, maxCount: number) {
    return upload().array(fieldName, maxCount);
}
export function removeFile(fieldName: string): boolean {
    let status = false;
    unlink(fieldName, (err) => {
        status = true;
        if (err) {
            status = true;
        } else {
            status = false;
        }
    });
    return status;
}
export function storageLink(name: string): string {
    return config.path.storage(name);
}