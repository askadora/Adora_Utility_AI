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
      {/* 
        TOP SECTION - CSS Grid Layout (2D)
        - Mobile: Single column stack
        - Tablet: 2 columns with equal width
        - Desktop: 8/4 column split for better visual hierarchy
        - Using gap instead of margin for cleaner spacing
      */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* 
          METRICS SECTION - Takes priority space on larger screens
          - Mobile/Tablet: Full width
          - Desktop: 8/12 columns (66.7% width)
        */}
        <div className="md:col-span-1 lg:col-span-8">
          <EcommerceMetrics />
        </div>
        
        {/* 
          MONTHLY TARGET - Sidebar positioning on desktop
          - Mobile/Tablet: Full width, stacks below metrics
          - Desktop: 4/12 columns (33.3% width), aligned to right
        */}
        <div className="md:col-span-1 lg:col-span-4">
          <MonthlyTarget />
        </div>
      </section>

      {/* 
        CHARTS SECTION - Full width containers
        - Using CSS Grid for consistent spacing
        - Each chart gets full container width for optimal data visualization
        - Responsive spacing with gap utilities
      */}
      <section className="grid grid-cols-1 gap-6 md:gap-8">
        {/* 
          SALES CHART - Primary chart, full width
          - Critical business data gets maximum screen real estate
        */}
        <div className="w-full">
          <MonthlySalesChart />
        </div>

        {/* 
          STATISTICS CHART - Secondary chart, full width
          - Maintains consistent width with sales chart for visual harmony
        */}
        <div className="w-full">
          <StatisticsChart />
        </div>
      </section>

      {/* 
        BOTTOM SECTION - CSS Grid Layout (2D)
        - Mobile: Single column stack (demographics first for mobile UX)
        - Tablet: 2 equal columns
        - Desktop: 5/7 column split (demographics smaller, orders larger)
        - Orders get more space as they contain tabular data
      */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* 
          DEMOGRAPHICS - Compact data visualization
          - Mobile: Full width, appears first (important for mobile users)
          - Desktop: 5/12 columns (41.7% width)
        */}
        <div className="order-1 md:order-1 lg:col-span-5">
          <DemographicCard />
        </div>
        
        {/* 
          RECENT ORDERS - Data table needs more horizontal space
          - Mobile: Full width, appears second
          - Desktop: 7/12 columns (58.3% width) for better table readability
        */}
        <div className="order-2 md:order-2 lg:col-span-7">
          <RecentOrders />
        </div>
      </section>
    </div>
  );
} 