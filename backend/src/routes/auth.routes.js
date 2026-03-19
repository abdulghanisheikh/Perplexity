import { Router } from "express";
import { registerUser, verifyEmail, loginUser, getMe } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register", registerValidator, registerUser);

/**
 * @route POST /api/auth/login
 * @description login user and return jwt token
 * @access public
 */
authRouter.post("/login", loginValidator, loginUser);

/**
 * @route GET /api/auth/verifyEmail?token={}
 * @description Verifies user email address
 * @access public
 */
authRouter.get("/verifyEmail", verifyEmail);

/**
 * @route GET /api/auth/login
 * @description Gets loggedin user information
 * @access private
 */
authRouter.get("/getMe", authUser, getMe);

export default authRouter;