export default class Controller {
    area = {
        insite: "Inside Dhaka",
        outsite: "Outside Dhaka"
    };
    _error(message = "", data = {}) {
        return { error: true, message, data };
    }
    _success(message = "", data = {}) {
        return { error: false, message, data };
    }
}
//# sourceMappingURL=Controller.js.map