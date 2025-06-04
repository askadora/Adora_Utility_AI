"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import { useDocsBot } from '@/docsbot/useDocsBot';
import { DOCSBOT_BOTS } from '@/docsbot/config';

export default function KnowledgeBase() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, error, clearMessages } = useDocsBot(DOCSBOT_BOTS.KNOW_BASE as string);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6 md:space-y-8">
        {/* Main Heading Section */}
        <div className="mt-1 p-4 md:p-6 2xl:p-10">
          <div className="mb-4 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white/90">
              Knowledge Base
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Explore our comprehensive knowledge base to learn more about Adora AI, our products, and how we can help you.
            </p>
          </div>
        </div>

        {/* Knowledge Base Chat Section */}
        <div className="mb-8">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg" style={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5365FF] flex items-center justify-center overflow-hidden">
                    <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge Assistant</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about Adora</p>
                  </div>
                </div>
                <button
                  onClick={clearMessages}
                  title="Refresh Chat"
                  className="text-gray-500 hover:text-[#5365FF] p-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581M5.21 17.293A9 9 0 1112 21a9 9 0 01-6.79-3.707z" />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-lg font-medium">Welcome to Knowledge Assistant</p>
                    <p className="mt-2">Ask me anything about Adora AI, our products, or services.</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}
                >
                  {message.role !== 'user' && (
                    <div className="w-8 h-8 mr-2 rounded-full bg-[#5365FF] flex items-center justify-center overflow-hidden">
                      <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={32} height={32} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-[#5365FF] text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && <div className="w-8 h-8 ml-2" />}
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
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Adora AI..."
                  className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:border-transparent"
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
        </div>

        {/* Knowledge Base Categories */}
        <ComponentCard title="Knowledge Categories" desc="Browse our knowledge base by category">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Documentation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Product Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Getting Started Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    User Manual
                  </a>
                </li>
              </ul>
            </div>

            {/* Tutorials & Guides */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Tutorials & Guides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Step-by-Step Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Best Practices
                  </a>
                </li>
              </ul>
            </div>

            {/* FAQs & Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">FAQs & Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Troubleshooting Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
} 