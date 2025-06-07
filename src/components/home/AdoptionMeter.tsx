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
    </div>
  );
}; 