import { initSocketConnection } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, startNewChat } from "../services/chat.api.js";
import {useDispatch} from "react-redux";
import {setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, setChats} from "../chat.slice.js";

export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async({message, chatId}) => {
        try {
            dispatch(setLoading(true));
            
            const {data} = await sendMessage({message, chatId});
            const {success, aiMessage, chat} = data;

            if(success) {
                const activeChatId = chatId || chat._id;

                // create new chat if NO chatId
                if(!chatId) {
                    dispatch(setCurrentChatId(activeChatId));
                    dispatch(createNewChat({chatId: chat._id, title: chat.title}));
                }

                // user message added
                dispatch(addNewMessage({chatId: activeChatId, role: "user", content: message}));

                // AI message added
                dispatch(addNewMessage({chatId: activeChatId, role: aiMessage.role, content: aiMessage.content}));
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
                const allChats = chats.reduce((acc, chat) => {
                    const {_id, user, title} = chat;

                    acc[_id] = {
                        user,
                        title,
                        updatedOn: new Date().toISOString()
                    }

                    return acc;
                }, {});

                dispatch(setChats(allChats));
            }
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "fetching chats failed"));
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

                // all messages append at once using spread operator
                dispatch(addMessages({chatId: activeChatId, messages: formattedMessages}));
            }
        }
    }

    const handleStartNewChat = async() => {
        try {
            dispatch(setLoading(true));

            // create new chat in DB
            const {data} = await startNewChat();

            const {success, newChat} = data;

            if(success) {
                dispatch(createNewChat({
                    chatId: newChat._id,
                    title: newChat.title
                }));
                
                dispatch(setCurrentChatId(newChat._id));
            }
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "starting new chat failed"));
        } finally {
            dispatch(setLoading(false)); 
        }
    }

    return {initSocketConnection, handleSendMessage, handleGetChats, handleOpenChat, handleStartNewChat};
}