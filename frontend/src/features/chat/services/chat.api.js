import axios from "axios";

const api = new axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

export const sendMessage = async({message, chatId = ""}) => {
    const response = await api.post("/api/chats/message", {message, chatId});
    return response;
}

export const getChats = async() => {
    const response = await api.get("/api/chats/");
    return response;
}

export const getMessages = async(chatId) => {
    const response = await api.get(`/api/chats/${chatId}/messages`);
    return response;
}

export const deleteChat = async(chatId) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`);
    return response;
}