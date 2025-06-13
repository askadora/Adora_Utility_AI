import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getModelKey, UnifiedChatResponse, UnifiedStreamingResponse, UnifiedMessage, UnifiedChatOptions } from '../unified-models';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

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

    const response = await openai.chat.completions.create({
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
    });

    for await (const chunk of response) {
      if (chunk.choices[0]?.delta?.content) {
        // Format the content by removing markdown headers and extra spaces
        const content = chunk.choices[0].delta.content

        if (content) {
          onChunk({
            content,
            model: options.model,
            usage: chunk.usage ? {
              promptTokens: chunk.usage.prompt_tokens,
              completionTokens: chunk.usage.completion_tokens,
              totalTokens: chunk.usage.total_tokens
            } : undefined
          });
        }
      }
    }
  } catch (error) {
    console.error('Error streaming OpenAI answer:', error);
    throw new Error('Failed to stream answer from OpenAI');
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

    const response = await openai.chat.completions.create({
      model: modelKey,
      messages: messages as ChatCompletionMessageParam[],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
      stream: false,
    });

    return {
      id: response.id,
      model: options.model,
      created: response.created,
      content: response.choices[0]?.message?.content || "",
      usage: response.usage ? {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens
      } : undefined
    };
  } catch (error) {
    console.error("Error in chatCompletion:", error);
    throw error;
  }
}
