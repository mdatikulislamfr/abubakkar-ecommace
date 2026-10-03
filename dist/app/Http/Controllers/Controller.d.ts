export default class Controller {
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
}
//# sourceMappingURL=Controller.d.ts.map