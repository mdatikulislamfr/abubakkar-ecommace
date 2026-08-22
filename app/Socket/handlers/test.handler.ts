import { Server, Socket } from "socket.io";

export default function testHandler(io: Server, socket: Socket) {

    /**
     * Test connection
     */
    socket.on("test", (data) => {

        console.log("Test event received:", data);

        socket.emit("test:response", {
            success: true,
            message: "Socket is working successfully",
            data: data ?? null,
            socket_id: socket.id,
        });
    });


    /**
     * Ping / Pong test
     */
    socket.on("ping", () => {

        socket.emit("pong", {
            success: true,
            message: "Pong from server",
            time: new Date(),
        });
    });


    /**
     * Broadcast test message
     */
    socket.on("test:broadcast", (data) => {

        io.emit("test:broadcast", {
            success: true,
            message: "Broadcast message received",
            data: data ?? null,
        });
    });

}