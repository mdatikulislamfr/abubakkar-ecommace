import { Request, Response } from "express";
declare const _default: {
    email: string;
    pass: string;
    index: (_: Request, res: Response) => Promise<void>;
    set: (req: Request, res: Response) => Promise<void>;
    bannaerget: (_: Request, res: Response) => Promise<void>;
    bannaeradd: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    login: (_req: Request, res: Response) => Promise<void>;
    loginCheck: (req: Request, res: Response) => Promise<void>;
    logout: (_req: Request, res: Response) => Promise<void>;
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
    _success(message?: string, data?: {}): {
        error: boolean;
        message: string;
        data: {};
    };
};
export default _default;
//# sourceMappingURL=App.Controller.d.ts.map