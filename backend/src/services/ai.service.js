import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    temperature: 2,
    maxRetries: 2
});

export default model;