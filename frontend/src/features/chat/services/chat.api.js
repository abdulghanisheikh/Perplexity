import axios from "axios";

const baseUrl = import.meta.env.VITE_NODE_ENV === "development" ?
    "http://localhost:3000" :
    import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: `${baseUrl}/api/chats`,
    withCredentials: true
});

export const sendMessage = async({message, chatId = ""}) => {
    const response = await fetch(`${baseUrl}/api/chats/message`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message, chatId })
    });
    
    return response;
}

export const getChats = async() => {
    const response = await api.get("/");
    return response;
}

export const getMessages = async(chatId) => {
    const response = await api.get(`/${chatId}/messages`);
    return response;
}

export const deleteChat = async(chatId) => {
    const response = await api.delete(`/delete/${chatId}`);
    return response;
}

export const startNewChat = async() => {
    const response = await api.post("/new");
    return response;
}