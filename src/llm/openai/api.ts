import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatCompletionOptions {
  model: string;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export async function streamChatCompletion(
  messages: ChatCompletionMessageParam[],
  onChunk: (chunk: string) => void,
  options: Partial<ChatCompletionOptions> = {}
) {
  try {
    if (!options.model) {
      throw new Error("Model is required");
    }
    const stream = await openai.chat.completions.create({
      model: options.model,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error("Error in streamChatCompletion:", error);
    throw error;
  }
}

export async function chatCompletion(
  messages: ChatCompletionMessageParam[],
  options: Partial<ChatCompletionOptions> = {}
) {
  try {
    if (!options.model) {
      throw new Error("Model is required");
    }
    const response = await openai.chat.completions.create({
      model: options.model,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
      stream: false,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error in chatCompletion:", error);
    throw error;
  }
}
