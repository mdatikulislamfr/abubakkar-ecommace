import { Request, Response } from "express";
declare const _default: {
    index: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    destroy: (req: Request, res: Response) => Promise<void>;
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
//# sourceMappingURL=Category.Controller.d.ts.map