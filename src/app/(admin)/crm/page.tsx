import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
// Placeholder imports for charts/tables (implement as needed)
// import DealsPipelineChart from "@/components/crm/DealsPipelineChart";
// import RecentActivitiesTable from "@/components/crm/RecentActivitiesTable";
// import PartnershipStatsCard from "@/components/crm/PartnershipStatsCard";

export default function CrmDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">CRM Dashboard</h1>
      {/* CRM Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard title="Total Customers" value="3,200" trend="+4%" trendDirection="up" />
        <KpiSummaryCard title="New Deals" value="58" trend="+12%" trendDirection="up" />
        <KpiSummaryCard title="Revenue" value="$98,500" trend="+6%" trendDirection="up" />
        <KpiSummaryCard title="Lost Deals" value="7" trend="-2%" trendDirection="down" />
      </div>
      {/* Deals Pipeline Chart */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
        {/* <DealsPipelineChart /> */}
        <div className="text-center text-gray-400">[Deals Pipeline Chart Placeholder]</div>
      </div>
      {/* Partnership & Customer Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* <PartnershipStatsCard /> */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 text-center text-gray-400">[Partnership Stats Placeholder]</div>
        {/* <CustomerStatsCard /> */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 text-center text-gray-400">[Customer Stats Placeholder]</div>
      </div>
      {/* Recent Activities Table */}
      {/* <RecentActivitiesTable /> */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 text-center text-gray-400">[Recent Activities Table Placeholder]</div>
    </div>
  );
} 