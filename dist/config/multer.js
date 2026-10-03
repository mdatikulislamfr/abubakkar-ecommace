import multer from 'multer';
import path from 'node:path';
import fs from 'fs';
export default {
    multer: {
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024
        }, // 5MB limit
        fileFilter: (_req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            }
            else {
                cb(new Error('Only image files are allowed!'));
            }
        },
    },
    path: {
        storage: (name) => path.join(process.cwd(), 'storage', name),
        upload: (name) => path.join(process.cwd(), 'storage', "uploads", name || ""),
        public: (name) => {
            const url = process.env.URL;
            return `${url || ""}/${name}`;
        },
        unlink: (name) => {
            try {
                if (!name)
                    return false;
                const link = path.join(process.cwd(), 'storage', "uploads", name);
                if (fs.existsSync(link)) {
                    fs.unlinkSync(link);
                    return true;
                }
                return false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};
//# sourceMappingURL=multer.js.map