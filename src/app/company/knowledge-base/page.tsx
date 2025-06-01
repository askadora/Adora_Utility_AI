"use client";

import React from 'react';

export default function KnowledgeBase() {
  // Remove chat state and handlers since we're embedding the iframe
  return (
    <div className="mt-1 p-4 md:p-6 2xl:p-10">
      <div className="mb-4">
        <h2 className="text-title-md2 font-bold text-black dark:text-white">
          Knowledge Base
        </h2>
      </div>

      {/* Chat Interface replaced with DocsBot AI iframe */}
      <div className="mb-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <iframe
          src="https://docsbot.ai/iframe/r5DFHTmBuQSdYrUAhqXk/vPCRFfIbGuVNMeJi08nt"
          width="100%"
          height="100%"
          frameBorder="0"
          allowTransparency={true}
          scrolling="no"
          style={{ border: 'none', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', width: '100%', height: '100%' }}
          title="DocsBot AI Chatbot"
        />
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