import type { Metadata } from "next";
import React from "react";
import TaskCarousel from "@/components/focus/TaskCarousel";
import PomodoroTimer from "@/components/focus/PomodoroTimer";

export const metadata: Metadata = {
  title: "Focus | Adora AI - Stay Focused and Productive",
  description: "Focus mode to help you concentrate on your most important tasks with minimal distractions.",
};

export default function Focus() {
  return (
    <>
      {/* 
        PAGE HEADER - Framed container matching home page style
        - Rounded container with subtle border and hover effects
      */}
      <div className="flex-none mb-6">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
                Focus Mode
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                Stay focused on what matters most. Use this distraction-free environment to work through your tasks with the help of a Pomodoro timer.
              </p>
            </div>
            
            {/* Ask Adora Voice Button */}
            <div className="flex-shrink-0 ml-6">
              <button
                className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl border-transparent transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                title="Ask Adora to help prioritize your tasks"
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
              
              {/* Usage hint */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center max-w-32">
                Say "reprioritize tasks" or "show urgent items"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Carousel and Pomodoro Timer Row */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-[70vh] max-h-[600px]">
        {/* Task Carousel - 70% */}
        <div className="lg:flex-[0.7] flex flex-col min-h-0">
          <TaskCarousel />
        </div>

        {/* Pomodoro Timer - 30% */}
        <div className="lg:flex-[0.3] flex flex-col min-h-0">
          <PomodoroTimer />
        </div>
      </div>
    </>
  );
} 