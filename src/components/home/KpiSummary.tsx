import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, DollarLineIcon, GroupIcon } from "@/icons";

export const KpiSummary: React.FC = () => {
  const kpiData = [
    {
      title: "Revenue",
      value: "$124,532",
      change: "+12.4%",
      trend: "up" as const,
      icon: DollarLineIcon,
      bgColor: "bg-green-100 dark:bg-green-500/15",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Orders",
      value: "2,847",
      change: "-3.2%",
      trend: "down" as const,
      icon: BoxIconLine,
      bgColor: "bg-blue-100 dark:bg-blue-500/15",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      trend: "up" as const,
      icon: GroupIcon,
      bgColor: "bg-purple-100 dark:bg-purple-500/15",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
      {kpiData.map((kpi, index) => (
        <div 
          key={index}
          className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg"
        >
          {/* Icon Container */}
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${kpi.bgColor}`}>
            <kpi.icon className={`size-6 ${kpi.iconColor}`} />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {kpi.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {kpi.value}
              </h4>
            </div>
            
            <div className="flex justify-start">
              <Badge color={kpi.trend === "up" ? "success" : "error"}>
                {kpi.trend === "up" ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                {kpi.change}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 