export interface ModelVersion {
  id: string;
  name: string;
  description: string;
  modelKey?: string;
  available?: boolean;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  icon: string;
  versions: ModelVersion[];
  capabilities?: string[];
}

export const UNIFIED_MODELS: Model[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s advanced language model',
    icon: '🤖',
    capabilities: ['💬', '🔍', '📊'],
    versions: [
      { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', modelKey: 'gpt-4.1-mini', description: 'Most capable model', available: false },
      { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', modelKey: 'gpt-4.1-nano', description: 'Latest version with improved capabilities', available: true },
      { id: 'gpt-4o', name: 'GPT-4o', modelKey: 'gpt-4o', description: 'Enhanced performance and accuracy', available: false },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', modelKey: 'gpt-4o-mini', description: 'Fast and efficient', available: true },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', modelKey: 'gpt-3.5-turbo', description: 'Fast and affordable', available: false },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s conversational AI',
    icon: '🧠',
    capabilities: ['💬', '📝', '🔍'],
    versions: [
      { id: 'claude-3.7', name: 'Claude 3.7 Sonnet', modelKey: 'anthropic/claude-3-7-sonnet-latest', description: 'Latest version with improved capabilities', available: false }
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s multimodal AI model',
    icon: '🔍',
    capabilities: ['💬', '🔍', '🌐', '📊'],
    versions: [
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', modelKey: 'google/gemini-2.5-flash', description: 'Advanced capabilities', available: false },
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', modelKey: 'google/gemini-2.5-pro', description: 'Advanced capabilities', available: false },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', modelKey: 'google/gemini-2.0-flash-001', description: 'Fast and efficient', available: true },
    ],
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'xAI\'s real-time AI model',
    icon: '⚡',
    capabilities: ['💬', '🌐', '📈'],
    versions: [
      { id: 'grok-3-mini', name: 'Grok 3 Mini', modelKey: 'grok-3-mini', description: 'Lightweight and efficient version', available: true }
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Advanced search and research AI',
    icon: '🔎',
    capabilities: ['💬', '🔍', '🌐'],
    versions: [
      { id: 'sonar', name: 'Sonar', modelKey: 'sonar', description: 'Most recent version', available: true },
      { id: 'sonar-pro', name: 'Sonar Pro', modelKey: 'sonar-pro', description: 'Most recent version', available: false },
      { id: 'sonar-reasoning', name: 'Sonar Reasoning', modelKey: 'sonar-reasoning', description: 'Most recent version', available: false },
      { id: 'sonar-reasoning-pro', name: 'Sonar Reasoning Pro', modelKey: 'sonar-reasoning-pro', description: 'Most recent version', available: false },
      { id: 'sonar-deep-research', name: 'Sonar Deep Research', modelKey: 'sonar-deep-research', description: 'Most recent version', available: false },
    ],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'European AI model',
    icon: '🦅',
    capabilities: ['💬', '📝'],
    versions: [
      { id: 'mistral-small-24B', name: 'Mistral Small 24B Instruct', modelKey: 'mistralai/Mistral-Small-24B-Instruct-2501', description: 'Most capable version', available: true },
      { id: 'mistral-small-3.124B', name: 'Mistral Small 3.1 24B Instruct', modelKey: 'mistralai/Mistral-Small-3.1-24B-Instruct-2503', description: 'Lightweight version', available: true },
      { id: 'mistral-8x7b', name: 'Mistral 8x7B Instruct', modelKey: 'mistralai/Mixtral-8x7B-Instruct-v0.1', description: 'Most capable version', available: false },
    ],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Advanced reasoning and coding AI',
    icon: '🎯',
    capabilities: ['💬', '💻', '🧮'],
    versions: [
      { id: 'deepseek-v3', name: 'DeepSeek V3', modelKey: 'deepseek-ai/deepseek-coder-33b-instruct', description: 'Latest version with enhanced reasoning', available: false },
      { id: 'deepseek-coder-v2', name: 'DeepSeek Coder V2', modelKey: 'deepseek-ai/deepseek-coder-6.7b-instruct', description: 'Specialized for coding tasks', available: false },
      { id: 'deepseek-math', name: 'DeepSeek Math', modelKey: 'deepseek-ai/deepseek-math-7b-instruct', description: 'Mathematical reasoning specialist', available: false },
    ],
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: 'Alibaba\'s multilingual AI model',
    icon: '🌟',
    capabilities: ['💬', '🌐', '📝', '🔍'],
    versions: [
      { id: 'qwen-2.5-72b', name: 'Qwen 2.5 72B', modelKey: 'Qwen/Qwen2.5-72B-Instruct', description: 'Most capable version', available: false },
      { id: 'qwen-2.5-32b', name: 'Qwen 2.5 32B', modelKey: 'Qwen/Qwen2.5-32B-Instruct', description: 'Balanced performance', available: false },
      { id: 'qwen-2.5-14b', name: 'Qwen 2.5 14B', modelKey: 'Qwen/Qwen2.5-14B-Instruct', description: 'Efficient version', available: false },
      { id: 'qwen-2.5-coder', name: 'Qwen 2.5 Coder', modelKey: 'Qwen/Qwen2.5-Coder-32B-Instruct', description: 'Code generation specialist', available: false },
    ],
  },
  {
    id: 'llama',
    name: 'Llama',
    description: 'Meta\'s open-source language model',
    icon: '🦙',
    capabilities: ['💬', '📝', '🔍'],
    versions: [
      { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', modelKey: 'meta-llama/Meta-Llama-3.1-405B-Instruct', description: 'Largest and most capable', available: false },
      { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', modelKey: 'meta-llama/Meta-Llama-3.1-70B-Instruct', description: 'High performance', available: false },
      { id: 'llama-3.1-8b', name: 'Llama 3.1 8B Instruct', modelKey: 'meta-llama/Meta-Llama-3.1-8B-Instruct', description: 'Fast and efficient', available: true },
      { id: 'llama-3.2-vision', name: 'Llama 3.2 Vision', modelKey: 'meta-llama/Meta-Llama-3.2-Vision-Instruct', description: 'Multimodal capabilities', available: false },
    ],
  },
  {
    id: 'phi',
    name: 'Phi',
    description: 'Microsoft\'s small language model',
    icon: '🔬',
    capabilities: ['💬', '📊', '🧮'],
    versions: [
      { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', modelKey: 'microsoft/phi-3.5-mini', description: 'Latest compact model', available: false },
      { id: 'phi-3.5-medium', name: 'Phi-3.5 Medium', modelKey: 'microsoft/phi-3.5-medium', description: 'Balanced size and performance', available: false },
      { id: 'phi-3-vision', name: 'Phi-3 Vision', modelKey: 'microsoft/phi-3-vision', description: 'Multimodal small model', available: false },
    ],
  },
];

// Helper function to get model key to send to API from model and version IDs
export function getModelKey(modelId: string, versionId: string): string {
  const model = UNIFIED_MODELS.find(m => m.id === modelId);
  if (!model) {
    throw new Error(`Model "${modelId}" not found`);
  }
  
  const version = model.versions.find(v => v.id === versionId);
  if (!version) {
    throw new Error(`Version "${versionId}" not found for model "${modelId}"`);
  }
  
  if (!version.modelKey) {
    throw new Error(`No DeepInfra model mapping for "${modelId}/${versionId}"`);
  }
  if (!version.available) {
    return 'unavailable';
  } 
  return version.modelKey;
}

// Helper function to get all available models
export function getAvailableModels(): Model[] {
  return UNIFIED_MODELS;
}

// Helper function to get model versions
export function getModelVersions(modelId: string): ModelVersion[] {
  const model = UNIFIED_MODELS.find(m => m.id === modelId);
  if (!model) {
    throw new Error(`Model "${modelId}" not found`);
  }
  return model.versions;
}

export interface UnifiedChatResponse {
  id: string;
  model: string;
  created: number;
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface UnifiedStreamingResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface UnifiedMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface UnifiedChatOptions {
  model: string;
  version: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stream?: boolean;
} 