"use client";

import React from "react";

interface ComponentCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  children,
  className = "",
  onClick,
  interactive = false,
}) => {
  // Base card classes with enhanced mobile styling
  const baseClasses = "rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200";
  
  // Interactive card classes for clickable cards
  const interactiveClasses = interactive 
    ? "cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20" 
    : "";
  
  // Mobile-specific touch target styling
  const mobileClasses = interactive 
    ? "min-h-[44px] sm:min-h-0" 
    : "";

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${mobileClasses} ${className}`}
      onClick={onClick}
      style={interactive ? { 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      } : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      {/* 
        CARD HEADER - Enhanced mobile styling
        - Better spacing and typography for mobile
        - Responsive padding and margins
      */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white/90 mb-1 sm:mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* 
        CARD CONTENT - Mobile optimized
        - Proper spacing and responsive design
        - Enhanced touch targets for interactive elements
      */}
      <div className="space-y-3 sm:space-y-4">
        {children}
      </div>
    </div>
  );
};

export default ComponentCard;
