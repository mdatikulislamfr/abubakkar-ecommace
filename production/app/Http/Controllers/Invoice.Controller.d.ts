import { Request, Response } from "express";
declare const _default: {
    index: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
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
//# sourceMappingURL=Invoice.Controller.d.ts.map