'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperPlaneIcon, PlusIcon } from '@/icons';
import { UNIFIED_MODELS, Model, UnifiedMessage, UnifiedChatOptions } from '@/llm/unified-models';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
  const [availableModels] = useState<Model[]>(UNIFIED_MODELS);
  const { session } = useAuth();
  const [llmUsage, setLlmUsage] = useState<number>(0);
  const LLM_PROMPT_LIMIT = process.env.NEXT_PUBLIC_LLM_PROMPT_LIMIT ? parseInt(process.env.NEXT_PUBLIC_LLM_PROMPT_LIMIT) : 20;
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [allowedModels, setAllowedModels] = useState(0);

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

  const scrollToBottom = (modelId: string) => {
    messagesEndRefs.current[modelId]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Check credits before sending
    if (llmUsage + selectedModels.length > LLM_PROMPT_LIMIT) {
      const allowed = LLM_PROMPT_LIMIT - llmUsage;
      setAllowedModels(allowed);
      setShowLimitModal(true);
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
          // const model = availableModels.find(m => m.id === modelId);
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

          // --- Use /api/chat route for streaming ---
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
          const modelName = availableModels.find(m => m.id === modelId)?.name || modelId;
          modelResponses[modelName] = lastAssistantMessage.content;
        }
      });
      console.log('[SYNTH] modelResponses:', modelResponses);

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
      console.log('[SYNTH] messages:', messages);

      // Call /api/chat
      const options = {
        model: 'chatgpt',
        version: 'gpt-4.1-nano',
        temperature: 0.7,
        maxTokens: 1000
      };
      console.log('[SYNTH] options:', options);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, options })
      });
      console.log('[SYNTH] response.ok:', response.ok);

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
                console.log('[SYNTH] chunk:', data.content);
              }
            } catch (err) {
              console.log('[SYNTH] JSON parse error:', err, line);
            }
          }
        }
      }
      console.log('[SYNTH] synthesized:', synthesized);
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
    const model = availableModels.find(m => m.id === expandedModel);
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
                        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed break-words text-gray-900 dark:text-white [&_p]:my-0.5 [&_ul]:my-0.5 [&_ol]:my-0.5 [&_pre]:my-2 [&_h1]:my-0.5 [&_h2]:my-0.5 [&_h3]:my-0.5 [&_h4]:my-0.5 [&_h5]:my-0.5 [&_h6]:my-0.5 [&_blockquote]:my-1 [&_table]:my-1.5 [&_hr]:my-1.5 [&_li]:my-0">
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
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Transparent blurred overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-sm w-full text-center border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Model Selection Limit
            </div>
            <div className="mb-4 text-gray-700 dark:text-gray-300">
              You can select only <span className="font-bold">{allowedModels}</span> model{allowedModels !== 1 ? 's' : ''} based on your remaining credits.
            </div>
            <button
              onClick={() => setShowLimitModal(false)}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
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
            <span className="text-xs text-gray-500 ml-2">Prompts used: {llmUsage}/{LLM_PROMPT_LIMIT}</span>
            
            {/* Model Selection */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Models:</span>
              <div className="flex gap-1">
                {availableModels.map((model) => (
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

      {/** Synthesized Response Section */}
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
                  {preprocessMarkdown(synthesizedResponse)}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Models Grid */}
      <div className="relative flex-1 overflow-y-auto p-4">
        <div className={`grid ${getGridCols()} gap-4 h-full`}>
          {selectedModels.map((modelId) => {
            const model = availableModels.find(m => m.id === modelId);
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
                            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed break-words text-gray-900 dark:text-white [&_p]:my-0.5 [&_ul]:my-0.5 [&_ol]:my-0.5 [&_pre]:my-2 [&_h1]:my-0.5 [&_h2]:my-0.5 [&_h3]:my-0.5 [&_h4]:my-0.5 [&_h5]:my-0.5 [&_h6]:my-0.5 [&_blockquote]:my-1 [&_table]:my-1.5 [&_hr]:my-1.5 [&_li]:my-0">
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
              disabled={!input.trim() || Object.values(conversations).some(c => c.isLoading) || llmUsage >= LLM_PROMPT_LIMIT}
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

      {llmUsage >= LLM_PROMPT_LIMIT && (
        <div className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
          You have used up free credits
        </div>
      )}
    </div>
  );
} 