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
      { id: 'gpt-4.1-nano', name: 'GPT-4.1 Nano', modelKey: 'gpt-4.1-nano', description: 'Fast lightweight version', available: true },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', modelKey: 'gpt-4o-mini', description: 'Streamlined GPT-4o', available: true },
      { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', modelKey: 'gpt-4.1-mini', description: 'Compact GPT-4.1', available: false },
      { id: 'gpt-4o', name: 'GPT-4o', modelKey: 'gpt-4o', description: 'Advanced reasoning model', available: false },
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
      { id: 'claude-3.7', name: 'Claude 3.7 Sonnet', modelKey: 'anthropic/claude-3-7-sonnet-latest', description: 'Latest Claude model', available: true },
      { id: 'claude-4-opus', name: 'Claude 4 Opus', modelKey: 'anthropic/claude-4-opus', description: 'Most powerful model', available: false },
      { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', modelKey: 'anthropic/claude-4-sonnet', description: 'Mid size model', available: false },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s multimodal AI model',
    icon: '🔍',
    capabilities: ['💬', '🔍', '🌐', '📊'],
    versions: [
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', modelKey: 'google/gemini-2.0-flash-001', description: 'Balanced version', available: true },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', modelKey: 'google/gemini-2.5-flash', description: 'Fast response version', available: false },
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', modelKey: 'google/gemini-2.5-pro', description: 'Full capabilities version', available: false },
    ],
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'xAI\'s real-time AI model',
    icon: '⚡',
    capabilities: ['💬', '🌐', '📈'],
    versions: [
      { id: 'grok-3-mini', name: 'Grok 3 Mini', modelKey: 'grok-3-mini', description: 'Fast efficient version', available: true }
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Advanced search and research AI',
    icon: '🔎',
    capabilities: ['💬', '🔍', '🌐'],
    versions: [
      { id: 'sonar', name: 'Sonar', modelKey: 'sonar', description: 'Standard version', available: true },
      { id: 'sonar-pro', name: 'Sonar Pro', modelKey: 'sonar-pro', description: 'Advanced research', available: false },
      { id: 'sonar-reasoning', name: 'Sonar Reasoning', modelKey: 'sonar-reasoning', description: 'Reasoning focused', available: false },
      { id: 'sonar-reasoning-pro', name: 'Sonar Reasoning Pro', modelKey: 'sonar-reasoning-pro', description: 'Advanced reasoning', available: false },
      { id: 'sonar-deep-research', name: 'Sonar Deep Research', modelKey: 'sonar-deep-research', description: 'Deep research', available: false },
    ],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'European AI model',
    icon: '🦅',
    capabilities: ['💬', '📝'],
    versions: [
      { id: 'mistral-small-24B', name: 'Mistral Small 24B Instruct', modelKey: 'mistralai/Mistral-Small-24B-Instruct-2501', description: 'General purpose', available: true },
      { id: 'mistral-small-3.124B', name: 'Mistral Small 3.1 24B Instruct', modelKey: 'mistralai/Mistral-Small-3.1-24B-Instruct-2503', description: 'Updated version', available: true },
      { id: 'mistral-8x7b', name: 'Mistral 8x7B Instruct', modelKey: 'mistralai/Mixtral-8x7B-Instruct-v0.1', description: 'Advanced version', available: false },
    ],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Advanced reasoning and coding AI',
    icon: '🎯',
    capabilities: ['💬', '💻', '🧮'],
    versions: [
      { id: 'deepseek-v3-0324', name: 'DeepSeek V3-0324', modelKey: 'deepseek-ai/DeepSeek-V3-0324', description: 'Latest version', available: true },
      { id: 'deepseek-r1-turbo', name: 'DeepSeek R1 Turbo', modelKey: 'deepseek-ai/DeepSeek-R1-Turbo', description: 'Fast version', available: false },
      { id: 'deepseek-v3', name: 'DeepSeek V3', modelKey: 'deepseek-ai/DeepSeek-V3', description: 'Full version', available: false },
    ],
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: 'Alibaba\'s multilingual AI model',
    icon: '🌟',
    capabilities: ['💬', '🌐', '📝', '🔍'],
    versions: [
      { id: 'qwen3-32B', name: 'Qwen 3 32B', modelKey: 'Qwen/Qwen3-32B', description: 'Large version', available: true },
      { id: 'qwen2-14B', name: 'Qwen 3 14B', modelKey: 'Qwen/Qwen3-14B', description: 'Efficient version', available: true },
      { id: 'qwen-2.5-coder-32b', name: 'Qwen 2.5 Coder', modelKey: 'Qwen/Qwen2.5-Coder-32B-Instruct', description: 'Code focused', available: true },
      { id: 'qwen-qwq-32b', name: 'Qwen QwQ 32B', modelKey: 'Qwen/QwQ-32B', description: 'Specialized version', available: false },
    ],
  },
  {
    id: 'llama',
    name: 'Llama',
    description: 'Meta\'s open-source language model',
    icon: '🦙',
    capabilities: ['💬', '📝', '🔍'],
    versions: [
      { id: 'llama-3.2-3b', name: 'Llama 3.2 3B', modelKey: 'meta-llama/Llama-3.2-3B-Instruct', description: 'Lightweight', available: true },
      { id: 'llama-3.2-1b', name: 'Llama 3.2 1B', modelKey: 'meta-llama/Llama-3.2-1B-Instruct', description: 'Lightweight', available: true },
      { id: 'llama-3.1-8b', name: 'Llama 3.1 8B Instruct', modelKey: 'meta-llama/Meta-Llama-3.1-8B-Instruct', description: 'Balanced version', available: true },
      { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', modelKey: 'meta-llama/Meta-Llama-3.1-405B-Instruct', description: 'Large version', available: false },
    ],
  },
  {
    id: 'phi',
    name: 'Phi',
    description: 'Microsoft\'s small language model',
    icon: '🔬',
    capabilities: ['💬', '📊', '🧮'],
    versions: [
      { id: 'phi-4', name: 'Phi 4', modelKey: 'microsoft/phi-4', description: 'Latest version', available: true },
      { id: 'phi-4-multimodal-instruct', name: 'Phi-4-multimodal-instruct', modelKey: 'microsoft/Phi-4-multimodal-instruct', description: 'Image capable', available: false },
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