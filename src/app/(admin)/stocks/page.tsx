import React from "react";
import KpiSummaryCard from "@/components/kpi/KpiSummaryCard";
import PriceHistoryTable from "@/components/stock/PriceHistoryTable";
import TradingStats from "@/components/stock/TradingStats";
import CompanyOverview from "@/components/stock/CompanyOverview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Adora AI",
  description: "Stock market dashboard for Adora AI",
};

export default function StocksDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Stock Dashboard
      </h1>
      
      {/* Stock Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <KpiSummaryCard 
          title="Current Price" 
          value="$165.23" 
          trend="+2.13%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="Market Cap" 
          value="2.61T" 
          trend="+5.2%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="Volume" 
          value="72.39M" 
          trend="+12%" 
          trendDirection="up" 
        />
        <KpiSummaryCard 
          title="EPS" 
          value="$5.90" 
          trend="+8%" 
          trendDirection="up" 
        />
      </div>

      {/* Price History Table */}
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <PriceHistoryTable />
      </div>

      {/* Trading Stats & Company Info */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <TradingStats />
        <CompanyOverview />
      </div>
    </div>
  );
} 