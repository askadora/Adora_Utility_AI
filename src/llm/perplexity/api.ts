interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityOptions {
  model: string;
  messages: PerplexityMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface PerplexityResponse {
  id: string;
  model: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    search_context_size: string;
    citation_tokens: number;
    num_search_queries: number;
    reasoning_tokens: number;
  };
  object: string;
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      content: string;
      role: string;
    };
  }>;
  citations?: string[];
  search_results?: Array<{
    title: string;
    url: string;
    date: string;
  }>;
}

export async function streamChatCompletion(
  messages: PerplexityMessage[],
  onChunk: (chunk: string) => void,
  options: Partial<PerplexityOptions> = {}
) {
  try {
    if (!options.model) {
      throw new Error("Model is required");
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("No reader available");
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data) as PerplexityResponse;
            const content = parsed.choices[0]?.message?.content || '';
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in streamChatCompletion:", error);
    throw error;
  }
}

export async function chatCompletion(
  messages: PerplexityMessage[],
  options: Partial<PerplexityOptions> = {}
): Promise<string> {
  try {
    if (!options.model) {
      throw new Error("Model is required");
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as PerplexityResponse;
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error("Error in chatCompletion:", error);
    throw error;
  }
}
