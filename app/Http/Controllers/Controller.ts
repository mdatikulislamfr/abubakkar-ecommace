
export default class Controller {
    minWidthdraw = 100;
    _error(message = "", data = {}) {
        return { error: true, message, data }
    }
    _success(message = "", data = {}) {
        return { error: false, message, data }
    }
}