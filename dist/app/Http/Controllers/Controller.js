import path from "node:path";
const workerPath = path.join(process.cwd(), `dist/app/worker/imageWorker.js`);
export default class Controller {
    area = {
        insite: "Inside Dhaka",
        outsite: "Outside Dhaka"
    };
    workerPath = workerPath;
    _error(message = "", data = {}) {
        return { error: true, message, data };
    }
    _success(message = "", data = {}) {
        return { error: false, message, data };
    }
}
//# sourceMappingURL=Controller.js.map