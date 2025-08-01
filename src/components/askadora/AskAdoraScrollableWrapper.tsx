'use client';

import React from 'react';
import AskAdoraApp from './AskAdoraApp';

interface AskAdoraScrollableWrapperProps {
  apiBaseUrl?: string;
  maxHeight?: string;
  className?: string;
}

/**
 * Scrollable wrapper for AskAdora App to fix parent page scroll issues
 * Use this component in your parent Next.js page for proper scrolling behavior
 */
const AskAdoraScrollableWrapper: React.FC<AskAdoraScrollableWrapperProps> = ({
  apiBaseUrl,
  maxHeight = '100vh',
  className = ''
}) => {
  return (
    <div 
      className={`askadora-scrollable-container ${className}`}
      style={{
        height: maxHeight,
        maxHeight: maxHeight,
        overflow: 'auto',
        position: 'relative',
        // Ensure proper scrolling on all devices
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth'
      }}
    >
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <AskAdoraApp 
          apiBaseUrl={apiBaseUrl}
          className="flex-1"
        />
      </div>
      
      {/* Add custom CSS for enhanced scrolling */}
      <style jsx>{`
        .askadora-scrollable-container {
          /* Custom scrollbar styling */
          scrollbar-width: thin;
          scrollbar-color: #6b7280 #f3f4f6;
        }
        
        .askadora-scrollable-container::-webkit-scrollbar {
          width: 8px;
        }
        
        .askadora-scrollable-container::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .askadora-scrollable-container::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 4px;
        }
        
        .askadora-scrollable-container::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
        
        /* Ensure content flows properly */
        .askadora-scrollable-container * {
          box-sizing: border-box;
        }
        
        /* Fix for mobile devices */
        @media (max-width: 768px) {
          .askadora-scrollable-container {
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default AskAdoraScrollableWrapper;