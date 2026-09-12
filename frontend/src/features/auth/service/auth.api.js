import axios from "axios";

const baseURL = import.meta.env.VITE_NODE_ENV === "development" ?
    "http://localhost:3000" :
    import.meta.env.VITE_BACKEND_URL;

console.log("baseURL:", baseURL);

const api = axios.create({
    baseURL: `${baseURL}/api/auth`,
    withCredentials: true
});

export const register = async({ username, email, password }) => {
    const payload = {username, email, password};

    const response = await api.post("/register", payload);
    return response;
}

export const login = async({ username, password }) => {
    const payload = {username, password};

    const response = await api.post("/login", payload);
    return response;
}

export const getMe = async() => {
    const response = await api.get("/getMe");
    return response;
}

export const logout = async() => {
    const response = await api.post("/logout");
    return response;
}