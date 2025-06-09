'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useSearchParams } from 'next/navigation';

type SettingsTab = 'general' | 'company' | 'ai-models' | 'usage-billing' | 'security' | 'integrations' | 'team';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  // Handle URL parameters for direct tab navigation
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['general', 'company', 'ai-models', 'usage-billing', 'security', 'integrations', 'team'].includes(tabParam)) {
      setActiveTab(tabParam as SettingsTab);
    }
  }, [searchParams]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [cuAccordionOpen, setCuAccordionOpen] = useState(false);

  // Handle plan upgrades
  const handleUpgrade = async (targetTier: string) => {
    try {
      // In real implementation, this would call the API
      console.log(`Upgrading to ${targetTier} tier`);
      
      // Mock API call
      const response = await fetch('/api/billing/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetTier })
      });

      if (response.ok) {
        // Refresh billing data and show success message
        alert(`Successfully upgraded to ${targetTier.toUpperCase()} plan!`);
        // In real app: refetch user data, update UI state
      } else {
        alert('Upgrade failed. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Handle add-on purchases
  const handlePurchaseAddon = async (addonId: string) => {
    try {
      console.log(`Purchasing addon: ${addonId}`);
      
      // Mock API call
      const response = await fetch('/api/billing/purchaseAddon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: addonId })
      });

      if (response.ok) {
        // Animate quota increase and show success
        alert(`Successfully purchased ${addonId} add-on!`);
        // In real app: refetch quota, animate new numbers
      } else {
        alert('Purchase failed. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Handle switching to Play mode
  const handleSwitchToPlay = () => {
    // In real implementation, this would switch the user to Play mode
    console.log('Switching to Play mode');
    alert('Switching to your personal Play workspace!');
    // Could redirect to Play dashboard or toggle the navbar mode
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'company', label: 'Company Access', icon: '🏢' },
    { id: 'ai-models', label: 'AI & Models', icon: '🤖' },
    { id: 'usage-billing', label: 'Usage & Billing', icon: '🔋' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'integrations', label: 'Integrations', icon: '🔌' },
    { id: 'team', label: 'Team', icon: '👥' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-8">
            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Notifications</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Receive email updates</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className="sr-only">Enable email notifications</span>
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        emailNotifications ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                    <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Receive push notifications</p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className="sr-only">Enable push notifications</span>
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        pushNotifications ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Timezone */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Timezone</h3>
              <div>
                <select className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="MST">MST (Mountain Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="IST">IST (Indian Standard Time)</option>
                  <option value="JST">JST (Japan Standard Time)</option>
                  <option value="AEST">AEST (Australian Eastern Standard Time)</option>
                </select>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-2">Select your local timezone for accurate time display</p>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Toggle dark mode appearance</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Language</h3>
              <div>
                <select className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-8">
            {/* Company Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Company Access Management</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Manage which companies you have access to and your role within each organization.</p>
              
              {/* Current Companies */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Your Companies</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Adora AI', role: 'Admin', color: '#6366F1' },
                    { name: 'Law Firm Demo', role: 'Manager', color: '#1F2937' },
                    { name: 'Financial Firm Demo', role: 'Admin', color: '#059669' },
                  ].map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: company.color }}
                        >
                          {company.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{company.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{company.role}</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Access */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Request Company Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Need access to a new company? Request access from an administrator.</p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Request Access
                </button>
              </div>
            </div>
          </div>
        );

      case 'ai-models':
        return (
          <div className="space-y-8">
            {/* AI Model Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">AI Model Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Default AI Model</label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="gpt-4">GPT-4 (Recommended)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="claude-3">Claude 3</option>
                    <option value="gemini-pro">Gemini Pro</option>
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Choose your preferred AI model for conversations</p>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Response Style</label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="balanced">Balanced</option>
                    <option value="creative">Creative</option>
                    <option value="precise">Precise</option>
                    <option value="concise">Concise</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Stream Responses</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Show AI responses as they're generated</p>
                  </div>
                  <button className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors bg-indigo-600">
                    <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'usage-billing':
        return (
          <div className="space-y-8">
            {/* Plan Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Usage & Billing</h3>
              
              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
                {/* PLAY Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-green-200 dark:border-green-800 shadow-sm relative">
                  {/* Included with Pro & Org Pill */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Included with PRO & ORG
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">PLAY</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$20</span>
                      <span className="text-gray-500 dark:text-gray-400">/mo</span>
                    </div>
                    <div className="space-y-1 mb-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">1,200 CU</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">≈1.7¢/CU</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      Personal AI workspace included with PRO & ORG plans
                    </div>
                    <button 
                      onClick={() => handleSwitchToPlay()}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Switch to Play
                    </button>
                  </div>
                </div>

                {/* PRO Plan - Current Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-indigo-500 shadow-sm relative">
                  {/* Current Plan Pill */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Included in your subscription
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">PRO</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$200</span>
                      <span className="text-gray-500 dark:text-gray-400">/seat/mo</span>
                    </div>
                    <div className="space-y-1 mb-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">15,000 CU</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">≈1.3¢/CU</p>
                    </div>
                    
                    {/* Usage Progress Ring */}
                    <div className="flex justify-center mb-4">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                          {/* Background Circle */}
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          {/* Progress Circle */}
                          <circle
                            cx="16"
                            cy="16"
                            r="12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="text-red-500"
                            strokeDasharray={`${2 * Math.PI * 12}`}
                            strokeDashoffset={`${2 * Math.PI * 12 * (1 - 0.93)}`}
                            style={{ 
                              transition: 'stroke-dashoffset 0.3s ease-out',
                            }}
                          />
                        </svg>
                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-900 dark:text-white">
                            93%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      13,950 / 15,000 CU used
                    </div>
                    
                    <button 
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                    >
                      Current Plan
                    </button>
                  </div>
                </div>

                {/* ORG Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative">
                  {/* Need 30+ Users Pill */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-purple-800 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      Need 30+ Users?
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">ORG</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">$6,000</span>
                      <span className="text-gray-500 dark:text-gray-400">/mo</span>
                    </div>
                    <div className="space-y-1 mb-6">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">500,000 CU</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">≈1.2¢/CU</p>
                    </div>
                    <button 
                      onClick={() => handleUpgrade('org')}
                      className="w-full px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
                              </div>

              {/* CU Explanation Accordion */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={() => setCuAccordionOpen(!cuAccordionOpen)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">?</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      What is a Capacity Unit (CU)?
                    </h4>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      cuAccordionOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {cuAccordionOpen && (
                  <div className="mt-6 space-y-6 text-sm text-gray-600 dark:text-gray-300">
                    {/* Section 1 */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        1. What's a token, anyway?
                      </h5>
                      <p>
                        Most AI providers meter usage in tokens—tiny chunks of text (≈ ¾ of a word). Each model charges a different price per million tokens, so keeping track across dozens of models gets messy fast.
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        2. Why we invented the CU.
                      </h5>
                      <p className="mb-3">
                        Adora AI taps multiple models (OpenAI, Gemini, Claude, Grok, …) whose token prices range from pennies to dollars. Instead of making you juggle that variability, we convert everything into a single, predictable unit:
                      </p>
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 text-center">
                        <span className="font-bold text-indigo-900 dark:text-indigo-300">
                          1 CU = the cost of processing about 1,000 average-length words.
                        </span>
                      </div>
                      <p className="mt-3">
                        Think of it as putting fuel from every supplier into one universal gallon. Your plan's "fuel tank" is expressed in CUs, and the on-screen meter simply shows how full that tank is—no token math required.
                      </p>
                    </div>

                    {/* Section 3 - Usage Meter Guide */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        3. What you'll see on your dashboard.
                      </h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Meter</th>
                              <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Tells you</th>
                              <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">What to do</th>
                            </tr>
                          </thead>
                          <tbody className="space-y-2">
                            <tr>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  Green (&lt;70%)
                                </span>
                              </td>
                              <td className="py-2 px-3">Plenty of CUs left this month.</td>
                              <td className="py-2 px-3">Create freely.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                  Amber (70-90%)
                                </span>
                              </td>
                              <td className="py-2 px-3">You're on track to use most of your allowance.</td>
                              <td className="py-2 px-3">Consider lighter summaries or a pack purchase.</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  Red (&gt;90%)
                                </span>
                              </td>
                              <td className="py-2 px-3">Fuel's almost gone.</td>
                              <td className="py-2 px-3">Top up with an add-on pack or upgrade your plan.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Section 4 - Enterprise Features */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        4. Need fine-grained control?
                      </h5>
                      <p className="mb-3">Enterprise clients can unlock <strong>Transparent Mode</strong>:</p>
                      <ul className="space-y-1 mb-3 pl-4">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Full price sheet for every model in our catalog.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Workflow-level model routing (e.g., "use Gemini Flash for drafts, Claude 4 for contracts").</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Real-time cost simulator before you run a job.</span>
                        </li>
                      </ul>
                      <div className="bg-white dark:bg-gray-900 border border-purple-300 dark:border-purple-700 rounded-lg p-3">
                        <p className="font-medium text-purple-900 dark:text-purple-300">
                          Fee: $12,000 per year, billed up-front
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          (covers admin tooling and dedicated support)
                        </p>
                      </div>
                      <p className="text-xs mt-3">
                        This gives your FinOps or data teams granular levers while individual users keep the same clean CU experience.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add-On Shelf */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add-On Capacity</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Need more capacity? Purchase additional Capacity Units for your current plan.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Fun Pack - Available for Play & Pro */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900 dark:text-white">Fun Pack</h5>
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">+600 CU</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">$15</p>
                    </div>
                    <button 
                      onClick={() => handlePurchaseAddon('fun-pack')}
                      className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Buy Add-On
                    </button>
                  </div>

                  {/* Pro Boost - Available for Pro only */}
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-50 dark:from-indigo-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900 dark:text-white">Pro Boost</h5>
                      <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">+6,000 CU</p>
                      <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">$75</p>
                    </div>
                    <button 
                      onClick={() => handlePurchaseAddon('pro-boost')}
                      className="w-full px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Buy Add-On
                    </button>
                  </div>

                  {/* Enterprise Block - Not available for current Pro plan */}
                  <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200 dark:border-purple-800/50 opacity-60">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-purple-400 dark:text-purple-500">Enterprise Block</h5>
                      <span className="text-xs bg-purple-200 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-full">
                        ORG Only
                      </span>
                    </div>
                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-semibold text-purple-400 dark:text-purple-500">+100,000 CU</p>
                      <p className="text-lg font-bold text-purple-400 dark:text-purple-500">$1,000</p>
                    </div>
                    <button 
                      disabled
                      className="w-full px-3 py-2 bg-purple-200 text-purple-500 text-sm rounded-lg cursor-not-allowed dark:bg-purple-900/20 dark:text-purple-400"
                    >
                      Requires ORG
                    </button>
                  </div>
                </div>
              </div>

              {/* Plan Management */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Management</h4>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => window.open('#', '_blank')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Billing History
                  </button>
                  <button 
                    onClick={() => window.open('#', '_blank')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Download Invoice
                  </button>
                  <button 
                    onClick={() => window.open('#', '_blank')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Update Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      twoFactor ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        twoFactor ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">Session Timeout</label>
                  <select 
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="never">Never</option>
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Automatically log out after inactivity</p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Actions</h4>
                  <div className="space-y-3">
                    <button className="block w-full text-left px-4 py-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      Change Password
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                      Download Data Export
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-8">
            {/* Integrations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Integrations</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Connect Adora AI with your favorite tools and services to streamline your workflows.</p>
              
              <div className="space-y-6">
                {[
                  // Communication & Collaboration
                  { name: 'Slack', description: 'Send AI responses to Slack channels', connected: true, icon: '💬', category: 'Communication' },
                  { name: 'Microsoft Teams', description: 'Collaborate with AI in Teams channels', connected: false, icon: '👥', category: 'Communication' },
                  { name: 'Discord', description: 'Create AI bots for Discord servers', connected: false, icon: '🎮', category: 'Communication' },
                  { name: 'Telegram', description: 'Build AI chatbots for Telegram', connected: true, icon: '📱', category: 'Communication' },
                  
                  // Productivity & Storage
                  { name: 'Google Drive', description: 'Access and analyze documents', connected: false, icon: '📁', category: 'Productivity' },
                  { name: 'Microsoft 365', description: 'Integrate with Office apps', connected: true, icon: '📊', category: 'Productivity' },
                  { name: 'Notion', description: 'Sync AI insights with Notion pages', connected: false, icon: '📝', category: 'Productivity' },
                  { name: 'Google Sheets', description: 'Automate spreadsheet workflows', connected: false, icon: '📋', category: 'Productivity' },
                  { name: 'Airtable', description: 'Connect to your Airtable databases', connected: false, icon: '🗂️', category: 'Productivity' },
                  { name: 'Trello', description: 'Automate project management tasks', connected: false, icon: '📌', category: 'Productivity' },
                  
                  // Email & Marketing
                  { name: 'Gmail', description: 'AI-powered email management', connected: true, icon: '📧', category: 'Email' },
                  { name: 'Outlook', description: 'Microsoft email integration', connected: false, icon: '📮', category: 'Email' },
                  { name: 'Mailchimp', description: 'Automate email marketing campaigns', connected: false, icon: '🐒', category: 'Marketing' },
                  { name: 'HubSpot', description: 'CRM and marketing automation', connected: false, icon: '🎯', category: 'Marketing' },
                  
                  // Development & Business
                  { name: 'GitHub', description: 'Code analysis and review', connected: false, icon: '💻', category: 'Development' },
                  { name: 'Jira', description: 'Project tracking and issue management', connected: false, icon: '🎫', category: 'Development' },
                  { name: 'Salesforce', description: 'CRM data enrichment', connected: false, icon: '☁️', category: 'Sales' },
                  { name: 'Pipedrive', description: 'Sales pipeline automation', connected: false, icon: '🔄', category: 'Sales' },
                  
                  // Automation & Webhooks
                  { name: 'Zapier', description: 'Connect with 5,000+ apps', connected: false, icon: '⚡', category: 'Automation' },
                  { name: 'n8n', description: 'Self-hosted workflow automation', connected: false, icon: '🔗', category: 'Automation' },
                  { name: 'Webhooks', description: 'Custom HTTP integrations', connected: false, icon: '🪝', category: 'Automation' },
                  
                  // Databases & Analytics
                  { name: 'PostgreSQL', description: 'Connect to PostgreSQL databases', connected: false, icon: '🐘', category: 'Database' },
                  { name: 'MySQL', description: 'MySQL database integration', connected: false, icon: '🗄️', category: 'Database' },
                  { name: 'MongoDB', description: 'NoSQL document database', connected: false, icon: '🍃', category: 'Database' },
                  { name: 'Google Analytics', description: 'Website analytics insights', connected: false, icon: '📈', category: 'Analytics' },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{integration.name}</h4>
                          <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                            {integration.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        integration.connected 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>

              {/* See More Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                    <span className="px-4 text-sm font-medium">Need something else?</span>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">📊</span>
                        <span>1000+ Apps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">🔄</span>
                        <span>Custom Workflows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-purple-500">🔗</span>
                        <span>API Connections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-500">⚡</span>
                        <span>Real-time Sync</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => window.open('/integrations', '_blank')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Browse All Integrations
                      </button>
                      <button 
                        onClick={() => window.open('#', '_blank')}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Request Integration
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      Can't find what you need? Our API and webhook support lets you connect to virtually any service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            {/* Team Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Team & Collaboration</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Team Members</h4>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Invite Member
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'John Doe', email: 'john@adoraai.com', role: 'Admin', avatar: 'JD' },
                    { name: 'Sarah Smith', email: 'sarah@adoraai.com', role: 'Manager', avatar: 'SS' },
                    { name: 'Mike Johnson', email: 'mike@adoraai.com', role: 'View Only User', avatar: 'MJ' },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{member.name}</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{member.role}</span>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400'
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
        {renderTabContent()}
      </div>
    </div>
  );
} 