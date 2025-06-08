import type { Metadata } from "next";
import React from "react";
import { GreetingBar } from "@/components/home/GreetingBar";
import { AdoptionMeter } from "@/components/home/AdoptionMeter";
import { ReleaseNotes } from "@/components/home/ReleaseNotes";
import { KpiSummary } from "@/components/home/KpiSummary";


import { Agenda } from "@/components/home/Agenda";

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
      {/* GREETING BAR */}
      <GreetingBar />

      {/* KPI CARDS - 3 COLUMN LAYOUT */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {/* Revenue KPI */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/15 flex-shrink-0">
            <svg className="size-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Revenue</span>
            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">$124,532</h4>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full dark:bg-green-500/15 dark:text-green-400 w-fit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12.4%
            </span>
          </div>
        </div>

        {/* Orders KPI */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex-shrink-0">
            <svg className="size-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Orders</span>
            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">2,847</h4>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full dark:bg-red-500/15 dark:text-red-400 w-fit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              -3.2%
            </span>
          </div>
        </div>

        {/* Conversion Rate KPI */}
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/15 flex-shrink-0">
            <svg className="size-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</span>
            <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">3.24%</h4>
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full dark:bg-green-500/15 dark:text-green-400 w-fit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +0.8%
            </span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <QuickActions />

      {/* NEWS SECTION */}
      <News />

      {/* BOTTOM ROW - COMMUNITY FEED, FEATURE ADOPTION, AND RELEASE NOTES */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-1">
          <CommunityFeed />
        </div>
        <div className="lg:col-span-1">
          <AdoptionMeter />
        </div>
        <div className="lg:col-span-1">
          <ReleaseNotes />
        </div>
      </div>


    </div>
  );
} 