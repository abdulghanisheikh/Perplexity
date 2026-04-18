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
            err: "empty message"
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
    } else {
        const chat = await chatModel.findById(chatId);

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

    try {
        messages.push(new HumanMessage(message));

        await messageModel.create({
            chat: chatId || chat._id,
            content: message,
            role: "user"
        });

        const response = await generateResponse(messages);
        const lastMessage = response.messages[ response.messages.length-1 ].content;

        const aiMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: lastMessage,
            role: "ai"
        });

        messages.push(new AIMessage(lastMessage));

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

    res.status(201).json({
        success: true,
        message: "chat created",
        newChat: chat
    });
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