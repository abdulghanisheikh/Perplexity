import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import morgan from "morgan";
import cors from "cors";

export const app = express();

// Middlewares
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);