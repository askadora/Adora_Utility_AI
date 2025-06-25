'use client';

import React, { useState } from 'react';

type PartnerModalType = 'techgenies' | 'magical' | 'growit' | 'hexa' | 'winston';

interface PartnersAccordionProps {
  onPersonClick: (partner: PartnerModalType) => void;
  onPDFClick: (partner: PartnerModalType) => void;
}

export default function PartnersAccordion({ onPersonClick, onPDFClick }: PartnersAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Partners</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">Strategic partnerships driving innovation</p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* TechGenies - PDF available */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPDFClick('techgenies')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-white">
                <img 
                  src="/images/brand/Techgenies.png"
                  alt="TechGenies Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">TechGenies</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Technical Development Partner</p>
              </div>
            </div>

            {/* Magical Teams - PDF available */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPDFClick('magical')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-white">
                <img 
                  src="/images/brand/Magical Teams.png"
                  alt="Magical Teams Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Magical Teams</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Strategic Partner</p>
              </div>
            </div>

            {/* GrowIT - PDF available */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPDFClick('growit')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-white">
                <img 
                  src="/images/brand/GrowIT.png"
                  alt="GrowIT Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Grow IT Partners</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Growth Partner</p>
              </div>
            </div>

            {/* Hexa - Regular modal */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPDFClick('hexa')}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-white">
                <img 
                  src="/images/brand/hexa.png"
                  alt="Hexa Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Hexa</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Innovation Partner</p>
              </div>
            </div>

            {/* Winston LLC - Regular modal */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPDFClick('winston')}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-white">
                <img 
                  src="/images/brand/winston.png"
                  alt="Winston Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Winston & Strawn LLP</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Legal Partner</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 