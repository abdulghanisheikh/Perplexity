import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";
import { AIMessage, createAgent, HumanMessage, tool } from "langchain";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";
import {ChatMistralAI} from "@langchain/mistralai";
import { webSearch } from "./search_internet.service.js";

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

// This tool let the model to web search
const webSearchTool = tool(
    webSearch,
    {
        name: "webSearch",
        description: "Use this tool to get the relevant information from the internet",
        schema: z.object({
            query: z.string().describe("The search query")
        })
    }
);

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0,
    maxRetries: 2
});

const mistralModel = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: 'mistral-small-latest',
    temperature: 0,
    maxRetries: 2
});

const agent = createReactAgent({
    llm: geminiModel,
    tools: [emailTool, webSearchTool],
    messageModifier: `You are a helpful assistant. You have access to web search and email tools. 
    Use web search when you need current or real-time information and give the response in mainly in the form of Headings and their sub-headings/points.`
});

export const generateResponse = async (messages) => {
    const stream = await agent.stream(
        {messages},
        {streamMode: "messages"}
    );
    
    return stream;
}

export const generateChatTitle = async(message) => {
    const response = await mistralModel.invoke([
        ["system", `
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.

            User will provide you with the first message of a chat conversation, and will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.
        `],
        ["human", `
            Generate a title for a chat conversation based on the following first message:
            ${message}
        `]
    ]);

    return response.content;
}