"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@/icons";

export const ServiceHealth: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const services = [
    { name: "API Gateway", status: "operational", uptime: "99.9%" },
    { name: "Database", status: "operational", uptime: "100%" },
    { name: "Authentication", status: "operational", uptime: "99.8%" },
    { name: "File Storage", status: "operational", uptime: "99.9%" },
    { name: "Analytics Engine", status: "operational", uptime: "100%" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Service Health
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          Details
          {isExpanded ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-600 font-medium dark:text-green-400">
          All systems operational
        </span>
      </div>

      {/* Collapsible Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3">
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
          
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 