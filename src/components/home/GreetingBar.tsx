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
            Ready to explore your data? Press and speak to ask Adora for help with anything!
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Ask Adora Voice Button */}
          <div className="relative group">
            <button
              className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl border-transparent transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
            
            {/* Comprehensive Tooltip */}
            <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <div className="font-semibold text-purple-300 mb-2">🎤 Press and Speak to Adora</div>
              <div className="space-y-2 text-xs">
                <div><strong>Search:</strong> "Find my sales reports" or "Show workflow templates"</div>
                <div><strong>Navigate:</strong> "Take me to dashboard" or "Open settings"</div>
                <div><strong>Features:</strong> "How do I create a workflow?" or "What's new today?"</div>
                <div><strong>Customize:</strong> "Change theme to dark mode" or "Add a KPI widget"</div>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                Natural language AI assistant powered by Adora
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 