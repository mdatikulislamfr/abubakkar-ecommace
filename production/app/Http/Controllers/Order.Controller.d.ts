import { Request, Response } from "express";
declare const _default: {
    request: (req: Request, res: Response) => Promise<void>;
    index: (req: Request<{
        order_id?: string;
        phone?: string;
        id?: string;
    }>, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    destroy: (req: Request<{
        id?: string;
    }>, res: Response) => Promise<void>;
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
//# sourceMappingURL=Order.Controller.d.ts.map