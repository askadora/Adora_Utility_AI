'use client';

import React, { useState } from 'react';

type AdvisorModalType = 'naomi' | 'karina' | 'sharad' | 'antonio' | 'klyne' | 'kathi' | 'mercedes' | 'shakeel';

interface ModalDataType {
  [key: string]: {
    name: string;
    title: string;
    image: string;
    bio: {
      intro: string;
      motivations?: string[];
      background?: string;
      thesis?: string;
      cta?: string;
    };
    social?: {
      linkedin?: string;
      instagram?: string;
      github?: string;
    };
    video?: string;
  };
}
interface AdvisorsAccordionProps {
  onPersonClick: (person: AdvisorModalType) => void;
  modalData: ModalDataType;
}

export default function AdvisorsAccordion({ onPersonClick, modalData }: AdvisorsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Advisors</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">Meet our industry experts and advisors</p>
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
            {/* Naomi Wang */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('naomi')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['naomi'].image}
                  alt={modalData['naomi'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['naomi'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['naomi'].title}</p>
              </div>
            </div>

            {/* Karina Lupercio */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('karina')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['karina'].image}
                  alt={modalData['karina'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['karina'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['karina'].title}</p>
              </div>
            </div>

            {/* Mercedes Ballard */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('mercedes')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['mercedes'].image}
                  alt={modalData['mercedes'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['mercedes'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['mercedes'].title}</p>
              </div>
            </div>

            {/* Sharad Karkera */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('sharad')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['sharad'].image}
                  alt={modalData['sharad'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['sharad'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['sharad'].title}</p>
              </div>
            </div>

            {/* Antonio Paes */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('antonio')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['antonio'].image}
                  alt={modalData['antonio'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['antonio'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['antonio'].title}</p>
              </div>
            </div>

            {/* Dr. Klyne Smith */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('klyne')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['klyne'].image}
                  alt={modalData['klyne'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['klyne'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['klyne'].title}</p>
              </div>
            </div>

            {/* Kathi Vidal */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('kathi')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['kathi'].image}
                  alt={modalData['kathi'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['kathi'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['kathi'].title}</p>
              </div>
            </div>

            {/* Shakeel Raja */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('shakeel')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img
                  src={modalData['shakeel'].image}
                  alt={modalData['shakeel'].name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{modalData['shakeel'].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{modalData['shakeel'].title}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 