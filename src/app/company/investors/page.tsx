"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import { useDocsBot } from '@/docsbot/useDocsBot';
import { DOCSBOT_BOTS } from '@/docsbot/config';

export default function InvestorDataRoom() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, error, clearMessages } = useDocsBot(DOCSBOT_BOTS.INVESTOR as string);

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
              Investor Data Room
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Access our secure investor data room for pitch decks, financials, legal documents, and more. Connect with our team and explore investment opportunities with Adora AI.
            </p>
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
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Minimum Investment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$250K</p>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Client Investor</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$322K</p>
              </div>
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
                  disabled={true}
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
        <ComponentCard title="Pitch Deck" desc="Watch our presentation and download materials">
          <div className="space-y-6">
            <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800/50">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Adora AI Pitch Deck"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex flex-wrap gap-4">
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

        {/* Financials Section */}
        <ComponentCard title="Financials" desc="Key financial documents and projections">
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
        </ComponentCard>

        {/* Legal Documents Section */}
        <ComponentCard title="Legal Documents" desc="Corporate structure and intellectual property">
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
        </ComponentCard>

        {/* Operations Section */}
        <ComponentCard title="Operations" desc="Business operations and infrastructure">
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
        </ComponentCard>

        {/* Brand & Market Section */}
        <ComponentCard title="Brand & Market Analysis" desc="Brand guidelines and market insights">
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
        </ComponentCard>

        {/* Contact Section */}
        <ComponentCard title="Contact Us" desc="Get in touch with our investment team">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              For investment inquiries or to schedule a meeting with our team, please contact:
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:investors@adoraai.com" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                investors@adoraai.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
} 