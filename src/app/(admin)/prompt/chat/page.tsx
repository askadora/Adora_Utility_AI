'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperPlaneIcon, PlusIcon } from '@/icons';
// import { GrokModelSelector } from '@/components/llm/GrokModelSelector';
import { singleChatCompletion } from '@/llm/grok/api';
import { UNIFIED_MODELS, Model } from '@/llm/unified-models';

type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  model?: string;
  modelVersion?: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  modelResponses: { [key: string]: string };
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
  const [availableModels] = useState<Model[]>(UNIFIED_MODELS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showMobileTools, setShowMobileTools] = useState(false);

  // Set default model and version on component mount
  useEffect(() => {
    setSelectedLLM('grok');
    setSelectedModels(prev => ({
      ...prev,
      grok: 'grok-3-mini'
    }));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
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
            role: 'assistant',
            content: '',
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
          role: 'assistant',
          content: `This is a sample response from ${selectedModelId} (${selectedVersionId})`,
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
        role: 'assistant',
        content: 'Sorry, there was an error getting the response. Please try again.',
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
    <div className="h-[calc(100vh-9rem)] flex overflow-hidden bg-white dark:bg-gray-900">
      {/* Mobile Overlay Background */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive with proper mobile handling */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarOpen ? 'w-64' : 'w-0'}
        fixed md:relative inset-y-0 left-0 z-50 md:z-auto
        transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-950 
        flex flex-col
        overflow-hidden
        border-r border-gray-200 dark:border-gray-800
      `}>
        {/* Sidebar Header */}
        <div className="flex-none p-3 pb-4.5 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
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
                className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group relative"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex-shrink-0 text-gray-500 dark:text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">{chat.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 truncate mt-0.5">{chat.lastMessage}</div>
                  </div>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add your menu click handler here
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        {/* Header - Compact and responsive */}
        <header className="flex-none flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex-shrink-0"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span className="flex-shrink-0">{availableModels.find(m => m.id === selectedLLM)?.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="truncate">{availableModels.find(m => m.id === selectedLLM)?.name}</span>
                  {selectedModels[selectedLLM] && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {availableModels
                        .find(m => m.id === selectedLLM)
                        ?.versions.find(v => v.id === selectedModels[selectedLLM])?.name}
                    </span>
                  )}
                </div>
                <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${showModelSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showModelSelector && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  {availableModels.map((model) => (
                    <div key={model.id}>
                      <button
                        onClick={() => {
                          handleLLMChange(model.id);
                          if (!selectedModels[model.id]) {
                            handleVersionChange(model.versions[0].id);
                          }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          selectedLLM === model.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                        }`}
                      >
                        <span className="flex-shrink-0">{model.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900 dark:text-white">{model.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{model.description}</div>
                        </div>
                      </button>
                      
                      {selectedLLM === model.id && (
                        <div className="pl-10 pr-3 py-1 space-y-1">
                          {model.versions.map((version) => (
                            <button
                              key={version.id}
                              onClick={() => {
                                handleVersionChange(version.id);
                                setShowModelSelector(false);
                              }}
                              className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                selectedModels[model.id] === version.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                              }`}
                            >
                              <div className="flex-1 text-left">
                                <div className="font-medium text-gray-900 dark:text-white">{version.name}</div>
                                <div className="text-gray-500 dark:text-gray-400">{version.description}</div>
                              </div>
                              {selectedModels[model.id] === version.id && (
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <div className="max-w-md w-full">
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
            </div>
          ) : (
            /* Messages */
            <div className="w-full max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6">
              <div className="space-y-4 md:space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="group">
                    <div className={`flex gap-3 md:gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'assistant' && (
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs md:text-sm">{availableModels.find(m => m.id === selectedLLM)?.icon}</span>
                        </div>
                      )}
                      
                      <div className={`${
                        message.role === 'user' 
                          ? 'bg-gray-100 dark:bg-gray-800' 
                          : 'bg-white dark:bg-gray-800'
                      } rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                        message.role === 'user' ? 'ml-auto' : ''
                      }`}>
                        {message.model && message.role === 'assistant' && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                            {message.model}
                            {message.modelVersion && ` (${message.modelVersion})`}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm leading-relaxed break-words text-gray-900 dark:text-white">
                          {message.content}
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
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area - Streamlined and contained */}
        <div className="flex-none border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="w-full max-w-4xl mx-auto px-3 md:px-4 py-3">
            <div className="relative">
              <div className="relative flex items-center min-h-[44px] md:min-h-[48px]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Adora AI..."
                  className="w-full min-h-[44px] md:min-h-[48px] max-h-32 md:max-h-40 px-3 md:px-4 py-2 md:py-3 pr-24 md:pr-28
                           border border-gray-300 dark:border-gray-600 rounded-xl 
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                           resize-none bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-white 
                           placeholder-gray-500 dark:placeholder-gray-400 
                           text-sm leading-relaxed
                           transition-all duration-200
                           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, window.innerWidth >= 768 ? 160 : 128) + 'px';
                  }}
                />
                
                {/* Desktop Tools - Inside input */}
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
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

                  {/* Send Button */}
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="ml-1 w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed 
                             flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 
                             transition-all duration-200"
                  >
                    <PaperPlaneIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Character Counter and Help Text */}
              <div className="flex justify-between items-center mt-1 px-1 h-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Press Enter to send, Shift + Enter for new line
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {input.length}/2000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 