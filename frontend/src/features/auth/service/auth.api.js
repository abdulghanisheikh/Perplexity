import axios from "axios";

const api = new axios.create({
    baseURL: "http://localhost:3000",
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