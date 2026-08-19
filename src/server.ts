import app from './app.js'
const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(
        `\n🚀 Server running successfully\n` +
        `   ➜ Local: http://localhost:${PORT}\n` +
        `   ➜ Mode : ${process.env.NODE_ENV || "development"}\n`
    );
});