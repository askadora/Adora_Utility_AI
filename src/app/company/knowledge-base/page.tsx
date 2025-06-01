"use client";

import React from 'react';

export default function KnowledgeBase() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Knowledge Base
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Access our comprehensive documentation, guides, and resources to help you get the most out of Adora AI.
        </p>
      </header>

      {/* Chat Interface */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <iframe
          src="https://docsbot.ai/iframe/r5DFHTmBuQSdYrUAhqXk/vPCRFfIbGuVNMeJi08nt"
          width="100%"
          height="400"
          frameBorder="0"
          allowTransparency={true}
          scrolling="no"
          style={{ border: 'none', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
          title="DocsBot AI Chatbot"
        />
      </div>

      {/* Documentation Sections */}
      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {/* Getting Started */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white/90">
            Getting Started
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Quick Start Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Installation
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Basic Configuration
              </a>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white/90">
            Features
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                AI Chat Integration
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Custom Prompts
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Analytics Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* API Reference */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white/90">
            API Reference
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Authentication
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Endpoints
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Rate Limits
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 