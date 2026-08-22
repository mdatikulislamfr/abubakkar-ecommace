import { Server, Socket } from "socket.io";

export default function notificationHandler(io: Server, socket: Socket) {

    /**
     * Send notification to a specific user.
     *
     * Example:
     * socket.emit("notification", {...})
     */
    socket.on("notification:send", (data) => {

        const {
            user_id,
            title,
            message,
            type,
            data: notificationData,
        } = data;

        if (!user_id || !title || !message) {
            return socket.emit("notification:error", {
                message: "user_id, title and message are required",
            });
        }

        /**
         * User-specific room.
         *
         * Example:
         * user:10
         */
        io.to(`user:${user_id}`).emit("notification", {
            title,
            message,
            type: type ?? "info",
            data: notificationData ?? null,
        });
    });


    /**
     * Join user's personal notification room.
     *
     * Example:
     * user:10
     */
    socket.on("notification:join", (user_id: number | string) => {

        if (!user_id) {
            return socket.emit("notification:error", {
                message: "User ID is required",
            });
        }

        socket.join(`user:${user_id}`);

        socket.emit("notification:joined", {
            message: "Notification room joined successfully",
            user_id,
        });
    });


    /**
     * Leave user's notification room.
     */
    socket.on("notification:leave", (user_id: number | string) => {

        if (!user_id) {
            return;
        }

        socket.leave(`user:${user_id}`);
    });


    /**
     * Send notification to all connected users.
     */
    socket.on("notification:broadcast", (data) => {

        const {
            title,
            message,
            type,
            data: notificationData,
        } = data;

        if (!title || !message) {
            return socket.emit("notification:error", {
                message: "Title and message are required",
            });
        }

        io.emit("notification", {
            title,
            message,
            type: type ?? "info",
            data: notificationData ?? null,
        });
    });
}