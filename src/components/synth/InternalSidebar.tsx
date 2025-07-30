'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon, FolderIcon, TimeIcon, ChevronDownIcon } from '@/icons/index';

// Mock project data
const mockProjects = [
  { id: 1, title: "New project", isNew: true },
  { id: 2, title: "Drift: Multi model", slug: "drift-multi-model" },
  { id: 3, title: "Cross Functionalities", slug: "cross-functionalities" },
  { id: 4, title: "Adora OS PRD's", slug: "adora-os-prds" },
  { id: 5, title: "Adora AI Security Suite", slug: "adora-ai-security-suite" }
];

// Search Icon Component
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface InternalSidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

const InternalSidebar: React.FC<InternalSidebarProps> = ({ 
  isExpanded = false, 
  onToggle 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

  const sidebarItems = [
    {
      icon: <PlusIcon />,
      label: 'New Chat',
      path: '/synth-pro',
      action: () => {
        window.location.href = '/synth-pro';
      }
    },
    {
      icon: <SearchIcon />,
      label: 'Search',
      path: '#',
      action: () => {
        // Handle search functionality
        console.log('Search clicked');
      }
    },
    {
      icon: <FolderIcon />,
      label: 'Projects',
      path: '/synth-pro/projects',
      action: () => {
        setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
      }
    },
    {
      icon: <TimeIcon />,
      label: 'History',
      path: '#',
      action: () => {
        // Handle history functionality
        console.log('History clicked');
      }
    }
  ];

  return (
    <aside
      className={`flex flex-col bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out border-r border-gray-200 flex-shrink-0
        ${
          isExpanded || isHovered
            ? "w-[280px] sm:w-[290px]"
            : "w-[80px] sm:w-[90px]"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Header with Logo */}
      <div className="flex-none px-3 sm:px-5 py-4 border-b border-gray-200 dark:border-gray-800 h-20">
        <div className={`flex items-center h-full ${isExpanded || isHovered ? 'justify-start' : 'justify-center'}`}>
          <div className="flex-shrink-0">
            <Image
              src="/images/logo/adora-ai-logo.png"
              alt="Adora AI"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 sm:px-5 py-6">
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={item.action}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group ${
                  !isExpanded && !isHovered ? 'justify-center' : 'justify-start'
                }`}
              >
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </span>
                {(isExpanded || isHovered) && (
                  <span className="font-medium text-sm whitespace-nowrap flex-1">
                    {item.label}
                  </span>
                )}
                {/* Chevron for Projects dropdown */}
                {item.label === 'Projects' && (isExpanded || isHovered) && (
                  <span className={`w-4 h-4 transition-transform duration-200 ${
                    isProjectsDropdownOpen ? 'rotate-180' : ''
                  }`}>
                    <ChevronDownIcon />
                  </span>
                )}
              </button>

              {/* Projects Dropdown - Nested under Projects */}
              {item.label === 'Projects' && isProjectsDropdownOpen && (isExpanded || isHovered) && (
                <div className="mt-2 ml-9 space-y-1">
                  {mockProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        if (project.isNew) {
                          window.location.href = '/synth-pro/projects';
                        } else {
                          // Navigate to specific project
                          window.location.href = `/synth-pro/projects/${project.slug}`;
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors text-sm"
                    >
                      <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                        <FolderIcon />
                      </span>
                      <span className="truncate">
                        {project.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default InternalSidebar; 