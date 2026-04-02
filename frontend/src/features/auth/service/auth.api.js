import axios from "axios";

let backendURL = import.meta.env.VITE_NODE_ENVIRONMENT === "production" ? import.meta.env.VITE_BACKEND_URL : "http://localhost:3000";

const api = axios.create({
    baseURL: backendURL,
    withCredentials: true
});

export const register = async({ username, email, password }) => {
    const payload = {username, email, password};

    const response = await api.post("/api/auth/register", payload);
    return response;
}

export const login = async({ username, password }) => {
    const payload = {username, password};

    const response = await api.post("/api/auth/login", payload);
    return response;
}

export const getMe = async() => {
    const response = await api.get("/api/auth/getMe");
    return response;
}

export const logout = async() => {
    const response = await api.post("/api/auth/logout");
    return response;
}