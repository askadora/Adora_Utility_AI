'use client';

import React, { useState } from 'react';
import { PaperPlaneIcon, ChevronDownIcon, PlusIcon } from '@/icons';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  model?: string;
  modelVersion?: string;
  timestamp: Date;
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
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  modelResponses: { [key: string]: string };
}

const availableModels: Model[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s advanced language model',
    icon: '🤖',
    versions: [
      { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Fast and efficient' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model' },
      { id: 'gpt-4o', name: 'GPT-4o', description: 'Latest version with improved capabilities' },
      { id: 'gpt-4.1', name: 'GPT-4.1', description: 'Enhanced performance and accuracy' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google\'s multimodal AI model',
    icon: '🔍',
    versions: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Advanced capabilities' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and efficient' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s conversational AI',
    icon: '🧠',
    versions: [
      { id: 'claude-3.5', name: 'Claude 3.5', description: 'Balanced performance' },
      { id: 'claude-3.7', name: 'Claude 3.7', description: 'Latest version with improved capabilities' },
    ],
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'xAI\'s real-time AI model',
    icon: '⚡',
    versions: [
      { id: 'grok-3', name: 'Grok 3', description: 'Standard version' },
      { id: 'grok-3-flash', name: 'Grok 3 Flash', description: 'Optimized for speed' },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Advanced search and research AI',
    icon: '🔎',
    versions: [
      { id: 'perplexity-latest', name: 'Latest', description: 'Most recent version' },
    ],
  },
  {
    id: 'llama',
    name: 'Llama',
    description: 'Meta\'s open-source model',
    icon: '🦙',
    versions: [
      { id: 'llama-3', name: 'Llama 3', description: 'Latest version' },
    ],
  },
  {
    id: 'deepseek',
    name: 'Deepseek',
    description: 'Specialized in deep learning',
    icon: '🎯',
    versions: [
      { id: 'deepseek-latest', name: 'Latest', description: 'Most recent version' },
    ],
  },
  {
    id: 'qwen',
    name: 'Qwen',
    description: 'Alibaba\'s advanced AI model',
    icon: '🌟',
    versions: [
      { id: 'qwen-latest', name: 'Latest', description: 'Most recent version' },
    ],
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModels, setSelectedModels] = useState<{ [key: string]: string }>({
    chatgpt: 'gpt-4',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Previous Chat 1',
      lastMessage: 'Last message from the previous chat...',
      timestamp: new Date(),
      modelResponses: {},
    },
    // Add more chat history items as needed
  ]);
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Implement actual API calls to selected models
    setTimeout(() => {
      const responses = Object.entries(selectedModels).map(([modelId, versionId]) => ({
        id: `${Date.now()}-${modelId}`,
        content: `This is a sample response from ${modelId} (${versionId})`,
        role: 'assistant' as const,
        model: modelId,
        modelVersion: versionId,
        timestamp: new Date(),
      }));

      setMessages((prev) => [...prev, ...responses]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleModel = (modelId: string, versionId: string) => {
    setSelectedModels((prev) => {
      if (prev[modelId] === versionId) {
        const { [modelId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [modelId]: versionId };
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // TODO: Handle file upload
      console.log('Files to upload:', files);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Chat History Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Chat History</h2>
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full p-3 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <div className="font-medium text-gray-900 dark:text-white">{chat.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {chat.timestamp.toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Prompt Input Area */}
        <div className="flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your prompt here..."
                className="w-full h-32 p-4 pr-48 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                  />
                  <div className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </label>
                <button
                  onClick={toggleRecording}
                  className={`p-1 rounded-full ${
                    isRecording 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 mr-2 mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-white"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="flex-none bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Select AI Models</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableModels.map((model) => (
                <div key={model.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{model.icon}</span>
                    <div className="font-medium text-gray-900 dark:text-white">{model.name}</div>
                  </div>
                  <select
                    value={selectedModels[model.id] || ''}
                    onChange={(e) => toggleModel(model.id, e.target.value)}
                    className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select version</option>
                    {model.versions.map((version) => (
                      <option key={version.id} value={version.id}>
                        {version.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                {message.model && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {availableModels.find((m) => m.id === message.model)?.name}
                    {message.modelVersion && ` (${message.modelVersion})`}
                  </div>
                )}
                <div>{message.content}</div>
                <div className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-pulse text-gray-500 dark:text-gray-400">Thinking...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 