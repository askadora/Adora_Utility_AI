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
  title: "KPI Dashboard | Adora AI - Key Performance Indicators",
  description: "Monitor key performance indicators including revenue, customer metrics, and business growth analytics.",
};

export default function KpiPage() {
  // Sample data for breakdown charts
  const customersByPlanData = [
    { name: "Enterprise", value: 4500 },
    { name: "Professional", value: 3200 },
    { name: "Basic", value: 1800 }
  ];

  const revenueByChannelData = [
    { name: "Direct Sales", value: 5200 },
    { name: "Partners", value: 3800 },
    { name: "Online", value: 2400 }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          KPI Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Track your key performance indicators and monitor business growth metrics 
          to make data-driven decisions.
        </p>
      </header>

      {/* 
        KPI METRICS SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
        - Using gap for consistent spacing across all breakpoints
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Net Revenue" 
          value="$125,670" 
          trend="+12%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Active Customers" 
          value="1,280" 
          trend="+5%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="New MRR" 
          value="$12,400" 
          trend="+8%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Churn Rate" 
          value="2.1%" 
          trend="-0.5%" 
          trendDirection="down"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
            </svg>
          }
        />
      </section>

      {/* 
        MAIN REVENUE CHART - Full width container
        - Critical business data gets maximum screen real estate
        - Consistent card styling with proper padding
      */}
      <section className="w-full">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
          <NetRevenueChart />
        </div>
      </section>

      {/* 
        BREAKDOWN CHARTS SECTION - CSS Grid Layout (2D)
        - Mobile: Single column (stacked)
        - Tablet/Desktop: 2 equal columns
        - Both charts get equal importance and space
      */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div className="w-full">
          <BreakdownChart 
            data={customersByPlanData}
            colors={["#6366f1", "#38bdf8", "#a3e635"]}
          />
        </div>
        <div className="w-full">
          <BreakdownChart 
            data={revenueByChannelData}
            colors={["#f59e0b", "#ef4444", "#8b5cf6"]}
          />
        </div>
      </section>
    </div>
  );
} 