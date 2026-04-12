import {createSlice} from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: '',
        loading: true,
        error: null
    },
    reducers: {
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

export const {setChats, setCurrentChatId, setLoading, setError} = chatSlice.actions;
export default chatSlice.reducer;