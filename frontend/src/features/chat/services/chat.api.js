import axios from "axios";

const api = new axios.create({
    withCredentials: true
});

export const sendMessage = async({message, chatId = ""}) => {
    const baseURL = 'https://perplexity-clone-i74e.onrender.com';
    
    const response = await fetch(`${baseURL}/api/chats/message`, {
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

export const startNewChat = async() => {
    const response = await api.post("/api/chats/new");
    return response;
}