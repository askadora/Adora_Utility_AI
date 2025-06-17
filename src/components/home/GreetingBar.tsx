"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const GreetingBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || "User";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
            {getGreeting()}, {displayName.split(' ')[0]}! 👋
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ready to explore your data? Try typing a command like "Show me sales trends" or "Create workflow"
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <input
              type="text"
              placeholder="Type a command..."
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 