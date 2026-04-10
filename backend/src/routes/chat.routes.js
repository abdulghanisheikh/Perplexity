import { Router } from "express";
import { getChats, sendMessage, getMessages, deleteChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);

chatRouter.get("/", authUser, getChats);

chatRouter.get("/:chatId/messages", authUser, getMessages);

chatRouter.get("/delete/:chatId", authUser, deleteChat);

export default chatRouter;