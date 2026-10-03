import { Request, Response } from "express";
declare const _default: {
    _success(message?: string, data?: {}): {
        error: boolean;
        message: string;
        data: {};
    };
    index: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    sitemap: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    area: {
        insite: string;
        outsite: string;
    };
    workerPath: string;
    _error(message?: string, data?: {}): {
        error: boolean;
        message: string;
        data: {};
    };
};
export default _default;
//# sourceMappingURL=Seo.Controller.d.ts.map