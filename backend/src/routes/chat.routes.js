import { Router } from "express";
import { getChats, sendMessage, getMessages, deleteChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const chatRouter = Router();

/**
 * @route POST /api/chats/message
 * @description sends user message and get back the AI response
 * @access private
 */
chatRouter.post("/message", authUser, sendMessage);

/**
 * @route GET /api/chats/
 * @description fetch all chats of user
 * @access private
 */
chatRouter.get("/", authUser, getChats);

/**
 * @route GET /api/chats/:chatId/messages
 * @description fetch all messages of chat
 * @access private
 */
chatRouter.get("/:chatId/messages", authUser, getMessages);

/**
 * @route DELETE /api/chats/delete/:chatId
 * @description delete a chat
 * @access private
 */
chatRouter.get("/delete/:chatId", authUser, deleteChat);

export default chatRouter;