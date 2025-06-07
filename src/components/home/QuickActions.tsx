"use client";
import React from "react";
import { PlusIcon, ArrowUpIcon } from "@/icons";

export const QuickActions: React.FC = () => {
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Quick Actions
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Get started quickly
          </span>
        </div>

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
      </div>

      {/* Mobile Sticky Version */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 safe-area-bottom">
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

      {/* Spacer for mobile sticky actions */}
      <div className="md:hidden h-20"></div>
    </>
  );
}; 