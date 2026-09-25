import { Request, Response } from "express";
declare const _default: {
    index: (_: Request, res: Response) => Promise<void>;
    set: (req: Request, res: Response) => Promise<void>;
    bannaerget: (_: Request, res: Response) => Promise<void>;
    bannaeradd: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
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
//# sourceMappingURL=App.Controller.d.ts.map