import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";
import { HumanMessage } from "@langchain/core/messages";
import { createAgent, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";
import { tavily } from "@tavily/core";

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

// LLM model
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 2,
    maxRetries: 2
});

// Agent => LLM having access of tools
const agent = createAgent({
    model: llm,
    tools: [emailTool, webSearchTool]
});

let messages = [];

export const askAgent = async({query}) => {
    messages.push(new HumanMessage(query));

    const response = await agent.invoke({messages});

    const answer = response.messages[ response.messages.length-1 ].content;
    messages.push(answer);

    return answer;
}