import crypto from 'crypto'
export default function generateKey(length = 32): string {
    return crypto.randomBytes(length).toString("hex");
}
