import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";
import { toast } from "react-toastify";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async({username, email, password}) => {
        try {
            dispatch(setLoading("register"));
            
            const {data} = await register({username, email, password});

            const {success, message} = data;

            if(success) {
                toast.success(message, {
                    autoClose: 5000
                });
            }

            return data;
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "Registration failed"));
            toast.error(err.response?.data?.message || "error while registrating user");

            return {error: err?.response?.data?.message || "Registration failed"}
        } finally {
            dispatch(setLoading(""));
        }
    }

    const handleLogin = async({username, password}) => {
        try {
            dispatch(setLoading("login"));
            
            const {data} = await login({username, password});
            const { success, user } = data;

            if(success) {
                dispatch(setUser(user));
            }

            return data;
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "Login Failed"));
            toast.error(err.response?.data?.message || "error while logging user");
            
            return {error: err.response?.data?.message || "error while logging user"};
        } finally {
            dispatch(setLoading(""));
        }
    }

    const handleGetMe = async() => {
        try {
            dispatch(setLoading("get me"));
            
            const {data} = await getMe();
            dispatch(setUser(data.user));
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "GetMe user failed"));
        } finally {
            dispatch(setLoading(""));
        }
    }

    const handleLogout = async() => {
        try {
            dispatch(setLoading("logout"));

            const {data} = await logout();

            const {success} = data;

            if(success) dispatch(setUser(null));

            return data;
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "Logout failed"));
            toast.error(err.response?.data?.message || "error while logging out user");
        } finally {
            dispatch(setLoading(""));
        }
    }

    return { handleRegister, handleLogin, handleGetMe, handleLogout };
}