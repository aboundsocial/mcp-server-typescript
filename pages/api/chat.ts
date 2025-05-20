import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { openaiClient } from '@/lib/openaiClient';
import { composioToolset } from '@/lib/composioToolset';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
  }

  try {
    // Get Composio tools for AI agent actions
    const tools = await composioToolset.getTools({
      actions: ['GITHUB_GET_THE_AUTHENTICATED_USER'],
    });

    // Define messages for ChatGPT with a clearer system prompt
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are a helpful assistant that can use tools to interact with the Composio MCP Server. When using a tool, always provide a clear, natural language response to the user based on the tool result, followed by the tool result in a simplified format.',
      },
      { role: 'user', content: message },
    ];

    // Call OpenAI API with Composio tools
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages,
      tools,
      tool_choice: 'auto',
    });

    // Handle any tool calls (e.g., GitHub username fetch via Composio MCP Server)
    const result = await composioToolset.handleToolCall(response);

    // Extract the ChatGPT response
    let finalResponse = response.choices[0].message.content || '';

    // If there’s a tool call result, process and append it
    if (Array.isArray(result) && typeof result[0] === 'string') {
      try {
        const parsed = JSON.parse(result[0]);
        // Extract the username from the tool result
        const username = parsed?.data?.login || 'Unknown';
        // Append a simplified tool result
        finalResponse = finalResponse.trim()
          ? `${finalResponse}\nTool Result: {\n  "username": "${username}"\n}`
          : `Tool Result: {\n  "username": "${username}"\n}`;
      } catch (error) {
        finalResponse += '\nError parsing tool result.';
      }
    }

    res.status(200).json({ reply: finalResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
}