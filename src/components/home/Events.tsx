"use client";
import React from "react";

interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  color: string;
  spotsLeft?: number;
}

export const Events: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "Adora AI Workshop: Advanced Prompt Engineering",
      category: "Workshop",
      description: "Learn advanced techniques for crafting effective prompts and optimizing AI workflows.",
      date: "December 28, 2024",
      time: "2:00 PM - 5:00 PM PST",
      location: "Tech Hub Downtown, San Francisco, CA",
      isVirtual: false,
      color: "from-blue-500 to-purple-600",
      spotsLeft: 12
    },
    {
      id: 2,
      title: "AI Integration for Enterprise Teams",
      category: "Webinar",
      description: "Strategic insights on implementing AI solutions in large organizations.",
      date: "January 5, 2025",
      time: "11:00 AM - 12:00 PM PST",
      location: "Virtual Event • Online",
      isVirtual: true,
      color: "from-green-500 to-emerald-600",
      spotsLeft: 45
    },
    {
      id: 3,
      title: "Adora AI Product Showcase & Demo",
      category: "Demo",
      description: "Get hands-on experience with our latest AI features and platform updates.",
      date: "January 12, 2025",
      time: "1:00 PM - 3:00 PM PST",
      location: "Adora AI Headquarters, Palo Alto, CA",
      isVirtual: false,
      color: "from-orange-500 to-red-600",
      spotsLeft: 8
    },
    {
      id: 4,
      title: "Future of AI in Business: Panel Discussion",
      category: "Panel",
      description: "Industry leaders discuss emerging trends and the future of AI in business transformation.",
      date: "January 20, 2025",
      time: "3:00 PM - 4:30 PM PST",
      location: "Virtual Event • Online",
      isVirtual: true,
      color: "from-purple-500 to-pink-600",
      spotsLeft: 150
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Workshop: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
      Webinar: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
      Demo: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
      Panel: "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Upcoming Events
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-500/15 dark:text-blue-400 font-medium">
            {events.reduce((sum, event) => sum + (event.spotsLeft || 0), 0)} spots left
          </span>
        </div>
      </div>

      {/* Events Grid - 4 across */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {events.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg border border-blue-100 dark:border-blue-800/50 p-4 h-full hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-r ${event.color} rounded-lg flex-shrink-0`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    {event.spotsLeft && event.spotsLeft <= 15 && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full dark:bg-red-500/15 dark:text-red-400 font-medium">
                        {event.spotsLeft} left
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white/90 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h5>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="line-clamp-1">{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {event.isVirtual ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </>
                      )}
                    </svg>
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Registration closes 24 hours before each event
            </span>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View all events →
          </button>
        </div>
      </div>
    </div>
  );
}; 