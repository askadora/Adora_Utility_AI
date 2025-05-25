'use client';

import React, { useState } from 'react';
import { ShieldIcon, KeyIcon, CreditCardIcon, UserIcon } from '@/icons';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">General Settings</h1>
        
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
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-blue-600">
                  <span className="sr-only">Enable email notifications</span>
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">Receive push notifications</p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200">
                  <span className="sr-only">Enable push notifications</span>
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Timezone</h3>
            <div>
              <select className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
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
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Language</h3>
            <div>
              <select className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 