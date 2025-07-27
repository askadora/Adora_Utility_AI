import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title: "Projections | Adora AI - AI-Powered Business Intelligence Platform",
  description: "Advanced financial projections and forecasting powered by Adora AI's analytics engine.",
};

export default function Projections() {
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
                Projections Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Advanced financial projections and forecasting powered by Adora AI's analytics engine 
                to help you make informed business decisions.
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
              
              {/* Projections-specific Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="font-semibold text-purple-300 mb-2">📈 Ask Adora for Projection Insights</div>
                <div className="space-y-2 text-xs">
                  <div><strong>Forecasts:</strong> "Generate revenue projections" or "Predict market trends"</div>
                  <div><strong>Scenarios:</strong> "Model different growth rates" or "Compare strategies"</div>
                  <div><strong>Analysis:</strong> "Explain projection methodology" or "Show confidence intervals"</div>
                  <div><strong>Planning:</strong> "Set realistic targets" or "Identify key drivers"</div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                  AI-powered forecasting assistant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
        <div className="col-span-12">
          <StatisticsChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
} 