import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import DealsPipelineChart from "@/components/crm/DealsPipelineChart";
import PartnershipStatsCard from "@/components/crm/PartnershipStatsCard";
import CustomerStatsCard from "@/components/crm/CustomerStatsCard";
// Placeholder imports for charts/tables (implement as needed)
// import RecentActivitiesTable from "@/components/crm/RecentActivitiesTable";

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
      <div className="w-full">
        <DealsPipelineChart />
      </div>

      {/* Partnership & Customer Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <PartnershipStatsCard />
        <CustomerStatsCard />
      </div>
    </div>
  );
} 