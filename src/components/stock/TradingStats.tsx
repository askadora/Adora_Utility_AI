'use client';

import React from 'react';

interface TradingStatsData {
  weekRange: {
    low: number;
    high: number;
  };
  beta: string;
  avgVolume: string;
  peRatio: string;
}

const tradingStatsData: TradingStatsData = {
  weekRange: {
    low: 129.04,
    high: 176.15
  },
  beta: "1.25",
  avgVolume: "72.39M",
  peRatio: "28.01"
};

const TradingStats = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trading Statistics</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">52-Week Range</span>
          <span className="text-gray-900 dark:text-white">
            {tradingStatsData.weekRange.low.toFixed(2)} - {tradingStatsData.weekRange.high.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Beta</span>
          <span className="text-gray-900 dark:text-white">{tradingStatsData.beta}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Average Volume</span>
          <span className="text-gray-900 dark:text-white">{tradingStatsData.avgVolume}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">P/E Ratio</span>
          <span className="text-gray-900 dark:text-white">{tradingStatsData.peRatio}</span>
        </div>
      </div>
    </div>
  );
};

export default TradingStats; 