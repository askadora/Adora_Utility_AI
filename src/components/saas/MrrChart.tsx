"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { month: 'Jan', mrr: 125000, newMrr: 15000, expansionMrr: 8000, churnMrr: -5000 },
  { month: 'Feb', mrr: 143000, newMrr: 18000, expansionMrr: 7000, churnMrr: -4000 },
  { month: 'Mar', mrr: 164000, newMrr: 21000, expansionMrr: 9000, churnMrr: -6000 },
  { month: 'Apr', mrr: 184000, newMrr: 19000, expansionMrr: 11000, churnMrr: -5500 },
  { month: 'May', mrr: 208000, newMrr: 23000, expansionMrr: 12000, churnMrr: -4800 },
  { month: 'Jun', mrr: 235000, newMrr: 25000, expansionMrr: 13000, churnMrr: -5200 },
];

const formatCurrency = (value: number) => {
  return `$${Math.abs(value).toLocaleString()}`;
};

const MrrChart = () => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        MRR Growth Breakdown
      </h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
            />
            <YAxis 
              stroke="#9CA3AF"
              tickFormatter={(value) => `$${Math.abs(value/1000)}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#E5E7EB' }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingBottom: '20px',
                fontSize: '14px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="mrr" 
              name="Total MRR"
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="newMrr" 
              name="New MRR"
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="expansionMrr" 
              name="Expansion MRR"
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="churnMrr" 
              name="Churn MRR"
              stroke="#EF4444" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MrrChart; 