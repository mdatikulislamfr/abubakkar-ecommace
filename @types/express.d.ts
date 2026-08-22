import "express";
import STATUS from "../config/status.ts";

declare module "express-serve-static-core" {
    interface Response {
        _success: (
            status: typeof STATUS[keyof typeof STATUS],
            message: string,
            data?: unknown
        ) => void;

        _error: (
            status: typeof STATUS[keyof typeof STATUS],
            message: string,
            data?: unknown
        ) => void;
    }

    interface Request {
        user?: {
            name?: string,
            id: number,
            token: string
        },
    }
}