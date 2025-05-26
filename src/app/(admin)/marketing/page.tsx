import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import NetRevenueChart from "@/components/kpi/NetRevenueChart";
import TopChannelsChart from "@/components/marketing/TopChannelsChart";
import TrafficSourcesChart from "@/components/marketing/TrafficSourcesChart";
import RecentCampaignsTable from "@/components/marketing/RecentCampaignsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Adora AI",
  description: "Marketing dashboard for Adora AI",
};

export default function MarketingDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Marketing Dashboard</h1>
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard title="Website Visits" value="45,200" trend="+7%" trendDirection="up" />
        <KpiSummaryCard title="Conversion Rate" value="4.2%" trend="+0.3%" trendDirection="up" />
        <KpiSummaryCard title="Ad Spend" value="$8,500" trend="-2%" trendDirection="down" />
        <KpiSummaryCard title="Leads" value="1,120" trend="+5%" trendDirection="up" />
      </div>
      {/* Main Traffic Chart */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5">
        <NetRevenueChart />
      </div>
      {/* Breakdown Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <TopChannelsChart />
        <TrafficSourcesChart />
      </div>
      {/* Recent Campaigns Table */}
      <RecentCampaignsTable />
    </div>
  );
} 