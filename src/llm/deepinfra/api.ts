import { createDeepInfra } from "@ai-sdk/deepinfra";
import { streamText } from "ai";
import { getModelKey, UnifiedChatResponse, UnifiedStreamingResponse, UnifiedMessage, UnifiedChatOptions } from '../unified-models';

// API Configuration
const DEEPINFRA_API_KEY = process.env.NEXT_PUBLIC_DEEPINFRA_API_KEY;

if (!DEEPINFRA_API_KEY) {
  console.warn('NEXT_PUBLIC_DEEPINFRA_API_KEY is not set in environment variables');
}

// Initialize DeepInfra client
const deepinfra = createDeepInfra({
  apiKey: DEEPINFRA_API_KEY,
});

/**
 * Get an answer from DeepInfra
 * @param messages The conversation messages
 * @param options The chat options
 * @returns Promise<UnifiedChatResponse> The model's response
 */
export const chatCompletion = async (
  messages: UnifiedMessage[],
  options: UnifiedChatOptions
): Promise<UnifiedChatResponse> => {
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

    // Convert messages to a single prompt
    const prompt = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');

    const result = await streamText({
      model: deepinfra(modelKey),
      prompt,
      temperature: options.temperature ?? 0.7,
      topP: options.topP ?? 0.9,
      maxTokens: options.maxTokens ?? 2048,
    });

    let fullResponse = '';
    for await (const textPart of result.textStream) {
      fullResponse += textPart;
    }

    const usage = await result.usage;

    return {
      id: Date.now().toString(),
      model: options.model,
      created: Date.now(),
      content: fullResponse,
      usage: usage ? {
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens
      } : undefined
    };
  } catch (error) {
    console.error('Error getting DeepInfra answer:', error);
    throw new Error('Failed to get answer from DeepInfra');
  }
};

/**
 * Stream an answer from DeepInfra
 * @param messages The conversation messages
 * @param onChunk Callback function for each chunk of the response
 * @param options The chat options
 */
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

    // Convert messages to a single prompt
    const prompt = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');

    const result = await streamText({
      model: deepinfra(modelKey),
      prompt,
      temperature: options.temperature ?? 0.7,
      topP: options.topP ?? 0.9,
      maxTokens: options.maxTokens ?? 2048,
    });

    for await (const textPart of result.textStream) {
      onChunk({
        content: textPart,
        model: options.model
      });
    }

    // Get final usage stats
    const usage = await result.usage;
    if (usage) {
      onChunk({
        content: '',
        model: options.model,
        usage: {
          promptTokens: usage.promptTokens,
          completionTokens: usage.completionTokens,
          totalTokens: usage.totalTokens
        }
      });
    }
  } catch (error) {
    console.error('Error streaming DeepInfra answer:', error);
    throw new Error('Failed to stream answer from DeepInfra');
  }
};
