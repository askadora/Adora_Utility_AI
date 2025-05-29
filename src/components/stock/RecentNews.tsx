'use client';

import React from 'react';

interface NewsItem {
  title: string;
  summary: string;
  timestamp: string;
}

const newsData: NewsItem[] = [
  {
    title: "Apple Reports Record Q1 2024 Earnings",
    summary: "Strong iPhone sales drive revenue growth...",
    timestamp: "2 hours ago"
  },
  {
    title: "New Product Launch Expected in March",
    summary: "Analysts predict new MacBook lineup...",
    timestamp: "5 hours ago"
  },
  {
    title: "AI Integration Plans Revealed",
    summary: "Company announces new AI features...",
    timestamp: "1 day ago"
  }
];

const RecentNews = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent News</h2>
      <div className="space-y-4">
        {newsData.map((item, index) => (
          <div 
            key={index} 
            className={`${
              index !== newsData.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
            } pb-4`}
          >
            <h4 className="text-gray-900 dark:text-white font-medium">{item.title}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.summary}</p>
            <span className="text-gray-500 dark:text-gray-500 text-xs">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNews; 