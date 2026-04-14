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
                // create new chat
                if(!chatId) {
                    dispatch(createNewChat({chatId: chat._id, title: chat.title}));
                }

                // user message added
                dispatch(addNewMessage({chatId: chatId || chat._id, role: "user", content: message}));

                // AI message added
                dispatch(addNewMessage({chatId: chatId || chat._id, role: aiMessage.role, content: aiMessage.content}));

                dispatch(setCurrentChatId(chatId || chat._id));
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

    const handleOpenChat = async(chatId) => {
        const {data} = await getMessages(chatId);

        const {success, messages} = data;

        if(success) {
            const formattedMessages = messages.map((msg) => {
                return {
                    content: msg.content,
                    role: msg.role
                }
            });

            dispatch(addMessages({chatId, messages: formattedMessages}));
            dispatch(setCurrentChatId(chatId));
        }
    }

    return {initSocketConnection, handleSendMessage, handleGetChats, handleOpenChat};
}