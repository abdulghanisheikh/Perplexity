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

            <div className="chats flex flex-col gap-1 px-3">
                <div className="chat hover:scale-101 duration-300 ease-in-out cursor-pointer w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
                <div className="chat hover:scale-101 duration-300 ease-in-out cursor-pointer w-full rounded-md bg-neutral-800 px-5 py-1.5">
                    <p>Chat title</p>
                </div>
            </div>
        </div>

        <div className="chatting w-[75%] relative py-5 px-6 flex flex-col gap-3">

            <div className="user p-2 rounded-lg w-fit self-end bg-neutral-900 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, soluta?
            </div>

            <div className="ai p-2 rounded-lg w-3/4 bg-neutral-900 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aperiam reiciendis nostrum a nisi numquam nihil, quibusdam voluptatum hic! Optio pariatur quis nesciunt ipsa cum nemo aspernatur illum unde, exercitationem consequatur. Quaerat cupiditate eveniet a dolor corrupti praesentium quas quia tempora itaque hic, laudantium sapiente, voluptatem sed modi deleniti ratione!
            </div>

            <div className="userInput flex items-center lg:w-[96%] lg:gap-3 justify-center bg-neutral-900 py-3 rounded-lg absolute bottom-5 px-3">
                <input type="text" placeholder="Type your message" className="w-[90%] text-sm bg-neutral-950 outline-none border-none p-2 rounded-lg" />
                <button className="py-1 shadow-md shadow-black/50 active:shadow-none duration-300 ease-in-out rounded-md bg-neutral-950 w-[10%] cursor-pointer px-4">Send</button>
            </div>
        </div>
    </main>
}

export default Dashboard;