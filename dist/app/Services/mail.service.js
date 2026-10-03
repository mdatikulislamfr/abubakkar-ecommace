import nodemailer from 'nodemailer';
import mail from '../../config/mail.js';
export async function sendMail(suhject, text, html) {
    const transporter = nodemailer.createTransport(mail.mailers.smtp);
    const mailOptions = {
        from: mail.from.name,
        to: mail.from.address,
        subject: suhject,
        text: text,
        html: html
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch (err) {
        console.error("Error sending mail:", err);
    }
}
//# sourceMappingURL=mail.service.js.map