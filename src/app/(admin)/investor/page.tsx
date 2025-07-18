"use client";

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ComponentCard from '@/components/common/ComponentCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define types
interface Investment {
  id: number;
  name: string;
  type: string;
  value: number;
  return: string;
  status: string;
  date: string;
}

// Sample data for the portfolio performance chart
const portfolioData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Total Portfolio',
      data: [1000000, 1050000, 1030000, 1080000, 1120000, 1150000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Private Portfolio',
      data: [500000, 520000, 510000, 530000, 550000, 560000],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
    {
      label: 'Public Portfolio',
      data: [300000, 310000, 305000, 320000, 330000, 340000],
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1,
    },
  ],
};

// Sample investment data
const investments: Investment[] = [
  {
    id: 1,
    name: 'TechStart Inc.',
    type: 'Private Equity',
    value: 250000,
    return: '+15%',
    status: 'Active',
    date: '2023-01-15',
  },
  {
    id: 2,
    name: 'Apple Inc.',
    type: 'Public Stock',
    value: 150000,
    return: '+8%',
    status: 'Active',
    date: '2023-02-20',
  },
  {
    id: 3,
    name: 'Luxury Condo - Miami',
    type: 'Real Estate',
    value: 500000,
    return: '+12%',
    status: 'Active',
    date: '2023-03-10',
  },
  {
    id: 4,
    name: 'US Treasury Bonds',
    type: 'Fixed Income',
    value: 200000,
    return: '+4%',
    status: 'Active',
    date: '2023-04-05',
  },
];

export default function InvestorDashboard() {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Investor Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Track your portfolio performance and manage your investments across different asset classes.
        </p>
      </header>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComponentCard title="Total Capital Invested" description="Total value of all investments">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">$1,150,000</div>
          <p className="text-sm text-green-600 dark:text-green-400">+15% YTD</p>
        </ComponentCard>

        <ComponentCard title="Private Portfolio" description="Private equity and startup investments">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">$560,000</div>
          <p className="text-sm text-green-600 dark:text-green-400">+12% YTD</p>
        </ComponentCard>

        <ComponentCard title="Public Portfolio" description="Public stocks and ETFs">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">$340,000</div>
          <p className="text-sm text-green-600 dark:text-green-400">+8% YTD</p>
        </ComponentCard>

        <ComponentCard title="Real Estate" description="Property investments">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">$500,000</div>
          <p className="text-sm text-green-600 dark:text-green-400">+12% YTD</p>
        </ComponentCard>

        <ComponentCard title="Liquidity" description="Available cash and liquid assets">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">$250,000</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Available for investment</p>
        </ComponentCard>

        <ComponentCard title="Total Line of Credit" description="Available credit facilities">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">$1,000,000</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">$750,000 utilized</p>
        </ComponentCard>
      </div>

      {/* Portfolio Performance Chart */}
      <ComponentCard title="Portfolio Performance" description="Track your investments over time">
        <div className="h-[400px]">
          <Line
            data={portfolioData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    callback: function(value: number | string) {
                      if (typeof value === 'number') {
                        return `$${value.toLocaleString()}`;
                      }
                      return value;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </ComponentCard>

      {/* Investment List */}
      <ComponentCard title="Investment Portfolio" description="Detailed view of all investments">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Investment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Return
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {investments.map((investment) => (
                <tr
                  key={investment.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedInvestment(investment)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {investment.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {investment.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      ${investment.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {investment.return}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {investment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {investment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button className="text-primary hover:text-primary-dark">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentCard>

      {/* Investment Details Modal */}
      {selectedInvestment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedInvestment.name}
              </h3>
              <button
                onClick={() => setSelectedInvestment(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedInvestment.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Value</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    ${selectedInvestment.value.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Return</p>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400">
                    {selectedInvestment.return}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedInvestment.status}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Investment Details
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Additional details about the investment would go here, including:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  <li>Investment thesis</li>
                  <li>Key metrics and KPIs</li>
                  <li>Recent updates and milestones</li>
                  <li>Risk assessment</li>
                  <li>Exit strategy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 