export default {
    default: process.env.MAIL_MAILER || "smtp",
    mailers: {
        smtp: {
            host: process.env.MAIL_HOST || "smtp.gmail.com",
            port: Number(process.env.MAIL_PORT || 587),
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USERNAME || "",
                pass: process.env.MAIL_PASSWORD || "",
            },
        },
    },
    from: {
        address: process.env.MAIL_FROM_ADDRESS || "",
        name: process.env.MAIL_FROM_NAME || "Express App",
    },
};
//# sourceMappingURL=mail.js.map