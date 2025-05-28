'use client';

import React from 'react';

interface CompanyData {
  sector: string;
  industry: string;
  employees: number;
  founded: number;
}

const companyData: CompanyData = {
  sector: "Technology",
  industry: "Consumer Electronics",
  employees: 164000,
  founded: 1976
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const CompanyOverview = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Overview</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Sector</span>
          <span className="text-gray-900 dark:text-white">{companyData.sector}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Industry</span>
          <span className="text-gray-900 dark:text-white">{companyData.industry}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Employees</span>
          <span className="text-gray-900 dark:text-white">{formatNumber(companyData.employees)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Founded</span>
          <span className="text-gray-900 dark:text-white">{companyData.founded}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview; 