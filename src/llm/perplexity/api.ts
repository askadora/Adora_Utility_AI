import { getModelKey, UnifiedChatResponse, UnifiedStreamingResponse, UnifiedMessage, UnifiedChatOptions } from '../unified-models';

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

export const streamChatCompletion = async (
  messages: UnifiedMessage[],
  onChunk: (chunk: UnifiedStreamingResponse) => void,
  options: UnifiedChatOptions
): Promise<void> => {
  try {
    if (!options.model) {
      throw new Error("Model is required");
    }

    const modelKey = getModelKey(options.model, options.version);
    
    if (modelKey === 'unavailable') {
      // Send sample response for unavailable models
      onChunk({
        content: `This is a sample message from ${options.model}`,
        model: options.model
      });
      return;
    }
    console.log('modelKey', modelKey);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelKey,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1000,
        top_p: options.topP ?? 1,
        frequency_penalty: options.frequencyPenalty ?? 0,
        presence_penalty: options.presencePenalty ?? 0,
        stream: true
      })
    });
    console.log('response', response);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer

      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.choices?.[0]?.delta?.content) {
              // Format the content by removing markdown headers and extra spaces
              const content = parsed.choices[0].delta.content
                .replace(/^[#*]+\s*/gm, '') // Remove markdown headers and asterisks
                .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
                .trim();
              console.log('content', content);
              if (content) {
                onChunk({
                  content,
                  model: options.model,
                  usage: parsed.usage ? {
                    promptTokens: parsed.usage.prompt_tokens,
                    completionTokens: parsed.usage.completion_tokens,
                    totalTokens: parsed.usage.total_tokens
                  } : undefined
                });
              }
            }
          } catch (e) {
            console.error('Error parsing stream chunk:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error streaming Perplexity answer:', error);
    throw new Error('Failed to stream answer from Perplexity');
  }
};

export async function chatCompletion(
  messages: UnifiedMessage[],
  options: UnifiedChatOptions
): Promise<UnifiedChatResponse> {
  try {
    if (!options.model) {
      throw new Error("Model is required");
    }

    const modelKey = getModelKey(options.model, options.version);
    
    if (modelKey === 'unavailable') {
      // Return sample response for unavailable models
      return {
        id: Date.now().toString(),
        model: options.model,
        created: Date.now(),
        content: `This is a sample message from ${options.model}`
      };
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelKey,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as PerplexityResponse;
    return {
      id: data.id,
      model: options.model,
      created: data.created,
      content: data.choices[0]?.message?.content || '',
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens
      } : undefined
    };
  } catch (error) {
    console.error("Error in chatCompletion:", error);
    throw error;
  }
}
