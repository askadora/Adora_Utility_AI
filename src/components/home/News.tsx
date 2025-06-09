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
  image?: string;
  featured?: boolean;
}

export const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "adora" | "tech">("ai");

  const aiNews: NewsItem[] = [
    {
      id: 1,
      title: "OpenAI Unveils GPT-5: The Most Advanced AI Model Yet",
      source: "TechCrunch",
      timeAgo: "2 hours ago",
      category: "AI",
      excerpt: "Revolutionary breakthrough in artificial intelligence with enhanced reasoning capabilities and multimodal understanding that surpasses human performance in complex tasks.",
      trending: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Google DeepMind's AlphaFold 3 Predicts Protein Structures with 95% Accuracy",
      source: "Nature",
      timeAgo: "4 hours ago",
      category: "Research",
      excerpt: "Breakthrough in protein folding prediction could revolutionize drug discovery.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Meta's LLaMA 3 Outperforms GPT-4 in Coding Benchmarks",
      source: "AI Research",
      timeAgo: "6 hours ago",
      category: "Benchmarks",
      excerpt: "Open-source model achieves state-of-the-art results across programming languages.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Microsoft Copilot AI Assistant Gets Major Update",
      source: "Microsoft",
      timeAgo: "8 hours ago",
      category: "Product",
      excerpt: "Enhanced productivity features and better integration across Office suite.",
    },
    {
      id: 5,
      title: "AI Safety Summit Announces New Global Guidelines",
      source: "Reuters",
      timeAgo: "1 day ago",
      category: "Policy",
      excerpt: "International cooperation on AI regulation and safety standards.",
    },
  ];

  const adoraNews: NewsItem[] = [
    {
      id: 1,
      title: "Adora AI Raises $50M Series B for Enterprise AI Platform Expansion",
      source: "Adora AI",
      timeAgo: "2 hours ago",
      category: "Funding",
      excerpt: "Major funding round will accelerate development of industry-specific AI solutions and drive global expansion into new markets across healthcare, finance, and manufacturing sectors.",
      trending: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "New Partnership: Adora AI Integrates with Microsoft Azure OpenAI",
      source: "Business Wire",
      timeAgo: "1 day ago",
      category: "Partnership",
      excerpt: "Strategic integration brings enterprise-grade AI capabilities to Azure customers.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Adora AI Launches Industry-First Ethical AI Governance Framework",
      source: "Adora AI",
      timeAgo: "2 days ago",
      category: "Innovation",
      excerpt: "Comprehensive framework ensures responsible AI deployment across enterprises.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "Adora AI CEO Named to Fortune's AI Leaders List",
      source: "Fortune",
      timeAgo: "3 days ago",
      category: "Recognition",
      excerpt: "Recognition for pioneering work in enterprise AI transformation.",
    },
    {
      id: 5,
      title: "New Adora AI Regional Hub Opens in Singapore",
      source: "Adora AI",
      timeAgo: "1 week ago",
      category: "Expansion",
      excerpt: "Strategic expansion into Asian markets with new development center.",
    },
  ];

  const techNews: NewsItem[] = [
    {
      id: 1,
      title: "Apple Vision Pro 2 Rumored with Revolutionary Neural Processing Chip",
      source: "Bloomberg",
      timeAgo: "1 hour ago",
      category: "Hardware",
      excerpt: "Next-generation mixed reality headset expected to feature groundbreaking AI chip architecture that enables real-time neural processing and advanced spatial computing capabilities.",
      trending: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=600&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Tesla's FSD Beta Achieves 99.8% Safety Rating in Independent Study",
      source: "Reuters",
      timeAgo: "3 hours ago",
      category: "Autonomous",
      excerpt: "Comprehensive analysis shows significant improvement in real-world scenarios.",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "IBM Unveils 1000-Qubit Quantum Processor Breakthrough",
      source: "MIT Technology Review",
      timeAgo: "5 hours ago",
      category: "Quantum",
      excerpt: "Major milestone toward practical quantum computing applications.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 4,
      title: "NVIDIA's Next-Gen AI Chips Deliver 10x Performance Boost",
      source: "TechCrunch",
      timeAgo: "8 hours ago",
      category: "Hardware",
      excerpt: "Revolutionary architecture promises unprecedented AI training speeds.",
    },
    {
      id: 5,
      title: "SpaceX Starlink Satellites Get AI-Powered Internet Optimization",
      source: "Space News",
      timeAgo: "12 hours ago",
      category: "Space Tech",
      excerpt: "Machine learning algorithms improve global internet coverage efficiency.",
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

  const currentNews = getCurrentNews();
  const featuredStory = currentNews.find(item => item.featured);
  const trendingStories = currentNews.slice(0, 5);
  const secondaryStories = currentNews.filter(item => !item.featured && item.image).slice(0, 3);

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

      {/* Main News Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Trending Sidebar */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">Trending</h4>
          </div>
          <div className="space-y-4">
            {trendingStories.map((story, index) => (
              <div key={story.id} className="flex gap-3 group cursor-pointer">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-1 transition-colors">
                    {story.title}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{story.source}</span>
                    <span>•</span>
                    <span>{story.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        <div className="lg:col-span-3">
          {featuredStory && (
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <div className="aspect-[16/9] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                {featuredStory.image ? (
                  <img 
                    src={featuredStory.image} 
                    alt={featuredStory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(featuredStory.category)}`}>
                      {featuredStory.category}
                    </span>
                    <span className="text-white/80 text-xs">{featuredStory.source}</span>
                    <span className="text-white/60 text-xs">•</span>
                    <span className="text-white/80 text-xs">{featuredStory.timeAgo}</span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {featuredStory.title}
                  </h2>
                  <p className="text-white/90 text-sm line-clamp-2">
                    {featuredStory.excerpt}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Secondary Stories and Events */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Secondary Stories - First 2 columns */}
        {secondaryStories.slice(0, 2).map((story) => (
          <div key={story.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-3">
              <div className="aspect-[4/3] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                {story.image ? (
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(story.category)}`}>
                {story.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{story.timeAgo}</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white/90 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-2 transition-colors">
              {story.title}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {story.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {story.source}
              </span>
              <ChevronRightIcon className="w-3 h-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </div>
        ))}

        {/* Events Section - Last 2 columns */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg border border-blue-100 dark:border-blue-800/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  Upcoming Events
                </h4>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-500/15 dark:text-blue-400 font-medium">
                12 spots left
              </span>
            </div>
            
            <div className="mb-4 space-y-3">
              {/* First Event */}
              <div className="p-3 bg-white/80 dark:bg-gray-800/40 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full dark:bg-purple-500/20 dark:text-purple-400 font-medium">
                        Workshop
                      </span>
                    </div>
                    
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white/90 mb-2">
                      Adora AI Workshop: Advanced Prompt Engineering
                    </h5>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                      Learn advanced techniques for crafting effective prompts and optimizing AI workflows.
                    </p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        December 28, 2024 • 2:00 PM - 5:00 PM PST
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Tech Hub Downtown, San Francisco, CA
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Event */}
              <div className="p-3 bg-white/80 dark:bg-gray-800/40 rounded-lg border border-green-200/50 dark:border-green-800/30">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full dark:bg-green-500/20 dark:text-green-400 font-medium">
                        Webinar
                      </span>
                    </div>
                    
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-white/90 mb-2">
                      AI Integration for Enterprise Teams
                    </h5>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                      Strategic insights on implementing AI solutions in large organizations.
                    </p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        January 5, 2025 • 11:00 AM - 12:00 PM PST
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        Virtual Event • Online
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                View all events →
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Trending:</span>
              <div className="flex gap-1">
                {currentNews.filter(item => item.trending).map((_, index) => (
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