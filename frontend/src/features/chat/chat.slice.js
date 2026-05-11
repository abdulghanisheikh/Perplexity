import {createSlice} from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        message: {},
        currentChatId: '',
        loading: false,
        error: null
    },
    reducers: {
        createNewChat: (state, action) => {
            const {chatId, title} = action.payload;

            state.chats[chatId] = {
                id: chatId,
                title,
                updatedOn: new Date().toISOString()
            }

            // initializing message array for this chat
            state.message[chatId] = [];
        },
        addNewMessage: (state, action) => {
            const {chatId, role, content} = action.payload;
            state.message[chatId].push({role, content});
        },
        appendToken: (state, action) => {
            const {chatId, token} = action.payload;

            let lastMessage = state.message[chatId][ state.message[chatId].length - 1 ];
            
            if(lastMessage.role === "ai") {
                if(lastMessage.content === "LOADING") {
                    lastMessage.content = token;
                } else {
                    lastMessage.content += token;
                }
            }
        },
        addMessages: (state, action) => {
            const {chatId, messages} = action.payload;
        
            // re-initialize message state after refresh
            if(!state.message[chatId]) {
                state.message[chatId] = [];
            }

            state.message[chatId].push(...messages);
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, appendToken} = chatSlice.actions;

export default chatSlice.reducer;