"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Social", value: 12000 },
  { name: "Email", value: 8500 },
  { name: "Networking", value: 6200 },
  { name: "Affiliates", value: 4800 },
  { name: "Partnerships", value: 3500 },
];

const COLORS = ["#6366f1", "#38bdf8", "#a3e635", "#fbbf24", "#f87171"];

const TopChannelsChart = () => {
  return (
    <div className="h-72 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Channels</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip 
            formatter={(value) => [`${value.toLocaleString()} visits`, '']}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          <Bar dataKey="value" barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopChannelsChart; 