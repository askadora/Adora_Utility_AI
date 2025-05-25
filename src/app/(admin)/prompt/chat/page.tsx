'use client';

import React, { useState } from 'react';
import { PaperPlaneIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@/icons';
import { singleChatCompletion } from '@/llm/grok/api';

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

const initialModels: Model[] = [
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
      { id: 'grok-3-mini', name: 'Grok 3 Mini', description: 'Lightweight and efficient version' }
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
    grok: 'grok-3-mini',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory] = useState<ChatHistory[]>([
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
  const [selectedLLM, setSelectedLLM] = useState<string>('grok');
  const [availableModels] = useState<Model[]>(initialModels);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);

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

    try {
      // Only handle the selected LLM
      const selectedModelId = selectedLLM;
      const selectedVersionId = selectedModels[selectedLLM];

      if (!selectedVersionId) {
        throw new Error('Please select a model version');
      }

      // Handle Grok specifically
      if (selectedModelId === 'grok') {
        const tempMessageId = `${Date.now()}-grok`;
        setMessages((prev) => [
          ...prev,
          {
            id: tempMessageId,
            content: '',
            role: 'assistant',
            model: 'grok',
            modelVersion: selectedVersionId,
            timestamp: new Date(),
          },
        ]);

        await singleChatCompletion(
          input,
          (chunk) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempMessageId
                  ? { ...msg, content: msg.content + chunk }
                  : msg
              )
            );
          },
          selectedVersionId
        );
      } else {
        // For other models, add a single response
        const responseMessage: Message = {
          id: `${Date.now()}-${selectedModelId}`,
          content: `This is a sample response from ${selectedModelId} (${selectedVersionId})`,
          role: 'assistant',
          model: selectedModelId,
          modelVersion: selectedVersionId,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, responseMessage]);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        content: 'Sorry, there was an error getting the response. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLLMChange = (llmId: string) => {
    setSelectedLLM(llmId);
    // Clear the version selection when changing LLM
    setSelectedModels(prev => ({
      ...prev,
      [llmId]: ''
    }));
  };

  const handleVersionChange = (versionId: string) => {
    setSelectedModels(prev => ({
      ...prev,
      [selectedLLM]: versionId
    }));
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
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Main Container - Fixed Height */}
      <div className="flex-1 flex min-h-0">
        {/* Chat History Sidebar - Left */}
        <div className={`${isHistoryCollapsed ? 'w-12' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 relative flex flex-col min-h-0`}>
          <button
            onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
            className="absolute -right-3 top-4 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {isHistoryCollapsed ? (
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
          {!isHistoryCollapsed && (
            <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat History</h2>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <PlusIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto min-h-0 p-2">
            {!isHistoryCollapsed && (
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full p-2 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <div className="font-medium text-gray-900 dark:text-white truncate">{chat.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {chat.timestamp.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area - Middle */}
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          {/* Messages Container - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="flex flex-col justify-end min-h-full">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      {message.model && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          {message.model}
                          {message.modelVersion && ` (${message.modelVersion})`}
                        </div>
                      )}
                      <div className="text-sm">{message.content}</div>
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

          {/* Prompt Input Area - Fixed at bottom */}
          <div className="flex-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-4xl mx-auto p-3">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your prompt here..."
                  className="w-full h-20 p-3 pr-40 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm text-sm"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                    <div className="w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </label>
                  <button
                    onClick={toggleRecording}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isRecording 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                      className="w-5 h-5"
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
                    className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm"
                  >
                    <PaperPlaneIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Options Sidebar - Right */}
        <div className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col min-h-0">
          <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Models</h2>
            <div className="space-y-4">
              {/* LLM Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select AI Model
                </label>
                <select
                  value={selectedLLM}
                  onChange={(e) => handleLLMChange(e.target.value)}
                  className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {availableModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.icon} {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Version Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Version
                </label>
                <select
                  value={selectedModels[selectedLLM] || ''}
                  onChange={(e) => handleVersionChange(e.target.value)}
                  className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select version</option>
                  {availableModels
                    .find(model => model.id === selectedLLM)
                    ?.versions.map((version) => (
                      <option key={version.id} value={version.id}>
                        {version.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Model Info */}
              {selectedLLM && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">
                      {availableModels.find(m => m.id === selectedLLM)?.icon}
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {availableModels.find(m => m.id === selectedLLM)?.name}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {availableModels.find(m => m.id === selectedLLM)?.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 