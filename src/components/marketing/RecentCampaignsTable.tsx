"use client";

import React from "react";

interface Campaign {
  name: string;
  type: string;
  status: "Active" | "Completed" | "Scheduled";
  startDate: string;
  budget: string;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

const campaigns: Campaign[] = [
  {
    name: "AI Assistant Launch",
    type: "Product Launch",
    status: "Completed",
    startDate: "2024-03-15",
    budget: "$15,000",
    performance: {
      impressions: 45000,
      clicks: 3200,
      conversions: 180
    }
  },
  {
    name: "Enterprise AI Solutions Webinar",
    type: "Webinar",
    status: "Active",
    startDate: "2024-03-01",
    budget: "$5,000",
    performance: {
      impressions: 12000,
      clicks: 850,
      conversions: 45
    }
  },
  {
    name: "AI Ethics in Business",
    type: "Content Marketing",
    status: "Scheduled",
    startDate: "2025-09-24",
    budget: "$8,000",
    performance: {
      impressions: 28000,
      clicks: 2100,
      conversions: 95
    }
  },
  {
    name: "AI Tools Comparison Guide",
    type: "SEO Campaign",
    status: "Scheduled",
    startDate: "2025-10-05",
    budget: "$3,000",
    performance: {
      impressions: 35000,
      clicks: 4200,
      conversions: 210
    }
  },
  {
    name: "AI Integration Workshop",
    type: "Event",
    status: "Scheduled",
    startDate: "2025-11-01",
    budget: "$20,000",
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0
    }
  }
];

const RecentCampaignsTable = () => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Campaigns</h3>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Campaign</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budget</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Performance</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {campaigns.map((campaign, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {campaign.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {campaign.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${campaign.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                    campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                  {campaign.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {new Date(campaign.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {campaign.budget}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                <div className="space-y-1">
                  <div>Impressions: {campaign.performance.impressions.toLocaleString()}</div>
                  <div>Clicks: {campaign.performance.clicks.toLocaleString()}</div>
                  <div>Conversions: {campaign.performance.conversions.toLocaleString()}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentCampaignsTable; 