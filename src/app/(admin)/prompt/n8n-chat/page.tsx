'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperPlaneIcon } from '@/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from '@/contexts/AuthContext';

type MessageRole = 'user' | 'assistant';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface N8NResponse {
  output: string;
}

export default function N8NChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Generate user-based session ID on component mount
  useEffect(() => {
    if (user) {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substr(2, 9);
      const userBasedSessionId = `n8n_${user.id}_${timestamp}_${randomSuffix}`;
      setSessionId(userBasedSessionId);
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput(''); // Clear input immediately after sending
    setIsLoading(true);

    try {
      // Send message to N8N webhook
      const response = await fetch('https://sridurgal.app.n8n.cloud/webhook/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: input,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: N8NResponse = await response.json();
      
      // Debug: Log the actual response from N8N
      console.log('N8N Response:', data);
      console.log('Output field:', data.output);

      // Create assistant message with the response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.output || 'Workflow executed successfully!',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message to N8N:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    if (user) {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substr(2, 9);
      const userBasedSessionId = `n8n_${user.id}_${timestamp}_${randomSuffix}`;
      setSessionId(userBasedSessionId);
    }
  };

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="px-4 py-4">
          <header className="flex flex-col gap-2 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white/90 md:text-2xl">
                  Chat with Adora
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base max-w-2xl">
                  Your intelligent AI assistant powered by advanced workflows. Ask questions, get insights, and streamline your work.
                </p>
              </div>
              <button
                onClick={startNewChat}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Chat
              </button>
            </div>
          </header>


        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="max-w-md w-full">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Hello! I'm Adora
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                I'm here to help you with any questions or tasks. Just type your message below and I'll provide you with intelligent responses and insights.
              </p>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">A</span>
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white ml-auto' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}>
                      {message.role === 'assistant' ? (
                        <div className="prose dark:prose-invert max-w-none">
                                                     <ReactMarkdown
                             remarkPlugins={[remarkGfm]}
                             components={{
                               code({ className, children, ...props }: any) {
                                 const match = /language-(\w+)/.exec(className || '');
                                 const isInline = !props.node || props.node?.tagName !== 'pre';
                                 return !isInline && match ? (
                                   <SyntaxHighlighter
                                     style={oneDark as any}
                                     language={match[1]}
                                     PreTag="div"
                                     className="rounded-lg"
                                   >
                                     {String(children).replace(/\n$/, '')}
                                   </SyntaxHighlighter>
                                 ) : (
                                   <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                                     {children}
                                   </code>
                                 );
                               },
                             }}
                           >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                    message.role === 'user' ? 'text-right mr-12' : 'ml-12'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                                 <div className="flex gap-4">
                   <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                     <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">A</span>
                   </div>
                   <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                     <div className="flex items-center gap-2">
                       <div className="flex space-x-1">
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                       </div>
                       <span className="text-sm text-gray-500 dark:text-gray-400">Adora is thinking...</span>
                     </div>
                   </div>
                 </div>
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-none border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Adora anything..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 dark:border-gray-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white min-h-[48px] max-h-32"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <PaperPlaneIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
} 