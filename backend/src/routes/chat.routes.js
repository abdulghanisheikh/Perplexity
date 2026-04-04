import { Router } from "express";
import { getChats, sendMessage, getMessages } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);
chatRouter.get("/chats", authUser, getChats);
chatRouter.get("/messages/:chatId", authUser, getMessages);

export default chatRouter;