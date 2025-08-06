'use client';

import React, { useState } from 'react';
import InternalSidebar from "@/components/synth/InternalSidebar";
import PromptInput from "@/components/synth/PromptInput";
import SelectionAccordions from "@/components/synth/SelectionAccordions";

// Mock project data
const mockProject = {
  id: "adora-ai-security-suite",
  title: "Adora AI Security Suite",
  description: "Comprehensive security framework for AI systems including threat detection, access control, and compliance monitoring for enterprise AI deployments.",
  isPrivate: true,
  activities: [
    {
      id: 1,
      title: "Threat Detection Framework",
      lastMessage: "Last message 30 minutes ago"
    },
    {
      id: 2,
      title: "Access Control Implementation", 
      lastMessage: "Last message 2 hours ago"
    },
    {
      id: 3,
      title: "Compliance Monitoring System",
      lastMessage: "Last message 6 hours ago"
    }
  ],
  documents: [
    {
      id: 1,
      title: "Security Architecture Overview",
      lines: 428,
      type: "DOCX"
    },
    {
      id: 2,
      title: "Threat Detection Algorithms",
      lines: 356,
      type: "DOCX"
    },
    {
      id: 3,
      title: "Access Control Matrix",
      lines: 189,
      type: "XLSX"
    },
    {
      id: 4,
      title: "Compliance Standards Guide",
      lines: 312,
      type: "DOCX"
    },
    {
      id: 5,
      title: "Security Incident Response Plan",
      lines: 267,
      type: "DOCX"
    },
    {
      id: 6,
      title: "Enterprise Deployment Guide",
      lines: 445,
      type: "DOCX"
    }
  ]
};

// Icons
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="16" r="1" fill="currentColor"/>
    <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AdoraAiSecuritySuiteClient: React.FC = () => {
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
      <InternalSidebar 
        isExpanded={sidebarExpanded} 
        onToggle={() => setSidebarExpanded(!sidebarExpanded)} 
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 relative min-h-0">
          
          <div className="flex-none p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-4">
                <button 
                  onClick={() => window.location.href = '/synth-pro/projects'}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeftIcon />
                  <span className="text-sm">All projects</span>
                </button>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {mockProject.title}
                    </h1>
                    {mockProject.isPrivate && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                        <LockIcon />
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mockProject.description}
                  </p>
                </div>

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

          <div className="flex-1 flex flex-col p-6 relative">
            <div className="absolute top-6 left-6 z-30 max-w-[calc(100vw-12rem)]">
              <SelectionAccordions
                selectedModels={selectedModels}
                selectedProRoles={selectedProRoles}
                onModelToggle={handleModelToggle}
                onProRoleToggle={handleProRoleToggle}
              />
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="mb-8 mt-16">
                <PromptInput 
                  value={input}
                  onChange={setInput}
                  onSubmit={handleSend}
                  placeholder="How can I help you today?"
                  disabled={false}
                />
              </div>

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

      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
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

        <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              "You are a Cybersecurity Expert specializing in AI system protection... Edit"
            </p>
          </div>
        </div>

        <div className="flex-none p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">22% of project capacity used</span>
              <span className="text-gray-500 dark:text-gray-400">Securing</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>
        </div>

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

export default AdoraAiSecuritySuiteClient;