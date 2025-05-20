import { OpenAI } from 'openai';

// Initialize the OpenAI client with your API key from environment variables
export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});