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
        PAGE HEADER - Consistent with other pages
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
            Focus Mode
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Stay focused on what matters most. Use this distraction-free environment to work through your tasks with the help of a Pomodoro timer.
          </p>
        </div>
      </header>

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