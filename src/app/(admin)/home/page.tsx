import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home | Adora AI - AI-Powered Business Intelligence Platform",
  description: "Welcome to Adora AI's home page - your central hub for AI-powered business intelligence.",
};

export default function Home() {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Adora AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Your AI-powered business intelligence platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Quick Start
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get started with your dashboard and explore key metrics.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              AI Insights
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover AI-powered insights and recommendations.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Focus Mode
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Use Focus Mode to stay productive and minimize distractions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 