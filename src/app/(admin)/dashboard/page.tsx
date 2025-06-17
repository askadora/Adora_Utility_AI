import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title: "Dashboard | Adora AI - AI-Powered Business Intelligence Platform",
  description: "Comprehensive dashboard for Adora AI's business intelligence and analytics platform.",
};

// Video Card Component
const VideoCard = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl dark:bg-blue-900/20">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3m2 4h10M7 7v3a2 2 0 002 2h6a2 2 0 002-2V7" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Dashboard Overview
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Learn how to create custom dashboards
          </p>
        </div>
      </div>
      
      <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Dashboard Overview Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Duration: 3:45</span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          1.2k views
        </span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          This is a demo dashboard showcasing Adora AI's visualization capabilities. 
          You can create custom dashboards with personalized widgets, charts, and data visualizations 
          tailored to your specific business needs and KPIs. Explore the Dashboard Examples section 
          in the sidebar to see specialized dashboards for different industries and use cases.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Video Card - Top Left (60% width) */}
        <div className="col-span-12 xl:col-span-7">
          <VideoCard />
        </div>

        {/* Monthly Target - Top Right (40% width) */}
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        {/* Left Column - KPI Metrics + Monthly Sales Chart */}
        <div className="col-span-12 xl:col-span-7 space-y-6">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        {/* Demographics Card - Right Column (under Monthly Target) */}
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        {/* Statistics Chart - Full Width */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* Recent Orders - Full Width */}
        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
} 