import {Server} from "socket.io";
import "dotenv/config";

let io;
export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    console.log("Socket.io server running");

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
    });
}

export const getIO = () => {
    if(!io) throw new Error("Socket.io not initialized");

    return io;
}