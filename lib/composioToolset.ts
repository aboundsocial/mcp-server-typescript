import { OpenAIToolSet } from 'composio-core';

// Initialize the Composio OpenAIToolSet with API key
export const composioToolset = new OpenAIToolSet({
  apiKey: process.env.COMPOSIO_API_KEY,
});