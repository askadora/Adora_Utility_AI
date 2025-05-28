'use client';

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

interface PriceData {
  date: string;
  price: number;
  volume: number;
}

const timeRanges = [
  { label: "1D", days: 1 },
  { label: "5D", days: 5 },
  { label: "1M", days: 30 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
  { label: "All", days: 0 }
] as const;

const priceHistoryData: PriceData[] = [
  { date: "2024-03-20", price: 165.23, volume: 72390000 },
  { date: "2024-03-19", price: 162.10, volume: 68500000 },
  { date: "2024-03-18", price: 162.55, volume: 65200000 },
  { date: "2024-03-15", price: 163.38, volume: 70100000 },
  { date: "2024-03-14", price: 162.13, volume: 63800000 },
  { date: "2024-03-13", price: 161.54, volume: 65700000 },
  { date: "2024-03-12", price: 162.20, volume: 64200000 },
  { date: "2024-03-11", price: 163.45, volume: 66800000 },
  { date: "2024-03-08", price: 161.89, volume: 62400000 },
  { date: "2024-03-07", price: 160.78, volume: 61200000 },
  { date: "2024-03-06", price: 159.95, volume: 59800000 },
  { date: "2024-03-05", price: 158.87, volume: 58500000 },
  { date: "2024-03-04", price: 157.92, volume: 57200000 },
  { date: "2024-03-01", price: 156.34, volume: 55900000 },
  { date: "2024-02-29", price: 155.89, volume: 54600000 },
  { date: "2024-02-28", price: 154.67, volume: 53300000 },
  { date: "2024-02-27", price: 153.45, volume: 52000000 },
  { date: "2024-02-26", price: 152.23, volume: 50700000 },
  { date: "2024-02-23", price: 151.12, volume: 49400000 },
  { date: "2024-02-22", price: 150.34, volume: 48100000 },
  { date: "2024-02-21", price: 149.56, volume: 46800000 },
  { date: "2024-02-20", price: 148.78, volume: 45500000 },
  { date: "2024-02-16", price: 147.90, volume: 44200000 },
  { date: "2024-02-15", price: 147.12, volume: 42900000 },
  { date: "2024-02-14", price: 146.45, volume: 41600000 },
  { date: "2024-02-13", price: 145.67, volume: 40300000 },
  { date: "2024-02-12", price: 144.89, volume: 39000000 },
  { date: "2024-02-09", price: 144.12, volume: 37700000 },
  { date: "2024-02-08", price: 143.45, volume: 36400000 },
  { date: "2024-02-07", price: 142.67, volume: 35100000 }
];

const formatPrice = (value: number) => `$${value.toFixed(2)}`;
const formatVolume = (volume: number) => {
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`;
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
  if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
  return volume.toString();
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: PriceData;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {formatDate(label)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Price: {formatPrice(payload[0].value)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Volume: {formatVolume(payload[0].payload.volume)}
        </p>
      </div>
    );
  }
  return null;
};

const PriceHistoryChart = () => {
  const [selectedRange, setSelectedRange] = useState<typeof timeRanges[number]>(timeRanges[2]); // Default to 1M

  const filteredData = selectedRange.days === 0 
    ? priceHistoryData 
    : priceHistoryData.slice(0, selectedRange.days).reverse();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Price History</h3>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                ${selectedRange.label === range.label
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={formatPrice}
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceHistoryChart; 