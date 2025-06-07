import React from "react";

export const Events: React.FC = () => {
  const nextEvent = {
    title: "Adora AI Workshop: Advanced Prompt Engineering",
    date: "December 28, 2024",
    time: "2:00 PM - 5:00 PM PST",
    location: "San Francisco, CA",
    venue: "Tech Hub Downtown",
    type: "Workshop",
    spotsLeft: 12,
    description: "Learn advanced techniques for crafting effective prompts and optimizing AI workflows.",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Events
        </h3>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-500/15 dark:text-blue-400 font-medium">
          {nextEvent.spotsLeft} spots left
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Next Adora AI event in your area
        </p>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            {/* Event Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full dark:bg-purple-500/20 dark:text-purple-400 font-medium">
                  {nextEvent.type}
                </span>
              </div>
              
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white/90 mb-2">
                {nextEvent.title}
              </h4>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                {nextEvent.description}
              </p>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {nextEvent.date} • {nextEvent.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {nextEvent.venue}, {nextEvent.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          View all events →
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
          Register Now
        </button>
      </div>
    </div>
  );
}; 