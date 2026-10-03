declare class SendMessage {
    balance(): Promise<any>;
    one(number: string, message: string): Promise<import("axios").AxiosResponse<any, {
        api_key: string;
        senderid: string;
        number: string;
        message: string;
    }, {}, any>>;
    many(messages?: never[]): Promise<import("axios").AxiosResponse<any, {
        api_key: string;
        senderid: string;
        messages: never[];
    }, {}, any>>;
    otp(number: string, code: number): Promise<import("axios").AxiosResponse<any, {
        api_key: string;
        senderid: string;
        number: string;
        message: string;
    }, {}, any>>;
}
declare const _default: SendMessage;
export default _default;
//# sourceMappingURL=sms.service.d.ts.map