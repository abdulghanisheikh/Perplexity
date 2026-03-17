import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats",
        required: true
    },
    content: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["user", "ai"]
        }
    }
});

const messageModel = mongoose.model("messages", messageSchema);
export default messageModel;