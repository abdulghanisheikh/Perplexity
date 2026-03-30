import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";

export const useAuth = () => {
    
}