"use client";
import React, { useState } from "react";

interface Meeting {
  id: number;
  title: string;
  time: string;
  attendees: string;
  completed: boolean;
}

export const Agenda: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      title: "Product Strategy Review",
      time: "9:00 AM - 10:00 AM",
      attendees: "Sarah, Mike, David",
      completed: false,
    },
    {
      id: 2,
      title: "Customer Feedback Session",
      time: "2:00 PM - 3:00 PM",
      attendees: "Emma, John",
      completed: false,
    },
    {
      id: 3,
      title: "Sprint Planning",
      time: "4:00 PM - 5:00 PM",
      attendees: "Dev Team",
      completed: true,
    },
  ]);

  const toggleMeeting = (id: number) => {
    setMeetings(prev => 
      prev.map(meeting => 
        meeting.id === id ? { ...meeting, completed: !meeting.completed } : meeting
      )
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Today's Agenda
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
              meeting.completed 
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-500/10' 
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <button
              onClick={() => toggleMeeting(meeting.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                meeting.completed
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
              }`}
            >
              {meeting.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <div className="flex-1">
              <h4 className={`text-sm font-medium mb-1 ${
                meeting.completed 
                  ? 'text-gray-600 line-through dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white/90'
              }`}>
                {meeting.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {meeting.time}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {meeting.attendees}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          View full calendar →
        </button>
      </div>
    </div>
  );
}; 