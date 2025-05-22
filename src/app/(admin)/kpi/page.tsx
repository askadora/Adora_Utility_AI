import type { Metadata } from "next";
import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import NetRevenueChart from "@/components/kpi/NetRevenueChart";
import BreakdownChart from "@/components/kpi/BreakdownChart";

// Import placeholder components (will be created next)
// import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
// import NetRevenueChart from "@/components/kpi/NetRevenueChart";
// import BreakdownChart from "@/components/kpi/BreakdownChart";
// import RecentActivityTable from "@/components/kpi/RecentActivityTable";

export const metadata: Metadata = {
  title: "KPI Dashboard | Adora AI",
  description: "Key Performance Indicators for Adora AI.",
};

export default function KpiPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">KPI Dashboard</h1>
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard title="Net Revenue" value="$125,670" trend="+12%" trendDirection="up" />
        <KpiSummaryCard title="Active Customers" value="1,280" trend="+5%" trendDirection="up" />
        <KpiSummaryCard title="New MRR" value="$12,400" trend="+8%" trendDirection="up" />
        <KpiSummaryCard title="Churn Rate" value="2.1%" trend="-0.5%" trendDirection="down" />
      </div>
      {/* Main Chart */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
        <NetRevenueChart />
      </div>
      {/* Breakdown Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <BreakdownChart title="Customers by Plan" />
        <BreakdownChart title="Revenue by Channel" />
      </div>
    </div>
  );
} 