import io from "socket.io-client";

export const initSocketConnection = () => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true
    });
    console.log("Connected to Socket.io server");

    return socket;
}