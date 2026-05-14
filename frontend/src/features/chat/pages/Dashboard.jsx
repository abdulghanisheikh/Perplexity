import {useAuth} from "../../auth/hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useChat} from "../hooks/useChat.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar.jsx";
import ChatInterface from "../components/ChatInterface.jsx";
import WelcomeScreen from "../components/WelcomeScreen.jsx";
import {ToastContainer} from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userMessage, setUserMessage] = useState("");

    const auth = useAuth();
    const chat = useChat();
    
    const username = useSelector(state => state.auth.user.username);
    const loading = useSelector(state => state.chat.loading);
    const currentChatId = useSelector(state => state.chat.currentChatId);
    const messages = useSelector(state => state.chat.message[currentChatId]);
    const chatList = useSelector(state => state.chat.chats);
    const messagesObject = useSelector(state => state.chat.message);

    const handleSendMessageClick = async(e) => {
        e.preventDefault();

        const trimmedMessage = userMessage.trim();
        if(trimmedMessage === "") return;

        setUserMessage("");
        await chat.handleSendMessage({message: trimmedMessage, chatId: currentChatId});
    }

    const handleLogoutClick = async() => {
        const { success } = await auth.handleLogout();
        if(success) navigate("/login");
    }

    const handleDeleteChatClick = async(chatId) => {
        await chat.handleDeleteChat(chatId);
        const updatedChats = await chat.handleGetChats();

        if(!updatedChats || updatedChats.length === 0) {
            await chat.handleStartNewChat();
        }

        // select/open the last chat
        const chatID = updatedChats[updatedChats.length - 1]._id;
        await chat.handleOpenChat({activeChatId: chatID, message: messagesObject});
    }

    useEffect(() => {
        const initDashboard = async() => {
            const updatedChats = await chat.handleGetChats();

            // if no chats -> create a default new chat
            if(!updatedChats || updatedChats.length === 0) {
                await chat.handleStartNewChat();
            }

            // select/open the last chat
            const chatID = updatedChats[updatedChats.length - 1]._id;
            await chat.handleOpenChat({activeChatId: chatID, message: messagesObject});
        }

        initDashboard();
    }, []);

    return <main className="bg-neutral-950 flex h-screen w-screen text-white">

        <Sidebar
        chat={chat} 
        handleDeleteChatClick={handleDeleteChatClick} 
        messagesObject={messagesObject} 
        handleLogoutClick={handleLogoutClick}
        chatList={chatList} 
        currentChatId={currentChatId}
        />

        {messages && messages.length > 0 ?
            (
                <ChatInterface
                messages={messages}
                handleSendMessageClick={handleSendMessageClick}
                userMessage={userMessage}
                setUserMessage={setUserMessage}
                loading={loading}
                />
            ) : (
                <WelcomeScreen
                username={username}
                handleSendMessageClick={handleSendMessageClick}
                userMessage={userMessage}
                setUserMessage={setUserMessage}
                loading={loading}
                />
            )
        }
        <ToastContainer position="top-right" />
    </main>
}

export default Dashboard;