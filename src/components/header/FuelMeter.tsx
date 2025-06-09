"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

interface FuelMeterProps {
  usagePercent: number;
}

interface UsageData {
  used: number;
  quota: number;
}

// Fetcher function for SWR
const fetcher = async (url: string): Promise<UsageData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
};

export const FuelMeter: React.FC<FuelMeterProps> = ({ usagePercent: fallbackPercent }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();
  
  // Fetch usage data with SWR, refresh every 60 seconds
  const { data, error } = useSWR('/api/usage', fetcher, {
    refreshInterval: 60000, // 60 seconds
  });

  // Handle click to navigate to Usage & Billing settings
  const handleClick = () => {
    router.push('/settings?tab=usage-billing');
  };

  // Calculate usage percentage
  let usagePercent = fallbackPercent;
  let used = Math.round((fallbackPercent / 100) * 1000);
  let quota = 1000;

  if (data && !error) {
    usagePercent = Math.round((data.used / data.quota) * 100);
    used = data.used;
    quota = data.quota;
  }

  // Calculate progressive color based on usage
  const getProgressiveColor = (percent: number) => {
    if (percent <= 70) {
      // Green to amber transition (0-70%)
      const ratio = percent / 70;
      const red = Math.round(16 + (245 - 16) * ratio);
      const green = Math.round(185 + (158 - 185) * ratio);
      const blue = Math.round(129 + (11 - 129) * ratio);
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // Amber to red transition (70-100%)
      const ratio = (percent - 70) / 30;
      const red = Math.round(245 + (239 - 245) * ratio);
      const green = Math.round(158 + (68 - 158) * ratio);
      const blue = Math.round(11 + (68 - 11) * ratio);
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  const progressColor = getProgressiveColor(usagePercent);
  
  // SVG circle calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (usagePercent / 100) * circumference;

  return (
    <button 
      className="relative flex items-center justify-center w-11 h-11 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onClick={handleClick}
      role="button"
      aria-label="View usage details and billing - AI usage meter"
      type="button"
    >
      {/* Background Circle */}
      <svg 
        className="absolute inset-0 w-full h-full transform -rotate-90" 
        viewBox="0 0 44 44"
      >
        {/* Background track */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="opacity-10"
        />
        {/* Progress ring */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          stroke={progressColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
        />
      </svg>
      
      {/* Percentage Text */}
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 relative z-10">
        {usagePercent}%
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap dark:bg-gray-800 shadow-lg">
            <div className="font-medium">
              {used.toLocaleString()} / {quota.toLocaleString()} Capacity Units
            </div>
            <div className="text-gray-300 dark:text-gray-400">
              {usagePercent}% of monthly allowance
            </div>
            <div className="text-gray-400 dark:text-gray-500 text-xs mt-1 border-t border-gray-700 pt-1">
              Click to view billing details
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-800"></div>
          </div>
        </div>
      )}
    </button>
  );
}; 