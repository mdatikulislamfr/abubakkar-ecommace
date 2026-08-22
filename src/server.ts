import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { setupSocket } from "../app/Socket/index.js";
import corsconfig from "../config/cors.js";

const PORT = Number(process.env.PORT) || 4000;

const server = http.createServer(app);

export const io = new Server(server, { cors: corsconfig, });
setupSocket(io);

server.listen(PORT, () => {
    console.log(
        `\n🚀 Server running successfully\n` +
        `   ➜ Local: http://localhost:${PORT}\n` +
        `   ➜ Socket: ws://localhost:${PORT}\n` +
        `   ➜ Mode : ${process.env.NODE_ENV || "development"}\n`
    );
});