"use client";
import React from 'react';

interface KpiSummaryCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

const KpiSummaryCard: React.FC<KpiSummaryCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendDirection = 'neutral', 
  icon 
}) => {
  /* 
    TREND COLOR LOGIC
    - Dynamic color assignment based on trend direction
    - Consistent color scheme across all KPI cards
  */
  const trendColor = trendDirection === 'up' 
    ? 'text-green-600 dark:text-green-400' 
    : trendDirection === 'down' 
    ? 'text-red-600 dark:text-red-400' 
    : 'text-gray-500 dark:text-gray-400';

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
      {/* 
        CARD HEADER - FLEXBOX (1D) Layout
        - Row direction for title and icon alignment
        - Space-between pushes title left, icon right
        - Items-center aligns content vertically
      */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
        {/* Icon container with consistent sizing */}
        {icon && (
          <div className="flex items-center justify-center w-8 h-8 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
      </div>

      {/* 
        CARD CONTENT - FLEXBOX (1D) Layout
        - Column direction for value and trend stacking
        - Flex-1 takes remaining space for proper card height
      */}
      <div className="flex flex-col flex-1">
        {/* 
          VALUE DISPLAY
          - Large, prominent text for the main metric
          - Responsive font sizing for different screen sizes
        */}
        <p className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl mb-2">
          {value}
        </p>
        
        {/* 
          TREND INDICATOR - FLEXBOX (1D) Layout
          - Row direction for trend arrow and percentage
          - Items-center aligns arrow and text
          - Gap provides consistent spacing
        */}
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
            {/* Trend direction indicator */}
            <span className="text-base">
              {trendDirection === 'up' ? '↗' : trendDirection === 'down' ? '↘' : '→'}
            </span>
            <span className="font-medium">{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiSummaryCard; 