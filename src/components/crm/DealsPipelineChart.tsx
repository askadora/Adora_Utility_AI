"use client";

import React from 'react';

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
  owner: string;
  lastActivity: string;
}

const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise AI Integration',
    company: 'TechCorp Inc.',
    value: 150000,
    stage: 'lead',
    probability: 20,
    owner: 'John Smith',
    lastActivity: '2 days ago'
  },
  {
    id: '2',
    name: 'Cloud Migration Project',
    company: 'Global Services Ltd',
    value: 250000,
    stage: 'qualified',
    probability: 40,
    owner: 'Sarah Johnson',
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    name: 'Digital Transformation',
    company: 'Innovate Co',
    value: 500000,
    stage: 'proposal',
    probability: 60,
    owner: 'Mike Brown',
    lastActivity: '3 hours ago'
  },
  {
    id: '4',
    name: 'AI Implementation',
    company: 'Future Tech',
    value: 300000,
    stage: 'negotiation',
    probability: 80,
    owner: 'Lisa Chen',
    lastActivity: 'Just now'
  },
  {
    id: '5',
    name: 'Enterprise Solution',
    company: 'Mega Corp',
    value: 750000,
    stage: 'closed',
    probability: 100,
    owner: 'David Wilson',
    lastActivity: '1 week ago'
  }
];

const stages = [
  { id: 'lead', label: 'Lead', color: 'bg-blue-100 dark:bg-blue-900/20' },
  { id: 'qualified', label: 'Qualified', color: 'bg-purple-100 dark:bg-purple-900/20' },
  { id: 'proposal', label: 'Proposal', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 dark:bg-orange-900/20' },
  { id: 'closed', label: 'Closed', color: 'bg-green-100 dark:bg-green-900/20' }
];

export default function DealsPipelineChart() {
  // Calculate pipeline stats
  const totalPipeline = mockDeals.reduce((sum, deal) => sum + deal.value, 0);
  const activeDeals = mockDeals.filter(deal => deal.stage !== 'closed').length;
  const winRate = Math.round((mockDeals.filter(deal => deal.stage === 'closed').length / mockDeals.length) * 100);
  const avgDealSize = Math.round(totalPipeline / mockDeals.length);

  // Format currency values
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-white/10 dark:bg-white/[0.03]">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/10 dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Pipeline</p>
              <span className="text-2xl font-bold text-black dark:text-white">{formatCurrency(totalPipeline)}</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-white/[0.03]">
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" />
                <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/10 dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Deals</p>
              <span className="text-2xl font-bold text-black dark:text-white">{activeDeals}</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-white/[0.03]">
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" />
                <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/10 dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Win Rate</p>
              <span className="text-2xl font-bold text-black dark:text-white">{winRate}%</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-white/[0.03]">
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" />
                <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/10 dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.05] transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Deal Size</p>
              <span className="text-2xl font-bold text-black dark:text-white">${(avgDealSize / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-white/[0.03]">
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                <path d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z" />
                <path d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-5">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col">
            <div className={`mb-4 rounded-t-lg p-4 ${stage.color}`}>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {stage.label}
              </h3>
              <p className="text-sm text-black dark:text-white">
                {mockDeals.filter((deal) => deal.stage === stage.id).length} Deals
              </p>
            </div>
            <div className="flex-1 space-y-4 p-2">
              {mockDeals
                .filter((deal) => deal.stage === stage.id)
                .map((deal) => (
                  <div
                    key={deal.id}
                    className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-white/10 dark:bg-white/[0.03] hover:shadow-lg dark:hover:bg-white/[0.05] transition-all duration-200"
                  >
                    <h4 className="mb-2 font-semibold text-black dark:text-white">
                      {deal.name}
                    </h4>
                    <p className="mb-2 text-sm text-black dark:text-white">
                      {deal.company}
                    </p>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-black dark:text-white">
                        ${deal.value.toLocaleString()}
                      </span>
                      <span className="text-sm text-black dark:text-white">
                        {deal.probability}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black dark:text-white">
                        {deal.owner}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {deal.lastActivity}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 