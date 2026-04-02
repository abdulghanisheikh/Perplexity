import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";
import { createAgent, tool, SystemMessage, HumanMessage } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";
import { tavily } from "@tavily/core";
import {ChatMistralAI} from "@langchain/mistralai";

// This tool let the model to send an email
const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send an email.",

        // Validate arguments of sendEmail function
        schema: z.object({
            username: z.string().describe("Username of the reciever"),
            to: z.string().describe("Reciever's email address"),
            html: z.string().describe("Html content of the email"),
            subject: z.string().describe("Subject of the email")
        })
    }
);

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const webSearch = async({ query }) => {
    const result = await tvly.search(query);
    return JSON.stringify(result); // LangChain tools should return string as an output
}

// This tool let the model to web search
const webSearchTool = tool(
    webSearch,
    {
        name: "webSearch",
        description: "Use this tool to search web",
        schema: z.object({
            query: z.string().describe("This is user's query")
        })
    }
);

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0,
    maxRetries: 2
});

const mistralModel = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-small-2603',
    temperature: 0,
    maxRetries: 2
});

// Agent => LLM having access of tools
const agent = createAgent({
    model: geminiModel,
    tools: [emailTool, webSearchTool]
});

export const generateResponse = async(messages) => {
    const response = await agent.invoke({messages});
    return response;
}

export const generateChatTitle = async(message) => {
    const response = await mistralModel.invoke([
        ["system", "Give a one-liner or one-word Title for the chat out from the user's message, which user is asking in the user message."],
        ["human", message]
    ]);

    return response.content;
}