
import multer, { Options } from 'multer';
import { Request } from 'express';
import path from 'node:path';
import fs from 'fs'
interface MulterConfig {
    multer: Options;
    path: {
        storage: (name: string) => string;
        upload: (name?: string) => string;
        public: (name: string) => string;
        unlink: (name: string) => boolean;
    }
}
export default {
    multer: {
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024
        }, // 5MB limit
        fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
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
        unlink: (name: string) => {
            try {
                if (!name) return false;
                const link = path.join(process.cwd(), 'storage', "uploads", name);
                if (fs.existsSync(link)) {
                    fs.unlinkSync(link);
                    return true;
                }
                return false;
            } catch (error) {
                console.log(error);
                return false;
            }
        }


    }
} as MulterConfig;