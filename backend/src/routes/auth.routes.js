import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { registerValidation } from "../validator/auth.validator.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register the user
 * @access public
 */
authRouter.post("/register", registerValidation, registerUser);

export default authRouter;