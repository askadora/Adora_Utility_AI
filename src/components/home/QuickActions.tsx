"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusIcon, ArrowUpIcon } from "@/icons";

export const QuickActions: React.FC = () => {
  const router = useRouter();
  const [isServiceHealthExpanded, setIsServiceHealthExpanded] = useState(false);

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
      onClick: () => router.push("/workflow"),
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
      onClick: () => router.push("/prompt/chat"),
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
            <Link href="/lms" className="block">
              <div className="flex items-center gap-3 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg border border-green-200 dark:border-green-500/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-500/15 dark:hover:to-emerald-500/15 transition-all duration-200 cursor-pointer">
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
            </Link>



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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
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
            
            {/* Mobile Service Health */}
            <div className="flex items-center gap-2">


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
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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
            <Link href="/lms" className="block">
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg border border-green-200 dark:border-green-500/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-500/15 dark:hover:to-emerald-500/15 transition-all duration-200 cursor-pointer">
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
            </Link>

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