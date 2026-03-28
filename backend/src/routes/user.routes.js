import { Router } from "express";
import { callAgent } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const userRouter = Router();

userRouter.post("/ask", authUser, callAgent);

export default userRouter;