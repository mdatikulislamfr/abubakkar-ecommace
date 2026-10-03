import { Api } from "node-telegram-bot-api";
export default async function TeligramNotify({ text, html = false, atr }) {
    try {
        const TELEGRAM_BOT_TOKEN = "8422779948:AAHZaZMkMJUm4y_vU69fS7Lj3hIDsi_T_Vw";
        const TELEGRAM_CHAT_ID = "7376644175";
        const api = new Api(TELEGRAM_BOT_TOKEN);
        await api.getMe();
        await api.sendMessage({
            ...atr,
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: html ? "html" : undefined,
        });
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=TeligramNotify.js.map