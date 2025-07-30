'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@/icons/index';
import { UNIFIED_MODELS, type Model } from '@/llm/unified-models';

// Pro roles data
const proRoles = [
  { id: 'ceo', name: 'CEO', description: 'Chief Executive Officer - Vision, leadership, market positioning, competitive strategy' },
  { id: 'cfo', name: 'CFO', description: 'Chief Financial Officer - Financial modeling, risk assessment, capital allocation, ROI' },
  { id: 'cto', name: 'CTO', description: 'Chief Technology Officer - Technical feasibility, architecture, scalability, innovation risk' },
  { id: 'cmo', name: 'CMO', description: 'Chief Marketing Officer - Market positioning, customer insight, GTM strategy, brand resonance' },
  { id: 'coo', name: 'COO', description: 'Chief Operating Officer - Execution, logistics, ops scalability, process optimization' },
  { id: 'chro', name: 'CHRO', description: 'Chief People/HR Officer - Talent alignment, org culture, change readiness, internal messaging' },
  { id: 'ciso', name: 'CISO', description: 'Chief Information Security Officer - Security risk, data governance, compliance, privacy' },
  { id: 'clo', name: 'CLO', description: 'Chief Legal Officer - Legal risk, IP strategy, regulatory alignment, contracts' },
  { id: 'cpo', name: 'CPO', description: 'Chief Product Officer - Feature strategy, UX, roadmap tradeoffs, user needs alignment' },
  { id: 'cro', name: 'CRO', description: 'Chief Revenue Officer - Monetization, client objections, pricing strategy, deal velocity' },
];

// Helper function to get models with available versions
const getModelsWithAvailableVersions = () => {
  return UNIFIED_MODELS.filter(model => 
    model.versions.some(version => version.available === true)
  );
};

// ModelIcon component to display logo with fallback
const ModelIcon = ({ model, size = 20 }: { model?: Model, size?: number }) => {
  if (!model) return null;
  
  if (model.logo) {
    return (
      <div className="flex-shrink-0" style={{ width: size, height: size }}>
        <Image 
          src={model.logo} 
          alt={`${model.name} logo`}
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
    );
  }
  
  return <span className="flex-shrink-0" style={{ fontSize: size }}>{model.icon}</span>;
};

interface SelectionAccordionsProps {
  selectedModels: string[];
  onModelToggle: (modelId: string) => void;
  selectedProRoles: string[];
  onProRoleToggle: (roleId: string) => void;
}

const SelectionAccordions: React.FC<SelectionAccordionsProps> = ({
  selectedModels,
  onModelToggle,
  selectedProRoles,
  onProRoleToggle
}) => {
  const [isModelAccordionOpen, setIsModelAccordionOpen] = useState(false);
  const [isProAccordionOpen, setIsProAccordionOpen] = useState(false);
  
  const availableModels = getModelsWithAvailableVersions();

  return (
    <div className="flex flex-col gap-2">
        
        {/* Pro Roles Accordion - Opens DOWN */}
        {isProAccordionOpen && (
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-3 mt-2">
            <div className="w-full">
              <div className="flex flex-wrap gap-2 justify-start items-center">
                {proRoles.map((role) => (
                  <div key={role.id} className="relative group">
                    <button
                      onClick={() => onProRoleToggle(role.id)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
                        selectedProRoles.includes(role.id)
                          ? 'bg-purple-100 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {role.name}
                    </button>
                    
                    {/* Hover tooltip */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      {role.description}
                    </div>
                  </div>
                ))}
                
                {/* Coming soon text inline */}
                <span className="text-sm text-gray-500 dark:text-gray-400 italic ml-2">
                  (coming soon)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Controls Row */}
        <div className="flex items-center gap-2">
          {/* Model Selection Button */}
          <button
            onClick={() => setIsModelAccordionOpen(!isModelAccordionOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {selectedModels.length > 0 ? `${selectedModels.length} Models` : 'Select Models'}
                        </span>
            <ChevronDownIcon className={`w-4 h-4 transform transition-transform ${isModelAccordionOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Pro Selection Button */}
          <button
            onClick={() => setIsProAccordionOpen(!isProAccordionOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedProRoles.length > 0 ? `${selectedProRoles.length} roles` : 'Pro'}
            </span>
            <ChevronDownIcon className={`w-4 h-4 transform transition-transform ${isProAccordionOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Model Selection Accordion - Opens Horizontally */}
        {isModelAccordionOpen && (
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-3 mt-2">
            <div className="w-full">
              <div className="flex flex-wrap gap-2 justify-start">
                {availableModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => onModelToggle(model.id)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors flex items-center gap-2 whitespace-nowrap ${
                      selectedModels.includes(model.id)
                        ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <ModelIcon model={model} size={16} />
                    <span>{model.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default SelectionAccordions; 