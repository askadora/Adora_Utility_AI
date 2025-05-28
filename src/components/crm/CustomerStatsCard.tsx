"use client";

import React from 'react';

interface CustomerMetric {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

interface CustomerSegment {
  segment: string;
  count: number;
  color: string;
}

const customerMetrics: CustomerMetric[] = [
  { label: 'Total Customers', value: '3,200', trend: '+4%', trendDirection: 'up' },
  { label: 'New This Month', value: 245, trend: '+12%', trendDirection: 'up' },
  { label: 'Avg. Lifetime Value', value: '$12.5K', trend: '+8%', trendDirection: 'up' },
  { label: 'Churn Rate', value: '2.4%', trend: '-0.5%', trendDirection: 'down' },
];

const customerSegments: CustomerSegment[] = [
  { segment: 'Enterprise', count: 450, color: 'bg-blue-500 dark:bg-blue-400' },
  { segment: 'Mid-Market', count: 1250, color: 'bg-purple-500 dark:bg-purple-400' },
  { segment: 'SMB', count: 980, color: 'bg-green-500 dark:bg-green-400' },
  { segment: 'Startup', count: 520, color: 'bg-yellow-500 dark:bg-yellow-400' },
];

const customerHealth = [
  { status: 'Very Satisfied', percentage: 45, color: 'text-green-500 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' },
  { status: 'Satisfied', percentage: 35, color: 'text-blue-500 dark:text-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' },
  { status: 'Neutral', percentage: 15, color: 'text-yellow-500 dark:text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30' },
  { status: 'Dissatisfied', percentage: 5, color: 'text-red-500 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' },
];

export default function CustomerStatsCard() {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-0 dark:bg-white/[0.03]">
      <h2 className="text-xl font-semibold text-black dark:text-white/90 mb-4">Customer Overview</h2>
      
      {/* Customer Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {customerMetrics.map((metric, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-colors duration-200">
            <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-black dark:text-white/90">{metric.value}</span>
              {metric.trend && (
                <span className={`text-sm ${metric.trendDirection === 'up' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                  {metric.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Customer Segments */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Customer Segments</h3>
        <div className="space-y-3">
          {customerSegments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{segment.segment}</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-white/[0.03] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: segment.color,
                    width: `${(segment.count / Math.max(...customerSegments.map(s => s.count))) * 100}%`
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-black dark:text-white/90">{segment.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Satisfaction */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Customer Satisfaction</h3>
        <div className="grid grid-cols-2 gap-2">
          {customerHealth.map((health, index) => (
            <div key={index} className={`text-center p-2 rounded-lg ${health.bgColor} transition-colors duration-200`}>
              <p className={`text-2xl font-bold ${health.color}`}>{health.percentage}%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{health.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 