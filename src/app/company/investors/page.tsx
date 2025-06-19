"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import { useDocsBot } from '@/docsbot/useDocsBot';
import { DOCSBOT_BOTS } from '@/docsbot/config';
import { useSidebar } from '@/context/SidebarContext';

export default function InvestorDataRoom() {
  const [input, setInput] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSafeModal, setShowSafeModal] = useState(false);
  const [showClientSafeModal, setShowClientSafeModal] = useState(false);
  const [showMinimumSafeModal, setShowMinimumSafeModal] = useState(false);
  const { messages, isLoading, sendMessage, error, clearMessages } = useDocsBot(DOCSBOT_BOTS.INVESTOR as string);
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Accordion state management
  const [openSections, setOpenSections] = useState({
    technology: false,
    financials: false,
    legal: false,
    operations: false,
    brandMarket: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
          <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white/90">
                Investor Data Room
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Access our secure investor data room for pitch decks, financials, legal documents, and more. Connect with our team and explore investment opportunities with Adora AI.
              </p>
            </div>
            
            {/* Video Help Icon */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#5365FF] text-white rounded-lg hover:bg-[#4152cc] transition-colors duration-200 shadow-sm"
                title="How to use the Data Room"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">How to Use</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white/90 mb-3">
              Your Investment Opportunity
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
              We're seeking $2.5-3.2M in funding to accelerate our AI platform launch. Join us in building the future of artificial intelligence.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => setShowMinimumSafeModal(true)}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5365FF]/20"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Minimum Investment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$250K</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#5365FF] dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Document
                </div>
              </button>
              <button 
                onClick={() => setShowClientSafeModal(true)}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5365FF]/20"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Client Investor</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$322K</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#5365FF] dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Document
                </div>
              </button>
              <button 
                onClick={() => setShowSafeModal(true)}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5365FF]/20"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Hybrid SAFE</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$1M</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#5365FF] dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Document
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* InvestAssist AI Chatbot Section */}
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adora Data Room Bot</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about our investment opportunity</p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-lg font-medium">Welcome to Adora Data Room bot</p>
                    <p className="mt-2">Ask me anything about our investment opportunity, financials, or business plans.</p>
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

            {/* Chat Input <button type="submit" disabled={isLoading}*/}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about our investment opportunity..."
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

        {/* Pitch Deck Section */}
        <ComponentCard title="Pitch Deck & Presentation" desc="Key materials for investors">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Download our comprehensive pitch deck and watch our latest investor presentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Pitch Deck (PDF)
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Watch Presentation
              </a>
            </div>
          </div>
        </ComponentCard>

        {/* Technology Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Our technical architecture and innovation</p>
              </div>
              <button
                onClick={() => toggleSection('technology')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.technology ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.technology && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Core Technology</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        AI Architecture Overview
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Machine Learning Models
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Data Processing Pipeline
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Security Framework
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Technical Documentation</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        API Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        System Architecture
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        Performance Benchmarks
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Security Audit Reports
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Financials Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financials</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Key financial documents and projections</p>
              </div>
              <button
                onClick={() => toggleSection('financials')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.financials ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.financials && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Financial Statements</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Balance Sheet
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Profit & Loss Statement
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Cash Flow Statement
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Tax Returns
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Projections & KPIs</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Revenue Projections
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Key Performance Indicators
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Financial Models
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Cap Table
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Legal</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Corporate structure and intellectual property</p>
              </div>
              <button
                onClick={() => toggleSection('legal')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.legal ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.legal && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Corporate Documents</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Articles of Incorporation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Bylaws
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Share Structure
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Shareholder Agreements
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Intellectual Property</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Trademark Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Patent Applications
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Copyright Registrations
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Domain Names
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Operations Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Operations</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Business operations and infrastructure</p>
              </div>
              <button
                onClick={() => toggleSection('operations')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.operations ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.operations && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Business Operations</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Business Plan
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Organizational Chart
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Standard Operating Procedures
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Infrastructure</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        IT Infrastructure
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Security Protocols
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Data Privacy Policies
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Brand & Market Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Brand & Market</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Brand guidelines and market insights</p>
              </div>
              <button
                onClick={() => toggleSection('brandMarket')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.brandMarket ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.brandMarket && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Brand Assets</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Brand Book & Guidelines
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Marketing Assets
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Press Kit
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Market Analysis</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Market Size & Growth
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Competitive Analysis
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Customer Research
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <ComponentCard title="Contact Us" desc="Get in touch with our investment team">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              For investment inquiries or to schedule a meeting with our team, please contact:
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:investors@adorahq.com" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                investors@adorahq.com
              </a>
              <a href="tel:+12148367794" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (214) 836-7794
              </a>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Video Modal Lightbox */}
      {showVideoModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowVideoModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-4xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowVideoModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                                 {/* Modal Header */}
                 <div className="p-6 pr-16">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                     How to Use the Data Room
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                     Learn how to navigate and use our investor data room effectively
                   </p>
                 </div>
                 
                 {/* Video Container */}
                 <div className="px-6 pb-6">
                   <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                     {/* Placeholder for video - replace with actual video URL */}
                     <div className="w-full h-full flex items-center justify-center">
                       <div className="text-center">
                         <div className="w-16 h-16 mx-auto mb-4 bg-[#5365FF] rounded-full flex items-center justify-center">
                           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         </div>
                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                           Data Room Tutorial Video
                         </h4>
                         <p className="text-gray-600 dark:text-gray-400 mb-4">
                           Learn how to navigate and use our investor data room effectively.
                         </p>
                         <p className="text-sm text-gray-500 dark:text-gray-400">
                           Video coming soon - Replace this placeholder with your actual video embed
                         </p>
                       </div>
                     </div>
                     
                     {/* Uncomment and replace VIDEO_ID with actual video when ready */}
                     {/* 
                     <iframe
                       className="w-full h-full"
                       src="https://www.youtube.com/embed/VIDEO_ID"
                       title="How to Use the Data Room"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                     */}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </>
       )}

      {/* SAFE Document PDF Modal */}
      {showSafeModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowSafeModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
                         {/* Scrollable container with max height */}
             <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowSafeModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Dynamic SAFE Note
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $1,000,000 Investment Agreement • Post-Money Valuation Cap & Discount - 1 yr of Adora AI OS included
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                          $100M Valuation Cap
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          20% Discount Rate
                        </span>
                        <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                          1yr of Adora AI OS Included
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                                 {/* PDF Viewer Container */}
                 <div className="p-2 pb-3">
                   <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                     <iframe
                       src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$1m.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMW0ucGRmIiwiaWF0IjoxNzUwMjgwMDM4LCJleHAiOjE3ODE4MTYwMzh9.rcy8tlyTbJZ0-3UCiEREXq9mJv696dsCMZygo1IHovU#view=FitH&zoom=110"
                       title="Adora AI Dynamic SAFE Note - $1M Investment Agreement"
                       className="w-full h-[65vh] rounded-lg"
                       style={{ minHeight: '500px' }}
                     />
                   </div>
                 </div>
                 
                 {/* Action Buttons */}
                 <div className="px-2 pb-3">
                   <div className="flex flex-col sm:flex-row gap-3">
                     <a
                       href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$1m.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMW0ucGRmIiwiaWF0IjoxNzUwMjgwMDM4LCJleHAiOjE3ODE4MTYwMzh9.rcy8tlyTbJZ0-3UCiEREXq9mJv696dsCMZygo1IHovU"
                       download="Adora_AI_Dynamic_SAFE_Note_$1M.pdf"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                       </svg>
                       Download PDF
                     </a>
                     <a
                       href="mailto:investors@adorahq.com?subject=SAFE Note Investment Inquiry&body=Hello, I'm interested in learning more about the $1M SAFE investment opportunity."
                       className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                       Contact About Investment
                     </a>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Client SAFE Document PDF Modal ($322K) */}
      {showClientSafeModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowClientSafeModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowClientSafeModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Client SAFE Note
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $322,000 Investment Agreement • Post-Money Valuation Cap & Discount - Investor get's investment credit for adding their first year of Adora AI to the $250k minimum investment
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                          $100M Valuation Cap
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          20% Discount Rate
                        </span>
                        <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                          1yr of Adora AI OS Included
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$322k%20Client.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMzIyayBDbGllbnQucGRmIiwiaWF0IjoxNzUwMjgyMjQ2LCJleHAiOjE3ODE4MTgyNDZ9.2Le6WTGQNFtx_doB8cUK6bshEJ6jIxj6VMzLZQ1Fjuw#view=FitH&zoom=110"
                      title="Adora AI Client SAFE Note - $322K Investment Agreement"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$322k%20Client.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMzIyayBDbGllbnQucGRmIiwiaWF0IjoxNzUwMjgyMjQ2LCJleHAiOjE3ODE4MTgyNDZ9.2Le6WTGQNFtx_doB8cUK6bshEJ6jIxj6VMzLZQ1Fjuw"
                      download="Adora_AI_Client_SAFE_Note_$322K.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <a
                      href="mailto:investors@adorahq.com?subject=Client SAFE Note Investment Inquiry&body=Hello, I'm interested in learning more about the $322K Client investment opportunity."
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Minimum SAFE Document PDF Modal ($250K) */}
      {showMinimumSafeModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowMinimumSafeModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowMinimumSafeModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Minimum SAFE Note
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $250,000 Investment Agreement • Post-Money Valuation Cap & Discount
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                          $100M Valuation Cap
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          20% Discount Rate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$250k.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMjUway5wZGYiLCJpYXQiOjE3NTAyODI0MjksImV4cCI6MTc4MTgxODQyOX0.XA9bFdsO30pZ4Rs62qBvxCC3-gniLuE4d97b0jS_54M#view=FitH&zoom=110"
                      title="Adora AI Minimum SAFE Note - $250K Investment Agreement"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$250k.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMjUway5wZGYiLCJpYXQiOjE3NTAyODI0MjksImV4cCI6MTc4MTgxODQyOX0.XA9bFdsO30pZ4Rs62qBvxCC3-gniLuE4d97b0jS_54M"
                      download="Adora_AI_Minimum_SAFE_Note_$250K.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <a
                      href="mailto:investors@adorahq.com?subject=Minimum SAFE Note Investment Inquiry&body=Hello, I'm interested in learning more about the $250K minimum investment opportunity."
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 