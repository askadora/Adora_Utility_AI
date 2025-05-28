import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title: "Dashboard | Adora AI - AI-Powered Business Intelligence Platform",
  description: "Comprehensive dashboard for Adora AI's business intelligence and analytics platform.",
};

export default function Dashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Section - Metrics and Target */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Metrics - Takes more space on desktop */}
        <div className="lg:col-span-8">
          <EcommerceMetrics />
        </div>
        {/* Monthly Target - Sidebar on desktop */}
        <div className="lg:col-span-4">
          <MonthlyTarget />
        </div>
      </div>

      {/* Sales Chart - Full width */}
      <div className="w-full">
        <MonthlySalesChart />
      </div>

      {/* Statistics Chart - Full width */}
      <div className="w-full">
        <StatisticsChart />
      </div>

      {/* Bottom Section - Demographics and Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Demographics - Smaller section */}
        <div className="lg:col-span-5">
          <DemographicCard />
        </div>
        {/* Recent Orders - Larger section */}
        <div className="lg:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
} 