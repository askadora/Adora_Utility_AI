"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "Nov", signups: 700, active: 200 },
  { week: "Dec", signups: 800, active: 250 },
  { week: "Jan", signups: 750, active: 220 },
];

const UserActivityChart = () => {
  return (
    <div className="h-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Signups and Day 2 Active (by week)
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="week" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
            itemStyle={{ color: '#E5E7EB' }}
          />
          <Bar dataKey="signups" fill="#0EA5E9" />
          <Bar dataKey="active" fill="#FCD34D" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart; 