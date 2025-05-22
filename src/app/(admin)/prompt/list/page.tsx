'use client';

import React from 'react';

export default function MyPrompts() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">My Prompts</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search prompts..."
                className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <select className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="all">All Prompts</option>
                <option value="recent">Recently Used</option>
                <option value="favorites">Favorites</option>
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              New Prompt
            </button>
          </div>

          <div className="space-y-4">
            {/* Sample prompt cards - replace with actual data */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sample Prompt {i}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">This is a sample prompt description that shows what the prompt does.</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Created 2 days ago</span>
                  <span>Used 5 times</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 