import crypto from 'crypto';
export default function generateKey(length = 32) {
    return crypto.randomBytes(length).toString("hex");
}
//# sourceMappingURL=generateKey.js.map