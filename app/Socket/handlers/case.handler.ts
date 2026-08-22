import { Server, Socket } from "socket.io";
import { caseEvent } from "../../Events/index.js";


export function caseHandler(io: Server, socket: Socket) {
    socket.on("cal", () => {

    })
    caseEvent.on("case:remove", (data) => io.emit("case:remove", data))
}