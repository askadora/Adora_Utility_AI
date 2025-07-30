'use client';

import React, { useState, useEffect, useRef } from 'react';
import InternalSidebar from "@/components/synth/InternalSidebar";
import PromptInput from "@/components/synth/PromptInput";
import SelectionAccordions from "@/components/synth/SelectionAccordions";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { UNIFIED_MODELS, type Model, type UnifiedMessage, type UnifiedChatOptions } from '@/llm/unified-models';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

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

// Helper functions
const getModelsWithAvailableVersions = () => {
  return UNIFIED_MODELS.filter(model => 
    model.versions.some(version => version.available === true)
  );
};

const getFirstAvailableVersion = (modelId: string): string => {
  const model = UNIFIED_MODELS.find(m => m.id === modelId);
  if (!model) return '';
  
  const availableVersion = model.versions.find(v => v.available === true);
  return availableVersion ? availableVersion.id : model.versions[0]?.id || '';
};

// ModelIcon component
const ModelIcon = ({ model, size = 20 }: { model?: Model, size?: number }) => {
  if (!model) return null;
  
  if (model.logo) {
    return (
      <div className="flex-shrink-0" style={{ width: size, height: size }}>
        <Image 
          src={model.logo} 
          alt={`${model.name} logo`}
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
    );
  }
  
  return <span className="flex-shrink-0" style={{ fontSize: size }}>{model.icon}</span>;
};

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
  
  // Clean up any leading/trailing whitespace
  processed = processed.trim();
  
  // Ensure content ends with single newline if it had content
  if (processed) {
    processed = processed + '\n';
  }
  
  return processed;
};

const SynthProPage = () => {
  const { session } = useAuth();
  const availableModels = getModelsWithAvailableVersions();
  
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>(['chatgpt', 'claude']);
  const [selectedProRoles, setSelectedProRoles] = useState<string[]>([]);
  const [conversations, setConversations] = useState<{ [key: string]: ModelConversation }>({});
  const [modelVersions, setModelVersions] = useState<{ [key: string]: string }>(() => {
    const defaultVersions: { [key: string]: string } = {};
    UNIFIED_MODELS.forEach(model => {
      defaultVersions[model.id] = getFirstAvailableVersion(model.id);
    });
    return defaultVersions;
  });
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedResponse, setSynthesizedResponse] = useState<string | null>(null);
  const [llmUsage, setLlmUsage] = useState<number>(0);
  const [synthesizeUsage, setSynthesizeUsage] = useState<number>(0);
  const LLM_PROMPT_LIMIT = process.env.NEXT_PUBLIC_LLM_PROMPT_LIMIT ? parseInt(process.env.NEXT_PUBLIC_LLM_PROMPT_LIMIT) : 20;
  const SYNTHESIZE_LIMIT = process.env.NEXT_PUBLIC_SYNTHESIZE_LIMIT ? parseInt(process.env.NEXT_PUBLIC_SYNTHESIZE_LIMIT) : 3;
  
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

  // Fetch usage on component mount
  useEffect(() => {
    async function fetchUsage() {
      if (!session?.user) return;
      const { data, error } = await supabase.rpc('get_llm_usage', { uid: session.user.id });
      if (data && data[0]) {
        if (data[0].llm_usage !== undefined && data[0].llm_usage !== null) {
          setLlmUsage(data[0].llm_usage);
        }
        if (data[0].synthesize_usage !== undefined && data[0].synthesize_usage !== null) {
          setSynthesizeUsage(data[0].synthesize_usage);
        }
      }
    }
    fetchUsage();
  }, [session]);

  const scrollToBottom = (modelId: string) => {
    messagesEndRefs.current[modelId]?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleModelSelection = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const toggleProRoleSelection = (roleId: string) => {
    setSelectedProRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Check credits before sending
    if (llmUsage + selectedModels.length > LLM_PROMPT_LIMIT) {
      alert(`You have reached the LLM prompt limit of ${LLM_PROMPT_LIMIT}.`);
      return;
    }

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
    const promises = selectedModels.map((modelId) => {
      return (async () => {
        try {
          const selectedVersion = modelVersions[modelId];

          // Prepare messages and options
          const messages: UnifiedMessage[] = [
            {
              role: 'user',
              content: input
            }
          ];
          const options: UnifiedChatOptions = {
            model: modelId,
            version: selectedVersion,
            temperature: 0.7,
            maxTokens: 1000
          };

          // Streaming logic
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

          let accumulatedContent = '';
          let lastUpdate = Date.now();
          const updateInterval = 50;

          // Use /api/chat route for streaming
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

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(Boolean);
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.content) {
                  accumulatedContent += data.content;
                  const now = Date.now();
                  if (now - lastUpdate >= updateInterval) {
                    setConversations(prev => ({
                      ...prev,
                      [modelId]: {
                        ...prev[modelId],
                        messages: prev[modelId].messages.map(msg =>
                          msg.id === tempMessageId
                            ? { ...msg, content: accumulatedContent }
                            : msg
                        ),
                      }
                    }));
                    lastUpdate = now;
                  }
                }
              } catch (e) {
                console.error('Error parsing chunk:', e);
              }
            }
          }
          
          // Final update to ensure all content is displayed
          setConversations(prev => ({
            ...prev,
            [modelId]: {
              ...prev[modelId],
              messages: prev[modelId].messages.map(msg =>
                msg.id === tempMessageId
                  ? { ...msg, content: accumulatedContent }
                  : msg
              ),
            }
          }));
          
          // Update LLM usage after each model call
          if (session?.user) {
            const { data, error } = await supabase.rpc('update_llm_usage', { uid: session.user.id });
            if (data && data[0] && data[0].new_usage !== undefined && data[0].new_usage !== null) {
              setLlmUsage(data[0].new_usage);
            }
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
      })();
    });

    await Promise.all(promises);
  };

  const handleSynthesize = async () => {
    // Check synthesize usage limit
    if (synthesizeUsage >= SYNTHESIZE_LIMIT) {
      alert(`You have reached the synthesize limit of ${SYNTHESIZE_LIMIT} per user.`);
      return;
    }

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
          const modelName = availableModels.find(m => m.id === modelId)?.name || modelId;
          modelResponses[modelName] = lastAssistantMessage.content;
        }
      });

      // Build the synthesis prompt
      const systemPrompt = `
        You are an expert synthesis engine. Your job is to:
        - Combine insights from all provided AI model responses
        - Eliminate redundant information
        - Preserve unique perspectives from each AI
        - Highlight dissent where AI models disagree
        - Create one superior, comprehensive response

        Format the response using ONLY bold text for section titles and bullet points (•) for lists. Do NOT use any markdown headings (#, ##, ###, etc.) or asterisks (*). Example:

        **Section Title**
        • First point
        • Second point

        Respond in this style for all sections.
        `.trim();

      const userPrompt = `\nHere are the responses from different AI models:\n\n${Object.entries(modelResponses).map(([model, response]) => `### ${model}\n${response}`).join('\n\n')}`.trim();

      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      // Call /api/chat
      const options = {
        model: 'chatgpt',
        version: 'gpt-4.1-nano',
        temperature: 0.7,
        maxTokens: 1000
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, options })
      });

      if (!response.ok) throw new Error('Failed to get synthesized response');

      // Read the streamed response
      let synthesized = '';
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(Boolean);
          for (const line of lines) {
            try {
              const data = JSON.parse(line);
              if (data.content) {
                synthesized += data.content;
              }
            } catch (err) {
              console.log('JSON parse error:', err, line);
            }
          }
        }
      }
      setSynthesizedResponse(synthesized);

      // Update synthesize usage after successful synthesize
      if (session?.user) {
        const { data, error } = await supabase.rpc('update_synthesize_usage', { uid: session.user.id });
        if (data && data[0] && data[0].new_usage !== undefined && data[0].new_usage !== null) {
          setSynthesizeUsage(data[0].new_usage);
        }
      }

    } catch (error) {
      console.error('Error synthesizing responses:', error);
      alert('Error synthesizing responses. Please try again.');
    } finally {
      setIsSynthesizing(false);
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

  return (
    <div className="flex h-full">
      {/* Internal Sidebar */}
      <InternalSidebar 
        isExpanded={sidebarExpanded} 
        onToggle={() => setSidebarExpanded(!sidebarExpanded)} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 relative min-h-0">
          {/* Floating Selection Accordions - positioned in top left */}
          <div className="absolute top-6 left-6 z-30 max-w-[calc(100vw-12rem)]">
            <SelectionAccordions 
              selectedModels={selectedModels}
              onModelToggle={toggleModelSelection}
              selectedProRoles={selectedProRoles}
              onProRoleToggle={toggleProRoleSelection}
            />
          </div>
          
          {/* Synthesized Response Section */}
          {synthesizedResponse && (
            <div className="flex-none bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-b border-purple-200 dark:border-purple-800">
              <div className="p-4">
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
                          }
                        }}
                      >
                        {preprocessMarkdown(synthesizedResponse)}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area - Model Response Cards */}
          <div className="flex-1 p-6 pb-40 overflow-y-auto min-h-0">
            {selectedModels.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>Select AI models to start a conversation</p>
                </div>
              </div>
            ) : Object.keys(conversations).length === 0 || selectedModels.every(modelId => conversations[modelId]?.messages.length === 0) ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p>Send a message to {selectedModels.length} selected model{selectedModels.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ) : (
              <div className={`grid gap-4 ${selectedModels.length <= 2 ? 'grid-cols-1 lg:grid-cols-2' : selectedModels.length <= 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {selectedModels.map((modelId) => {
                  const model = availableModels.find(m => m.id === modelId);
                  const conversation = conversations[modelId];
                  
                  if (!conversation) return null;
                  
                  return (
                    <div key={modelId} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col min-h-[400px] max-h-[600px]">
                      {/* Model Header */}
                      <div className="flex-none p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <ModelIcon model={model} size={24} />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {model?.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {model?.description}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {model?.capabilities?.map((cap, idx) => (
                              <span key={idx} className="text-sm">{cap}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto p-3 min-h-0">
                        {conversation.messages.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                              <ModelIcon model={model} size={32} />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Waiting for your message...
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {conversation.messages.map((message) => (
                              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                                  message.role === 'user' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                }`}>
                                  <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed break-words">
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
                                        }
                                      }}
                                    >
                                      {preprocessMarkdown(message.content)}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {conversation.isLoading && (
                              <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <div className="flex space-x-1">
                                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
            )}
          </div>
          
          {/* Floating Input Area */}
          <div className="absolute bottom-16 left-6 right-6 z-40">
            <div className="max-w-4xl mx-auto">
              <PromptInput 
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                placeholder={`Send to ${selectedModels.length} model${selectedModels.length !== 1 ? 's' : ''}...`}
                disabled={Object.values(conversations).some(c => c.isLoading) || llmUsage >= LLM_PROMPT_LIMIT}
              />
              
              {/* Additional Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Prompts used: {llmUsage}/{LLM_PROMPT_LIMIT}</span>
                  <button
                    onClick={clearAllChats}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSynthesize}
                    disabled={isSynthesizing || selectedModels.filter(modelId => 
                      conversations[modelId]?.messages.some(msg => msg.role === 'assistant')
                    ).length < 2 || synthesizeUsage >= SYNTHESIZE_LIMIT}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 
                             disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium
                             transition-all duration-200 shadow-sm hover:shadow-md disabled:hover:shadow-sm text-sm"
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
                  
                  <span className="text-xs text-purple-700 dark:text-purple-300">
                    {synthesizeUsage}/{SYNTHESIZE_LIMIT} used
                  </span>
                </div>
              </div>
              
              {/* Usage warning */}
              {llmUsage >= LLM_PROMPT_LIMIT && (
                <div className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
                  You have used up free prompt credits
                </div>
              )}
              
              {/* Synthesis warning */}
              {synthesizeUsage >= SYNTHESIZE_LIMIT && 
               selectedModels.filter(modelId => conversations[modelId]?.messages.some(msg => msg.role === 'assistant')).length >= 2 && (
                <div className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You have reached your synthesize limit ({SYNTHESIZE_LIMIT}).</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynthProPage; 