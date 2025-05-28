import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import DealsPipelineChart from "@/components/crm/DealsPipelineChart";
import PartnershipStatsCard from "@/components/crm/PartnershipStatsCard";
import CustomerStatsCard from "@/components/crm/CustomerStatsCard";
import { Metadata } from "next";
// Placeholder imports for charts/tables (implement as needed)
// import RecentActivitiesTable from "@/components/crm/RecentActivitiesTable";

export const metadata: Metadata = {
  title: "CRM Dashboard | Adora AI - Customer Relationship Management",
  description: "Monitor customer relationships, sales pipeline, and partnership metrics to drive business growth.",
};

export default function CrmDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          CRM Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Monitor your customer relationships and sales pipeline to identify opportunities 
          and drive business growth.
        </p>
      </header>
      
      {/* 
        CRM METRICS SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
        - Using gap for consistent spacing across all breakpoints
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Total Customers" 
          value="3,200" 
          trend="+4%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="New Deals" 
          value="58" 
          trend="+12%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Revenue" 
          value="$98,500" 
          trend="+6%" 
          trendDirection="up"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
        />
        <KpiSummaryCard 
          title="Lost Deals" 
          value="7" 
          trend="-2%" 
          trendDirection="down"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </section>

      {/* 
        DEALS PIPELINE CHART - Full width container
        - Critical sales data gets maximum screen real estate
        - Consistent card styling with proper padding
      */}
      <section className="w-full">
        <DealsPipelineChart />
      </section>

      {/* 
        PARTNERSHIP & CUSTOMER STATS - CSS Grid Layout (2D)
        - Mobile: Single column (stacked)
        - Tablet/Desktop: 2 equal columns
        - Both sections get equal importance and space
      */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="w-full">
          <PartnershipStatsCard />
        </div>
        <div className="w-full">
          <CustomerStatsCard />
        </div>
      </section>
    </div>
  );
} 