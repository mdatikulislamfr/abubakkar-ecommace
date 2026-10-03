import multer from "multer";
import config from "../../config/multer.js";
import { unlink } from "fs";
export function upload() {
    return multer({
        ...config.multer
    });
}
export function uploadSingle(fieldName) {
    return upload().single(fieldName);
}
export function uploadMultiple(fieldName, maxCount) {
    return upload().array(fieldName, maxCount);
}
export function removeFile(fieldName) {
    let status = false;
    unlink(fieldName, (err) => {
        status = true;
        if (err) {
            status = true;
        }
        else {
            status = false;
        }
    });
    return status;
}
export function storageLink(name) {
    return config.path.storage(name);
}
//# sourceMappingURL=upload.service.js.map