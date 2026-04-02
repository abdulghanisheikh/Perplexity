import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import { HumanMessage, AIMessage } from "langchain";

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

    let chatTitle;
    try {
        if(messages.length === 0) {
            chatTitle = await generateChatTitle(message);
        }

        messages.push(new HumanMessage(message));
        const response = await generateResponse(messages);

        const aiMessage = response.messages[ response.messages.length-1 ].content;
        messages.push(new AIMessage(aiMessage));

        res.status(200).json({
            success: true,
            message: "Response generated",
            aiMessage
        });
    } catch(err) {
        console.log(err.message);
    }
}