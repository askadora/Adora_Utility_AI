'use client';

import React, { useState } from 'react';
import InternalSidebar from "@/components/synth/InternalSidebar";
import PromptInput from "@/components/synth/PromptInput";
import SelectionAccordions from "@/components/synth/SelectionAccordions";

// Mock project data
const mockProject = {
  id: "drift-multi-model",
  title: "Drift: Multi model",
  description: "Goal: Check the how much aligned and drifted PRDS from the actual documentation",
  isPrivate: false,
  activities: [
    {
      id: 1,
      title: "PRD Alignment Analysis",
      lastMessage: "Last message 2 hours ago"
    },
    {
      id: 2,
      title: "Documentation Drift Assessment", 
      lastMessage: "Last message 5 hours ago"
    },
    {
      id: 3,
      title: "Multi-Model Comparison Study",
      lastMessage: "Last message 1 day ago"
    }
  ],
  documents: [
    {
      id: 1,
      title: "Drift Analysis Report v2.1",
      lines: 156,
      type: "DOCX"
    },
    {
      id: 2,
      title: "Model Alignment Framework",
      lines: 89,
      type: "DOCX"
    },
    {
      id: 3,
      title: "PRD Comparison Matrix",
      lines: 234,
      type: "XLSX"
    },
    {
      id: 4,
      title: "Documentation Standards Guide",
      lines: 178,
      type: "DOCX"
    }
  ]
};

// Arrow Left Icon
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Star Icon
const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      stroke={filled ? "#EAB308" : "currentColor"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill={filled ? "#EAB308" : "none"}
    />
  </svg>
);

// Share Icon
const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Plus Circle Icon
const PlusCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Document Icon
const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProjectPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>(['claude-3-5-sonnet', 'gpt-4']);
  const [selectedProRoles, setSelectedProRoles] = useState<string[]>([]);

  const handleSend = () => {
    console.log('Sending message:', input);
    setInput('');
  };

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleProRoleToggle = (roleId: string) => {
    setSelectedProRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <InternalSidebar 
        isExpanded={sidebarExpanded} 
        onToggle={() => setSidebarExpanded(!sidebarExpanded)} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 relative min-h-0">
          
          {/* Header Section */}
          <div className="flex-none p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto">
              {/* Back Navigation */}
              <div className="flex items-center mb-4">
                <button 
                  onClick={() => window.location.href = '/synth-pro/projects'}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeftIcon />
                  <span className="text-sm">All projects</span>
                </button>
              </div>

              {/* Project Title and Controls */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {mockProject.title}
                    </h1>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mockProject.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <StarIcon filled={isFavorited} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <ShareIcon />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <PlusCircleIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with Prompt Input */}
          <div className="flex-1 flex flex-col p-6 relative">
            {/* Selection Accordions */}
            <div className="absolute top-6 left-6 z-30 max-w-[calc(100vw-12rem)]">
              <SelectionAccordions
                selectedModels={selectedModels}
                selectedProRoles={selectedProRoles}
                onModelToggle={handleModelToggle}
                onProRoleToggle={handleProRoleToggle}
              />
            </div>

            <div className="max-w-4xl mx-auto w-full">
              {/* Prompt Input */}
              <div className="mb-8 mt-16">
                <PromptInput 
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSend}
                  placeholder="How can I help you today?"
                  disabled={false}
                />
              </div>

              {/* Project Activities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activities
                </h3>
                <div className="grid gap-4">
                  {mockProject.activities.map((activity) => (
                    <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.lastMessage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Project Knowledge */}
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Project Knowledge
            </h3>
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
              <PlusCircleIcon />
            </button>
          </div>
        </div>

        {/* Role/Context */}
        <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              "You are a Technical Analyst specializing in documentation drift analysis... Edit"
            </p>
          </div>
        </div>

        {/* Capacity Usage */}
        <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">8% of project capacity used</span>
              <span className="text-gray-500 dark:text-gray-400">Analyzing</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {mockProject.documents.map((document) => (
              <div key={document.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer aspect-square flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-shrink-0">
                    <DocumentIcon />
                  </div>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {document.type}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-3 mb-2">
                    {document.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                    {document.lines} lines
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage; 