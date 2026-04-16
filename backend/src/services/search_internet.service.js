import {tavily as Tavily} from "@tavily/core";

const tavily = Tavily({ apiKey: process.env.TAVILY_API_KEY });

export const webSearch = async({query}) => {
    const result = await tavily.search(query, {
        maxResults: 5,
        searchDepth: "advanced"
    });

    return JSON.stringify(result); // LangChain tools should return string as an output
}