import { useSelector } from "react-redux";
import {useAuth} from "../../auth/hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useChat} from "../hooks/useChat.js";
import { useEffect } from "react";

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);
    const {handleLogout} = useAuth();
    const navigate = useNavigate();

    const handleClick = async() => {
        const { success } = await handleLogout();
        if(success) navigate("/login");
    }

    const chat = useChat();

    // Init socket connection when comes to Dashboard
    useEffect(() => {
        chat.initSocketConnection();
    }, []);

    return <main className="bg-black h-screen w-screen">
        <div className="nav flex justify-around items-center p-2 text-white bg-zinc-900">
            <h1 className="lg:text-3xl font-semibold">Welcome <span className="text-sky-500">{
                user ? user.username : "User"
            }</span></h1>
            <button onClick={handleClick} className="px-5 py-1 rounded-lg lg:text-sm text-xs border border-red-400 bg-red-600/20 active:scale-90 duration-300 ease-in-out cursor-pointer">Logout</button>
        </div>
    </main>
}

export default Dashboard;