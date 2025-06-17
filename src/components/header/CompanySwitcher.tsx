"use client";
import React, { useState } from "react";

interface Company {
  id: string;
  name: string;
  logo?: string;
  initials: string;
  color: string;
  role: string;
}

interface CompanySwitcherProps {
  currentCompany?: Company;
}

// Demo companies showcasing Adora AI's different use cases
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Adora AI",
    initials: "AI",
    color: "#6366F1",
    role: "Admin"
  },
  {
    id: "2", 
    name: "Law Firm Demo",
    initials: "LF",
    color: "#1F2937",
    role: "Manager"
  },
  {
    id: "3",
    name: "Financial Firm Demo", 
    initials: "FF",
    color: "#059669",
    role: "Admin"
  },
  {
    id: "4",
    name: "Marketing Agency Demo",
    initials: "MA", 
    color: "#DC2626",
    role: "Manager"
  },
  {
    id: "5",
    name: "Dev Shop Demo",
    initials: "DS",
    color: "#7C3AED", 
    role: "Admin"
  },
  {
    id: "6",
    name: "Real Estate Demo",
    initials: "RE",
    color: "#EA580C",
    role: "View Only User"
  },
  {
    id: "7",
    name: "Support Demo",
    initials: "SD",
    color: "#0891B2",
    role: "Manager"
  },
  {
    id: "8",
    name: "Investor/Portfolio Demo",
    initials: "IP",
    color: "#BE123C",
    role: "View Only User"
  },
  {
    id: "9",
    name: "Startup Demo",
    initials: "ST",
    color: "#9333EA",
    role: "Admin"
  }
];

export const CompanySwitcher: React.FC<CompanySwitcherProps> = ({ 
  currentCompany = mockCompanies[0] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleCompanySwitch = (company: Company) => {
    // In real implementation, this would:
    // 1. Show confirmation dialog for sensitive switches
    // 2. Clear current context/cache
    // 3. Load new company data
    // 4. Log the switch for audit
    console.log(`Switching to company: ${company.name}`);
    closeDropdown();
    // For demo, we'll just close the dropdown
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "text-red-600 dark:text-red-400";
      case "Manager": return "text-blue-600 dark:text-blue-400"; 
      case "View Only User": return "text-amber-600 dark:text-amber-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        aria-label="Switch company"
        type="button"
      >
        {/* Company Logo/Avatar */}
        <div 
          className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded"
          style={{ backgroundColor: currentCompany.color }}
        >
          {currentCompany.initials}
        </div>

        {/* Company Name - Hidden for compact view */}
        <span className="hidden font-medium text-sm max-w-[120px] truncate">
          {currentCompany.name}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Tooltip for All Screens - Now that name is always hidden */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap dark:bg-gray-800 shadow-lg">
            <div className="font-medium">{currentCompany.name}</div>
            <div className="text-gray-300 dark:text-gray-400">
              {currentCompany.role}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-800"></div>
          </div>
        </div>
      )}

      {/* Company Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={closeDropdown}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-900 dark:border-gray-800 z-50">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Switch Company
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select which client account to manage
              </p>
            </div>

            {/* Current Company */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div 
                  className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded"
                  style={{ backgroundColor: currentCompany.color }}
                >
                  {currentCompany.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {currentCompany.name}
                  </p>
                  <p className={`text-xs ${getRoleColor(currentCompany.role)}`}>
                    Current • {currentCompany.role}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Available Companies */}
            <div className="py-2">
              <h4 className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Available Companies
              </h4>
              <div className="max-h-60 overflow-y-auto">
                {mockCompanies
                  .filter(company => company.id !== currentCompany.id)
                  .map((company) => (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySwitch(company)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div 
                      className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded"
                      style={{ backgroundColor: company.color }}
                    >
                      {company.initials}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {company.name}
                      </p>
                      <p className={`text-xs ${getRoleColor(company.role)}`}>
                        {company.role}
                      </p>
                    </div>
                    <svg 
                      className="w-4 h-4 text-gray-400"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
              <a 
                href="/settings?tab=access-permissions&subtab=companies" 
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                onClick={closeDropdown}
              >
                Manage company access →
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 