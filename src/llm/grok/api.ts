import axios from 'axios';

// Types
export interface GrokModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  maxTokens: number;
}

export interface GrokResponse {
  answer: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// API Configuration
const GROK_API_KEY = process.env.NEXT_PUBLIC_GROK_API_KEY;
const XAI_API_BASE_URL = process.env.NEXT_PUBLIC_XAI_API_BASE_URL || 'https://api.x.ai/v1';

if (!GROK_API_KEY) {
  console.warn('NEXT_PUBLIC_GROK_API_KEY is not set in environment variables');
}

// API Client for models endpoint
const xaiClient = axios.create({
  baseURL: XAI_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${GROK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * List all available Grok models
 * @returns Promise<GrokModel[]> Array of available models
 */
export const listGrokModels = async (): Promise<GrokModel[]> => {
  try {
    const response = await xaiClient.get('/models');
    
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error('Invalid response format from API');
    }

    return response.data.data.map((model: GrokModel) => ({
      id: model.id,
      name: model.name || model.id,
      description: model.description || `Grok model ${model.id}`,
      capabilities: model.capabilities || ['chat', 'completion'],
      maxTokens: model.maxTokens || 4096
    }));
  } catch (error) {
    console.error('Error fetching Grok models:', error);
    // If API call fails, return a default model
    return [{
      id: 'grok-3-mini',
      name: 'Grok 3 Mini',
      description: 'Lightweight and efficient version',
      capabilities: ['chat', 'completion', 'streaming'],
      maxTokens: 4096
    }];
  }
};

/**
 * Get an answer from Grok
 * @param prompt The user's question or prompt
 * @param modelId Optional model ID to use (defaults to grok-3-mini)
 * @param options Optional parameters for the request
 * @returns Promise<GrokResponse> The model's response
 */
export const chatCompletion = async (
  prompt: string,
  modelId: string = 'grok-3-mini',
  options: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  } = {}
): Promise<GrokResponse> => {
  try {
    const response = await xaiClient.post('/chat/completions', {
      model: modelId,
      prompt: prompt,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
      top_p: options.topP ?? 1,
      frequency_penalty: options.frequencyPenalty ?? 0,
      presence_penalty: options.presencePenalty ?? 0,
      stream: false
    });

    console.log('response.data', response.data);

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid response format from API');
    }

    return {
      answer: response.data.choices[0].text,
      model: modelId,
      usage: {
        promptTokens: response.data.usage?.prompt_tokens ?? 0,
        completionTokens: response.data.usage?.completion_tokens ?? 0,
        totalTokens: response.data.usage?.total_tokens ?? 0
      }
    };
  } catch (error) {
    console.error('Error getting Grok answer:', error);
    throw new Error('Failed to get answer from Grok');
  }
};

/**
 * Stream an answer from Grok
 * @param prompt The user's question or prompt
 * @param onChunk Callback function for each chunk of the response
 * @param modelId Optional model ID to use (defaults to grok-3-mini)
 * @param options Optional parameters for the request
 */
export const singleChatCompletion = async (
  prompt: string,
  onChunk: (chunk: string) => void,
  modelId: string = 'grok-3-mini',
  options: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  } = {}
): Promise<void> => {
  try {
    const response = await xaiClient.post('/messages', {
      model: modelId,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
      top_p: options.topP ?? 1,
      frequency_penalty: options.frequencyPenalty ?? 0,
      presence_penalty: options.presencePenalty ?? 0,
      stream: true
    }, {
      responseType: 'text',
      validateStatus: (status) => status === 200
    });

    console.log('response.data', response.data);
    if (!response.data) {
      throw new Error('No response data received');
    }

    // Split the response into lines and process each event
    const lines = response.data.split('\n').filter((line: string) => line.trim() !== '');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          
          // Only handle text_delta events
          if (parsed.type === 'content_block_delta' && 
              parsed.delta?.type === 'text_delta' && 
              parsed.delta?.text) {
            onChunk(parsed.delta.text);
          }
        } catch (e) {
          console.error('Error parsing stream chunk:', e);
        }
      }
    }
  } catch (error) {
    console.error('Error streaming Grok answer:', error);
    throw new Error('Failed to stream answer from Grok');
  }
}; 