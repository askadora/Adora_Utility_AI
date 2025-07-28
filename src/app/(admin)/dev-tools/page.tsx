"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";

// Mock data for active projects
const activeProjects = [
  { id: 1, name: "E-commerce Platform", client: "RetailCorp", progress: 75, status: "In Development", deadline: "March 30", priority: "High" },
  { id: 2, name: "Mobile Banking App", client: "FinanceFirst", progress: 45, status: "Design Review", deadline: "April 15", priority: "Medium" },
  { id: 3, name: "AI Analytics Dashboard", client: "DataTech", progress: 90, status: "Testing", deadline: "March 20", priority: "High" },
  { id: 4, name: "CRM Integration", client: "SalesPro", progress: 30, status: "Development", deadline: "May 1", priority: "Low" },
];

// Recent commits data
const recentCommits = [
  { repo: "ecommerce-platform", author: "Sarah Chen", message: "Add payment gateway integration", time: "2 hours ago", branch: "main" },
  { repo: "mobile-banking", author: "Mike Johnson", message: "Fix authentication bug", time: "5 hours ago", branch: "hotfix" },
  { repo: "ai-dashboard", author: "Alex Rivera", message: "Update chart components", time: "1 day ago", branch: "feature/charts" },
  { repo: "crm-integration", author: "Emily Davis", message: "Initial API setup", time: "2 days ago", branch: "develop" },
];

// Code quality metrics
const codeMetrics = [
  { metric: "Test Coverage", value: "87%", trend: "+3%", status: "good" },
  { metric: "Code Quality Score", value: "8.4/10", trend: "+0.2", status: "excellent" },
  { metric: "Technical Debt", value: "12 hours", trend: "-2h", status: "good" },
  { metric: "Build Success Rate", value: "94%", trend: "+1%", status: "good" },
];

type DevToolsTab = 'code-generator' | 'test-automation' | 'code-review';

export default function DevToolsDashboard() {
  const [activeTab, setActiveTab] = useState<DevToolsTab>('code-generator');

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex-none mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
                Development Tools & Project Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Comprehensive development platform with AI-powered code generation, automated testing, 
                and intelligent project management tools.
              </p>
            </div>
            
            {/* Ask Adora Voice Button */}
            <div className="relative group flex-shrink-0 ml-6">
              <button
                className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl border-transparent transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {/* Microphone Icon */}
                <div className="relative">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  
                  {/* Pulse animation overlay for when recording */}
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
                
                {/* Text */}
                <span className="text-sm font-medium">Ask Adora</span>
                
                {/* Voice waves animation (hidden by default, shown when listening) */}
                <div className="hidden group-active:flex items-center gap-1 ml-2">
                  <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse"></div>
                  <div className="w-1 h-5 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-4 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </button>
              
              {/* Dev Tools-specific Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="font-semibold text-purple-300 mb-2">👨‍💻 Ask Adora for Development Help</div>
                <div className="space-y-2 text-xs">
                  <div><strong>Code:</strong> "Generate React component" or "Optimize this function"</div>
                  <div><strong>Debug:</strong> "Find bugs in my code" or "Explain error message"</div>
                  <div><strong>Testing:</strong> "Write unit tests" or "Set up CI/CD pipeline"</div>
                  <div><strong>Architecture:</strong> "Design database schema" or "Review code quality"</div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                  AI-powered development assistant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Active Projects" 
          value="8" 
          trend="+2" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Commits Today" 
          value="24" 
          trend="+8" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Deploy Success" 
          value="96%" 
          trend="+2%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Team Velocity" 
          value="42 pts" 
          trend="+6 pts" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </section>

      {/* AI-Powered Development Tools with Tabs */}
      <ComponentCard title="AI-Powered Development Tools" description="Accelerate development with intelligent code generation and automation">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'code-generator', label: 'Code Generator', icon: '🔧' },
              { id: 'test-automation', label: 'Test Automation', icon: '🧪' },
              { id: 'code-review', label: 'Code Review', icon: '🔍' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DevToolsTab)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'code-generator' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Code Generator</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Generate high-quality code snippets, functions, and complete modules using AI-powered code generation.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Programming Language:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Code Type:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="codeType" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Function/Method</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="codeType" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Class/Component</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="codeType" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">API Endpoint</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="codeType" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Database Query</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Description:</h4>
                <textarea
                  placeholder="Describe what you want the code to do. Be specific about inputs, outputs, and functionality..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Include comments</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Add error handling</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Generate unit tests</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Generate Code
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View Templates
              </button>
            </div>
          </div>
        )}

        {activeTab === 'test-automation' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Test Automation</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Automate testing processes with AI-generated test cases, scripts, and comprehensive coverage analysis.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Test Type:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Unit Tests</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Integration Tests</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">End-to-End Tests</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Performance Tests</span>
                  </label>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Testing Framework:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="jest">Jest</option>
                  <option value="cypress">Cypress</option>
                  <option value="playwright">Playwright</option>
                  <option value="selenium">Selenium</option>
                  <option value="vitest">Vitest</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Coverage Tracking:</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Code Coverage</span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Branch Coverage</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">CI/CD Integration:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">GitHub Actions</span>
                    <span className="text-green-500">✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Jenkins</span>
                    <span className="text-gray-400">○</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Generate Tests
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Run All Tests
              </button>
            </div>
          </div>
        )}

        {activeTab === 'code-review' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Code Review Assistant</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Automated code review with intelligent analysis of code quality, security vulnerabilities, and performance optimizations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Upload Code:</h4>
                <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-orange-500 dark:hover:border-orange-400 transition-colors cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">JS, TS, PY, JAVA, C#, GO, RUST</p>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Review Criteria:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Code Quality</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Security Vulnerabilities</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Performance Issues</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Best Practices</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Review Settings:</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Severity Level:</label>
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="all">All Issues</option>
                      <option value="high">High Severity Only</option>
                      <option value="medium">Medium & High</option>
                      <option value="critical">Critical Only</option>
                    </select>
                  </div>
                  
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <h5 className="font-medium text-orange-900 dark:text-orange-400 mb-2">Recent Reviews</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">api-service.js</span>
                        <span className="text-orange-600 dark:text-orange-400">3 issues</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">auth-middleware.ts</span>
                        <span className="text-green-600 dark:text-green-400">✓ Clean</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">database.py</span>
                        <span className="text-red-600 dark:text-red-400">7 issues</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Start Review
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View Reports
              </button>
            </div>
          </div>
        )}
      </ComponentCard>

      {/* Projects and Recent Activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:gap-8">
        {/* Active Projects */}
        <ComponentCard title="Active Projects" description="Track progress and deadlines for current development projects">
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {project.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.client}</p>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    project.status === 'In Development' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    project.status === 'Testing' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    project.status === 'Design Review' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">Due: {project.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* Recent Commits */}
        <ComponentCard title="Recent Commits" description="Latest code changes and development activity">
          <div className="space-y-4">
            {recentCommits.map((commit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{commit.repo}</span>
                    <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                      {commit.branch}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{commit.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{commit.author}</span>
                    <span>•</span>
                    <span>{commit.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View Git Repository →
            </button>
          </div>
        </ComponentCard>
      </section>

      {/* Code Quality Metrics */}
      <ComponentCard title="Code Quality Metrics" description="Monitor code health and development best practices">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {codeMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{metric.metric}</h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
                <span className={`text-sm font-medium ${
                  metric.status === 'excellent' ? 'text-green-600 dark:text-green-400' :
                  metric.status === 'good' ? 'text-blue-600 dark:text-blue-400' :
                  'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      {/* Development Resources */}
      <ComponentCard title="Development Resources" description="Quick access to documentation, tools, and project templates">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Documentation</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">API Documentation</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm">View →</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">Style Guide</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm">View →</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">Deployment Guide</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm">View →</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                New Project
              </button>
              <button className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                Run Tests
              </button>
              <button className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                Deploy
              </button>
              <button className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                Monitor
              </button>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
} 