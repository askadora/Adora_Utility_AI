import { createDeepInfra } from "@ai-sdk/deepinfra";
import { streamText } from "ai";
import { getModelKeyId } from '../unified-models';

export interface DeepInfraResponse {
  id: string;
  model: string;
  created: number;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export interface DeepInfraOptions {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  system?: string;
}

export class DeepInfraAPI {
  private deepinfra: ReturnType<typeof createDeepInfra>;

  constructor(apiKey: string) {
    this.deepinfra = createDeepInfra({
      apiKey: apiKey,
    });
  }

  async generateText(
    prompt: string,
    modelId: string,
    versionId: string,
    options: DeepInfraOptions = {}
  ): Promise<DeepInfraResponse> {
    const deepInfraModelId = getModelKeyId(modelId, versionId);

    try {
      const result = await streamText({
        model: this.deepinfra(deepInfraModelId),
        prompt: prompt,
        system: options.system,
        temperature: options.temperature ?? 0.7,
        topP: options.topP ?? 0.9,
        maxTokens: options.maxTokens ?? 2048,
      });

      let fullResponse = '';
      for await (const textPart of result.textStream) {
        fullResponse += textPart;
      }

      const usage = await result.usage;
      // const finishReason = await result.finishReason;

      return {
        id: '', // Not provided by the SDK
        model: deepInfraModelId,
        created: Date.now(),
        response: fullResponse,
        done: true,
        context: [],
        total_duration: 0,
        load_duration: 0,
        prompt_eval_count: usage?.promptTokens ?? 0,
        prompt_eval_duration: 0,
        eval_count: usage?.completionTokens ?? 0,
        eval_duration: 0,
      };
    } catch (error) {
      console.error('Error calling DeepInfra API:', error);
      throw error;
    }
  }

  async generateTextStream(
    prompt: string,
    modelId: string,
    versionId: string,
    options: DeepInfraOptions = {},
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const deepInfraModelId = getModelKeyId(modelId, versionId);

    try {
      const result = await streamText({
        model: this.deepinfra(deepInfraModelId),
        prompt: prompt,
        system: options.system,
        temperature: options.temperature ?? 0.7,
        topP: options.topP ?? 0.9,
        maxTokens: options.maxTokens ?? 2048,
      });

      for await (const textPart of result.textStream) {
        onChunk(textPart);
      }

      // Optional: You can also get usage and finish reason if needed
      const usage = await result.usage;
      const finishReason = await result.finishReason;
      console.log('Usage:', usage);
      console.log('Finish reason:', finishReason);
    } catch (error) {
      console.error('Error in stream processing:', error);
      throw error;
    }
  }
}
