import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import { HumanMessage, AIMessage } from "langchain";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async(req, res) => {
    let {message, chatId} = req.body;

    if(!message) {
        return res.status(400).json({
            success: false,
            message: "Can't send empty message",
            err: "Empty message"
        });
    }

    let chatTitle = null, chat = null;

    // first message on the chat
    if(!chatId) {
        chatTitle = await generateChatTitle(message);
        chat = await chatModel.create({
            title: chatTitle,
            user: req.user.id
        });
    }

    // fetching all messages of this chat
    let messages = [];
    if(!chatId) {
        messages = await messageModel.find({chat: chat._id});
    } else {
        messages = await messageModel.find({chat: chatId});
    }

    if(messages.length > 0) {
        messages.forEach((msg, index) => {
            if(msg.role === "ai") messages[index] = new AIMessage(msg);
            else messages[index] = new HumanMessage(msg);
        });
    }

    try {
        messages.push(new HumanMessage(message));

        const userMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: message,
            role: "user"
        });

        const response = await generateResponse(messages);
        const result = response.messages[ response.messages.length-1 ].content;

        const aiMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: result,
            role: "ai"
        });

        messages.push(new AIMessage(result));

        res.status(200).json({
            success: true,
            message: "Response generated",
            aiMessage,
            chat
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            err: err.message
        });
    }
}