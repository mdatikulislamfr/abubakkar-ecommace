import { type SendMessageParams } from "node-telegram-bot-api";
interface Props {
    text: string;
    html: boolean;
    atr?: Partial<SendMessageParams>;
}
export default function TeligramNotify({ text, html, atr }: Props): Promise<boolean>;
export {};
//# sourceMappingURL=TeligramNotify.d.ts.map