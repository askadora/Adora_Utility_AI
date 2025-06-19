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
              Adora's journey began over a decade ago with a simple mission: to use technology to make a positive impact. What started as the Adora Charity App in 2014-2015 has evolved into today's cutting-edge AI platform, representing years of innovation, learning, and dedication to transforming how businesses interact with artificial intelligence.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From our humble beginnings helping charities connect with donors to becoming a leader in AI innovation, our core values have remained constant: accessibility, intuition, and genuine benefit for everyone we serve.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Our Journey</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2014-2015</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Launched the Adora Charity App - our first venture into technology for social good
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Focused on connecting charities with donors through innovative mobile technology
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Established core values of accessibility and positive impact
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2016-2020</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Evolved beyond charity apps to explore broader technology solutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Built expertise in mobile development, user experience, and scalable systems
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Laid the foundation for future AI innovations
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2021</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Spring: First exploration of AI technology at ASU Hackathon in Phoenix, AZ
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Experimented with GPT-2 and early machine learning models
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Summer: Began using AI for Social Media Avatar Correlation & launched Adora Venture Studio
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2022</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Intensive internal AI development and system architecture design
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Built foundational AI infrastructure and workflows
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2023</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Officially launched Adora AI under Adora Venture Studio
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Nearly launched Agentic AI System - almost 2 years before the market was ready
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    AI performance wasn't quite ready yet, so we continued development and optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Began developing first commercial AI use cases and applications
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2024</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Recognized the need to build a more well-rounded OS for all things AI to communicate and interface around
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Advanced system optimization and plug-and-play AI capabilities
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2025</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Expanded team and refined our AI platform architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Final testing, integrations, and platform launch scheduled for September 22nd
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Ready to revolutionize how businesses harness AI technology
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