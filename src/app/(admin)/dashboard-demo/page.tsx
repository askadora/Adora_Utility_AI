import type { Metadata } from "next";
import { ResponsiveDashboardLayout } from "@/components/dashboard/ResponsiveDashboardLayout";
import { LayoutDocumentation } from "@/components/dashboard/LayoutDocumentation";
import React from "react";

export const metadata: Metadata = {
  title: "Responsive Dashboard Demo | Adora AI - Layout Showcase",
  description: "Comprehensive responsive dashboard demonstrating CSS Grid and Flexbox layout patterns with Tailwind CSS.",
};

export default function DashboardDemo() {
  return (
    <div className="space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Row direction for title and description alignment
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 md:text-3xl">
          Responsive Dashboard Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          This dashboard demonstrates proper use of CSS Grid for two-dimensional layouts 
          and Flexbox for one-dimensional layouts, with comprehensive responsive design 
          patterns optimized for mobile, tablet, and desktop experiences.
        </p>
      </header>

      {/* 
        MAIN DASHBOARD CONTENT
        - All layout logic is contained within the ResponsiveDashboardLayout component
        - This separation allows for easy reuse and testing of layout patterns
      */}
      <main>
        <ResponsiveDashboardLayout />
      </main>

      {/* 
        LAYOUT DOCUMENTATION SECTION
        - Provides detailed explanation of layout patterns and decisions
        - Educational content for understanding the responsive design approach
      */}
      <section>
        <LayoutDocumentation />
      </section>
    </div>
  );
} 