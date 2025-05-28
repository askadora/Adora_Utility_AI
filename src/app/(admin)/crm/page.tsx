import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import DealsPipelineChart from "@/components/crm/DealsPipelineChart";
import PartnershipStatsCard from "@/components/crm/PartnershipStatsCard";
import CustomerStatsCard from "@/components/crm/CustomerStatsCard";
// Placeholder imports for charts/tables (implement as needed)
// import RecentActivitiesTable from "@/components/crm/RecentActivitiesTable";

export default function CrmDashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          CRM Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
          Monitor your customer relationships and sales pipeline
        </p>
      </div>
      
      {/* CRM Summary Cards - Responsive grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Total Customers" 
          value="3,200" 
          trend="+4%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="New Deals" 
          value="58" 
          trend="+12%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="Revenue" 
          value="$98,500" 
          trend="+6%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="Lost Deals" 
          value="7" 
          trend="-2%" 
          trendDirection="down" 
        />
      </div>

      {/* Deals Pipeline Chart - Full width with proper spacing */}
      <div className="w-full">
        <DealsPipelineChart />
      </div>

      {/* Partnership & Customer Stats - Responsive grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="w-full">
          <PartnershipStatsCard />
        </div>
        <div className="w-full">
          <CustomerStatsCard />
        </div>
      </div>
    </div>
  );
} 