import { useSelector } from "react-redux";
import {useAuth} from "../../auth/hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useChat} from "../hooks/useChat.js";
import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = async() => {
        const { success } = await auth.handleLogout();
        if(success) navigate("/login");
    }

    const chat = useChat();

    // Init socket connection when comes to Dashboard
    useEffect(() => {
        chat.initSocketConnection();
    }, []);

    return <main className="bg-neutral-950 flex h-screen w-screen text-white">
        <div className="w-[25%] py-3 flex flex-col gap-10 bg-neutral-900 rounded-md">
            
            <Navbar click={handleLogoutClick} />

            <div className="chats flex flex-col gap-2 px-3">
                <div className="chat w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
                <div className="chat w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
                <div className="chat w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
                <div className="chat w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
                <div className="chat w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
            </div>
        </div>
        <div className="chatting w-[75%]"></div>
    </main>
}

export default Dashboard;