'use client';

import React from 'react';

export default function StoryAccordion() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Learn about our journey and mission</p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Adora AI was born from a vision to revolutionize how businesses interact with artificial intelligence. Our journey began with a simple yet powerful idea: to make AI accessible, intuitive, and truly beneficial for everyone.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Today, we're proud to be at the forefront of AI innovation, helping businesses across industries harness the power of artificial intelligence to drive growth, efficiency, and success.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Our Journey</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2021</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Spring: Started playing with AI (GPT-2) at a Hackathon at ASU in Phoenix AZ
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Spring: Our first attempt to load ML data into an AI model
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Summer: Started using AI for Social Media Avatar Correlation & Adora Venture Studio
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2022</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Using AI internally, developing system architecture
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2023</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Started Adora AI under Adora Venture Studio, began first use case development
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2024</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Working on system optimization and plug-n-play capabilities
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2025</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Final Testing, Integrations, and Launch on September 22nd
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 