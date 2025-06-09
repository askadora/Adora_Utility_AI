'use client';

import React from 'react';

interface ProPlayToggleVerticalProps {
  mode: 'play' | 'pro';
  onModeChange: (mode: 'play' | 'pro') => void;
  className?: string;
}

export const ProPlayToggleVertical: React.FC<ProPlayToggleVerticalProps> = ({ 
  mode, 
  onModeChange,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {/* Pro Label - Top */}
      <span className={`text-xs font-medium transition-colors ${
        mode === 'pro' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
      }`}>
        Pro
      </span>
      
      {/* Vertical Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={mode === 'play'}
          onChange={(e) => onModeChange(e.target.checked ? 'play' : 'pro')}
          className="sr-only peer"
        />
        <div className={`w-5 h-9 rounded-full peer transition-all duration-200 peer-focus:outline-none peer-focus:ring-2 ${
          mode === 'play' 
            ? 'bg-green-500 peer-focus:ring-green-500/20' 
            : 'bg-indigo-500 peer-focus:ring-indigo-500/20'
        }`}></div>
        <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full shadow transition-all duration-200 ${
          mode === 'play' ? 'translate-y-4' : 'translate-y-0'
        }`}></div>
      </label>
      
      {/* Play Label - Bottom */}
      <span className={`text-xs font-medium transition-colors ${
        mode === 'play' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
      }`}>
        Play
      </span>
    </div>
  );
}; 