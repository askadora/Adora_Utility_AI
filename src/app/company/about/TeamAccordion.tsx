'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type ModalType = 'kyle' | 'kevin' | 'chittal' | 'sridurga' | 'sai' | 'anthony' | 'jacob';

interface TeamAccordionProps {
  onPersonClick: (person: ModalType) => void;
}

export default function TeamAccordion({ onPersonClick }: TeamAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Team</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">Meet the people behind Adora AI</p>
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
            {/* Kyle Thomas Card with Modal */}
            <div
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('kyle')}
            >
              <div className="flex-shrink-0">
                <Image
                  src="/company/about/KyleProfileSmall.jpg"
                  alt="Kyle Thomas"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1 flex items-center justify-between">
                <div>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Kyle Thomas</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Founder</p>
                </div>
                <div className="flex space-x-3 ml-4">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/kyleconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-700"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/kyleconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-600"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a
                    href="https://github.com/kyleconnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                    onClick={e => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Other Team Members - Clickable Cards */}
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('kevin')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Kevin Bultongez</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Head Architect</p>
              </div>
            </div>
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('chittal')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Chittal Karuppiah</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI/ML Engineer</p>
              </div>
            </div>
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('sridurga')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Sridurga Linga</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI/ML Engineer</p>
              </div>
            </div>
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('sai')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Sai Akhil Sakhamuri</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI/ML Engineer</p>
              </div>
            </div>
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('anthony')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Anthony Porter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Corporate Relationships</p>
              </div>
            </div>
            <div 
              className="flex items-center bg-gray-50 dark:bg-gray-800/70 rounded-lg border border-gray-200 dark:border-gray-700 p-3 h-20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onPersonClick('jacob')}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Jacob Gresham</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Talent Acquisition</p>
              </div>
            </div>
          </div>




        </div>
      )}
    </div>
  );
} 