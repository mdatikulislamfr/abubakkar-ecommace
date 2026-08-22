import { NextFunction, Request, Response } from "express";
import { _error, _success } from "../../helpers/appHelper.js";

export default function reqMiddleware(_: Request, res: Response, next: NextFunction) {
    res._success = (status, message: string, data: unknown) => {
        return res.status(status).json(_success({ message, data }))
    }
    res._error = (status, message: string, data: unknown) => {
        res.status(status).json(_error({ message, data }))
    }
    next();
}
