import {useAuth} from "../../auth/hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useChat} from "../hooks/useChat.js";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import LoadingAIMessage from "../components/LoadingAIMessage.jsx";
import WelcomeScreen from "../components/WelcomeScreen.jsx";
import InputBox from "../components/InputBox.jsx";

const Dashboard = () => {
    const [userMessage, setUserMessage] = useState("");
    const navigate = useNavigate();

    const auth = useAuth();
    const chat = useChat();

    const username = useSelector(state => state.auth.user.username);
    const loading = useSelector(state => state.chat.loading);
    const chatList = useSelector(state => state.chat.chats);
    const currentChatId = useSelector(state => state.chat.currentChatId);
    const messages = useSelector(state => state.chat.message[currentChatId]);
    const msgObj = useSelector(state => state.chat.message);

    const handleLogoutClick = async() => {
        const { success } = await auth.handleLogout();
        if(success) navigate("/login");
    }

    const handleSendMessageClick = async(e) => {
        e.preventDefault();

        const trimmedMessage = userMessage.trim();
        if(trimmedMessage === "") return;

        setUserMessage("");
        await chat.handleSendMessage({message: trimmedMessage, chatId: currentChatId});
    }

    const handleDeleteChatClick = async(chatId) => {
        await chat.handleDeleteChat(chatId);
        await chat.handleGetChats();
    }

    const initDashboard = async () => {
        await chat.handleGetChats();
    }

    useEffect(() => {
        initDashboard();
    }, []);

    return <main className="bg-neutral-950 flex h-screen w-screen text-white">

        {/* navbar and chats list */}
        <aside className="w-[25%] p-3 flex flex-col gap-8 bg-neutral-900 rounded-md">
            {/* navbar */}
            <Navbar click={handleLogoutClick} />

            {/* new chat button */}
            <div
            onClick={chat.handleStartNewChat}
            className="chat hover:scale-101 border border-white/50 flex justify-center items-center duration-300 ease-in-out cursor-pointer w-[90%] self-center rounded-xl hover:bg-neutral-800 py-1.5 overflow-x-hidden gap-1">
                <p>New Chat</p>
                <IoMdAdd />
            </div>

            {/* chats */}
            <div className="chats flex flex-col items-center gap-2">

                <p className="text-sm opacity-40 self-start pl-5">Recent Chats</p>

                {chatList && Object.keys(chatList).map((chatId) => {
                    return <div
                    key={chatId}
                    className="chat flex items-center w-[90%] gap-5">

                        <div
                        className={`hover:scale-101 duration-300 ease-in-out cursor-pointer w-[80%] h-8 rounded-lg flex items-center px-2 py-0.5 truncate ${currentChatId === chatId ? 'bg-neutral-800' : 'bg-neutral-900'}`}
                        style={{
                            scrollbarWidth: "none"
                        }}
                        onClick={() => {
                            if(chatId === currentChatId) return;
                            chat.handleOpenChat({activeChatId: chatId, message: msgObj});
                        }}>
                            <p className="lg:text-sm text-xs">{chatList[chatId].title}</p>
                        </div>

                        <div 
                        onClick={() => handleDeleteChatClick(chatId)}
                        className="hover:bg-neutral-800 active:scale-90 p-1.5 cursor-pointer duration-300 ease-in-out rounded-full">
                            <MdDelete />
                        </div>
                </div>
                })}
            </div>

        </aside>

        {/* messages */}
        <section style={{
            scrollbarWidth: 'none'
        }} className="chatting min-h-screen w-[75%] overflow-y-auto relative flex flex-col items-center px-40 py-5 gap-3 pb-30">

            {messages && messages.length > 0 ? messages.map((msg, index) => {
                return <div key={index} className={`user p-2 rounded-lg text-sm
                ${msg.role === "ai" ? "w-[75%] self-start" : "w-fit bg-neutral-900 self-end shadow-md shadow-black/50 rounded-br-none mt-10"}`}>

                    {msg.role === "ai" ? (
                        msg.content === "LOADING" ?
                        <LoadingAIMessage /> :
                        <ReactMarkdown
                        components={{
                            p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({children}) => <p className="mb-2 list-disc pl-5">{children}</p>,
                            ol: ({children}) => <p className="mb-2 list-decimal pl-5">{children}</p>,
                            code: ({children}) => <code className="rounded bg-white/10 px-1 py-0.5">{children}</code>,
                            pre: ({children}) => <pre className="mb-4 overflow-x-auto rounded-xl bg-black/30 p-3">{children}</pre>
                        }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    ) : (
                        <p>{msg.content}</p>
                    )}
                </div>
            }) : (
                <WelcomeScreen username={username} />
            )}

            {/* fixed user input box */}
            <InputBox
            handleSendMessage={handleSendMessageClick}
            userMessage={userMessage} 
            setUserMessage={setUserMessage}
            loading={loading} />

        </section>
    </main>
}

export default Dashboard;