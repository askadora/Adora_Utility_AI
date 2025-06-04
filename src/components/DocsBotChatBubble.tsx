"use client";

import React, { useState } from 'react';
import { useDocsBot } from '@/docsbot/useDocsBot';
import { DOCSBOT_BOTS } from '@/docsbot/config';

function renderBotContent(content: string) {
  // Basic formatting: line breaks, bold, numbered lists
  if (!content) return null;
  // Replace **bold**
  let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Replace numbered lists
  formatted = formatted.replace(/(\d+)\. /g, '<br/><strong>$1.</strong> ');
  // Replace newlines with <br/>
  formatted = formatted.replace(/\n/g, '<br/>');
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
}

export default function DocsBotChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, error, clearMessages } = useDocsBot(DOCSBOT_BOTS.COMMON as string);

  const TEAM_ID = 'r5DFHTmBuQSdYrUAhqXk';
  const BOT_ID = 'vPCRFfIbGuVNMeJi08nt';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#5365FF] text-white rounded-full p-4 shadow-lg hover:bg-[#4152cc] transition-colors flex items-center justify-center overflow-hidden"
          style={{ width: 56, height: 56 }}
        >
          <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={40} height={40} className="rounded-full" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5365FF] flex items-center justify-center overflow-hidden">
                <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={40} height={40} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ask Adora AI</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearMessages}
                title="Refresh Chat"
                className="text-gray-500 hover:text-[#5365FF] p-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581M5.21 17.293A9 9 0 1112 21a9 9 0 01-6.79-3.707z" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-lg font-medium">Welcome to Adora AI Assistant</p>
                  <p className="mt-2">How can I help you today?</p>
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}
              >
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 mr-2 rounded-full bg-[#5365FF] flex items-center justify-center overflow-hidden">
                    <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={32} height={32} className="rounded-full" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#5365FF] text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {msg.role === 'user' ? msg.content : renderBotContent(msg.content)}
                </div>
                {msg.role === 'user' && <div className="w-8 h-8 ml-2" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-200 dark:border-red-800 shadow-sm">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-[#5365FF] px-6 py-3 text-white hover:bg-[#4152cc] focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
              >
                <span className="flex items-center gap-2">
                  <span>Send</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 