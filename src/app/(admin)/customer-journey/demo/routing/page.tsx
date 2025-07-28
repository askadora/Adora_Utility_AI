'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const DemoRouting = () => {
  const [activeRoutingRule, setActiveRoutingRule] = useState<string>('focus-based');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const routingRules = [
    {
      id: 'focus-based',
      name: 'Focus Area Priority',
      description: 'Route primarily based on user\'s selected focus area',
      priority: 1,
      active: true,
      conditions: [
        'Marketing → Marketing automation demo',
        'Legal → Document intelligence demo', 
        'Finance → Financial analytics demo',
        'IT/Dev/Security → Technical integration demo',
        'Investor → ROI and metrics demo',
        'Startup → Rapid deployment demo',
        'Small Business → Simplified workflow demo',
        'Potential Partner → Platform capabilities demo'
      ]
    },
    {
      id: 'stage-based',
      name: 'AI Journey Stage',
      description: 'Route based on enterprise AI maturity level',
      priority: 2,
      active: true,
      conditions: [
        'Exploring/Evaluating → General overview demo',
        'Vendor conversations → Competitive comparison demo',
        'Already implementing → Advanced features demo',
        'Building in-house → Technical deep-dive demo'
      ]
    },
    {
      id: 'motivation-based',
      name: 'User Motivation',
      description: 'Route based on what brought them here',
      priority: 3,
      active: false,
      conditions: [
        'Efficiency → Productivity-focused demo',
        'Cost reduction → ROI-focused demo',
        'Innovation → Cutting-edge features demo',
        'Competition → Competitive advantage demo'
      ]
    }
  ];

  const demoOutcomes = [
    {
      id: 'marketing-automation',
      name: 'Marketing Automation Demo',
      description: 'Campaign management, content creation, and audience targeting',
      icon: '📊',
      path: '/demo/marketing-automation',
      avgDuration: '15 mins',
      conversionRate: '34%',
      color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300'
    },
    {
      id: 'document-intelligence',
      name: 'Legal Document Intelligence',
      description: 'Contract analysis, legal research, and document automation',
      icon: '⚖️',
      path: '/demo/legal-intelligence',
      avgDuration: '18 mins',
      conversionRate: '42%',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
      id: 'financial-analytics',
      name: 'Financial Analytics Demo',
      description: 'Financial modeling, forecasting, and risk analysis',
      icon: '💰',
      path: '/demo/financial-analytics',
      avgDuration: '20 mins',
      conversionRate: '38%',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    },
    {
      id: 'technical-integration',
      name: 'Technical Integration Demo',
      description: 'API integrations, custom workflows, and system architecture',
      icon: '🔧',
      path: '/demo/technical-integration',
      avgDuration: '25 mins',
      conversionRate: '45%',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
    },
    {
      id: 'roi-metrics',
      name: 'ROI & Metrics Demo',
      description: 'Business impact measurement and performance analytics',
      icon: '📈',
      path: '/demo/roi-metrics',
      avgDuration: '12 mins',
      conversionRate: '29%',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
    },
    {
      id: 'general-overview',
      name: 'General Platform Demo',
      description: 'Complete platform walkthrough and key features overview',
      icon: '🌟',
      path: '/demo/general-overview',
      avgDuration: '22 mins',
      conversionRate: '31%',
      color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
    }
  ];

  const stats = [
    { label: 'Routing Accuracy', value: '94.2%', color: 'text-green-600', icon: '🎯' },
    { label: 'Avg Demo Completion', value: '87.5%', color: 'text-blue-600', icon: '✅' },
    { label: 'Overall Conversion', value: '36.8%', color: 'text-purple-600', icon: '📊' },
    { label: 'User Satisfaction', value: '4.7/5', color: 'text-orange-600', icon: '⭐' }
  ];

  const recentRoutings = [
    { time: '2 mins ago', path: 'Marketing → Marketing Automation Demo', outcome: 'Completed', conversion: true },
    { time: '5 mins ago', path: 'Legal → Document Intelligence Demo', outcome: 'In Progress', conversion: false },
    { time: '8 mins ago', path: 'Finance → Financial Analytics Demo', outcome: 'Completed', conversion: true },
    { time: '12 mins ago', path: 'IT/Dev → Technical Integration Demo', outcome: 'Completed', conversion: false },
    { time: '15 mins ago', path: 'Investor → ROI & Metrics Demo', outcome: 'Completed', conversion: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/customer-journey/demo"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Demo Journey
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  isPreviewMode 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {isPreviewMode ? 'Exit Preview' : 'Preview Mode'}
              </button>
              
              <span className="text-xs text-gray-500 dark:text-gray-400">Step 4 of 4</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Demo Routing Logic
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Configure intelligent routing rules to deliver personalized demo experiences
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Routing Rules */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Intelligent Routing Rules
                </h2>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  Add New Rule
                </button>
              </div>

              <div className="space-y-4">
                {routingRules.map((rule) => (
                  <div key={rule.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${rule.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{rule.name}</h3>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded">
                          Priority {rule.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveRoutingRule(rule.id)}
                          className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                            activeRoutingRule === rule.id
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                          }`}
                        >
                          Configure
                        </button>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={rule.active}
                            className="form-checkbox h-4 w-4 text-blue-600"
                            readOnly
                          />
                        </label>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{rule.description}</p>
                    
                    <div className="space-y-1">
                      {rule.conditions.slice(0, 3).map((condition, index) => (
                        <div key={index} className="text-xs text-gray-500 dark:text-gray-400 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                          {condition}
                        </div>
                      ))}
                      {rule.conditions.length > 3 && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 pl-4">
                          +{rule.conditions.length - 3} more conditions
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Outcomes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Demo Outcome Paths
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoOutcomes.map((outcome) => (
                  <div key={outcome.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{outcome.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{outcome.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{outcome.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          ⏱️ {outcome.avgDuration}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${outcome.color}`}>
                          {outcome.conversionRate} conversion
                        </span>
                      </div>
                      <Link 
                        href={outcome.path}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Configure →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Live Demo Routing
              </h3>
              <div className="space-y-3">
                {recentRoutings.map((routing, index) => (
                  <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{routing.time}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{routing.path}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        routing.outcome === 'Completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                      }`}>
                        {routing.outcome}
                      </span>
                      {routing.conversion && (
                        <span className="text-xs text-blue-600 dark:text-blue-400">💼 Converted</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Routing Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Routing Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Technical Integration</span>
                    <span className="font-medium text-gray-900 dark:text-white">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Document Intelligence</span>
                    <span className="font-medium text-gray-900 dark:text-white">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Financial Analytics</span>
                    <span className="font-medium text-gray-900 dark:text-white">38%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Marketing Automation</span>
                    <span className="font-medium text-gray-900 dark:text-white">34%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">General Overview</span>
                    <span className="font-medium text-gray-900 dark:text-white">31%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Journey Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Journey Navigation
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/customer-journey/demo/what-brings-you"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    What Brings You Here?
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Step 1 of 4
                  </div>
                </Link>
                <Link 
                  href="/customer-journey/demo/focus-area"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Focus Area Selection
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Step 2 of 4
                  </div>
                </Link>
                <Link 
                  href="/customer-journey/demo/ai-stage"
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Enterprise AI Stage
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Step 3 of 4
                  </div>
                </Link>
                <div className="p-3 rounded-lg bg-blue-50 border-2 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    ✓ Demo Routing Logic
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    Step 4 of 4 - Current
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/customer-journey/demo"
                  className="block w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  ← Back to Journey Overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoRouting; 