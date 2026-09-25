import { Request, Response } from "express";
declare const _default: {
    add: (req: Request, res: Response) => Promise<void>;
    get: (req: Request, res: Response) => Promise<void>;
    upload: (req: Request, res: Response) => Promise<void>;
    barcode: (req: Request<{
        text?: string;
    }>, res: Response) => Promise<void | Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<void>;
    destroy: (req: Request<{
        id?: string;
    }>, res: Response) => Promise<void>;
    landingPage: (req: Request, res: Response) => Promise<void>;
    area: {
        insite: string;
        outsite: string;
    };
    _error(message?: string, data?: {}): {
        error: boolean;
        message: string;
        data: {};
    };
    _success(message?: string, data?: {}): {
        error: boolean;
        message: string;
        data: {};
    };
};
export default _default;
//# sourceMappingURL=Product.Controller.d.ts.map