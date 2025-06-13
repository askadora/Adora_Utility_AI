"use client";
import React from "react";
import { useTimer } from "@/context/TimerContext";

const NavTimer: React.FC = () => {
  const { timer } = useTimer();

  // Don't show anything if timer is not active
  if (!timer.isActive) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getModeColor = () => {
    switch (timer.mode) {
      case "shortWork":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      case "longWork":
        return "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800";
      case "shortBreak":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "longBreak":
        return "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const getModeLabel = () => {
    switch (timer.mode) {
      case "shortWork":
        return "Quick Work";
      case "longWork":
        return "Focus Work";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return "Timer";
    }
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getModeColor()}`}>
      {/* Timer Icon */}
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      
      {/* Mode and Time */}
      <div className="flex flex-col">
        <span className="text-xs font-medium leading-none">
          {getModeLabel()}
        </span>
        <span className="text-sm font-bold leading-none mt-0.5">
          {formatTime(timer.timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default NavTimer; 