'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, FileText, BarChart3, Lightbulb, Search, Cloud, Loader2, AlertCircle } from 'lucide-react';

interface Document {
  id: number;
  filename: string;
  file_type: string;
  processed: boolean;
}

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  created_at: string;
  metadata?: {
    has_visualization?: boolean;
    visualization?: any;
    sunshower_insights?: string[];
    analysis_type?: string;
  };
}

interface ChatInterfaceProps {
  document: Document | null;
  apiBaseUrl?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  document,
  apiBaseUrl = 'http://localhost:5000/api'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (document?.id) {
      fetchChatHistory();
    } else {
      setMessages([]);
    }
  }, [document?.id]);

  const fetchChatHistory = async () => {
    if (!document?.id) return;

    try {
      const response = await fetch(`${apiBaseUrl}/chat/history/${document.id}`);
      const result = await response.json();

      if (result.success) {
        setMessages(result.messages.map((msg: any) => ({
          ...msg,
          id: msg.id.toString()
        })));
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || !document?.id || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Add user message to UI immediately
    const userMessageId = Date.now().toString();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      message: message,
      response: '',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          document_id: document.id
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update the message with the response
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessageId 
              ? {
                  ...msg,
                  id: result.message_id?.toString() || userMessageId,
                  response: result.response.content || '',
                  metadata: result.response.metadata || {}
                }
              : msg
          )
        );
      } else {
        setError(result.error || 'Failed to send message');
        // Remove the user message if request failed
        setMessages(prev => prev.filter(msg => msg.id !== userMessageId));
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Chat error:', err);
      // Remove the user message if request failed
      setMessages(prev => prev.filter(msg => msg.id !== userMessageId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleQuickAction = (message: string) => {
    setInputMessage(message);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const renderVisualization = (metadata: any) => {
    if (!metadata?.has_visualization || !metadata?.visualization) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Generated Visualization
        </h4>
        <div 
          className="w-full h-96 bg-white dark:bg-gray-900 rounded border"
          dangerouslySetInnerHTML={{ __html: metadata.visualization }}
        />
      </div>
    );
  };

  const renderSunshowerInsights = (metadata: any) => {
    if (!metadata?.sunshower_insights || !Array.isArray(metadata.sunshower_insights)) return null;

    return (
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center">
          <Cloud className="w-4 h-4 mr-2" />
          Sunshower Analysis - Hidden Insights
        </h4>
        <ul className="space-y-2">
          {metadata.sunshower_insights.map((insight: string, index: number) => (
            <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-start">
              <span className="block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center h-96 text-center">
        <div>
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No document selected
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select a document to start chatting with AI
          </p>
        </div>
      </div>
    );
  }

  if (!document.processed) {
    return (
      <div className="flex items-center justify-center h-96 text-center">
        <div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Processing document
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we prepare "{document.filename}" for AI analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {document.filename}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Chat with your document using AI
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start a conversation with your document
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleQuickAction('Summarize this document')}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                📄 Summarize
              </button>
              <button
                onClick={() => handleQuickAction('Extract key data and show me a chart')}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                📊 Visualize
              </button>
              <button
                onClick={() => handleQuickAction('Find insights and patterns in this data')}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                💡 Insights
              </button>
              <button
                onClick={() => handleQuickAction('Find hidden insights and surprising patterns using sunshower analysis')}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                🌦️ Sunshower
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-3xl">
                <p className="text-sm">{message.message}</p>
              </div>
            </div>

            {/* AI Response */}
            {message.response && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 max-w-3xl">
                  <div className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                    {message.response}
                  </div>
                  
                  {/* Render visualizations */}
                  {renderVisualization(message.metadata)}
                  
                  {/* Render sunshower insights */}
                  {renderSunshowerInsights(message.metadata)}
                </div>
              </div>
            )}

            {/* Loading state for current message */}
            {!message.response && message.id === messages[messages.length - 1]?.id && isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border-t border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about your document..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 resize-none"
              rows={1}
              disabled={isLoading}
              style={{
                minHeight: '40px',
                maxHeight: '120px',
                height: 'auto'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Quick actions:</span>
          <button
            onClick={() => handleQuickAction('Summarize this document')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            📄 Summarize
          </button>
          <button
            onClick={() => handleQuickAction('Extract key data and show me a chart')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            📊 Visualize
          </button>
          <button
            onClick={() => handleQuickAction('Find insights and patterns in this data')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            💡 Insights
          </button>
          <button
            onClick={() => handleQuickAction('Find hidden insights and surprising patterns using sunshower analysis')}
            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            🌦️ Sunshower
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;