"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";

export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
      {/* 
        CSS GRID LAYOUT (2D) for metric cards:
        - Mobile: 1 column (stacked)
        - Small screens: 2 columns 
        - Extra large: 4 columns for optimal desktop experience
        - Using gap instead of margin for cleaner spacing
      */}
      
      {/* CUSTOMERS METRIC CARD */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
        {/* 
          FLEXBOX (1D) - Column direction for vertical stacking
          - Icon at top, content below with proper spacing
        */}
        
        {/* Icon Container - Flexbox for centering */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-5">
          {/* Flexbox centers the icon both horizontally and vertically */}
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        {/* 
          FLEXBOX (1D) - Column direction for proper content stacking
          - Label and value stacked vertically
          - Badge positioned below with proper spacing
          - This prevents horizontal overflow issues
        */}
        <div className="flex flex-col flex-1 gap-3">
          {/* 
            FLEXBOX (1D) - Column direction for metric text stacking
            - Label above, value below with consistent spacing
          */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          
          {/* Badge positioned below metric with proper spacing */}
          <div className="flex justify-start">
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>
      </div>

      {/* ORDERS METRIC CARD */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
        {/* Icon Container - Flexbox for centering */}
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-5">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        
        {/* Content Column - Flexbox for vertical stacking */}
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <div className="flex justify-start">
            <Badge color="error">
              <ArrowDownIcon className="text-error-500" />
              9.05%
            </Badge>
          </div>
        </div>
      </div>

      {/* REVENUE METRIC CARD */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-5">
          <svg className="text-gray-800 size-6 dark:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Revenue
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              $89,432
            </h4>
          </div>

          <div className="flex justify-start">
            <Badge color="success">
              <ArrowUpIcon />
              23.5%
            </Badge>
          </div>
        </div>
      </div>

      {/* CONVERSION RATE METRIC CARD */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 mb-5">
          <svg className="text-gray-800 size-6 dark:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Conversion Rate
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              4.2%
            </h4>
          </div>

          <div className="flex justify-start">
            <Badge color="warning">
              <ArrowDownIcon />
              1.2%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
