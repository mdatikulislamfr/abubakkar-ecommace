import { Options } from 'multer';
interface MulterConfig {
    multer: Options;
    path: {
        storage: (name: string) => string;
        upload: (name?: string) => string;
        public: (name: string) => string;
        unlink: (name: string) => boolean;
    };
}
declare const _default: MulterConfig;
export default _default;
//# sourceMappingURL=multer.d.ts.map