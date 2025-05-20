import dotenv from "dotenv";
dotenv.config();

import { OpenAIToolSet } from "composio-core";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const toolset = new OpenAIToolSet();
const client = new OpenAI();

async function test() {
  const tools = await toolset.getTools({
    actions: ["GITHUB_GET_THE_AUTHENTICATED_USER"],
  });

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a helpful assistant that can use tools." },
    { role: "user", content: "Get my GitHub username." },
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o", // Or gpt-4o-mini
    messages,
    tools,
    tool_choice: "auto",
  });

  const result = await toolset.handleToolCall(response);

  // 🛠 Safely parse and print the first result
  if (Array.isArray(result) && typeof result[0] === "string") {
    try {
      const parsed = JSON.parse(result[0]);
      console.log("✅ Parsed result:", JSON.stringify(parsed, null, 2)); // Pretty print
    } catch (error) {
      console.error("❌ Failed to parse result:", error);
    }
  } else {
    console.warn("⚠️ Unexpected result format:", result);
  }
}

test();
