import {useAuth} from "../../auth/hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useChat} from "../hooks/useChat.js";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { IoMdAdd } from "react-icons/io";

const Dashboard = () => {
    const [userMessage, setUserMessage] = useState('');
    const navigate = useNavigate();

    const auth = useAuth();
    const chat = useChat();

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

        await chat.handleSendMessage({message: trimmedMessage, chatId: currentChatId});

        setUserMessage("");
    }

    useEffect(() => {
        chat.initSocketConnection();
        chat.handleGetChats();
    }, []);

    return <main className="bg-neutral-950 flex h-screen w-screen text-white">

        <aside className="w-[25%] p-3 flex flex-col gap-8 bg-neutral-900 rounded-md">    
            <Navbar click={handleLogoutClick} />

            <div
            onClick={chat.handleStartNewChat}
            className="chat hover:scale-101 border flex justify-center items-center border-white/50 duration-300 ease-in-out cursor-pointer w-[90%] self-center rounded-xl hover:bg-neutral-800 px-5 py-1.5 overflow-x-hidden">
                <p>New Chat</p>
                <IoMdAdd />
            </div>

            <div className="chats flex flex-col gap-2 px-3">
                <p className="text-sm opacity-30">Recent Chats</p>

                {chatList && Object.keys(chatList).map((chatId) => {
                    return <div
                    onClick={() => {
                        if(chatId === currentChatId) return;
                        chat.handleOpenChat({activeChatId: chatId, message: msgObj});
                    }}
                    key={chatId} className={`
                    chat hover:scale-101 border border-white/50 duration-300 ease-in-out cursor-pointer w-full rounded-xl hover:bg-neutral-900 px-5 py-2 overflow-x-hidden
                    ${currentChatId === chatId ? "bg-neutral-800" : "bg-neutral-900"}
                    `}>
                        <p className="lg:text-sm text-xs">{chatList[chatId].title}</p>
                    </div>
                })}
            </div>

        </aside>

        <section style={{
            scrollbarWidth: 'none'
        }} className="chatting min-h-screen w-[75%] overflow-y-auto relative py-5 px-45 flex flex-col gap-3 pb-20">

            {messages && messages.map((msg, index) => {
                return <div key={index} className={`user p-2 rounded-lg text-sm
                ${msg.role === "ai" ? 
                "w-[75%] self-start" : 
                "w-fit bg-neutral-900 self-end shadow-md shadow-black/50 rounded-br-none"}`}>
                    {msg.role === "user" ? (
                        <p>{msg.content}</p>
                    ) : (
                        <ReactMarkdown
                        components={{
                            p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({children}) => <p className="mb-2 list-disc pl-5">{children}</p>,
                            ol: ({children}) => <p className="mb-2 list-decimal pl-5">{children}</p>,
                            code: ({children}) => <code className="rounded bg-white/10 px-1 py-0.5">{children}</code>,
                            pre: ({children}) => <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">{children}</pre>
                        }}
                        >
                            {msg.content}
                        </ReactMarkdown>
                    )}
                </div>
            })}

            <footer>
                <form onSubmit={handleSendMessageClick} className="userInput w-2/3 flex gap-3 justify-center rounded-lg fixed bottom-5 right-12 px-3">
                    <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Type your message" className="w-[85%] py-3 text-sm bg-neutral-950 border border-white/50 outline-none hover:bg-neutral-900 duration-300 ease-in-out px-2 rounded-lg" />
                    
                    <button disabled={!userMessage.trim() || loading} type="submit" className={`border border-white/50 rounded-md px-5 
                    ${!userMessage.trim() || loading ?
                    'opacity-50' : 
                    'cursor-pointer hover:bg-neutral-900 active:scale-90 duration-300 ease-in-out'}`}>
                        Send
                    </button>
                </form>
            </footer>

        </section>
    </main>
}

export default Dashboard;