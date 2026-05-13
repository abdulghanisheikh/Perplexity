import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import cors from "cors";
import morgan from "morgan";
import {fileURLToPath} from "url";
import path from "path";

export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

if(process.env.NODE_ENVIRONMENT === "development") {
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST"]
    }));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// health check
app.get("/health", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// serve react app for any unmatched route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});