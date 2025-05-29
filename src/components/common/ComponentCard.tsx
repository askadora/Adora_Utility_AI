"use client";
import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg ${className}`}
    >
      {/* 
        CARD HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive padding for different screen sizes
      */}
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 md:text-lg">
          {title}
        </h3>
        {desc && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {desc}
          </p>
        )}
      </div>

      {/* 
        CARD BODY - Content container
        - Border-top creates visual separation
        - Responsive padding matches header
        - Space-y provides consistent vertical spacing for child elements
      */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800 sm:px-6 sm:py-6">
        <div className="space-y-4 md:space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
