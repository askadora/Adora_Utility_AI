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

export default function AskAdoraPage() {
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
    const fetchUsage = async () => {
      if (!session?.user?.id) return;
      
      try {
        const { data: usageData, error } = await supabase
          .from('usage')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching usage:', error);
          return;
        }

        if (usageData) {
          setLlmUsage(usageData.llm_usage || 0);
          setSynthesizeUsage(usageData.synthesize_usage || 0);
        }
      } catch (error) {
        console.error('Error fetching usage:', error);
      }
    };

    fetchUsage();
  }, [session?.user?.id]);

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
    if (!input.trim() || selectedModels.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Add user message to all selected model conversations
    const updatedConversations = { ...conversations };
    selectedModels.forEach(modelId => {
      if (!updatedConversations[modelId]) {
        updatedConversations[modelId] = {
          id: modelId,
          messages: [],
          isLoading: false,
        };
      }
      updatedConversations[modelId].messages.push(userMessage);
      updatedConversations[modelId].isLoading = true;
    });

    setConversations(updatedConversations);
    setInput('');

    // Here you would implement the actual API calls to the AI models
    // For now, we'll just simulate responses
    setTimeout(() => {
      const updatedConversationsWithResponses = { ...updatedConversations };
      selectedModels.forEach(modelId => {
        const model = UNIFIED_MODELS.find(m => m.id === modelId);
        const responseMessage: Message = {
          id: (Date.now() + Math.random()).toString(),
          role: 'assistant',
          content: `This is a simulated response from ${model?.name || modelId}. In a real implementation, this would be the actual AI response.`,
          timestamp: new Date(),
        };
        
        if (updatedConversationsWithResponses[modelId]) {
          updatedConversationsWithResponses[modelId].messages.push(responseMessage);
          updatedConversationsWithResponses[modelId].isLoading = false;
        }
      });
      setConversations(updatedConversationsWithResponses);
    }, 2000);
  };

  const handleSynthesize = async () => {
    if (selectedModels.length < 2) {
      alert('Please select at least 2 models to synthesize responses.');
      return;
    }

    setIsSynthesizing(true);
    
    // Simulate synthesis
    setTimeout(() => {
      setSynthesizedResponse(`
# Synthesized Response

This is a synthesized response combining insights from multiple AI models.

## Key Points

- **Model 1**: Provided insights on technical feasibility
- **Model 2**: Offered strategic business perspective
- **Model 3**: Contributed user experience considerations

## Consensus

All models agree that this approach shows promise, with varying degrees of confidence in implementation timeline.

## Recommendations

1. Start with a pilot program
2. Gather user feedback early
3. Iterate based on real-world usage data
      `);
      setIsSynthesizing(false);
    }, 3000);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left Sidebar */}
      <InternalSidebar 
        expanded={sidebarExpanded}
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
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                    Synthesized Response
                  </h3>
                  <button
                    onClick={() => setSynthesizedResponse(null)}
                    className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {preprocessMarkdown(synthesizedResponse)}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedModels.map(modelId => {
              const model = UNIFIED_MODELS.find(m => m.id === modelId);
              const conversation = conversations[modelId];
              
              if (!conversation || conversation.messages.length === 0) {
                return (
                  <div key={modelId} className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <ModelIcon model={model} size={24} />
                    <p className="mt-2">No messages yet. Start a conversation with {model?.name || modelId}.</p>
                  </div>
                );
              }
              
              return (
                <div key={modelId} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <ModelIcon model={model} size={20} />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {model?.name || modelId}
                      </span>
                      {conversation.isLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {conversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Input Area */}
          <div className="flex-none p-4 border-t border-gray-200 dark:border-gray-700">
            <PromptInput
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              placeholder="Ask Adora anything..."
              disabled={selectedModels.length === 0}
            />
            {/* Synthesize Button */}
            {selectedModels.length >= 2 && (
              <div className="mt-3 flex justify-center">
                <button
                  onClick={handleSynthesize}
                  disabled={isSynthesizing}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {isSynthesizing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Synthesizing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Synthesize Responses
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
