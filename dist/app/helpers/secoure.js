import 'dotenv/config';
import crypto from 'crypto';
const ALGORITHM = "aes-256-gcm";
if (!process.env.APP_KEY) {
    throw new Error("APP_KEY is missing in .env");
}
const key = crypto
    .createHash("sha256")
    .update(process.env.APP_KEY)
    .digest();
function encryptData(text) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(JSON.stringify(text), "utf8", "hex");
    encrypted += cipher.final("hex");
    const tag = cipher.getAuthTag();
    return Buffer.from(`${iv.toString("hex")}:${tag.toString("hex")}:${encrypted}`).toString("base64");
}
function decryptData(payload) {
    try {
        const [iv, tag, data] = Buffer
            .from(payload, "base64")
            .toString()
            .split(":");
        const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, "hex"));
        decipher.setAuthTag(Buffer.from(tag, "hex"));
        let decrypted = decipher.update(data, "hex", "utf8");
        decrypted += decipher.final("utf8");
        try {
            return JSON.parse(decrypted);
        }
        catch (error) {
            return error instanceof Error ? decrypted : decrypted;
        }
    }
    catch (error) {
        return error instanceof Error ? new Error(error.message) : new Error("some error");
    }
}
function hasData(text) {
    const tokenHash = crypto
        .createHash("sha256")
        .update(text)
        .digest("hex");
    return tokenHash;
}
export default {
    encryptData,
    decryptData,
    hasData
};
//# sourceMappingURL=secoure.js.map