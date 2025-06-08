"use client";
import React, { useState } from "react";
import { PlusIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from "@/icons";

interface Meeting {
  id: number;
  title: string;
  time: string;
  attendees: string;
  completed: boolean;
}

export const QuickActions: React.FC = () => {
  const [isServiceHealthExpanded, setIsServiceHealthExpanded] = useState(false);
  const [isAgendaExpanded, setIsAgendaExpanded] = useState(false);
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

  const services = [
    { name: "API Gateway", status: "operational", uptime: "99.9%" },
    { name: "Database", status: "operational", uptime: "100%" },
    { name: "Authentication", status: "operational", uptime: "99.8%" },
    { name: "File Storage", status: "operational", uptime: "99.9%" },
    { name: "Analytics Engine", status: "operational", uptime: "100%" },
  ];

  const actions = [
    {
      id: 1,
      label: "New Workflow",
      icon: PlusIcon,
      variant: "primary" as const,
      onClick: () => console.log("New Workflow clicked"),
    },
    {
      id: 2,
      label: "Upload CSV",
      icon: ArrowUpIcon,
      variant: "secondary" as const,
      onClick: () => console.log("Upload CSV clicked"),
    },
    {
      id: 3,
      label: "Ask Adora",
      icon: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      variant: "accent" as const,
      onClick: () => console.log("Ask Adora clicked"),
    },
  ];

  const getButtonStyles = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700";
      case "secondary":
        return "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
      case "accent":
        return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-transparent";
      default:
        return "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300";
    }
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Quick Actions
          </h3>
          
          <div className="flex items-center gap-4">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 ${getButtonStyles(action.variant)}`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>

            {/* Learning Progress Widget */}
            <div className="flex items-center gap-3 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
              <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Prompt Engineering 101
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">30%</span>
                </div>
              </div>
            </div>

            {/* Today's Agenda Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAgendaExpanded(!isAgendaExpanded)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Today's Agenda
                </span>
                {isAgendaExpanded ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>

              {/* Today's Agenda Dropdown */}
              {isAgendaExpanded && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                        Today's Agenda
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
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
                            className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                              meeting.completed
                                ? 'border-green-500 bg-green-500 text-white'
                                : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                            }`}
                          >
                            {meeting.completed && (
                              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <h5 className={`text-xs font-medium mb-1 ${
                              meeting.completed 
                                ? 'text-gray-600 line-through dark:text-gray-400' 
                                : 'text-gray-900 dark:text-white/90'
                            }`}>
                              {meeting.title}
                            </h5>
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
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        View full calendar →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service Health Status */}
            <div className="relative">
              <button
                onClick={() => setIsServiceHealthExpanded(!isServiceHealthExpanded)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium dark:text-green-400">
                  All systems operational
                </span>
                {isServiceHealthExpanded ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>

            {/* Service Health Dropdown */}
            {isServiceHealthExpanded && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      Service Health
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {service.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {service.uptime}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full dark:bg-green-500/15 dark:text-green-400">
                            Operational
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
                <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
              Quick Actions
            </h3>
            
            {/* Mobile Today's Agenda and Service Health */}
            <div className="flex items-center gap-2">
              {/* Mobile Today's Agenda */}
              <div className="relative">
                <button
                  onClick={() => setIsAgendaExpanded(!isAgendaExpanded)}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Agenda
                  </span>
                  {isAgendaExpanded ? (
                    <ChevronUpIcon className="w-3 h-3" />
                  ) : (
                    <ChevronDownIcon className="w-3 h-3" />
                  )}
                </button>

                {/* Mobile Today's Agenda Dropdown */}
                {isAgendaExpanded && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                          Today's Agenda
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {meetings.map((meeting) => (
                          <div 
                            key={meeting.id}
                            className={`flex items-start gap-2 p-2 rounded-lg border transition-all ${
                              meeting.completed 
                                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-500/10' 
                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                            }`}
                          >
                            <button
                              onClick={() => toggleMeeting(meeting.id)}
                              className={`flex-shrink-0 w-3 h-3 rounded border-2 flex items-center justify-center transition-colors ${
                                meeting.completed
                                  ? 'border-green-500 bg-green-500 text-white'
                                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                              }`}
                            >
                              {meeting.completed && (
                                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            
                            <div className="flex-1">
                              <h5 className={`text-xs font-medium mb-1 ${
                                meeting.completed 
                                  ? 'text-gray-600 line-through dark:text-gray-400' 
                                  : 'text-gray-900 dark:text-white/90'
                              }`}>
                                {meeting.title}
                              </h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {meeting.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                          View full calendar →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Service Health Status */}
              <div className="relative">
                <button
                  onClick={() => setIsServiceHealthExpanded(!isServiceHealthExpanded)}
                  className="flex items-center gap-2 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium dark:text-green-400">
                    All operational
                  </span>
                  {isServiceHealthExpanded ? (
                    <ChevronUpIcon className="w-3 h-3" />
                  ) : (
                    <ChevronDownIcon className="w-3 h-3" />
                  )}
                </button>

            {/* Mobile Service Health Dropdown */}
            {isServiceHealthExpanded && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      Service Health
                    </h4>
                  </div>
                  
                  <div className="space-y-2">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {service.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {service.uptime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
          </div>

          {/* Mobile Combined Row - Learning Progress + Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Mobile Learning Progress Widget */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg border border-green-200 dark:border-green-500/20">
              <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Prompt Engineering 101
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">30%</span>
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 ${getButtonStyles(action.variant)}`}
                >
                  <action.icon className="w-4 h-4" />
                  <span className="truncate">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 