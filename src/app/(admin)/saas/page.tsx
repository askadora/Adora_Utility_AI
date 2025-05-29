import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import MrrChart from "@/components/saas/MrrChart";
import UserActivityChart from "@/components/saas/UserActivityChart";
import RecentMrrTable from "@/components/saas/RecentMrrTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Dashboard | Adora AI",
  description: "SaaS metrics and analytics for Adora AI",
};

export default function SaasDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">SaaS Dashboard</h1>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 md:gap-6">
        <KpiSummaryCard 
          title="MRR" 
          value="$8,903" 
          trend="+12.5%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="ARR" 
          value="$984.6k" 
          trend="+5.2%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="Paying customers" 
          value="9,875" 
          trend="+8.3%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="DAU/MAU" 
          value="51.1%" 
          trend="+2.1%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="Churn Rate" 
          value="2.1%" 
          trend="-0.5%" 
          trendDirection="down" 
        />
      </div>

      {/* MRR Growth Chart */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
        <MrrChart />
      </div>

      {/* User Activity & MRR Changes */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <UserActivityChart />
        <RecentMrrTable />
      </div>

      {/* Additional Stats - now with 3 columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Free Users</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">23.5k</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Active Users</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">4,581</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Active Users</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">8,959</p>
        </div>
      </div>
    </div>
  );
} 