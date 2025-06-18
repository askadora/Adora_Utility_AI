'use client';

import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

import { useState, useEffect, useRef } from 'react';
import { PaperPlaneIcon, PlusIcon } from '@/icons';
import { UNIFIED_MODELS, Model, UnifiedMessage } from '@/llm/unified-models';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

// Add markdown preprocessing function
const preprocessMarkdown = (content: string): string => {
  if (!content) return '';
  
  let processed = content;
  
  // Remove trailing whitespace from all lines
  processed = processed.replace(/[ \t]+$/gm, '');
  
  // Collapse multiple blank lines into single blank lines
  processed = processed.replace(/\n{3,}/g, '\n\n');
  
  // Ensure exactly one blank line before and after headings
  processed = processed.replace(/\n*(#{1,6}[^\n]*)\n*/g, '\n\n$1\n\n');
  
  // Ensure exactly one blank line before and after tables
  processed = processed.replace(/\n*(\|[^\n]*\|[^\n]*\n(?:\|[^\n]*\|[^\n]*\n)*)\n*/g, '\n\n$1\n\n');
  
  // Ensure exactly one blank line between paragraphs and other block elements
  // This handles cases where there are no blank lines between paragraphs
  processed = processed.replace(/([^\n])\n([^\n#\-\*\+\d\s\|])/g, '$1\n\n$2');
  
  // Clean up any leading/trailing whitespace
  processed = processed.trim();
  
  // Ensure content ends with single newline if it had content
  if (processed) {
    processed = processed + '\n';
  }
  
  return processed;
};

// Add StatusIndicator component
const StatusIndicator = ({ available }: { available: boolean }) => {
  if (available) {
    return (
      <span className="inline-flex items-center ml-2">
        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-xs text-green-600 ml-1">Live Testing</span>
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center ml-2">
      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
      <span className="text-xs text-red-600">Paid Access</span>
    </span>
  );
};

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
  const modelSelectorRef = useRef<HTMLDivElement>(null);
  const { session } = useAuth();
  const [llmUsage, setLlmUsage] = useState<number>(0);
  const LLM_PROMPT_LIMIT = process.env.NEXT_PUBLIC_LLM_PROMPT_LIMIT ? parseInt(process.env.NEXT_PUBLIC_LLM_PROMPT_LIMIT) : 20;

  // Set default model and version on component mount
  useEffect(() => {
    setSelectedLLM('grok');
    setSelectedModels(prev => ({
      ...prev,
      grok: 'grok-3-mini'
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target as Node)) {
        setShowModelSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function fetchLlmUsage() {
      if (!session?.user) return;
      const { data, error } = await supabase.rpc('get_llm_usage', { uid: session.user.id });
      if (data && data[0] && data[0].llm_usage !== undefined && data[0].llm_usage !== null) {
        setLlmUsage(data[0].llm_usage);
      }
    }
    fetchLlmUsage();
  }, [session]);

  const handleSend = async () => {
    if (!input.trim()) return;

    console.log('Starting chat with input:', input);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    console.log('Created user message:', userMessage);

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const selectedModelId = selectedLLM;
      const selectedVersionId = selectedModels[selectedLLM];

      console.log('Selected model:', {
        modelId: selectedModelId,
        versionId: selectedVersionId
      });

      if (!selectedVersionId) {
        throw new Error('Please select a model version');
      }

      // Create a temporary message for the assistant's response
      const tempMessageId = `${Date.now()}-${selectedModelId}`;
      console.log('Created temporary message ID:', tempMessageId);

      setMessages((prev) => [
        ...prev,
        {
          id: tempMessageId,
          role: 'assistant',
          content: '',
          model: selectedModelId,
          modelVersion: selectedVersionId,
          timestamp: new Date(),
        },
      ]);

      // Convert the input into a message array
      const messages: UnifiedMessage[] = [
        {
          role: 'user',
          content: input
        }
      ];

      console.log('Prepared messages for API:', messages);

      const options = {
        model: selectedModelId,
        version: selectedVersionId,
        temperature: 0.7,
        maxTokens: 1000
      };

      console.log('API options:', options);

      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages, options }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';
      let lastUpdate = Date.now();
      const updateInterval = 50; // Update UI every 50ms for smoother streaming

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            console.log('Received chunk:', data);
            
            if (data.content) {
              accumulatedContent += data.content;
              
              // Update UI at regular intervals for smoother streaming
              const now = Date.now();
              if (now - lastUpdate >= updateInterval) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === tempMessageId
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  )
                );
                lastUpdate = now;
              }
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }

      // Final update to ensure all content is displayed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessageId
            ? { ...msg, content: accumulatedContent }
            : msg
        )
      );

      // Update LLM usage after successful send
      if (session?.user) {
        const { data, error } = await supabase.rpc('update_llm_usage', { uid: session.user.id });
        if (data && data[0] && data[0].new_usage !== undefined && data[0].new_usage !== null) {
          setLlmUsage(data[0].new_usage);
        }
      }
      console.log('Stream completed successfully');
    } catch (error) {
      console.error('Error in chat flow:', error);
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, there was an error getting the response. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log('Chat flow completed');
    }
  };

  const handleLLMChange = (llmId: string) => {
    console.log('Changing LLM to:', llmId);
    setSelectedLLM(llmId);
    // Clear the version selection when changing LLM
    setSelectedModels(prev => ({
      ...prev,
      [llmId]: ''
    }));
  };

  const handleVersionChange = (versionId: string) => {
    console.log('Changing version to:', versionId);
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
        {/* Focused Chat Header - First thing user sees */}
        {messages.length === 0 && (
          <div className="flex-none border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="px-3 md:px-4 py-3 md:py-4">
              {/* 
                PAGE HEADER - FLEXBOX (1D) Layout
                - Column direction for title and description stacking
                - Responsive spacing and typography
                - Compact for viewport efficiency
              */}
              <header className="flex flex-col gap-2 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col gap-2 min-w-0 flex-1">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white/90 md:text-2xl">
                      Focused Chat
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base max-w-2xl">
                      Chat with a single AI model in a focused environment. For multi-model conversations and advanced synthesis, 
                      use our{' '}
                      <button 
                        onClick={() => window.open('/synthesize', '_blank')}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Synthesize system
                      </button>
                      .
                    </p>
                  </div>
                </div>
              </header>

              {/* Demo Warning Section - Compact */}
              <div className="mt-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-xs text-amber-800 dark:text-amber-200 md:text-sm">
                    ⚠️ This is a demo/test system. You have a {LLM_PROMPT_LIMIT} prompt limit for testing purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
            <div className="relative" ref={modelSelectorRef}>
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
                <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 max-h-[400px] overflow-y-auto">
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
                                <div className="flex items-center">
                                  <div className="font-medium text-gray-900 dark:text-white">{version.name}</div>
                                  <StatusIndicator available={version.available ?? false} />
                                </div>
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

            {/* Refresh Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  console.log('Clearing chat history');
                  setMessages([]);
                  setInput('');
                }}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Clear chat"
              >
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <span className="text-xs text-gray-500">Prompts used: {llmUsage}/{LLM_PROMPT_LIMIT}</span>
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
                        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed break-words text-gray-900 dark:text-white [&_p]:my-0.5 [&_ul]:my-0.5 [&_ol]:my-0.5 [&_pre]:my-1 [&_h1]:my-0.5 [&_h2]:my-0.5 [&_h3]:my-0.5 [&_h4]:my-0.5 [&_h5]:my-0.5 [&_h6]:my-0.5 [&_blockquote]:my-0.5 [&_table]:my-0.5 [&_hr]:my-0.5 [&_li]:my-0.5">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code(props: any) {
                                const { inline, className, children, ...rest } = props;
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                      borderRadius: '0.5em',
                                      fontSize: '0.95em',
                                      padding: '1em',
                                      margin: '0.5em 0',
                                      background: 'var(--tw-prose-pre-bg, #282c34)'
                                    }}
                                    {...rest}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...rest}>
                                    {children}
                                  </code>
                                );
                              },
                              table: ({ children, ...props }) => (
                                <div className="my-1.5 overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                                    {children}
                                  </table>
                                </div>
                              ),
                              thead: ({ children, ...props }) => (
                                <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
                                  {children}
                                </thead>
                              ),
                              tbody: ({ children, ...props }) => (
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                                  {children}
                                </tbody>
                              ),
                              tr: ({ children, ...props }) => (
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
                                  {children}
                                </tr>
                              ),
                              th: ({ children, ...props }) => (
                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide bg-gray-50 dark:bg-gray-800" {...props}>
                                  {children}
                                </th>
                              ),
                              td: ({ children, ...props }) => (
                                <td className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 whitespace-normal" {...props}>
                                  {children}
                                </td>
                              ),
                              p: ({ children, ...props }) => (
                                <p className="my-0.5 leading-relaxed" {...props}>
                                  {children}
                                </p>
                              ),
                              h1: ({ children, ...props }) => (
                                <h1 className="my-0.5 text-2xl font-bold" {...props}>
                                  {children}
                                </h1>
                              ),
                              h2: ({ children, ...props }) => (
                                <h2 className="my-0.5 text-xl font-bold" {...props}>
                                  {children}
                                </h2>
                              ),
                              h3: ({ children, ...props }) => (
                                <h3 className="my-0.5 text-lg font-semibold" {...props}>
                                  {children}
                                </h3>
                              ),
                              h4: ({ children, ...props }) => (
                                <h4 className="my-0.5 text-base font-semibold" {...props}>
                                  {children}
                                </h4>
                              ),
                              ul: ({ children, ...props }) => (
                                <ul className="my-0.5 pl-5 list-disc space-y-0" {...props}>
                                  {children}
                                </ul>
                              ),
                              ol: ({ children, ...props }) => (
                                <ol className="my-0.5 pl-5 list-decimal space-y-0" {...props}>
                                  {children}
                                </ol>
                              ),
                              li: ({ children, ...props }) => (
                                <li className="my-0 leading-relaxed" {...props}>
                                  {children}
                                </li>
                              ),
                              blockquote: ({ children, ...props }) => (
                                <blockquote className="my-1 pl-4 border-l-4 border-gray-300 dark:border-gray-600 italic" {...props}>
                                  {children}
                                </blockquote>
                              )
                            }}
                          >
                            {preprocessMarkdown(message.content)}
                          </ReactMarkdown>
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
          <div className="w-full max-w-4xl mx-auto px-3 md:px-4 py-2 md:py-3">
            <div className="relative">
              <div className="relative flex items-center min-h-[40px] md:min-h-[44px]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Adora AI..."
                  className="w-full min-h-[40px] md:min-h-[44px] max-h-24 md:max-h-32 px-3 md:px-4 py-2 md:py-2.5 pr-20 md:pr-24
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
                    target.style.height = Math.min(target.scrollHeight, window.innerWidth >= 768 ? 128 : 96) + 'px';
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
                    <div className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </div>
                  </label>
                  
                  {/* Voice Recording */}
                  <button
                    onClick={toggleRecording}
                    className={`p-1 rounded-lg transition-colors ${
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
                    disabled={!input.trim() || isLoading || llmUsage >= LLM_PROMPT_LIMIT}
                    className="ml-1 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed 
                             flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 
                             transition-all duration-200"
                  >
                    <PaperPlaneIcon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Character Counter and Help Text - More compact */}
              <div className="flex justify-between items-center mt-1 px-1 h-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Press Enter to send, Shift + Enter for new line
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {input.length}/2000
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional UI Elements */}
        {llmUsage >= LLM_PROMPT_LIMIT && (
          <div className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
            You have used up free prompt credits
          </div>
        )}
      </div>
    </div>
  );
} 