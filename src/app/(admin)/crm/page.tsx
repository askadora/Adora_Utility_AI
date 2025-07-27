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
        PAGE HEADER - Framed container matching home page style
        - Rounded container with subtle border and hover effects
      */}
      <div className="flex-none mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
                CRM Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Monitor your customer relationships and sales pipeline to identify opportunities 
                and drive business growth.
              </p>
            </div>
            
            {/* Ask Adora Voice Button */}
            <div className="relative group flex-shrink-0 ml-6">
              <button
                className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl border-transparent transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {/* Microphone Icon */}
                <div className="relative">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                  
                  {/* Pulse animation overlay for when recording */}
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
                
                {/* Text */}
                <span className="text-sm font-medium">Ask Adora</span>
                
                {/* Voice waves animation (hidden by default, shown when listening) */}
                <div className="hidden group-active:flex items-center gap-1 ml-2">
                  <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse"></div>
                  <div className="w-1 h-5 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-4 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </button>
              
              {/* CRM-specific Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="font-semibold text-purple-300 mb-2">🎤 Ask Adora for CRM Insights</div>
                <div className="space-y-2 text-xs">
                  <div><strong>Analyze:</strong> "Show me top performing customers" or "Find sales trends"</div>
                  <div><strong>Prospects:</strong> "Who should I follow up with?" or "Find warm leads"</div>
                  <div><strong>Reports:</strong> "Generate monthly sales report" or "Show pipeline health"</div>
                  <div><strong>Opportunities:</strong> "Identify upsell chances" or "Find at-risk accounts"</div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                  AI-powered CRM intelligence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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