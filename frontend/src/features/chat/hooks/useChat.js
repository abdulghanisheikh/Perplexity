import { sendMessage, getChats, getMessages, startNewChat, deleteChat } from "../services/chat.api.js";
import {useDispatch} from "react-redux";
import {setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, setChats, appendToken} from "../chat.slice.js";
import { toast } from "react-toastify";

export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async({message, chatId}) => {
        try {
            dispatch(setLoading(true));
            
            dispatch(addNewMessage({chatId, role: "user", content: message}));
            dispatch(addNewMessage({chatId, role: "ai", content: "LOADING"}));

            const res = await sendMessage({message, chatId});

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let activeChatId = chatId;

            while(true) {
                const {done, value} = await reader.read();

                // stream connection end
                if(done) break;

                const chunk = decoder.decode(value, {stream: true});
                const lines = chunk.split("\n").filter(line => line.startsWith("data:"));

                for(const line of lines) {
                    const data = JSON.parse(line.replace("data: ", ""));

                    if(data.done) {
                        dispatch(setLoading(false));
                        return;
                    }

                    // first chunk
                    if(data.chat) {
                        activeChatId = data.chat._id;

                        // if no chatId => create new chat
                        if(!chatId) {
                            dispatch(createNewChat({chatId: activeChatId, title: data.chat.title}));
                            dispatch(setCurrentChatId(activeChatId));
                        }

                        dispatch(appendToken({chatId: activeChatId, token: data.token}));
                    }
                    // rest chunks
                    else if(data.token) {
                        dispatch(appendToken({chatId: activeChatId, token: data.token}));
                    }
                }
            }
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "send message error"));
            toast.error(err?.response?.data?.message || "send message error");
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

            return chats;
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

    const handleDeleteChat = async(chatId) => {
        try {
            dispatch(setLoading(true));

            const {data} = await deleteChat(chatId);

            const {success} = data;

            if(success) {
                dispatch(setCurrentChatId(""));
            }
        } catch(err) {
            dispatch(setError(err?.response?.data?.message || "chat delete operation failed"));
            toast.error(err.response?.data?.message || "error while deleting the chat");
        } finally {
            dispatch(setLoading(false));
        }
    }
 
    return {handleSendMessage, handleGetChats, handleOpenChat, handleStartNewChat, handleDeleteChat};
}