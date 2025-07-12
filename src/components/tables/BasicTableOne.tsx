"use client";

import React from "react";
import Image from "next/image";

const BasicTableOne = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* 
        TABLE HEADER - Enhanced mobile styling
        - Better spacing and typography for mobile
        - Responsive padding
      */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Track your recent orders and their status
        </p>
      </div>

      {/* 
        TABLE CONTAINER - Mobile optimized
        - Horizontal scroll for mobile
        - Better touch targets
        - Responsive design
      */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              {/* 
                TABLE HEADERS - Enhanced mobile styling
                - Better padding for touch targets
                - Improved typography
              */}
              <th className="text-left py-3 px-3 sm:px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Customer
              </th>
              <th className="text-left py-3 px-3 sm:px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Product
              </th>
              <th className="text-left py-3 px-3 sm:px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Amount
              </th>
              <th className="text-left py-3 px-3 sm:px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="text-left py-3 px-3 sm:px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Date
              </th>
              <th className="text-left py-3 px-3 sm:px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 
              TABLE ROWS - Enhanced mobile styling
              - Better touch targets for interactive elements
              - Improved spacing and typography
            */}
            <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/images/user/user-01.jpg"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      John Doe
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      john@example.com
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm text-gray-800 dark:text-white/90">
                  Premium Plan
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  $299.00
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400">
                  Completed
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dec 15, 2023
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    style={{ 
                      minWidth: '44px',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    style={{ 
                      minWidth: '44px',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/images/user/user-02.jpg"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      Jane Smith
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      jane@example.com
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm text-gray-800 dark:text-white/90">
                  Basic Plan
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  $99.00
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                  Pending
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dec 14, 2023
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    style={{ 
                      minWidth: '44px',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    style={{ 
                      minWidth: '44px',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/images/user/user-03.jpg"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                      Mike Johnson
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      mike@example.com
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm text-gray-800 dark:text-white/90">
                  Pro Plan
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  $199.00
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400">
                  Failed
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dec 13, 2023
                </span>
              </td>
              <td className="py-3 px-3 sm:px-4">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    style={{ 
                      minWidth: '44px',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    style={{ 
                      minWidth: '44px',
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 
        TABLE FOOTER - Mobile optimized
        - Better spacing and responsive design
        - Enhanced touch targets for pagination
      */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing 1 to 3 of 3 results
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              disabled
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              Previous
            </button>
            <button
              className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              disabled
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicTableOne;
