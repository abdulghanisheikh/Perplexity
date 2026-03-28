import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 2,
    maxRetries: 2
});

export async function ask(query) {
    const response = await model.invoke(query);
    return response;
}