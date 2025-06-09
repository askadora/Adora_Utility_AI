'use client';

import React from 'react';

interface ProPlayToggleProps {
  mode: 'play' | 'pro';
  onModeChange: (mode: 'play' | 'pro') => void;
  className?: string;
}

export const ProPlayToggle: React.FC<ProPlayToggleProps> = ({ 
  mode, 
  onModeChange,
  className = ""
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Play Label */}
      <span className={`text-xs font-medium transition-colors ${
        mode === 'play' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
      }`}>
        Play
      </span>
      
      {/* Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer mx-2">
        <input
          type="checkbox"
          checked={mode === 'pro'}
          onChange={(e) => onModeChange(e.target.checked ? 'pro' : 'play')}
          className="sr-only peer"
        />
        <div className={`w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 rounded-full peer transition-all duration-200 ${
          mode === 'pro' 
            ? 'peer-focus:ring-indigo-500/20 peer-checked:bg-indigo-500' 
            : 'peer-focus:ring-green-500/20 bg-green-500'
        }`}></div>
        <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow transition-all duration-200 ${
          mode === 'pro' ? 'translate-x-4' : 'translate-x-0'
        }`}></div>
      </label>
      
      {/* Pro Label */}
      <span className={`text-xs font-medium transition-colors ${
        mode === 'pro' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
      }`}>
        Pro
      </span>
    </div>
  );
}; 