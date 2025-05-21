import { OpenAI } from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  try {
    console.log('Request received');
    const { prompt } = await req.json();
    console.log('Prompt received:', prompt);

    if (!prompt) {
      throw new Error('Prompt is required');
    }

    // Use OPENAI_API_KEY instead of VITE_ prefixed version
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('API Key exists:', !!apiKey);

    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Initializing OpenAI client');
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey
    });

    console.log('Making request to OpenAI');
    // Make request to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });
    console.log('OpenAI response received');

    const response = completion.choices[0]?.message?.content || '';
    console.log('Processing response:', response.substring(0, 50) + '...');

    // Return the response
    return new Response(
      JSON.stringify({ response }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});