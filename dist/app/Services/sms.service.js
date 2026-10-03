import app from "../../config/app.js";
import axios from 'axios';
const smsClient = axios.create({
    baseURL: app.sms.url,
    timeout: 10000,
});
class SendMessage {
    async balance() {
        const { data } = await smsClient.get("/api/getBalanceApi", {
            params: { api_key: app.sms.key }
        });
        return data.balance;
    }
    async one(number, message) {
        if (!number || !message) {
            throw new Error("number or message empty");
        }
        return smsClient.post("/api/smsapi", {
            api_key: app.sms.key,
            senderid: app.sms.id,
            number,
            message
        });
    }
    async many(messages = []) {
        if (!messages.length) {
            throw new Error("messages empty");
        }
        return smsClient.post("/api/smsapimany", {
            api_key: app.sms.id,
            senderid: app.sms.sender_id,
            messages
        });
    }
    async otp(number, code) {
        return this.one(number, `Your ${app.name} OTP is ${code}`);
    }
}
export default (new SendMessage());
//# sourceMappingURL=sms.service.js.map