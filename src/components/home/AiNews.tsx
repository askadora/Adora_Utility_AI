import React from "react";
import { ChevronRightIcon } from "@/icons";

export const AiNews: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      headline: "OpenAI Announces GPT-5 with Enhanced Reasoning Capabilities",
      source: "AI Today",
      time: "2 hours ago",
      category: "Industry News",
    },
    {
      id: 2,
      headline: "New Study: AI Boosts Productivity by 40% in Knowledge Work",
      source: "Business Tech",
      time: "5 hours ago",
      category: "Research",
    },
    {
      id: 3,
      headline: "Microsoft Integrates Advanced AI Tools into Office Suite",
      source: "Tech Weekly",
      time: "1 day ago",
      category: "Product Updates",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Industry News":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
      case "Research":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400";
      case "Product Updates":
        return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          AI News
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.time}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                  {item.headline}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.source}
                </p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Refresh →
          </button>
        </div>
      </div>
    </div>
  );
}; 