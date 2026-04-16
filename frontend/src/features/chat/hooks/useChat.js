import { initSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages } from "../services/chat.api.js";
import {useDispatch} from "react-redux";
import {setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages} from "../chat.slice.js";

export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async({message, chatId}) => {
        try {
            dispatch(setLoading(true));
            
            const {data} = await sendMessage({message, chatId});
            const {success, aiMessage, chat} = data;

            if(success) {
                const activeChatId = chatId || chat._id;
                dispatch(setCurrentChatId(activeChatId));

                // create new chat if NO chatId
                if(!chatId) {
                    dispatch(createNewChat({chatId: chat._id, title: chat.title}));
                }

                // user message added
                dispatch(addNewMessage({chatId: chatId || chat._id, role: "user", content: message}));

                // AI message added
                dispatch(addNewMessage({chatId: chatId || chat._id, role: aiMessage.role, content: aiMessage.content}));
            }

        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "send message error"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetChats = async() => {
        try {
            dispatch(setLoading(true));
            const {data} = await getChats();

            const {success, chats} = data;

            if(success) {
                chats.forEach((chat) => {
                    dispatch(createNewChat({chatId: chat._id, title: chat.title}));
                });
            }
        } catch(err) {
            setError(dispatch(err?.response?.data?.message || "fetching chats failed"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleOpenChat = async({activeChatId, message}) => {
        dispatch(setCurrentChatId(activeChatId));

        // if no messages are fetched => fetch messages and append
        if(!message[activeChatId] || message[activeChatId].length === 0) {
            const {data} = await getMessages(activeChatId);

            const {success, messages} = data;

            if(success) {
                const formattedMessages = messages.map((msg) => {
                    return {
                        content: msg.content,
                        role: msg.role
                    }
                });

                dispatch(addMessages({chatId: activeChatId, messages: formattedMessages}));
            }
        }
    }

    return {initSocketConnection, handleSendMessage, handleGetChats, handleOpenChat};
}