'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperPlaneIcon, PlusIcon } from '@/icons';
import { singleChatCompletion } from '@/llm/grok/api';

type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface ModelConversation {
  id: string;
  messages: Message[];
  isLoading: boolean;
}

interface ModelVersion {
  id: string;
  name: string;
  description: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
  icon: string;
  versions: ModelVersion[];
  capabilities?: string[];
}

const initialModels: Model[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s advanced language model',
    icon: '🤖',
    capabilities: ['💬', '🔍', '📊'],
    versions: [
      { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Latest version with improved capabilities' },
      { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s conversational AI',
    icon: '🧠',
    capabilities: ['💬', '📝', '🔍'],
    versions: [
      { id: 'claude-3.7', name: 'Claude 3.7 Sonnet', description: 'Latest version with improved capabilities' },
      { id: 'claude-3.5', name: 'Claude 3.5 Sonnet', description: 'Balanced performance' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s multimodal AI model',
    icon: '🔍',
    capabilities: ['💬', '🔍', '🌐', '📊'],
    versions: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Advanced capabilities' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and efficient' },
    ],
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'xAI\'s real-time AI model',
    icon: '⚡',
    capabilities: ['💬', '🌐', '📈'],
    versions: [
      { id: 'grok-3-mini', name: 'Grok 3 Mini', description: 'Lightweight and efficient version' }
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Advanced search and research AI',
    icon: '🔎',
    capabilities: ['💬', '🔍', '🌐'],
    versions: [
      { id: 'perplexity-latest', name: 'Latest', description: 'Most recent version' },
    ],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'European AI model',
    icon: '🦅',
    capabilities: ['💬', '📝'],
    versions: [
      { id: 'mistral-large', name: 'Mistral Large', description: 'Most capable version' },
      { id: 'mistral-tiny', name: 'Mistral Tiny', description: 'Lightweight version' },
    ],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Advanced reasoning and coding AI',
    icon: '🎯',
    capabilities: ['💬', '💻', '🧮'],
    versions: [
      { id: 'deepseek-v3', name: 'DeepSeek V3', description: 'Latest version with enhanced reasoning' },
      { id: 'deepseek-coder-v2', name: 'DeepSeek Coder V2', description: 'Specialized for coding tasks' },
      { id: 'deepseek-math', name: 'DeepSeek Math', description: 'Mathematical reasoning specialist' },
    ],
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: 'Alibaba\'s multilingual AI model',
    icon: '🌟',
    capabilities: ['💬', '🌐', '📝', '🔍'],
    versions: [
      { id: 'qwen-2.5-72b', name: 'Qwen 2.5 72B', description: 'Most capable version' },
      { id: 'qwen-2.5-32b', name: 'Qwen 2.5 32B', description: 'Balanced performance' },
      { id: 'qwen-2.5-14b', name: 'Qwen 2.5 14B', description: 'Efficient version' },
      { id: 'qwen-2.5-coder', name: 'Qwen 2.5 Coder', description: 'Code generation specialist' },
    ],
  },
  {
    id: 'llama',
    name: 'Llama',
    description: 'Meta\'s open-source language model',
    icon: '🦙',
    capabilities: ['💬', '📝', '🔍'],
    versions: [
      { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', description: 'Largest and most capable' },
      { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', description: 'High performance' },
      { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', description: 'Fast and efficient' },
      { id: 'llama-3.2-vision', name: 'Llama 3.2 Vision', description: 'Multimodal capabilities' },
    ],
  },
  {
    id: 'phi',
    name: 'Phi',
    description: 'Microsoft\'s small language model',
    icon: '🔬',
    capabilities: ['💬', '📊', '🧮'],
    versions: [
      { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', description: 'Latest compact model' },
      { id: 'phi-3.5-medium', name: 'Phi-3.5 Medium', description: 'Balanced size and performance' },
      { id: 'phi-3-vision', name: 'Phi-3 Vision', description: 'Multimodal small model' },
    ],
  },
];

export default function MultiChat() {
  const [input, setInput] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>(['chatgpt', 'claude', 'gemini', 'grok']);
  const [modelVersions, setModelVersions] = useState<{ [key: string]: string }>({
    chatgpt: 'gpt-4',
    claude: 'claude-3.7',
    gemini: 'gemini-2.5-pro',
    grok: 'grok-3-mini',
    perplexity: 'perplexity-latest',
    mistral: 'mistral-large',
    deepseek: 'deepseek-v3',
    qwen: 'qwen-2.5-72b',
    llama: 'llama-3.1-70b',
    phi: 'phi-3.5-mini',
  });
  const [conversations, setConversations] = useState<{ [key: string]: ModelConversation }>({});
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedResponse, setSynthesizedResponse] = useState<string | null>(null);
  const messagesEndRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Initialize conversations for selected models
  useEffect(() => {
    const newConversations: { [key: string]: ModelConversation } = {};
    selectedModels.forEach(modelId => {
      if (!conversations[modelId]) {
        newConversations[modelId] = {
          id: modelId,
          messages: [],
          isLoading: false,
        };
      } else {
        newConversations[modelId] = conversations[modelId];
      }
    });
    setConversations(newConversations);
  }, [selectedModels]);

  const scrollToBottom = (modelId: string) => {
    messagesEndRefs.current[modelId]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Add user message to all selected models
    setConversations(prev => {
      const updated = { ...prev };
      selectedModels.forEach(modelId => {
        if (updated[modelId]) {
          updated[modelId] = {
            ...updated[modelId],
            messages: [...updated[modelId].messages, userMessage],
            isLoading: true,
          };
        }
      });
      return updated;
    });

    setInput('');

    // Send to all selected models simultaneously
    const promises = selectedModels.map(async (modelId) => {
      try {
        const model = initialModels.find(m => m.id === modelId);
        const selectedVersion = modelVersions[modelId];

        if (modelId === 'grok') {
          // Handle Grok streaming
          const tempMessageId = `${Date.now()}-${modelId}`;
          
          setConversations(prev => ({
            ...prev,
            [modelId]: {
              ...prev[modelId],
              messages: [
                ...prev[modelId].messages,
                {
                  id: tempMessageId,
                  role: 'assistant',
                  content: '',
                  timestamp: new Date(),
                }
              ],
            }
          }));

          await singleChatCompletion(
            input,
            (chunk) => {
              setConversations(prev => ({
                ...prev,
                [modelId]: {
                  ...prev[modelId],
                  messages: prev[modelId].messages.map(msg =>
                    msg.id === tempMessageId
                      ? { ...msg, content: msg.content + chunk }
                      : msg
                  ),
                }
              }));
            },
            selectedVersion
          );
        } else {
          // Simulate response for other models
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          
          const responses = {
            chatgpt: "I'm ChatGPT! Here's my response to your question. I can help with a wide variety of tasks including analysis, writing, coding, and creative work.",
            claude: "Hello! I'm Claude from Anthropic. I'm designed to be helpful, harmless, and honest. I'd be happy to assist you with your query.",
            gemini: "Hi there! I'm Gemini, Google's AI assistant. I can help with research, analysis, and providing information from across the web.",
            perplexity: "I'm Perplexity, specialized in search and research. I can provide detailed, well-sourced answers to your questions.",
            mistral: "Bonjour! I'm Mistral, a European AI model. I'm here to help with your questions and tasks.",
            deepseek: "Hello! I'm DeepSeek, specialized in advanced reasoning and coding. I excel at mathematical problems, logical thinking, and programming tasks.",
            qwen: "你好！I'm Qwen from Alibaba Cloud. I can assist you in multiple languages and help with various tasks including analysis, writing, and research.",
            llama: "Hi! I'm Llama from Meta. As an open-source model, I'm designed to be helpful, accurate, and transparent in my responses.",
            phi: "Hello! I'm Phi from Microsoft. Despite my compact size, I'm optimized for efficiency and can help with reasoning, analysis, and problem-solving."
          };

          const responseMessage: Message = {
            id: `${Date.now()}-${modelId}`,
            role: 'assistant',
            content: responses[modelId as keyof typeof responses] || `Response from ${model?.name}`,
            timestamp: new Date(),
          };

          setConversations(prev => ({
            ...prev,
            [modelId]: {
              ...prev[modelId],
              messages: [...prev[modelId].messages, responseMessage],
            }
          }));
        }
      } catch (error) {
        console.error(`Error from ${modelId}:`, error);
        const errorMessage: Message = {
          id: `${Date.now()}-${modelId}-error`,
          role: 'assistant',
          content: 'Sorry, there was an error getting the response. Please try again.',
          timestamp: new Date(),
        };

        setConversations(prev => ({
          ...prev,
          [modelId]: {
            ...prev[modelId],
            messages: [...prev[modelId].messages, errorMessage],
          }
        }));
      } finally {
        setConversations(prev => ({
          ...prev,
          [modelId]: {
            ...prev[modelId],
            isLoading: false,
          }
        }));
      }
    });

    await Promise.all(promises);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearAllChats = () => {
    setConversations(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(modelId => {
        updated[modelId] = {
          ...updated[modelId],
          messages: [],
          isLoading: false,
        };
      });
      return updated;
    });
    setSynthesizedResponse(null);
  };

  const handleSynthesize = async () => {
    // Check if we have responses from multiple models
    const conversationsWithResponses = selectedModels.filter(modelId => 
      conversations[modelId]?.messages.some(msg => msg.role === 'assistant')
    );

    if (conversationsWithResponses.length < 2) {
      alert('Please get responses from at least 2 models before synthesizing.');
      return;
    }

    setIsSynthesizing(true);

    try {
      // Collect the latest assistant response from each model
      const modelResponses: { [key: string]: string } = {};
      conversationsWithResponses.forEach(modelId => {
        const conversation = conversations[modelId];
        const lastAssistantMessage = conversation.messages
          .slice()
          .reverse()
          .find(msg => msg.role === 'assistant');
        
        if (lastAssistantMessage) {
          const modelName = initialModels.find(m => m.id === modelId)?.name || modelId;
          modelResponses[modelName] = lastAssistantMessage.content;
        }
      });

      // Simulate our fine-tuned synthesis model processing
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

      // Create a synthesized response that combines unique insights
      const synthesized = `## 🧠 Synthesized Multi-Model Response

**Consolidating insights from ${Object.keys(modelResponses).length} AI models:**

### 🎯 **Core Consensus**
All models agree on the fundamental approach and main concepts. The shared understanding emphasizes the importance of structured thinking and comprehensive analysis.

### 💎 **Unique Insights by Model**

${Object.entries(modelResponses).map(([model, response]) => {
  // Extract unique portions (simplified simulation)
  const uniquePart = response.split('.')[0] + '...';
  return `**${model}**: ${uniquePart}`;
}).join('\n\n')}

### ⚡ **Synthesized Recommendation**
Based on the collective intelligence of multiple AI systems, the optimal approach combines:

1. **Structured Analysis** - Apply systematic thinking to break down complex problems
2. **Multiple Perspectives** - Consider various viewpoints before reaching conclusions  
3. **Practical Implementation** - Focus on actionable steps and real-world applicability
4. **Continuous Validation** - Cross-verify insights against different knowledge bases

### 🔮 **Meta-Insight**
The convergence of multiple AI models suggests high confidence in this synthesized approach. Areas where models diverged have been noted as opportunities for further exploration.

---
*This response was synthesized from ${Object.keys(modelResponses).length} AI models using Adora AI's proprietary synthesis engine.*`;

      setSynthesizedResponse(synthesized);

    } catch (error) {
      console.error('Error synthesizing responses:', error);
      alert('Error synthesizing responses. Please try again.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const toggleModelSelection = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const changeModelVersion = (modelId: string, versionId: string) => {
    setModelVersions(prev => ({
      ...prev,
      [modelId]: versionId
    }));
  };

  const getGridCols = () => {
    const count = selectedModels.length;
    if (count <= 2) return 'grid-cols-1 lg:grid-cols-2';
    if (count <= 4) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  // Expanded model view
  if (expandedModel) {
    const model = initialModels.find(m => m.id === expandedModel);
    const conversation = conversations[expandedModel];
    
    return (
      <div className="h-[calc(100vh-9rem)] flex flex-col bg-white dark:bg-gray-900">
        {/* Expanded Header */}
        <header className="flex-none flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setExpandedModel(null)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-2xl">{model?.icon}</span>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{model?.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{model?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {model?.capabilities?.map((cap, idx) => (
              <span key={idx} className="text-lg">{cap}</span>
            ))}
          </div>
        </header>

        {/* Expanded Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto px-4 py-6">
            {conversation?.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">{model?.icon}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Chat with {model?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Start a conversation to see responses from this model.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {conversation?.messages.map((message) => (
                  <div key={message.id} className="group">
                    <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">{model?.icon}</span>
                        </div>
                      )}
                      
                      <div className={`${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      } rounded-2xl px-4 py-3 max-w-3xl`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {conversation?.isLoading && (
                  <div className="group">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{model?.icon}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={el => { messagesEndRefs.current[expandedModel] = el; }} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Synthesize</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Compare responses from multiple AI models simultaneously
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={clearAllChats}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Clear All
            </button>
            
            {/* Model Selection */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Models:</span>
              <div className="flex gap-1">
                {initialModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => toggleModelSelection(model.id)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      selectedModels.includes(model.id)
                        ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {model.icon} {model.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Synthesized Response Section */}
      {synthesizedResponse && (
        <div className="flex-none bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-b border-purple-200 dark:border-purple-800 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Synthesized Response</h3>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">
                  BETA
                </span>
              </div>
              <button
                onClick={() => setSynthesizedResponse(null)}
                className="p-1 text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-800 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700 p-4 shadow-sm">
              <div className="prose dark:prose-invert max-w-none text-sm">
                <div className="whitespace-pre-wrap">{synthesizedResponse}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Models Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={`grid ${getGridCols()} gap-4 h-full`}>
          {selectedModels.map((modelId) => {
            const model = initialModels.find(m => m.id === modelId);
            const conversation = conversations[modelId];
            
            return (
              <div key={modelId} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full min-h-[400px]">
                {/* Model Header */}
                <div className="flex-none p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg flex-shrink-0">{model?.icon}</span>
                      <div className="min-w-0">
                        <select
                          value={modelVersions[modelId]}
                          onChange={(e) => changeModelVersion(modelId, e.target.value)}
                          className="text-sm font-medium bg-transparent border-none outline-none text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-1 -mx-1"
                        >
                          {model?.versions.map((version) => (
                            <option key={version.id} value={version.id}>
                              {version.name}
                            </option>
                          ))}
                        </select>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {model?.description}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {model?.capabilities?.map((cap, idx) => (
                        <span key={idx} className="text-sm">{cap}</span>
                      ))}
                      <button
                        onClick={() => setExpandedModel(modelId)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors ml-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 min-h-0">
                  {conversation?.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl">{model?.icon}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Waiting for your message...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {conversation?.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                            <div className="whitespace-pre-wrap break-words leading-relaxed">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {conversation?.isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={el => { messagesEndRefs.current[modelId] = el; }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Send to ${selectedModels.length} model${selectedModels.length !== 1 ? 's' : ''}...`}
              className="w-full min-h-[48px] max-h-32 px-4 py-3 pr-14 
                       border border-gray-300 dark:border-gray-600 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       resize-none bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-gray-400 
                       text-sm leading-relaxed"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
            />
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || Object.values(conversations).some(c => c.isLoading)}
              className="absolute right-3 top-3 bottom-3 my-auto w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed 
                       flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 
                       transition-all duration-200"
            >
              <PaperPlaneIcon className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <div>
              Press Enter to send • Shift + Enter for new line
            </div>
            <div>
              {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''} selected
            </div>
          </div>
          
          {/* Synthesize Button Section */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSynthesize}
                    disabled={isSynthesizing || selectedModels.filter(modelId => 
                      conversations[modelId]?.messages.some(msg => msg.role === 'assistant')
                    ).length < 2}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 
                             disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium
                             transition-all duration-200 shadow-sm hover:shadow-md disabled:hover:shadow-sm"
                  >
                    {isSynthesizing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Synthesize</span>
                      </>
                    )}
                  </button>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Combine all responses</span> into one intelligent answer
                  </div>
                </div>
                
                {/* Educational tooltip for when button is disabled */}
                {selectedModels.filter(modelId => 
                  conversations[modelId]?.messages.some(msg => msg.role === 'assistant')
                ).length < 2 && (
                  <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Get responses from at least 2 models to unlock synthesis</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Info Icon with tooltip */}
              <div className="relative group">
                <button className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="font-semibold text-purple-300 mb-2">✨ What is Synthesize?</div>
                  <div className="space-y-1">
                    <div>• <strong>Combines</strong> insights from all your selected models</div>
                    <div>• <strong>Eliminates</strong> redundant information</div>
                    <div>• <strong>Preserves</strong> unique perspectives from each AI</div>
                    <div>• <strong>Highlights</strong> dissent where AI models disagree</div>
                    <div>• <strong>Creates</strong> one superior, comprehensive response</div>
                  </div>
                  <div className="mt-2 text-xs text-purple-200">
                    Powered by Adora AI's proprietary synthesis engine
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 