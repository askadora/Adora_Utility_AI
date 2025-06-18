import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Automation | Adora AI - Visual Workflow Builder",
  description: "Create, manage, and automate business workflows with Adora AI's visual workflow builder powered by advanced automation technology.",
};

export default function WorkflowPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
              Workflow Automation
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Build powerful automation workflows with our visual editor. Connect your apps, 
              automate processes, and scale your business operations effortlessly.
            </p>
          </div>
          
          {/* 
            ACTION BUTTONS - FLEXBOX (1D) Layout
            - Row direction for button alignment
            - Gap provides consistent spacing
          */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Workflow
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Import Template
            </button>
          </div>
        </div>
      </header>

      {/* 
        WORKFLOW STATS SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/20 mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active Workflows</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">24</span>
            <span className="text-xs text-green-600 dark:text-green-400">+3 this week</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl dark:bg-green-900/20 mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Successful Executions</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">1,247</span>
            <span className="text-xs text-green-600 dark:text-green-400">99.2% success rate</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl dark:bg-purple-900/20 mb-4">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Time Saved</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">156h</span>
            <span className="text-xs text-purple-600 dark:text-purple-400">This month</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl dark:bg-orange-900/20 mb-4">
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Connected Apps</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">12</span>
            <span className="text-xs text-orange-600 dark:text-orange-400">400+ available</span>
          </div>
        </div>
      </section>



      {/* 
        GMAIL AI EMAIL MANAGER WORKFLOW MOCKUP - Featured Workflow
        - Detailed representation of the n8n Gmail AI Email Manager workflow
      */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Featured Workflow: Gmail AI Email Manager
          </h2>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
              AI-Powered
            </span>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Use This Template →
            </button>
          </div>
        </div>

        {/* Workflow Overview Card */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                  Gmail AI Email Manager - Intelligent Email Classification
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Automatically monitor incoming Gmail messages, analyze their content and context using AI, 
                  and intelligently classify them with appropriate labels for better email organization and prioritization.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900/30 dark:text-blue-400">Gmail</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded dark:bg-purple-900/30 dark:text-purple-400">Claude Sonnet 4</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded dark:bg-green-900/30 dark:text-green-400">Auto-Classification</span>
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded dark:bg-orange-900/30 dark:text-orange-400">Context-Aware</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Visual Representation */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900/30">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-4">
              Workflow Steps
            </h4>
            
            {/* Workflow Diagram */}
            <div className="relative overflow-x-auto">
              <div className="flex items-center gap-4 min-w-max pb-4">
                {/* Step 1: Gmail Monitoring */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Gmail Trigger</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Monitor Inbox</div>
                  </div>
                </div>

                {/* Arrow */}
                <svg className="w-8 h-2 text-gray-400">
                  <line x1="0" y1="1" x2="32" y2="1" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow1)" />
                  <defs>
                    <marker id="arrow1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>

                {/* Step 2: Content Extraction */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Extract Content</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Headers & Body</div>
                  </div>
                </div>

                {/* Arrow */}
                <svg className="w-8 h-2 text-gray-400">
                  <line x1="0" y1="1" x2="32" y2="1" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow2)" />
                  <defs>
                    <marker id="arrow2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>

                {/* Step 3: History Analysis */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">History Check</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Context Analysis</div>
                  </div>
                </div>

                {/* Arrow */}
                <svg className="w-8 h-2 text-gray-400">
                  <line x1="0" y1="1" x2="32" y2="1" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow3)" />
                  <defs>
                    <marker id="arrow3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>

                {/* Step 4: AI Classification */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Agent</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Claude Sonnet 4</div>
                  </div>
                </div>

                {/* Arrow */}
                <svg className="w-8 h-2 text-gray-400">
                  <line x1="0" y1="1" x2="32" y2="1" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow4)" />
                  <defs>
                    <marker id="arrow4" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>

                {/* Step 5: Label Assignment */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">Apply Labels</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Auto-Organize</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* How It Works */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              ⚙️ How It Works (Step-by-Step)
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-medium text-gray-800 dark:text-white/90 mb-1">📧 Gmail Monitoring (Trigger)</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  Continuously monitors your Gmail inbox:
                  <ul className="list-disc list-inside mt-1 ml-2 space-y-0.5">
                    <li>Polls for new emails every minute</li>
                    <li>Captures all incoming messages automatically</li>
                    <li>Triggers workflow for each new email received</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="font-medium text-gray-800 dark:text-white/90 mb-1">📖 Email Content Extraction</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  Retrieves complete email details:
                  <ul className="list-disc list-inside mt-1 ml-2 space-y-0.5">
                    <li>Full email body and headers</li>
                    <li>Sender information and recipient lists</li>
                    <li>Subject line and metadata</li>
                    <li>Email threading information (replies/forwards)</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="font-medium text-gray-800 dark:text-white/90 mb-1">🔍 Email History Analysis</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">
                  AI agent checks relationship context:
                  <ul className="list-disc list-inside mt-1 ml-2 space-y-0.5">
                    <li>Searches for previous emails from the same sender</li>
                    <li>Checks sent folder for prior outbound correspondence</li>
                    <li>Determines if this is a first-time contact (cold email)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* AI Classification & Labels */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              🤖 AI Classification & Smart Labels
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-medium text-gray-800 dark:text-white/90 mb-2">Intelligent Classification Agent</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs mb-3">
                  Advanced AI categorization using Claude Sonnet 4 for sophisticated email analysis, 
                  context-aware classification, and automated vs. human-sent email detection.
                </div>
              </div>

              <div>
                <div className="font-medium text-gray-800 dark:text-white/90 mb-2">🏷️ Automatic Label Assignment</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">To Respond</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">FYI</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Notification</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Marketing</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Meeting Update</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Comment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tools Used */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              🛠️ Tools Used
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">n8n</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white/90">n8n</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Workflow automation platform</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400">G</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white/90">Gmail API</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Email monitoring and label management</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">AI</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-white/90">Anthropic Claude</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Advanced email content analysis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              📦 Key Features
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Real-time email monitoring and classification</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Context-aware analysis using email history</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Intelligent cold vs. warm email detection</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Automatic Gmail label application</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Thread-aware conversation tracking</span>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
              🚀 Ideal Use Cases
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Busy executives managing high email volumes</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Sales professionals prioritizing prospect communications</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Support teams organizing customer inquiries</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600 dark:text-gray-400">Anyone wanting automated email organization</span>
              </div>
            </div>
          </div>
                 </div>
       </section>

      {/* 
        MAIN WORKFLOW EDITOR SECTION - Full width embedded interface
        - This represents the white-labeled n8n interface
      */}
      <section className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          {/* 
            WORKFLOW EDITOR HEADER - FLEXBOX (1D) Layout
            - Row direction for toolbar items
            - Space-between for left/right alignment
          */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Visual Workflow Editor
              </h3>
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                Powered by Adora AI
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Undo
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Redo
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Test Workflow
              </button>
            </div>
          </div>

          {/* 
            WORKFLOW CANVAS - Embedded n8n interface mockup
            - This would be the actual embedded n8n editor in production
          */}
          <div className="relative h-[600px] bg-gray-50 dark:bg-gray-900/30">
            {/* Node Palette Sidebar */}
            <div className="absolute left-0 top-0 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
                  Nodes & Integrations
                </h4>
                
                {/* Search Bar */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search nodes..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Node Categories */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Triggers
                    </h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Schedule</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Webhook</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Popular Apps
                    </h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600 dark:text-red-400">G</span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Gmail</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">S</span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Slack</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600 dark:text-green-400">GS</span>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Google Sheets</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      AI & Data
                    </h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">OpenAI</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Canvas Area */}
            <div className="ml-64 h-full relative overflow-hidden">
              {/* Canvas Grid Background */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" className="text-gray-300 dark:text-gray-700">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Sample Workflow Nodes */}
              <div className="relative z-10 p-8">
                {/* Start Node */}
                <div className="absolute top-20 left-20">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">Schedule Trigger</span>
                  </div>
                </div>

                {/* Connection Line */}
                <svg className="absolute top-28 left-36 w-24 h-2">
                  <line x1="0" y1="1" x2="96" y2="1" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                    </marker>
                  </defs>
                </svg>

                {/* Gmail Node */}
                <div className="absolute top-20 left-60">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">Gmail</span>
                  </div>
                </div>

                {/* Connection Line */}
                <svg className="absolute top-28 left-76 w-24 h-2">
                  <line x1="0" y1="1" x2="96" y2="1" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />
                  <defs>
                    <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                    </marker>
                  </defs>
                </svg>

                {/* AI Processing Node */}
                <div className="absolute top-20 left-96">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">AI Analysis</span>
                  </div>
                </div>

                {/* Floating Action Panel */}
                <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      Add Node
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      Test Connection
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      View Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        WORKFLOW TEMPLATES SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column
        - Tablet: 2 columns
        - Desktop: 3 columns
      */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Popular Workflow Templates
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            View All Templates →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Template Card 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Email to Slack
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Forward important emails to Slack channels
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Used 1.2k times
              </span>
              <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                Use Template
              </button>
            </div>
          </div>

          {/* Template Card 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Data Sync
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sync data between Google Sheets and database
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Used 856 times
              </span>
              <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                Use Template
              </button>
            </div>
          </div>

          {/* Template Card 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  AI Content Generator
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate content using AI and publish automatically
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Used 642 times
              </span>
              <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                Use Template
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        RECENT WORKFLOWS SECTION - Table layout
        - Responsive table with horizontal scroll on mobile
      */}
      <section className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Workflows
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Run
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Executions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                          Customer Onboarding
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Automated welcome sequence
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    247
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                          Daily Reports
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Generate and send daily analytics
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full dark:bg-green-900/30 dark:text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    1 day ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    89
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
} 