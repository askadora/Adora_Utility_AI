'use client';

import { useState } from 'react';
import { PaperPlaneIcon, PlusIcon } from '@/icons';
// import { GrokModelSelector } from '@/components/llm/GrokModelSelector';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showMobileTools, setShowMobileTools] = useState(false);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        {/* Sidebar Header */}
        <div className="flex-none h-14 px-3 flex items-center border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-white bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <PlusIcon className="w-4 h-4 flex-shrink-0" />
            <span>New chat</span>
          </button>
        </div>
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2 min-h-0">
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <div className="truncate">{chat.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 truncate mt-1">{chat.lastMessage}</div>
              </button>
            ))}
          </div>
        </div>
        {/* Model Selector in Sidebar - Removed border-t */}
        <div className="flex-none p-3">
          {/* Remove the old model selector content */}
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-900">
        {/* Header */}
        <header className="flex-none h-14 flex items-center justify-between px-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex-shrink-0"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base md:text-lg flex-shrink-0">{availableModels.find(m => m.id === selectedLLM)?.icon}</span>
              <div className="flex flex-col gap-1">
                <select
                  value={selectedLLM}
                  onChange={(e) => handleLLMChange(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-900 dark:text-white border-none focus:outline-none focus:ring-0 p-0 pr-6 appearance-none cursor-pointer"
                >
                  {availableModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                {selectedLLM && (
                  <select
                    value={selectedModels[selectedLLM] || ''}
                    onChange={(e) => handleVersionChange(e.target.value)}
                    className="bg-transparent text-xs text-gray-500 dark:text-gray-400 border-none focus:outline-none focus:ring-0 p-0 pr-6 appearance-none cursor-pointer"
                  >
                    {availableModels
                      .find(model => model.id === selectedLLM)
                      ?.versions.map((version) => (
                        <option key={version.id} value={version.id}>
                          {version.name}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Tools Toggle */}
          <button 
            onClick={() => setShowMobileTools(!showMobileTools)}
            className="md:hidden p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex-shrink-0"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {/* Desktop Share Button */}
          <button className="hidden md:block p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </header>

        {/* Mobile Tools Panel - Slides down from header */}
        {showMobileTools && (
          <div className="md:hidden flex-none bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* File Upload */}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                  />
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>Attach</span>
                  </div>
                </label>
                
                {/* Voice Recording */}
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    isRecording 
                      ? 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800' 
                      : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>{isRecording ? 'Recording...' : 'Voice'}</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowMobileTools(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Conditional Layout for Chat Area and Input Bar */}
        {messages.length === 0 ? (
          // Centered welcome and input when no messages
          <div className="flex-1 flex flex-col items-center justify-center min-h-0 px-4 py-6">
            <div className="max-w-md w-full mb-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-2xl">{availableModels.find(m => m.id === selectedLLM)?.icon}</span>
              </div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                How can I help you today?
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                I'm {availableModels.find(m => m.id === selectedLLM)?.name}, ready to assist you with any questions or tasks.
              </p>
            </div>
            {/* Centered Input Bar */}
            <div className="w-full max-w-2xl">
              <div className="border-t px-4 py-3 bg-white rounded-xl shadow-md">
                <div className="relative flex items-end">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Adora AI..."
                    className="flex-1 min-h-[44px] md:min-h-[48px] max-h-20 md:max-h-24 px-3 md:px-4 py-2 md:py-3 pr-24
                             border border-gray-300 dark:border-gray-600 rounded-xl
                             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                             resize-none bg-white dark:bg-gray-800
                             text-gray-900 dark:text-white
                             placeholder-gray-500 dark:placeholder-gray-400
                             text-sm leading-relaxed
                             transition-all duration-200"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, window.innerWidth >= 768 ? 96 : 80) + 'px';
                    }}
                  />
                  {/* Desktop Tools + Character Counter + Send Button */}
                  <div className="absolute right-0 bottom-0 flex items-end p-2">
                    {/* Desktop Tools - Inside input */}
                    <div className="hidden md:flex items-center gap-1 mr-2">
                      {/* File Upload */}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                          multiple
                        />
                        <div className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </div>
                      </label>
                      {/* Voice Recording */}
                      <button
                        onClick={toggleRecording}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isRecording
                            ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    </div>
                    {/* Character Counter */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mr-2 mb-1">
                      {input.length}/2000
                    </div>
                    {/* Send Button */}
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700
                             transition-all duration-200 flex-shrink-0"
                    >
                      <PaperPlaneIcon className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Standard layout when there are messages
          <>
            {/* Chat Area (scrollable) */}
            <section className="flex-1 overflow-y-auto min-h-0 px-4 py-6">
              <div className="space-y-4 md:space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="group">
                    <div className={`flex gap-3 md:gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'assistant' && (
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs md:text-sm">{availableModels.find(m => m.id === selectedLLM)?.icon}</span>
                        </div>
                      )}
                      <div className={`flex-1 min-w-0 ${message.role === 'user' ? 'max-w-[85%] md:max-w-[80%]' : ''}`}>
                        {message.role === 'user' && (
                          <div className="flex justify-end mb-1">
                            <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs md:text-sm font-medium">You</span>
                            </div>
                          </div>
                        )}
                        <div className={`${
                          message.role === 'user' 
                            ? 'bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 md:px-4 py-2 md:py-3 ml-auto' 
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {message.model && message.role === 'assistant' && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                              {message.model}
                              {message.modelVersion && ` (${message.modelVersion})`}
                            </div>
                          )}
                          <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">
                            {message.content}
                          </div>
                        </div>
                        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                          message.role === 'user' ? 'text-right' : ''
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="group">
                    <div className="flex gap-3 md:gap-4">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs md:text-sm">{availableModels.find(m => m.id === selectedLLM)?.icon}</span>
                      </div>
                      <div className="flex-1">
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
                  </div>
                )}
              </div>
            </section>
            {/* Input Area - Streamlined and contained */}
            <footer className="flex-none border-t px-4 py-3 bg-white">
              <div className="relative flex items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Adora AI..."
                  className="flex-1 min-h-[44px] md:min-h-[48px] max-h-20 md:max-h-24 px-3 md:px-4 py-2 md:py-3 pr-24
                           border border-gray-300 dark:border-gray-600 rounded-xl
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                           resize-none bg-white dark:bg-gray-800
                           text-gray-900 dark:text-white
                           placeholder-gray-500 dark:placeholder-gray-400
                           text-sm leading-relaxed
                           transition-all duration-200"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, window.innerWidth >= 768 ? 96 : 80) + 'px';
                  }}
                />
                {/* Desktop Tools + Character Counter + Send Button */}
                <div className="absolute right-0 bottom-0 flex items-end p-2">
                  {/* Desktop Tools - Inside input */}
                  <div className="hidden md:flex items-center gap-1 mr-2">
                    {/* File Upload */}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        multiple
                      />
                      <div className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </div>
                    </label>
                    {/* Voice Recording */}
                    <button
                      onClick={toggleRecording}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isRecording
                          ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                  </div>
                  {/* Character Counter */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mr-2 mb-1">
                    {input.length}/2000
                  </div>
                  {/* Send Button */}
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700
                           transition-all duration-200 flex-shrink-0"
                  >
                    <PaperPlaneIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
    </div>
  );
} 