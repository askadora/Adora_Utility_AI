"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BreakdownChartProps {
  data?: {
    name: string;
    value: number;
  }[];
  colors?: string[];
}

const defaultData = [
  { name: "Basic", value: 0 },
  { name: "Pro", value: 0 },
  { name: "Enterprise", value: 0 },
];

const BreakdownChart: React.FC<BreakdownChartProps> = ({ data = defaultData, colors }) => {
  const COLORS = colors || ["#6366f1", "#38bdf8", "#a3e635"];
  const chartData = data || defaultData;

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-72 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Subscription Prices</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          barCategoryGap={32}
        >
          <XAxis
            type="number"
            domain={[0, 'dataMax']}
            tick={{ fill: "#64748b", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#64748b", fontSize: 14 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ background: "#fff", borderRadius: 8, border: "none", color: "#334155" }}
            formatter={(value: number) => `$${value.toLocaleString()}/m`}
          />
          <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={32}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex w-full justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
        {chartData.map((entry, index) => (
          <span key={`span-${index}`}>{entry.name}: ${entry.value.toLocaleString()}/m</span>
        ))}
      </div>
    </div>
  );
};

export default BreakdownChart; 