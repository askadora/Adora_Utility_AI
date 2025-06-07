import React from "react";
import Badge from "../ui/badge/Badge";

export const ReleaseNotes: React.FC = () => {
  const releaseNotes = [
    {
      title: "Enhanced AI Prompt Templates",
      description: "New pre-built templates for common business scenarios with improved accuracy.",
      date: "Dec 15, 2024",
      isNew: true,
    },
    {
      title: "Real-time Collaboration Features",
      description: "Share dashboards and workflows with team members in real-time.",
      date: "Dec 12, 2024",
      isNew: true,
    },
    {
      title: "Advanced Data Export Options",
      description: "Export your insights to PDF, Excel, or PowerPoint with custom formatting.",
      date: "Dec 8, 2024",
      isNew: false,
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Release Notes
        </h3>
        <Badge variant="solid" color="primary">
          New
        </Badge>
      </div>
      
      <div className="space-y-4 flex-1">
        {releaseNotes.map((note, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0 last:pb-0">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white/90">
                  {note.title}
                </h4>
                {note.isNew && (
                  <Badge variant="light" color="success" size="sm">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {note.description}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {note.date}
              </span>
            </div>
          </div>
        ))}
        
        {/* Additional content to fill space */}
        <div className="flex-1 flex items-end">
          <div className="w-full space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-800 dark:text-white/90 mb-2">
                What's Coming Next?
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                We're working on exciting new features including enhanced analytics dashboards, improved collaboration tools, and advanced AI model integrations.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Expected: Q1 2025
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  Learn more →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          View all updates →
        </button>
      </div>
    </div>
  );
}; 