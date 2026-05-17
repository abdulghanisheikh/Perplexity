import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import { HumanMessage, AIMessage } from "langchain";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async(req, res) => {
    try {
        let message = req.body.message;
        let chatId = req.body.chatId;

        // setting headers to enable streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        if(!message) {
            res.status(400);
            return res.write(`data: ${JSON.stringify({
                success: false,
                message: "Can't send empty message",
                err: "empty message"
            })}\n\n`);
        }

        let chatTitle = null, chat = null;

        // first message of chat
        if(!chatId) {
            chatTitle = await generateChatTitle(message);

            chat = await chatModel.create({
                title: chatTitle,
                user: req.user.id
            });

        } else {
            chat = await chatModel.findById(chatId);

            if(chat.title === "Untitled chat") {
                chatTitle = await generateChatTitle(message);
                chat.title = chatTitle;

                await chat.save();
            }
        }

        // fetching all messages of this chat
        let messages = await messageModel.find({chat: chatId || chat._id});

        if(messages.length > 0) {
            messages.forEach((msg, index) => {
                if(msg.role === "ai") messages[index] = new AIMessage(msg);
                else messages[index] = new HumanMessage(msg);
            });
        }

        messages.push(new HumanMessage(message));

        await messageModel.create({
            chat: chatId || chat._id,
            content: message,
            role: "user"
        });

        const responseStream = await generateResponse(messages);
        let lastMessage = ""; // to store the whole message of AI coming in chunks
        let firstChunk = true;
        
        for await (const [token] of responseStream) {
            const chunk = token?.contentBlocks[0]?.text;

            if(firstChunk) {
                firstChunk = false;

                res.status(200);
                res.write(`data: ${JSON.stringify({
                    chat,
                    token: chunk
                })}\n\n`);

            } else {
                res.write(`data: ${JSON.stringify({token: chunk})}\n\n`);
            }

            lastMessage += chunk;
        }

        // chunks finished and stream connection closed
        res.write(`data: ${JSON.stringify({done: true})}\n\n`);
        res.end();

        const aiMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: lastMessage,
            role: "ai"
        });

        messages.push(new AIMessage(lastMessage));

    } catch(err) {
        res.status(500);
        return res.write(`data: ${JSON.stringify({
            success: false,
            message: "Server error",
            err: err.message
        })}\n\n`);
    }
}

export const startNewChat = async(req, res) => {
    try {
        const chat = await chatModel.create({ user: req.user.id });

        res.status(200).json({
            success: true,
            message: "new chat created",
            newChat: chat
        });
    } catch(err) {
        return res.status(409).json({
            success: false,
            message: "create chat operation failed",
            error: err.message
        });
    }
}

export const getChats = async(req, res) => {
    const user = req.user;
    const chats = await chatModel.find({user: user.id});

    if(!chats) {
        return res.status(400).json({
            success: false,
            message: "No chats found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Chats fetched",
        chats
    });
}

export const getMessages = async(req, res) => {
    const {chatId} = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    });

    if(!chat) {
        return res.status(404).json({
            success: false,
            message: "Chat not found"
        });
    }

    const messages = await messageModel.find({chat: chatId});

    res.status(200).json({
        success: true,
        message: "Messages fetched",
        messages
    });
}

export const deleteChat = async(req, res) => {
    const {chatId} = req.params;
    
    // chat delete
    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    });

    if(!chat) {
        return res.status(404).json({
            success: false,
            message: "No chat to delete"
        });
    }

    // delete all messages of the chat
    await messageModel.deleteMany({chat: chatId});

    res.status(200).json({
        success: true,
        message: "Chat deleted"
    });
}