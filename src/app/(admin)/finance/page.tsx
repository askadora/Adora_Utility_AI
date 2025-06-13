"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import { Line } from 'react-chartjs-2';

type FinanceTab = 'portfolio-analysis' | 'compliance-check' | 'report-generator';
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

// Mock data for portfolio performance
const portfolioData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Assets Under Management',
      data: [45000000, 47000000, 46500000, 49000000, 52000000, 54000000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      tension: 0.1,
    },
    {
      label: 'Client Portfolio Performance',
      data: [35000000, 36000000, 35800000, 37500000, 39000000, 40500000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      tension: 0.1,
    },
  ],
};

// Recent transactions data
const recentTransactions = [
  { id: 1, client: "Johnson Holdings", type: "Buy", instrument: "AAPL", amount: "$125,000", date: "Today", status: "Executed" },
  { id: 2, client: "Smith Investment", type: "Sell", instrument: "TSLA", amount: "$89,500", date: "Yesterday", status: "Pending" },
  { id: 3, client: "Global Fund", type: "Buy", instrument: "SPY ETF", amount: "$200,000", date: "2 days ago", status: "Executed" },
  { id: 4, client: "Retirement Fund", type: "Rebalance", instrument: "Bond Portfolio", amount: "$75,000", date: "3 days ago", status: "Completed" },
];

// Risk alerts data
const riskAlerts = [
  { client: "Tech Portfolio", risk: "High Volatility", severity: "Medium", recommendation: "Consider rebalancing" },
  { client: "Energy Investments", risk: "Sector Concentration", severity: "High", recommendation: "Diversify holdings" },
  { client: "Bond Fund", risk: "Interest Rate Risk", severity: "Low", recommendation: "Monitor duration" },
];

export default function FinanceDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [activeTab, setActiveTab] = useState<FinanceTab>('portfolio-analysis');

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Financial Services Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Comprehensive financial management platform with AI-powered portfolio analysis, 
          risk assessment, and automated compliance reporting.
        </p>
      </header>

      {/* KPI Metrics Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Assets Under Mgmt" 
          value="$54M" 
          trend="+8.2%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Active Clients" 
          value="145" 
          trend="+12" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="YTD Returns" 
          value="11.4%" 
          trend="+2.1%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Risk Score" 
          value="6.2/10" 
          trend="-0.5" 
          trendDirection="down"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </section>

      {/* Financial Analysis Tools with Tabs */}
      <ComponentCard title="AI-Powered Financial Tools" desc="Advanced analytics and automated reporting capabilities">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'portfolio-analysis', label: 'Portfolio Analysis', icon: '📊' },
              { id: 'compliance-check', label: 'Compliance Check', icon: '✅' },
              { id: 'report-generator', label: 'Report Generator', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FinanceTab)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'portfolio-analysis' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Analysis Engine</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Advanced AI-driven portfolio optimization, risk assessment, and performance analytics to maximize returns while managing risk.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Analysis Type:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="analysis" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Risk Assessment</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="analysis" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Performance Attribution</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="analysis" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimization Recommendations</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="analysis" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Sector Allocation Analysis</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Portfolio Selection:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Select portfolio...</option>
                  <option value="aggressive">Aggressive Growth Portfolio</option>
                  <option value="balanced">Balanced Portfolio</option>
                  <option value="conservative">Conservative Portfolio</option>
                  <option value="income">Income-Focused Portfolio</option>
                  <option value="esg">ESG Portfolio</option>
                </select>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Time Horizon:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="1m">1 Month</option>
                  <option value="3m">3 Months</option>
                  <option value="6m" selected>6 Months</option>
                  <option value="1y">1 Year</option>
                  <option value="3y">3 Years</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Run Analysis
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View History
              </button>
            </div>
          </div>
        )}

        {activeTab === 'compliance-check' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Regulatory Compliance Monitor</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Automated monitoring and reporting for financial regulations including SEC, FINRA, and international compliance requirements.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Compliance Areas:</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">SEC Reporting</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">FINRA Rules</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⚠</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Risk Limits</span>
                    </div>
                    <span className="text-xs text-yellow-600 dark:text-yellow-400">Review Needed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">AML/KYC</span>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">Compliant</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Recent Alerts:</h4>
                <div className="space-y-3">
                  <div className="p-3 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-500">⚠</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Position Limit Warning</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Portfolio XYZ approaching concentration limits for tech sector (28/30%)</p>
                  </div>
                  <div className="p-3 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-500">ℹ</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Filing Reminder</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Quarterly 13F filing due in 5 days</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h5 className="font-medium text-green-900 dark:text-green-400 mb-2">Compliance Score</h5>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{width: '94%'}}></div>
                    </div>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">94%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Run Full Check
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Download Report
              </button>
            </div>
          </div>
        )}

        {activeTab === 'report-generator' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Automated Report Generator</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Generate comprehensive client reports, performance summaries, and regulatory filings with AI-powered analysis and insights.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Report Type:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">Select report type...</option>
                  <option value="performance">Performance Summary</option>
                  <option value="risk">Risk Assessment Report</option>
                  <option value="compliance">Compliance Report</option>
                  <option value="quarterly">Quarterly Review</option>
                  <option value="annual">Annual Report</option>
                  <option value="custom">Custom Report</option>
                </select>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Time Period:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="End Date"
                  />
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Client Selection:</h4>
                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="all">All Clients</option>
                  <option value="high-net">High Net Worth Clients</option>
                  <option value="institutional">Institutional Clients</option>
                  <option value="retail">Retail Clients</option>
                  <option value="specific">Specific Client</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Report Options:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Include performance charts</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Add market commentary</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Include risk metrics</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Add benchmark comparison</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Include tax implications</span>
                  </label>
                </div>
                
                <h4 className="font-semibold text-gray-900 dark:text-white mt-6">Format:</h4>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">PDF</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Excel</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">PowerPoint</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Generate Report
              </button>
              <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Save Template
              </button>
            </div>
          </div>
        )}
      </ComponentCard>

      {/* Portfolio Performance Chart */}
      <ComponentCard title="Portfolio Performance" desc="Track assets under management and client performance over time">
        <div className="mb-4 flex gap-2">
          {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                selectedTimeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
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
                        return `$${(value / 1000000).toFixed(1)}M`;
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

      {/* Transactions and Risk Alerts */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:gap-8">
        {/* Recent Transactions */}
        <ComponentCard title="Recent Transactions" desc="Latest trading activity and client orders">
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{transaction.client}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.type === 'Buy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      transaction.type === 'Sell' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {transaction.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.instrument}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  <p className={`text-xs font-medium ${
                    transaction.status === 'Executed' ? 'text-green-600 dark:text-green-400' :
                    transaction.status === 'Pending' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              View All Transactions →
            </button>
          </div>
        </ComponentCard>

        {/* Risk Alerts */}
        <ComponentCard title="Risk Alerts" desc="Monitor portfolio risks and compliance issues">
          <div className="space-y-4">
            {riskAlerts.map((alert, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'High' ? 'bg-red-500' :
                    alert.severity === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{alert.client}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alert.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{alert.risk}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{alert.recommendation}</p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Risk Management Center →
            </button>
          </div>
        </ComponentCard>
      </section>

      {/* Market Insights */}
      <ComponentCard title="Market Research & Insights" desc="Stay informed with AI-curated market intelligence">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Today's Market Movers</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">AAPL</span>
                <span className="text-green-600 dark:text-green-400">+2.4%</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">TSLA</span>
                <span className="text-red-600 dark:text-red-400">-1.8%</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">SPY</span>
                <span className="text-green-600 dark:text-green-400">+0.7%</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Economic Indicators</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">10Y Treasury</span>
                <span className="text-gray-600 dark:text-gray-400">4.2%</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">VIX</span>
                <span className="text-yellow-600 dark:text-yellow-400">18.5</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white">USD Index</span>
                <span className="text-blue-600 dark:text-blue-400">103.2</span>
              </li>
            </ul>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
} 