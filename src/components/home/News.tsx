"use client";
import React, { useState } from "react";
import { ChevronRightIcon } from "@/icons";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  excerpt?: string;
  trending?: boolean;
}

export const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "adora" | "tech">("ai");

  const aiNews: NewsItem[] = [
    {
      id: 1,
      title: "Google DeepMind Announces Breakthrough in Protein Folding Prediction",
      source: "Nature",
      timeAgo: "1 hour ago",
      category: "Research",
      excerpt: "Revolutionary AlphaFold 3 demonstrates 95% accuracy in complex protein structure predictions.",
      trending: true,
    },
    {
      id: 2,
      title: "OpenAI Introduces GPT-5 with Enhanced Multimodal Capabilities",
      source: "TechCrunch",
      timeAgo: "3 hours ago",
      category: "Product Launch",
      excerpt: "New model shows significant improvements in reasoning and real-time processing.",
    },
    {
      id: 3,
      title: "Meta's LLaMA 3 Outperforms GPT-4 in Coding Benchmarks",
      source: "AI Research",
      timeAgo: "5 hours ago",
      category: "Benchmarks",
      excerpt: "Open-source model achieves state-of-the-art results across multiple programming languages.",
    },
  ];

  const adoraNews: NewsItem[] = [
    {
      id: 1,
      title: "Adora AI Raises $50M Series B for Enterprise AI Platform Expansion",
      source: "Adora AI",
      timeAgo: "2 hours ago",
      category: "Company News",
      excerpt: "Funding will accelerate development of industry-specific AI solutions and global expansion.",
      trending: true,
    },
    {
      id: 2,
      title: "New Partnership: Adora AI Integrates with Microsoft Azure OpenAI",
      source: "Adora AI",
      timeAgo: "1 day ago",
      category: "Partnerships",
      excerpt: "Seamless integration brings enterprise-grade AI capabilities to Azure customers.",
    },
    {
      id: 3,
      title: "Adora AI Launches Industry-First Ethical AI Governance Framework",
      source: "Adora AI",
      timeAgo: "2 days ago",
      category: "Innovation",
      excerpt: "Comprehensive framework ensures responsible AI deployment across all enterprise use cases.",
    },
  ];

  const techNews: NewsItem[] = [
    {
      id: 1,
      title: "Apple Vision Pro 2 Rumored with Advanced Neural Processing Unit",
      source: "Bloomberg",
      timeAgo: "30 minutes ago",
      category: "Hardware",
      excerpt: "Next-generation headset expected to feature dedicated AI chip for real-time computations.",
      trending: true,
    },
    {
      id: 2,
      title: "Tesla's FSD Beta Achieves 99.8% Safety Rating in Independent Study",
      source: "Reuters",
      timeAgo: "2 hours ago",
      category: "Autonomous Vehicles",
      excerpt: "Comprehensive analysis shows significant improvement in real-world driving scenarios.",
    },
    {
      id: 3,
      title: "Quantum Computing Breakthrough: IBM Unveils 1000-Qubit Processor",
      source: "MIT Technology Review",
      timeAgo: "4 hours ago",
      category: "Quantum Computing",
      excerpt: "New processor marks major milestone toward practical quantum computing applications.",
    },
  ];

  const getCurrentNews = () => {
    switch (activeTab) {
      case "ai": return aiNews;
      case "adora": return adoraNews;
      case "tech": return techNews;
      default: return aiNews;
    }
  };

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "ai": return "General AI";
      case "adora": return "Adora AI";
      case "tech": return "Tech Trends";
      default: return "General AI";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Research": "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
      "Product Launch": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
      "Benchmarks": "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
      "Company News": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",
      "Partnerships": "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
      "Innovation": "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400",
      "Hardware": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
      "Autonomous Vehicles": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
      "Quantum Computing": "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
    };
    return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Latest News
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-900 mb-6">
        {["ai", "adora", "tech"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "ai" | "adora" | "tech")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            {getTabLabel(tab)}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getCurrentNews().map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative p-4 border border-gray-200 rounded-lg hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-all">
              {item.trending && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.timeAgo}
                </span>
              </div>
              
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                {item.title}
              </h4>
              
              {item.excerpt && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {item.excerpt}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {item.source}
                </span>
                <ChevronRightIcon className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Trending:</span>
              <div className="flex gap-1">
                {getCurrentNews().filter(item => item.trending).map((_, index) => (
                  <div key={index} className="w-1 h-1 bg-red-500 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View all news →
          </button>
        </div>
      </div>
    </div>
  );
}; 