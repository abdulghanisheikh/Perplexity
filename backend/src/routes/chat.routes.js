import { Router } from "express";
import { getChats, sendMessage, getMessages, deleteChat, startNewChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const chatRouter = Router();

/**
 * @route POST /api/chats/message
 * @description sends user message and get back the ai response
 * @access private
 */
chatRouter.post("/message", authUser, sendMessage);

/**
 * @route POST /api/chats/new
 * @description creates new chat
 * @access
 */
chatRouter.post("/new", authUser, startNewChat);

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
chatRouter.delete("/delete/:chatId", authUser, deleteChat);

export default chatRouter;