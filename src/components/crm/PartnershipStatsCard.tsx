"use client";

import React from 'react';

interface PartnershipMetric {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

interface PartnershipType {
  type: string;
  count: number;
  color: string;
}

const partnershipMetrics: PartnershipMetric[] = [
  { label: 'Total Partners', value: 156, trend: '+12%', trendDirection: 'up' },
  { label: 'Active Partnerships', value: 89, trend: '+8%', trendDirection: 'up' },
  { label: 'Avg. Partnership Value', value: '$45K', trend: '+15%', trendDirection: 'up' },
  { label: 'Partnership ROI', value: '3.2x', trend: '+0.4x', trendDirection: 'up' },
];

const partnershipTypes: PartnershipType[] = [
  { type: 'Technology', count: 45, color: 'bg-blue-500 dark:bg-blue-400' },
  { type: 'Marketing', count: 38, color: 'bg-purple-500 dark:bg-purple-400' },
  { type: 'Distribution', count: 32, color: 'bg-green-500 dark:bg-green-400' },
  { type: 'Research', count: 25, color: 'bg-yellow-500 dark:bg-yellow-400' },
  { type: 'Other', count: 16, color: 'bg-gray-500 dark:bg-gray-400' },
];

export default function PartnershipStatsCard() {
  return (
    <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-white/[0.03]">
      <h2 className="text-xl font-semibold text-black dark:text-white/90 mb-4">Partnership Overview</h2>
      
      {/* Partnership Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {partnershipMetrics.map((metric, index) => (
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

      {/* Partnership Type Distribution */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Partnership Distribution</h3>
        <div className="space-y-3">
          {partnershipTypes.map((type, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{type.type}</span>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-white/[0.03] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: type.color,
                    width: `${(type.count / Math.max(...partnershipTypes.map(t => t.count))) * 100}%`
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-black dark:text-white/90">{type.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Health */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Partnership Health</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
            <p className="text-2xl font-bold text-green-500 dark:text-green-400">68%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Healthy</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-200">
            <p className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">24%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">At Risk</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200">
            <p className="text-2xl font-bold text-red-500 dark:text-red-400">8%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Critical</p>
          </div>
        </div>
      </div>
    </div>
  );
} 