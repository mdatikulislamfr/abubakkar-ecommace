import { _error, _success } from "../../helpers/appHelper.js";
export default function reqMiddleware(_, res, next) {
    res._success = (status, message, data) => {
        return res.status(status).json(_success({ message, data }));
    };
    res._error = (status, message, data) => {
        console.log(status, ":", message);
        res.status(status).json(_error({ message, data }));
    };
    next();
}
//# sourceMappingURL=req.middleware.js.map