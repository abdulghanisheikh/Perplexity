import { app } from "./src/app.js";
import "dotenv/config";
import { connectToDB } from "./src/configs/database.config.js";
import { ask } from "../backend/src/services/ai.service.js";
import readline from "readline/promises";
import { HumanMessage } from "@langchain/core/messages";

connectToDB();

const rl = new readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let messages = [];

while(true) {
    const userInput = await rl.question("You: ");

    if(userInput === "/bye") break;
    messages.push(new HumanMessage(userInput));

    const response = await ask(messages);

    messages.push(response);
    console.log(`AI: ${response.content}`);
}

app.listen(process.env.PORT, () => {
    console.log(`Server on ${process.env.PORT}`);
});