'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const WhatBringsYouPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const options = [
    {
      id: 'exploring',
      text: "I'm exploring AI for my company or team",
      description: 'Looking to understand how AI can benefit your organization',
      nextStep: 'focus-area'
    },
    {
      id: 'curious',
      text: "I'm curious how Adora AI works",
      description: 'Want to see the platform capabilities and features',
      nextStep: 'focus-area'
    },
    {
      id: 'evaluating',
      text: "I'm evaluating tools for a specific use case",
      description: 'Have a particular business need or challenge to solve',
      nextStep: 'focus-area'
    },
    {
      id: 'partner',
      text: "I'm a partner, investor, or early supporter",
      description: 'Interested in business aspects, partnerships, or investment',
      nextStep: 'investor-focus'
    }
  ];

  const stats = [
    { label: 'Most Selected', value: 'Exploring AI (42%)', color: 'text-blue-600' },
    { label: 'Avg Selection Time', value: '8 seconds', color: 'text-green-600' },
    { label: 'Skip Rate', value: '3.2%', color: 'text-purple-600' },
    { label: 'Next Step Rate', value: '94.8%', color: 'text-orange-600' }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    const selected = options.find(opt => opt.id === selectedOption);
    if (selected) {
      // In a real implementation, this would navigate to the next step
      console.log(`Navigate to: ${selected.nextStep}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              
              <span className="text-xs text-gray-500 dark:text-gray-400">Step 1 of 4</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            What Brings You Here?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Configure the first question in your demo journey flow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Preview Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <div className="max-w-lg mx-auto">
                {/* Question */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    What brings you here?
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {options.map((option) => (
                    <label 
                      key={option.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedOption === option.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                      }`}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === option.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedOption === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-900 dark:text-white">
                          {option.text}
                        </div>
                        {isPreviewMode && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedOption
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    }`}
                  >
                    Continue
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Configuration */}
            {!isPreviewMode && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Question Configuration
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question Text
                    </label>
                    <input
                      type="text"
                      defaultValue="What brings you here?"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Required Field
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        User must select an option to continue
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Show Descriptions
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isPreviewMode}
                        onChange={(e) => setIsPreviewMode(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Display option descriptions to users
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    Reset
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Performance Stats
              </h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                    <span className={`text-sm font-medium ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Option Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Option Analytics
              </h3>
              <div className="space-y-3">
                {options.map((option, index) => {
                  const percentages = [42, 28, 22, 8]; // Mock data
                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400 truncate">
                          {option.text.length > 20 ? `${option.text.substring(0, 20)}...` : option.text}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {percentages[index]}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentages[index]}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Next Steps
              </h3>
              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatBringsYouPage; 