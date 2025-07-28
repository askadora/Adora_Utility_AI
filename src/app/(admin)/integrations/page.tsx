import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations | Adora AI - Connect Your Apps & Data Sources",
  description: "Connect 1000+ apps and data sources to Adora AI. Seamlessly integrate with popular tools like Google Sheets, Slack, Salesforce, and more.",
};

export default function IntegrationsPage() {
  // Sample integration data based on n8n's popular integrations
  const featuredIntegrations = [
    {
      name: "Google Sheets",
      description: "Web-based spreadsheet program for data management and collaboration",
      category: "Data & Storage",
      icon: "GS",
      color: "bg-green-500",
      isPopular: true,
      isTrigger: true,
    },
    {
      name: "Slack",
      description: "Team communication and collaboration platform",
      category: "Communication",
      icon: "S",
      color: "bg-purple-500",
      isPopular: true,
      isTrigger: true,
    },
    {
      name: "Gmail",
      description: "Email service for sending and receiving messages",
      category: "Communication",
      icon: "G",
      color: "bg-red-500",
      isPopular: true,
      isTrigger: true,
    },
    {
      name: "Salesforce",
      description: "Customer relationship management platform",
      category: "Sales",
      icon: "SF",
      color: "bg-blue-500",
      isPopular: true,
      isTrigger: false,
    },
    {
      name: "HubSpot",
      description: "All-in-one marketing and sales software",
      category: "Marketing",
      icon: "HS",
      color: "bg-orange-500",
      isPopular: true,
      isTrigger: true,
    },
    {
      name: "OpenAI",
      description: "AI-powered language models and tools",
      category: "AI",
      icon: "AI",
      color: "bg-indigo-500",
      isPopular: true,
      isTrigger: false,
    },
    {
      name: "MySQL",
      description: "Open-source relational database management system",
      category: "Data & Storage",
      icon: "DB",
      color: "bg-blue-600",
      isPopular: true,
      isTrigger: false,
    },
    {
      name: "Telegram",
      description: "Fast and secure messaging app",
      category: "Communication",
      icon: "T",
      color: "bg-cyan-500",
      isPopular: true,
      isTrigger: true,
    },
  ];

  const categories = [
    { name: "All Categories", count: 1054, active: true },
    { name: "AI", count: 45, active: false },
    { name: "Communication", count: 89, active: false },
    { name: "Data & Storage", count: 156, active: false },
    { name: "Marketing", count: 78, active: false },
    { name: "Sales", count: 67, active: false },
    { name: "Productivity", count: 134, active: false },
    { name: "Development", count: 92, active: false },
    { name: "Finance", count: 43, active: false },
  ];

  const allIntegrations = [
    { name: "Airtable", category: "Data & Storage", icon: "AT", color: "bg-yellow-500", isTrigger: true },
    { name: "Discord", category: "Communication", icon: "D", color: "bg-indigo-600", isTrigger: false },
    { name: "GitHub", category: "Development", icon: "GH", color: "bg-gray-800", isTrigger: true },
    { name: "Notion", category: "Productivity", icon: "N", color: "bg-gray-700", isTrigger: true },
    { name: "Trello", category: "Productivity", icon: "TR", color: "bg-blue-400", isTrigger: false },
    { name: "Stripe", category: "Finance", icon: "ST", color: "bg-purple-600", isTrigger: true },
    { name: "Twilio", category: "Communication", icon: "TW", color: "bg-red-600", isTrigger: false },
    { name: "AWS S3", category: "Data & Storage", icon: "S3", color: "bg-orange-600", isTrigger: false },
    { name: "MongoDB", category: "Data & Storage", icon: "MG", color: "bg-green-600", isTrigger: false },
    { name: "Jira", category: "Development", icon: "JR", color: "bg-blue-700", isTrigger: true },
    { name: "ClickUp", category: "Productivity", icon: "CU", color: "bg-pink-500", isTrigger: false },
    { name: "Zapier", category: "Productivity", icon: "ZP", color: "bg-orange-400", isTrigger: false },
  ];

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
                App & Data Integrations
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Connect 1000+ apps and data sources to Adora AI. Seamlessly move and transform 
                data between different applications with our powerful integration platform.
              </p>
            </div>
            
            <div className="flex items-center gap-4 flex-shrink-0 ml-6">
              {/* Search and Filter */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    className="w-full sm:w-80 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <option>Sort by Popularity</option>
                  <option>Sort by Name</option>
                  <option>Sort by Category</option>
                </select>
              </div>
              
              {/* Ask Adora Voice Button */}
              <div className="relative group">
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
                
                {/* Integrations-specific Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="font-semibold text-purple-300 mb-2">🔗 Ask Adora for Integration Help</div>
                  <div className="space-y-2 text-xs">
                    <div><strong>Connect:</strong> "Set up Slack integration" or "Connect my CRM system"</div>
                    <div><strong>Configure:</strong> "Map data fields" or "Set up webhooks"</div>
                    <div><strong>Troubleshoot:</strong> "Fix sync issues" or "Debug API connection"</div>
                    <div><strong>Recommend:</strong> "Best integrations for sales" or "Popular workflow apps"</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                    AI-powered integration assistant
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        INTEGRATION STATS - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/20 mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Integrations</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">1,054</span>
            <span className="text-xs text-green-600 dark:text-green-400">+12 this month</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl dark:bg-green-900/20 mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Connected Apps</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">47</span>
            <span className="text-xs text-blue-600 dark:text-blue-400">In your workspace</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl dark:bg-purple-900/20 mb-4">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Trigger Nodes</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">234</span>
            <span className="text-xs text-purple-600 dark:text-purple-400">Event-driven</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl dark:bg-orange-900/20 mb-4">
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Categories</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">15</span>
            <span className="text-xs text-orange-600 dark:text-orange-400">All covered</span>
          </div>
        </div>
      </section>

      {/* 
        FEATURED INTEGRATIONS SECTION - Full width showcase
        - Highlights the most popular and important integrations
      */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Featured Integrations
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Most popular with Adora AI users
          </span>
        </div>

        {/* 
          FEATURED GRID - CSS Grid Layout (2D)
          - Mobile: 1 column
          - Tablet: 2 columns
          - Desktop: 4 columns
        */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {featuredIntegrations.map((integration, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
            >
              {/* Popular Badge */}
              {integration.isPopular && (
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  Popular
                </div>
              )}

              {/* Integration Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {integration.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {integration.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {integration.category}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {integration.description}
              </p>

              {/* Features */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {integration.isTrigger && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-400">
                      Trigger
                    </span>
                  )}
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full dark:bg-gray-800 dark:text-gray-300">
                    Action
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  Connect →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        MAIN INTEGRATIONS SECTION - Two column layout
        - Left: Categories filter
        - Right: Integration grid
      */}
      <section className="w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 
            CATEGORIES SIDEBAR - FLEXBOX (1D) Layout
            - Column direction for category stacking
            - Sticky positioning for better UX
          */}
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      category.active
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Filter Options */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
                  Filter by Type
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Regular Nodes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Trigger Nodes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Core Nodes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 
            INTEGRATIONS GRID - CSS Grid Layout (2D)
            - Mobile: 1 column
            - Tablet: 2 columns
            - Desktop: 3 columns
          */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                All Integrations
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing 1-20 of 1,054 integrations
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
              {allIntegrations.map((integration, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                      {integration.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {integration.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {integration.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {integration.isTrigger && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900/30 dark:text-green-400">
                          Trigger
                        </span>
                      )}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-8">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                Load More Integrations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        POPULAR COMBINATIONS SECTION - Showcase trending integrations
      */}
      <section className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Popular Integration Combinations
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              View All →
            </button>
          </div>

          {/* 
            COMBINATIONS GRID - CSS Grid Layout (2D)
            - Mobile: 1 column
            - Tablet: 2 columns
            - Desktop: 3 columns
          */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {[
              { from: "Gmail", to: "Slack", description: "Forward important emails to team channels" },
              { from: "Google Sheets", to: "Salesforce", description: "Sync spreadsheet data with CRM records" },
              { from: "HubSpot", to: "OpenAI", description: "Generate personalized content for leads" },
              { from: "Stripe", to: "Google Sheets", description: "Track payments and revenue in spreadsheets" },
              { from: "Telegram", to: "Notion", description: "Save important messages to your workspace" },
              { from: "GitHub", to: "Slack", description: "Notify team about code changes and releases" },
            ].map((combo, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    {combo.from.charAt(0)}
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    {combo.to.charAt(0)}
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {combo.from} → {combo.to}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {combo.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 