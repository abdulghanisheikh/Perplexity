import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});