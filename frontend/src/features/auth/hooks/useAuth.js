import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async({username, email, password}) => {
        try {
            dispatch(setLoading(true));
            
            const {data} = await register({username, email, password});
            return data;
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "Registration failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogin = async({username, password}) => {
        try {
            dispatch(setLoading(true));
            
            const {data} = await login({username, password});
            const { success, user } = data;

            if(success) {
                dispatch(setUser(user));
            }

            return data;
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "Login Failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetMe = async() => {
        try {
            dispatch(setLoading(true));
            
            const {data} = await getMe();
            dispatch(setUser(data.user));
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "GetMe user failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogout = async() => {
        try {
            dispatch(setLoading(true));

            const {data} = await logout();
            dispatch(setUser(null));

            return data;
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "Logout failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return { handleRegister, handleLogin, handleGetMe, handleLogout };
}