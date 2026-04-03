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

    // no chatId => first time message on a chat
    if(!chatId) {
        chatTitle = await generateChatTitle(message);
        chat = await chatModel.create({
            title: chatTitle,
            user: req.user.id
        });
    }

    let messages = [];
    // if chatId is coming
    messages = await messageModel.find({chat: chatId});
    // if chatId is not coming
    if(!chatId) messages = await messageModel.find({chat: chat._id});

    try {
        messages.push(new HumanMessage(message));

        const response = await generateResponse(messages);
        const result = response.messages[ response.messages.length-1 ].content;

        const userMessage = await messageModel.create({
            chat: chatId === null ? chat._id : chatId,
            content: message,
            role: "user"
        });
        
        const aiMessage = await messageModel.create({
            chat: chatId === null ? chat._id : chatId,
            content: result,
            role: "ai"
        });

        messages.push(new AIMessage(result));

        res.status(200).json({
            success: true,
            message: "Response generated",
            aiMessage,
            title,
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