import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import { HumanMessage, AIMessage } from "langchain";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

const messages = [];

export const sendMessage = async(req, res) => {
    const { message } = req.body;

    if(!message) {
        return res.status(400).json({
            success: false,
            message: "Can't send empty message",
            err: "Empty message"
        });
    }

    try {
        messages.push(new HumanMessage(message));

        const title = await generateChatTitle(message);
        const chat = await chatModel.create({
            user: req.user.id,
            title
        });

        const response = await generateResponse(messages);

        const aiMessage = response.messages[ response.messages.length-1 ].content;
        messages.push(new AIMessage(aiMessage));

        res.status(200).json({
            success: true,
            message: "Response generated",
            aiMessage,
            title,
            chat
        });
    } catch(err) {
        console.log(err.message);
    }
}