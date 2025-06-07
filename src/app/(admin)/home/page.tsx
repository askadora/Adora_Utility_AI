import type { Metadata } from "next";
import React from "react";
import { GreetingBar } from "@/components/home/GreetingBar";
import { AdoptionMeter } from "@/components/home/AdoptionMeter";
import { ReleaseNotes } from "@/components/home/ReleaseNotes";
import { KpiSummary } from "@/components/home/KpiSummary";
import { AiInsights } from "@/components/home/AiInsights";
import { LmsProgress } from "@/components/home/LmsProgress";
import { SalesChart } from "@/components/home/SalesChart";
import { ServiceHealth } from "@/components/home/ServiceHealth";
import { Agenda } from "@/components/home/Agenda";
import { AiNews } from "@/components/home/AiNews";
import { CommunityFeed } from "@/components/home/CommunityFeed";
import { QuickActions } from "@/components/home/QuickActions";
import { Events } from "@/components/home/Events";
import { News } from "@/components/home/News";

export const metadata: Metadata = {
  title: "Home | Adora AI - AI-Powered Business Intelligence Platform",
  description: "Welcome to Adora AI's home page - your central hub for AI-powered business intelligence.",
};

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - Consistent with other pages
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
            Home Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Welcome to your AI-powered business intelligence platform. Monitor key metrics, stay updated with latest features, and access your most important tools.
          </p>
        </div>
      </header>

      {/* GREETING BAR */}
      <GreetingBar />

      {/* NEWS SECTION */}
      <News />

      {/* TOP ROW - ADOPTION METER, EVENTS AND RELEASE NOTES */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-1 space-y-6">
          <AdoptionMeter />
          <Events />
        </div>
        <div className="lg:col-span-2 flex">
          <div className="w-full">
            <ReleaseNotes />
          </div>
        </div>
      </div>

      {/* KPI SUMMARY ROW */}
      <KpiSummary />

      {/* AI INSIGHTS AND LMS PROGRESS ROW */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AiInsights />
        <LmsProgress />
      </div>

      {/* SALES CHART - FULL WIDTH */}
      <SalesChart />

      {/* SERVICE HEALTH AND AGENDA ROW */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ServiceHealth />
        <Agenda />
      </div>

      {/* AI NEWS AND COMMUNITY FEED ROW */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AiNews />
        <CommunityFeed />
      </div>

      {/* QUICK ACTIONS - FIXED BOTTOM ON MOBILE */}
      <QuickActions />
    </div>
  );
} 