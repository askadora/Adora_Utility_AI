"use client";

import React, { useState } from 'react';
import { SendIcon } from '@/components/icons';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function KnowledgeBase() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Implement vector search and chat completion
      // This will be implemented when we set up the vector database
      const response = await fetch('/api/knowledge-base/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-1 p-4 md:p-6 2xl:p-10">
      <div className="mb-4">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Knowledge Base
        </h2>
      </div>

      {/* Chat Interface */}
      <div className="mb-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-[calc(50vh-120px)] flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="border-t border-stroke p-4 dark:border-strokedark">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about our documentation..."
                className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {/* Getting Started */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Getting Started
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-primary hover:underline">
                Quick Start Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Installation
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Basic Configuration
              </a>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Features
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-primary hover:underline">
                AI Chat Integration
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Custom Prompts
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Analytics Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* API Reference */}
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
            API Reference
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-primary hover:underline">
                Authentication
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Endpoints
              </a>
            </li>
            <li>
              <a href="#" className="text-primary hover:underline">
                Rate Limits
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 