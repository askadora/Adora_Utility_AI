"use client";

import React, { useState } from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import ComponentCard from '@/components/common/ComponentCard';
import NetRevenueChart from "@/components/kpi/NetRevenueChart";
import TopChannelsChart from "@/components/marketing/TopChannelsChart";
import TrafficSourcesChart from "@/components/marketing/TrafficSourcesChart";
import RecentCampaignsTable from "@/components/marketing/RecentCampaignsTable";

type MarketingTab = 'content-creation' | 'campaign-optimization' | 'analytics-insights';

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState<MarketingTab>('content-creation');

  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - Framed container matching home page style
        - Rounded container with subtle border and hover effects
      */}
      <div className="flex-none mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
                Marketing Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Monitor your marketing campaigns, track traffic sources, and analyze conversion metrics 
                to optimize your marketing performance.
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
              
              {/* Marketing-specific Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="font-semibold text-purple-300 mb-2">📈 Ask Adora for Marketing Insights</div>
                <div className="space-y-2 text-xs">
                  <div><strong>Campaigns:</strong> "Optimize my ad spend" or "Which channels perform best?"</div>
                  <div><strong>Content:</strong> "Generate blog ideas" or "Create social media posts"</div>
                  <div><strong>Analytics:</strong> "Explain conversion drops" or "Find growth opportunities"</div>
                  <div><strong>Strategy:</strong> "Plan Q2 campaign" or "Analyze competitor performance"</div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                  AI-powered marketing intelligence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        KPI METRICS SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
        - Using gap for consistent spacing across all breakpoints
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Website Visits" 
          value="45,200" 
          trend="+7%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Conversion Rate" 
          value="4.2%" 
          trend="+0.3%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Ad Spend" 
          value="$8,500" 
          trend="-2%" 
          trendDirection="down"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Leads Generated" 
          value="1,120" 
          trend="+5%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
      </section>

      {/* AI-Powered Marketing Tools with Tabs */}
      <ComponentCard title="AI-Powered Marketing Tools" description="Advanced content creation, campaign optimization, and analytics insights">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'content-creation', label: 'Content Creation', icon: '✏️' },
              { id: 'campaign-optimization', label: 'Campaign Optimization', icon: '🎯' },
              { id: 'analytics-insights', label: 'Analytics Insights', icon: '📊' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as MarketingTab)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
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
        {activeTab === 'content-creation' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Content Creation</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Generate compelling marketing content, social media posts, email campaigns, and ad copy using advanced AI algorithms.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Content Type:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Select content type...</option>
                  <option value="social-media">Social Media Post</option>
                  <option value="email-campaign">Email Campaign</option>
                  <option value="blog-post">Blog Post</option>
                  <option value="ad-copy">Ad Copy</option>
                  <option value="product-description">Product Description</option>
                  <option value="landing-page">Landing Page Copy</option>
                </select>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Target Audience:</h4>
                <input
                  type="text"
                  placeholder="e.g., Young professionals, parents, tech enthusiasts..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Key Message:</h4>
                <textarea
                  placeholder="Describe your main message, product benefits, or campaign goals..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Tone & Style:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Professional</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Casual & Friendly</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Persuasive & Sales-focused</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Educational & Informative</span>
                  </label>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Content Length:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="short">Short (50-100 words)</option>
                  <option value="medium">Medium (100-300 words)</option>
                  <option value="long">Long (300+ words)</option>
                </select>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h5 className="font-medium text-blue-900 dark:text-blue-400 mb-2">AI Enhancement</h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Our AI analyzes top-performing content in your industry to optimize engagement and conversion rates.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Content
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Save Template
              </button>
            </div>
          </div>
        )}

        {activeTab === 'campaign-optimization' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Campaign Optimization</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Optimize your marketing campaigns with AI-powered recommendations for budget allocation, audience targeting, and creative variations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Campaign Details:</h4>
                <input
                  type="text"
                  placeholder="Campaign name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Budget ($)"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Campaign Type</option>
                    <option value="search">Search Ads</option>
                    <option value="display">Display Ads</option>
                    <option value="social">Social Media</option>
                    <option value="email">Email Marketing</option>
                    <option value="video">Video Ads</option>
                  </select>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Target Audience:</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Age range (e.g., 25-45)"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Geographic location"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Interests & behaviors"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Optimization Goals:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Maximize conversions</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Reduce cost per acquisition</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Increase brand awareness</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Improve click-through rate</span>
                  </label>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Performance Metrics:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">2.4x</div>
                    <div className="text-xs text-green-700 dark:text-green-300">ROAS Improvement</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">-32%</div>
                    <div className="text-xs text-green-700 dark:text-green-300">CPA Reduction</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-medium text-green-900 dark:text-green-400 mb-2">AI Recommendations</h5>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Increase mobile ad spend by 25%</li>
                    <li>• Test video creative variations</li>
                    <li>• Expand to similar audiences</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Optimize Campaign
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View Insights
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analytics-insights' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Insights</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Get deep insights into your marketing performance with AI-powered analytics, predictive modeling, and actionable recommendations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Analysis Type:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Select analysis type...</option>
                  <option value="performance">Campaign Performance</option>
                  <option value="audience">Audience Analysis</option>
                  <option value="attribution">Attribution Modeling</option>
                  <option value="forecasting">Revenue Forecasting</option>
                  <option value="competitive">Competitive Analysis</option>
                  <option value="customer-journey">Customer Journey</option>
                </select>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Time Period:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="date"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Data Sources:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Google Analytics</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Facebook Ads</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Google Ads</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Email Platform</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">CRM Data</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Key Insights:</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h5 className="font-medium text-purple-900 dark:text-purple-400 mb-2">Performance Trends</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-purple-600 dark:text-purple-400 font-bold text-lg">+24%</div>
                        <div className="text-purple-700 dark:text-purple-300">Conversion Rate</div>
                      </div>
                      <div>
                        <div className="text-purple-600 dark:text-purple-400 font-bold text-lg">-18%</div>
                        <div className="text-purple-700 dark:text-purple-300">Bounce Rate</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h5 className="font-medium text-purple-900 dark:text-purple-400 mb-2">Audience Segments</h5>
                    <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                      <div className="flex justify-between">
                        <span>Mobile Users</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Returning Visitors</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Organic Traffic</span>
                        <span className="font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h5 className="font-medium text-purple-900 dark:text-purple-400 mb-2">Predictions</h5>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                      <li>• Revenue growth of 15% next month</li>
                      <li>• Peak traffic on weekday afternoons</li>
                      <li>• Email campaigns show 2.3x ROI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Generate Report
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        )}
      </ComponentCard>

      {/* 
        MAIN REVENUE CHART - Full width container
        - Critical business data gets maximum screen real estate
        - Consistent card styling with proper padding
      */}
      <section className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
          <NetRevenueChart />
        </div>
      </section>

      {/* 
        BREAKDOWN CHARTS SECTION - CSS Grid Layout (2D)
        - Mobile: Single column (stacked)
        - Tablet/Desktop: 2 equal columns
        - Both charts get equal importance and space
      */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div className="w-full">
          <TopChannelsChart />
        </div>
        <div className="w-full">
          <TrafficSourcesChart />
        </div>
      </section>

      {/* 
        CAMPAIGNS TABLE SECTION - Full width
        - Tables need maximum horizontal space for readability
        - Responsive table with horizontal scroll on mobile
      */}
      <section className="w-full">
        <RecentCampaignsTable />
      </section>
    </div>
  );
} 