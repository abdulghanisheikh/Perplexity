import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";
import { HumanMessage } from "@langchain/core/messages";
import { createAgent, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

// Tool which sends email to others
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
    tools: [emailTool]
});

let messages = [];

export const askAgent = async(query) => {
    messages.push(new HumanMessage(query));

    const response = await agent.invoke({messages});

    const answer = response.messages[ response.messages.length-1 ].content;
    messages.push(answer);

    return answer;
}