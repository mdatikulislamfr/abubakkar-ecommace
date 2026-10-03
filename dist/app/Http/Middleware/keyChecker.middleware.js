import { _error } from "../../helpers/appHelper.js";
export default function KeyChecker(req, res, next) {
    const key = req.headers['x-api-key'];
    if (!key || key !== process.env.APP_KEY) {
        return res.status(401).json(_error({ message: "Unauthorized: Invalid API Key" }));
    }
    return next();
}
//# sourceMappingURL=keyChecker.middleware.js.map