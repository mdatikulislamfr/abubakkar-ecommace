import type { Server } from "socket.io";
import { caseHandler } from "./handlers/case.handler.js";
import app from "../../config/app.js";

export function setupSocket(io: Server) {

    io.on("connection", (socket) => {
        if (!app.isProduction) console.log("Connected:", socket.id);

        caseHandler(io, socket);

        if (!app.isProduction) {
            socket.on("disconnect", () => {
                console.log("Disconnected:", socket.id);
            });
        };
    });

}