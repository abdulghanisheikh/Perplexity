import { Router } from "express";
import { sendMessage } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);

export default chatRouter;