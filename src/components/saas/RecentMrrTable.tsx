"use client";
import React from "react";

const recentChanges = [
  { type: "add", name: "Robinson", plan: "Premium", change: 355 },
  { type: "add", name: "Reece", plan: "Basic", change: 189 },
  { type: "add", name: "Armit", plan: "NGO", change: 59 },
  { type: "remove", name: "Seecorp", plan: "Basic", change: -189 },
  { type: "add", name: "GHY", plan: "Enterprise", change: 989 },
];

const RecentMrrTable = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent MRR changes
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Plan</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentChanges.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    item.type === 'add' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.type === 'add' ? '+' : '-'}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-900 dark:text-white">{item.name}</td>
                <td className="px-4 py-2 text-gray-500 dark:text-gray-300">{item.plan}</td>
                <td className={`px-4 py-2 ${
                  item.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(item.change)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentMrrTable; 