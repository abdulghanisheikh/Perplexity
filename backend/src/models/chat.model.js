import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: [true, "title of chat is required."],
        default: "Untitled chat"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const chatModel = mongoose.model("chats", chatSchema);
export default chatModel;