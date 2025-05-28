import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import NetRevenueChart from "@/components/kpi/NetRevenueChart";
import TopChannelsChart from "@/components/marketing/TopChannelsChart";
import TrafficSourcesChart from "@/components/marketing/TrafficSourcesChart";
import RecentCampaignsTable from "@/components/marketing/RecentCampaignsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Dashboard | Adora AI - Marketing Analytics Platform",
  description: "Comprehensive marketing dashboard for tracking campaigns, traffic sources, and conversion metrics.",
};

export default function MarketingDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          Marketing Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Monitor your marketing campaigns, track traffic sources, and analyze conversion metrics 
          to optimize your marketing performance.
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
          title="Website Visits" 
          value="45,200" 
          trend="+7%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Conversion Rate" 
          value="4.2%" 
          trend="+0.3%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Ad Spend" 
          value="$8,500" 
          trend="-2%" 
          trendDirection="down"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Leads Generated" 
          value="1,120" 
          trend="+5%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
          <TopChannelsChart />
        </div>
        <div className="w-full">
          <TrafficSourcesChart />
        </div>
      </section>

      {/* 
        CAMPAIGNS TABLE SECTION - Full width
        - Tables need maximum horizontal space for readability
        - Responsive table with horizontal scroll on mobile
      */}
      <section className="w-full">
        <RecentCampaignsTable />
      </section>
    </div>
  );
} 