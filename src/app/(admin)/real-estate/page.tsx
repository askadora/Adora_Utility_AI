"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";

// Mock data for property listings
const propertyListings = [
  { 
    id: 1, 
    address: "123 Oak Street, Beverly Hills", 
    type: "Single Family", 
    price: "$2,450,000", 
    beds: 4, 
    baths: 3, 
    sqft: "3,200", 
    status: "Active",
    daysOnMarket: 12,
    photos: 15
  },
  { 
    id: 2, 
    address: "456 Pine Avenue, Santa Monica", 
    type: "Condo", 
    price: "$1,200,000", 
    beds: 2, 
    baths: 2, 
    sqft: "1,800", 
    status: "Pending",
    daysOnMarket: 8,
    photos: 22
  },
];

// Recent activity data
const recentActivity = [
  { type: "New Listing", property: "123 Oak Street", client: "Johnson Family", time: "2 hours ago" },
  { type: "Price Reduction", property: "456 Pine Avenue", client: "Investment Group", time: "1 day ago" },
];

// Client leads data
const clientLeads = [
  { name: "Sarah Chen", type: "Buyer", budget: "$800K - $1.2M", status: "Hot", lastContact: "Today", interest: "Modern Condos" },
  { name: "Mike Rodriguez", type: "Seller", property: "Downtown Loft", status: "Warm", lastContact: "2 days ago", interest: "Quick Sale" },
];

// Market insights data
const marketInsights = [
  { metric: "Avg. Days on Market", value: "28 days", trend: "-3 days", change: "down" },
  { metric: "Price per Sq Ft", value: "$625", trend: "+$15", change: "up" },
  { metric: "Inventory Level", value: "2.1 months", trend: "-0.3", change: "down" },
  { metric: "Buyer Demand", value: "High", trend: "+12%", change: "up" },
];

type RealEstateTab = 'property-valuation' | 'smart-search' | 'marketing-generator';

export default function RealEstateDashboard() {
  const [activeTab, setActiveTab] = useState<RealEstateTab>('property-valuation');

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Real Estate Management Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Comprehensive real estate platform with AI-powered property valuation, market analysis, 
          and automated client relationship management.
        </p>
      </header>

      {/* KPI Metrics Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Active Listings" 
          value="23" 
          trend="+5" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V7l8-4v4l8-4v18M9 9v4m0 0v4m0-4h4m-4 0V9" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Monthly Revenue" 
          value="$145K" 
          trend="+18%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Pending Sales" 
          value="8" 
          trend="+3" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Client Satisfaction" 
          value="4.9/5" 
          trend="+0.1" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
      </section>

      {/* AI-Powered Tools with Tabs */}
      <ComponentCard title="AI-Powered Real Estate Tools" desc="Advanced property analysis and automated marketing solutions">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'property-valuation', label: 'Property Valuation', icon: '🏡' },
              { id: 'smart-search', label: 'Smart Property Search', icon: '🔍' },
              { id: 'marketing-generator', label: 'Marketing Generator', icon: '📱' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as RealEstateTab)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
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
        {activeTab === 'property-valuation' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H9.5l-1 1H5a2 2 0 01-2-2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Property Valuation</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Get accurate property valuations using advanced AI algorithms that analyze market trends, comparable sales, and property features.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Property Address:</h4>
                <input
                  type="text"
                  placeholder="Enter property address..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Property Details:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Bedrooms"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Bathrooms"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Square Feet"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    placeholder="Year Built"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Valuation Factors:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recent comparable sales</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Market trends analysis</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Neighborhood features</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Property improvements</span>
                  </label>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-medium text-green-900 dark:text-green-400 mb-2">Valuation Range</h5>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">$425,000 - $475,000</div>
                  <p className="text-sm text-green-700 dark:text-green-300">Based on current market data</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Get Valuation
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        )}

        {activeTab === 'smart-search' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Smart Property Search</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">AI-powered property matching that learns from client preferences and market data to find the perfect properties.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Search Criteria:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Price Range"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Property Type</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Beds</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                  <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Baths</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Sq Ft"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Client Preferences:</h4>
                <textarea
                  placeholder="Describe client preferences, lifestyle needs, specific requirements..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Smart Filters:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Near good schools</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Close to public transportation</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Low crime neighborhood</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recently updated homes</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Investment potential</span>
                  </label>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h5 className="font-medium text-blue-900 dark:text-blue-400 mb-2">AI Recommendations</h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Based on similar client profiles:</p>
                  <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Consider expanding budget by 5-10%</li>
                    <li>• Include condos in downtown area</li>
                    <li>• Properties near Metro stations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Search Properties
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Save Search
              </button>
            </div>
          </div>
        )}

        {activeTab === 'marketing-generator' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Marketing Generator</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create compelling property listings, social media content, and marketing materials with AI-powered content generation.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Content Type:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Select content type...</option>
                  <option value="listing">Property Listing Description</option>
                  <option value="social">Social Media Post</option>
                  <option value="flyer">Property Flyer</option>
                  <option value="email">Email Campaign</option>
                  <option value="brochure">Property Brochure</option>
                </select>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Property Information:</h4>
                <input
                  type="text"
                  placeholder="Property address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Price"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Beds/Baths"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Sq Ft"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <textarea
                  placeholder="Key features, recent updates, unique selling points..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Tone & Style:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Professional</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Luxury/Upscale</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Family-Friendly</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="tone" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Modern/Trendy</span>
                  </label>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Target Audience:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">First-time buyers</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Young families</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Empty nesters</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Investors</span>
                  </label>
                </div>
                
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h5 className="font-medium text-purple-900 dark:text-purple-400 mb-2">Content Preview</h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">AI will generate compelling copy highlighting the property's best features and appeal to your target audience.</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Generate Content
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Save Template
              </button>
            </div>
          </div>
        )}
      </ComponentCard>

      {/* Property Listings and Activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:gap-8">
        {/* Active Property Listings */}
        <ComponentCard title="Active Property Listings" desc="Manage your current property portfolio and listings">
          <div className="space-y-4">
            {propertyListings.map((property) => (
              <div key={property.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{property.address}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{property.type}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    property.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    property.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {property.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{property.price}</span>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{property.beds} bed</span>
                    <span>{property.baths} bath</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{property.daysOnMarket} days on market</span>
                  <span>{property.photos} photos</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View All Listings →
            </button>
          </div>
        </ComponentCard>

        {/* Recent Activity */}
        <ComponentCard title="Recent Activity" desc="Track latest updates and client interactions">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'New Listing' ? 'bg-green-500' :
                  activity.type === 'Offer Received' ? 'bg-blue-500' :
                  activity.type === 'Price Reduction' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{activity.type}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.property}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.client}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View Activity Log →
            </button>
          </div>
        </ComponentCard>
      </section>

      {/* Market Insights */}
      <ComponentCard title="Market Insights" desc="Local market trends and analysis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {marketInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{insight.metric}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{insight.value}</span>
                <span className={`text-sm font-medium ${
                  insight.change === 'up' ? 'text-green-600 dark:text-green-400' :
                  insight.change === 'down' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {insight.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View Full Market Report →
          </button>
        </div>
      </ComponentCard>
    </div>
  );
} 