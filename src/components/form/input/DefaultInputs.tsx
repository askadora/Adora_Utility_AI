"use client";

import React from "react";

const DefaultInputs = () => {
  return (
    <div className="space-y-6">
      {/* 
        FORM SECTION - Responsive layout for mobile and desktop
        - Mobile: Single column with full-width inputs
        - Desktop: Two columns for better space utilization
      */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 
          INPUT GROUP 1 - Enhanced mobile styling
          - Larger touch targets for mobile
          - Better spacing and typography
        */}
        <div className="space-y-4">
          <div>
            <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
              style={{ 
                minHeight: '44px', // Minimum touch target
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>

          <div>
            <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>

          <div>
            <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>
        </div>

        {/* 
          INPUT GROUP 2 - Enhanced mobile styling
          - Consistent touch targets
          - Better mobile spacing
        */}
        <div className="space-y-4">
          <div>
            <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>

          <div>
            <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Company
            </label>
            <input
              type="text"
              placeholder="Enter your company name"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>

          <div>
            <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Enter your job title"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
              style={{ 
                minHeight: '44px',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>
        </div>
      </div>

      {/* 
        FULL WIDTH INPUTS - Mobile optimized
        - Single column layout for better mobile experience
        - Enhanced touch targets
      */}
      <div className="space-y-4">
        <div>
          <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter your full address"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
            style={{ 
              minHeight: '44px',
              WebkitTapHighlightColor: 'transparent'
            }}
          />
        </div>

        <div>
          <label className="mb-2.5 block text-sm font-medium text-gray-800 dark:text-white/90">
            Bio
          </label>
          <textarea
            placeholder="Tell us about yourself"
            rows={4}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors resize-none"
            style={{ 
              minHeight: '120px',
              WebkitTapHighlightColor: 'transparent'
            }}
          />
        </div>
      </div>

      {/* 
        SUBMIT BUTTON - Mobile optimized
        - Full width on mobile for better touch target
        - Enhanced styling for mobile interaction
      */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500/20 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors"
          style={{ 
            minHeight: '44px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          style={{ 
            minHeight: '44px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DefaultInputs; 