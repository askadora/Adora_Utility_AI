"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-[200px] flex items-center justify-center">Loading...</div>
});

export const AdoptionMeter: React.FC = () => {
  const series = [68]; // Hard-coded to 68%
  
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 200,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "75%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "28px",
            fontWeight: "600",
            offsetY: -25,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
          Feature Adoption
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
          Your team's progress
        </p>
        
        <div className="w-full max-w-[200px]">
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={200}
          />
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Great progress! 7 of 12 features explored
          </p>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
          Suggested Next Steps
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-500/15 rounded-md flex-shrink-0">
              <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-900 dark:text-white/90">
                Try Advanced Analytics
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Explore deeper insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-500/15 rounded-md flex-shrink-0">
              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-900 dark:text-white/90">
                Set up Automation
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Streamline workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-center w-6 h-6 bg-purple-100 dark:bg-purple-500/15 rounded-md flex-shrink-0">
              <svg className="w-3 h-3 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-900 dark:text-white/90">
                Invite Team Members
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Collaborate more effectively
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
            View all features →
          </button>
        </div>
      </div>
    </div>
  );
}; 