"use client";

import React, { useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import { useDocsBot } from '@/docsbot/useDocsBot';
import { DOCSBOT_BOTS } from '@/docsbot/config';
import { useSidebar } from '@/context/SidebarContext';
import { supabase } from '@/lib/supabaseClient';

export default function InvestorDataRoom() {
  const [input, setInput] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPresentationVideoModal, setShowPresentationVideoModal] = useState(false);
  const [showSafeModal, setShowSafeModal] = useState(false);
  const [showClientSafeModal, setShowClientSafeModal] = useState(false);
  const [showMinimumSafeModal, setShowMinimumSafeModal] = useState(false);
  const [showProblemThesisModal, setShowProblemThesisModal] = useState(false);
  const [showSolutionMatrixModal, setShowSolutionMatrixModal] = useState(false);
  const [showFinancialOutlineModal, setShowFinancialOutlineModal] = useState(false);
  const [showExecutiveSummaryModal, setShowExecutiveSummaryModal] = useState(false);
  const [showHiringRoadmapModal, setShowHiringRoadmapModal] = useState(false);
  const [showOrgChartModal, setShowOrgChartModal] = useState(false);
  
  // Technology document modals
  const [showAIPinModal, setShowAIPinModal] = useState(false);
  const [showB2CPlayerProModal, setShowB2CPlayerProModal] = useState(false);
  const [showMultiModelModal, setShowMultiModelModal] = useState(false);
  const [showProductRoadmapModal, setShowProductRoadmapModal] = useState(false);
  const [showRecommendationSystemModal, setShowRecommendationSystemModal] = useState(false);
  const [showSecurityFrameworkModal, setShowSecurityFrameworkModal] = useState(false);
  const [showUnifiedCommHubModal, setShowUnifiedCommHubModal] = useState(false);
  const [showUserManagementModal, setShowUserManagementModal] = useState(false);
  
  // Brand & Market document modals
  const [showGoToMarketModal, setShowGoToMarketModal] = useState(false);
  const [showMarketAnalysisModal, setShowMarketAnalysisModal] = useState(false);
  const [showAIStormModal, setShowAIStormModal] = useState(false);
  
  // Financial document modals
  const [showFinancialProjectionModal, setShowFinancialProjectionModal] = useState(false);
  const [showBudgetTemplateModal, setShowBudgetTemplateModal] = useState(false);
  const [showInvestorMemoModal, setShowInvestorMemoModal] = useState(false);
  
  // Legal document modals
  const [showOperatingAgreementModal, setShowOperatingAgreementModal] = useState(false);
  const [showMutualNDAModal, setShowMutualNDAModal] = useState(false);
  const [showSummaryCorporateByLawsModal, setShowSummaryCorporateByLawsModal] = useState(false);
  const [showPatentRecordModal, setShowPatentRecordModal] = useState(false);
  
  // Investment inquiry modal
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentForm, setInvestmentForm] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  const { messages, isLoading, sendMessage, error, clearMessages } = useDocsBot(DOCSBOT_BOTS.INVESTOR as string);
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Accordion state management
  const [openSections, setOpenSections] = useState({
    companyOverview: false,
    technology: false,
    financials: false,
    legal: false,
    brandMarket: false,
    useOfFunds: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  const handleShowInvestmentModal = () => {
    // Close all PDF modals first
    setShowSafeModal(false);
    setShowClientSafeModal(false);
    setShowMinimumSafeModal(false);
    setShowExecutiveSummaryModal(false);
    setShowHiringRoadmapModal(false);
    setShowOrgChartModal(false);
    setShowAIPinModal(false);
    setShowB2CPlayerProModal(false);
    setShowMultiModelModal(false);
    setShowProductRoadmapModal(false);
    setShowRecommendationSystemModal(false);
    setShowSecurityFrameworkModal(false);
    setShowUnifiedCommHubModal(false);
    setShowUserManagementModal(false);
    setShowGoToMarketModal(false);
    setShowMarketAnalysisModal(false);
    setShowAIStormModal(false);
    setShowOperatingAgreementModal(false);
    setShowMutualNDAModal(false);
    setShowSummaryCorporateByLawsModal(false);
    setShowPatentRecordModal(false);
    setShowInvestorMemoModal(false);
    setShowVideoModal(false);
    
    // Then show investment modal
    setShowInvestmentModal(true);
  };

  const handleInvestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!investmentForm.name.trim() || !investmentForm.email.trim()) {
      setSubmitError('Please fill in all fields');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(investmentForm.email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');
    console.log('Investment form:', investmentForm);
    
    try {
      // Call Supabase function for investment inquiry
      const { data, error } = await supabase.rpc('create_investor_access_request', {
        p_name: investmentForm.name.trim(),
        p_email: investmentForm.email.trim(),
        p_is_accredited: false,
        p_is_investment_inquiry: true
      });
      console.log('Data:', data);
      console.log('Error:', error);
      
      if (error) {
        console.error('Error saving investment inquiry:', error);
        setSubmitError('Something went wrong. Please try again.');
        return;
      }
      
      // Send emails after successful database save
      try {
        console.log('Sending email to:', investmentForm.email.trim());
        await fetch('/api/investment-inquiry/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: investmentForm.name.trim(),
            email: investmentForm.email.trim(),
          }),
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't show error to user since the inquiry was saved successfully
      }
      
      setSubmitMessage('Thank you! Your investment inquiry has been submitted. We\'ll be in touch soon.');
      setInvestmentForm({ name: '', email: '' });
      setTimeout(() => {
        setShowInvestmentModal(false);
        setSubmitMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting investment inquiry:', error);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvestmentFormChange = (field: string, value: string) => {
    setInvestmentForm(prev => ({ ...prev, [field]: value }));
    setSubmitError('');
  };

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6 md:space-y-8">
        {/* Main Heading Section */}
        <div className="mt-1 p-4 md:p-6 2xl:p-10">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white/90">
                Investor Data Room
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-4xl pr-6">
                AI-powered data room that answers your questions instantly. Ask about our business, financials, or technology—get detailed responses without digging through documents. Traditional documentation is also available. <span className="hidden sm:inline">Click the pulsing "Start Here" button to the right to watch a quick tutorial on maximizing your data room experience.</span><span className="sm:hidden">Click the pulsing "Start Here" button below to watch a quick tutorial on maximizing your data room experience.</span>
              </p>
            </div>
            
            {/* Desktop Video Help Icon - Hidden on mobile */}
            <div className="hidden sm:flex flex-shrink-0 items-center gap-3">
              {/* Pulsing Red Arrow - Right pointing for desktop */}
              <div className="animate-[pulse_2s_ease-in-out_infinite]">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                </svg>
              </div>
              
              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#5365FF] text-white rounded-lg hover:bg-[#4152cc] transition-colors duration-200 shadow-sm animate-[pulse_2s_ease-in-out_infinite] hover:animate-none"
                title="Watch tutorial to learn how to use the Data Room"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span className="font-semibold">Start Here</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Video Help Icon - Shown only on mobile, below description */}
          <div className="sm:hidden flex flex-col items-center gap-3 mt-4">
            {/* Pulsing Red Arrow - Down pointing for mobile */}
            <div className="animate-[pulse_2s_ease-in-out_infinite]">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 13.025l2.828-2.847 6.176 6.176v-16.354h3.992v16.354l6.176-6.176 2.828 2.847-11 10.975z"/>
              </svg>
            </div>
            
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#5365FF] text-white rounded-lg hover:bg-[#4152cc] transition-colors duration-200 shadow-sm animate-[pulse_2s_ease-in-out_infinite] hover:animate-none"
              title="Watch tutorial to learn how to use the Data Room"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="font-semibold">Start Here</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white/90 mb-3">
              Your Investment Opportunity
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
              We're seeking $5-7M in funding to accelerate our AI platform launch. Join us in building the future of artificial intelligence.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => setShowMinimumSafeModal(true)}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5365FF]/20"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Minimum Investment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$250K</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#5365FF] dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Document
                </div>
              </button>
              <button 
                onClick={() => setShowClientSafeModal(true)}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5365FF]/20"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Client Investor</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$322K</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#5365FF] dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Document
                </div>
              </button>
              <button 
                onClick={() => setShowSafeModal(true)}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#5365FF]/20"
              >
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Hybrid SAFE</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$1M</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#5365FF] dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Document
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Use of Funds Summary */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">How We'll Use Your Investment</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Timeline & Scale */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Timeline</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">September launch through March 2026</p>
              </div>

              {/* Client Growth */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scale</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Onboard 2,000+ organizations</p>
              </div>

              {/* Infrastructure */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2m8-8a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Infrastructure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Launch 4-6 micro data centers</p>
              </div>

              {/* Team Growth */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Team</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hire 20-25 key roles in AI, product, GTM & security</p>
              </div>
            </div>

            {/* Bottom Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  <strong className="text-gray-900 dark:text-white">Strategic Opportunity:</strong> 
                  Entry at sub-$100M valuation with clear path to Series A participation at 2-3× markup by Q1 2026.{' '}
                  <span className="text-[#5365FF] dark:text-blue-400 font-medium">Last chance to invest before infrastructure scale begins.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pitch Deck Section - Compact Horizontal Layout */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and Description */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pitch Deck & Presentation</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Three ways to explore our investment opportunity
              </p>
            </div>
            
            {/* Right side - Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Deck
              </a>
              
              <button
                onClick={() => setShowPresentationVideoModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Watch Presentation
              </button>
              
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Pitch Deck (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Analysis Documents - Quick Access */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {/* Problem Thesis Button */}
          <button
            onClick={() => setShowProblemThesisModal(true)}
            className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Problem Thesis</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Market challenges we're solving</div>
            </div>
          </button>

          {/* Solution Matrix Button */}
          <button
            onClick={() => setShowSolutionMatrixModal(true)}
            className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Solution Matrix</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Our comprehensive approach</div>
            </div>
          </button>

          {/* Financial Outline Button */}
          <button
            onClick={() => setShowFinancialOutlineModal(true)}
            className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Financial Outline</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Projections and key metrics</div>
            </div>
          </button>
        </div>

        {/* InvestAssist AI Chatbot Section */}
        <div className="mb-8">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg" style={{ height: 600, width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5365FF] flex items-center justify-center overflow-hidden">
                    <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={40} height={40} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adora Data Room Bot</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about our investment opportunity</p>
                  </div>
                </div>
                <button
                  onClick={clearMessages}
                  title="Refresh Chat"
                  className="text-gray-500 hover:text-[#5365FF] p-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581M5.21 17.293A9 9 0 1112 21a9 9 0 01-6.79-3.707z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-lg font-medium">Welcome to Adora Data Room bot</p>
                    <p className="mt-2">Ask me anything about our investment opportunity, financials, or business plans.</p>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}
                >
                  {message.role !== 'user' && (
                    <div className="w-8 h-8 mr-2 rounded-full bg-[#5365FF] flex items-center justify-center overflow-hidden">
                      <img src="/images/logo/adora-ai-logo.png" alt="Adora AI Logo" width={32} height={32} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-[#5365FF] text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && <div className="w-8 h-8 ml-2" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-start">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 border border-red-200 dark:border-red-800 shadow-sm">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input <button type="submit" disabled={isLoading}*/}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about our investment opportunity..."
                  className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-[#5365FF] px-6 py-3 text-white hover:bg-[#4152cc] focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
                >
                  <span className="flex items-center gap-2">
                    <span>Send</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Chat Bot Starter Prompts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              We've given you a few starting questions to get the conversation started. Click any of them to start chatting with the Adora AI Data Room Chat Bot.
            </p>
            
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              {/* Defensibility Prompt */}
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Ask a question about our investment opportunity..."]') as HTMLInputElement;
                  if (input) {
                    input.value = "What makes Adora AI uniquely defensible in the AI OS market?";
                    input.focus();
                  }
                }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-white border-2 border-gray-300 dark:border-gray-300 rounded-lg hover:border-blue-400 hover:shadow-lg dark:hover:border-blue-400 transition-all duration-200 shadow-md"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-gray-900">Market Defensibility</div>
                  <div className="text-sm text-gray-600 dark:text-gray-600 mt-1">What makes Adora AI uniquely defensible in the AI OS market?</div>
                </div>
              </button>

              {/* Revenue & Scaling Prompt */}
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Ask a question about our investment opportunity..."]') as HTMLInputElement;
                  if (input) {
                    input.value = "Show me how Adora AI makes money, the sales traction, and how it scales.";
                    input.focus();
                  }
                }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-white border-2 border-gray-300 dark:border-gray-300 rounded-lg hover:border-green-400 hover:shadow-lg dark:hover:border-green-400 transition-all duration-200 shadow-md"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-gray-900">Revenue & Scaling</div>
                  <div className="text-sm text-gray-600 dark:text-gray-600 mt-1">Show me how Adora AI makes money, the sales traction, and how it scales.</div>
                </div>
              </button>

              {/* Funding Impact Prompt */}
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Ask a question about our investment opportunity..."]') as HTMLInputElement;
                  if (input) {
                    input.value = "What will this round of funding unlock over the next 12–18 months?";
                    input.focus();
                  }
                }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-white border-2 border-gray-300 dark:border-gray-300 rounded-lg hover:border-purple-400 hover:shadow-lg dark:hover:border-purple-400 transition-all duration-200 shadow-md"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-gray-900">Funding Impact</div>
                  <div className="text-sm text-gray-600 dark:text-gray-600 mt-1">What will this round of funding unlock over the next 12–18 months?</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Company Overview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Company Overview</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Business operations and infrastructure</p>
              </div>
              <button
                onClick={() => toggleSection('companyOverview')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.companyOverview ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.companyOverview && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setShowOrgChartModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300 w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Current Org Chart - June 2025
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowExecutiveSummaryModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300 w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Executive Summary 
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowHiringRoadmapModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300 w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Hiring & Team Roadmap
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Technology Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technology</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Our technical architecture and innovation</p>
              </div>
              <button
                onClick={() => toggleSection('technology')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.technology ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.technology && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Overview</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setShowProductRoadmapModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Product Roadmap
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowUnifiedCommHubModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Unified Communication Hub
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowSecurityFrameworkModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Security Framework
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowMultiModelModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Multi-Model Strategy & Cost Control
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowB2CPlayerProModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        B2C Player Pro
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowAIPinModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        AI Pin
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Architecture */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Architecture</h3>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => setShowUserManagementModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        User Management System
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowRecommendationSystemModal(true)}
                        className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Recommendation System
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Financials Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financials</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Key financial documents and projections</p>
              </div>
              <button
                onClick={() => toggleSection('financials')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.financials ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.financials && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Financial Documents</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setShowFinancialProjectionModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      2-Year Financial Projection
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowBudgetTemplateModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Budget Template Q2 2025
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowInvestorMemoModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Investor Memo
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Legal Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Legal</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Corporate structure and intellectual property</p>
              </div>
              <button
                onClick={() => toggleSection('legal')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.legal ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.legal && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setShowOperatingAgreementModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Draft Operating Agreement
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowMutualNDAModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Mutual NDA Template
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowSummaryCorporateByLawsModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Summary of Corporate Bylaws
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowPatentRecordModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Security Provisional Patent Record
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>



        {/* Brand & Market Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Brand & Market</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Brand guidelines and market insights</p>
              </div>
              <button
                onClick={() => toggleSection('brandMarket')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.brandMarket ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.brandMarket && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setShowGoToMarketModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Go-To-Market Strategy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowMarketAnalysisModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Market Analysis May 2025
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowAIStormModal(true)}
                      className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      The AI Storm - Why Today's Tech is Tomorrow Quicksand
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Use of Funds Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Use of Funds</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">How we plan to allocate the investment capital</p>
              </div>
              <button
                onClick={() => toggleSection('useOfFunds')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform ${openSections.useOfFunds ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {openSections.useOfFunds && (
            <div className="px-6 pb-6">
              <div className="space-y-6">
                {/* Executive Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🧭</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Executive Summary</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        "We're raising a <strong>$5–7M strategic round</strong> to fuel our September launch through March of 2026, scale onboarding for our first 2,000+ org clients, and operationalize the first 4–6 of our U.S.-based micro data centers. This sets the stage for a <strong>$30M Series A in early 2026</strong>, unlocking national node coverage, and a <strong>$100M Series B in 2027</strong> to scale globally—supporting 24+ distributed micro data centers and $400M+ ARR by that point."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Multi-Stage Capital Strategy Table */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span>📈</span>
                    Multi-Stage Capital Strategy
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Round</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Timing</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Raise</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Valuation</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Key Milestones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-blue-50 dark:bg-blue-900/20">
                          <td className="py-3 px-4 font-medium text-blue-900 dark:text-blue-300">Seed+/Pre-A</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Q3 2025</td>
                          <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">$5–7M</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">~$75–100M</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Launch, 4–6 DCs, $20–30M ARR run-rate</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Series A</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Q1 2026</td>
                          <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">$30M</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">~$200–250M</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">12 DCs, 3K orgs, $100M+ ARR</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">Series B</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Q2–Q3 2027</td>
                          <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">$100M</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">$500M–1B+</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Global deployment, 5K orgs, $400M ARR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Current Round Details */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span>💰</span>
                    This Round: $5–7M Seed+/Pre-A
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">Use of Funds</h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Ramp onboarding ops to 1,500 orgs/month</li>
                        <li>• Hire 20–25 key roles (AI, product, GTM, & Security Engineering)</li>
                        <li>• Launch 4–6 micro DCs in US (modular, edge)</li>
                        <li>• Finalize PRIO + encryption rollout v1</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">Milestones Unlocked</h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Org ARR to $20–30M (run-rate)</li>
                        <li>• AI OS infrastructure in production</li>
                        <li>• Proven client trust + usage</li>
                        <li>• Validated edge node architecture</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">Investor Outcome</h4>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Entry at sub-$100M valuation</li>
                        <li>• Position in pre-A tranche with pro-rata rights</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Future Rounds Preview */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Series A */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>🚀</span>
                      Series A: $30M (Q1 2026)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Focus</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• Scale to 12 micro DCs across U.S.</li>
                          <li>• Onboard next 3,000 orgs</li>
                          <li>• Expand agentic workflow engine</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                          Target: $200–250M valuation
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          2–3× markup from current round
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Series B */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>🌍</span>
                      Series B: $100M (Q2–Q3 2027)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Global Expansion</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          <li>• Deploy global micro DCs</li>
                          <li>• Scale PRIO mesh + encryption</li>
                          <li>• Expand app ecosystem, SDKs</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                          Target: $500M–1B+ valuation
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-400">
                          "Adora is the Cloudflare of secure, distributed AI"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategic Framing */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🧠</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Strategic Opportunity</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        "This is the <strong>last opportunity to get in before infrastructure scale begins</strong>. We've de-risked go-to-market, proven early enterprise demand, and architected a defensible infrastructure layer. This raise accelerates onboarding, begins our distributed DC mesh, and positions you for Series A participation at a significant markup."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <ComponentCard title="Contact Us" desc="Get in touch with our investment team">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              For investment inquiries or to schedule a meeting with our team, please contact:
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:Kyle@adorahq.com" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kyle@adorahq.com
              </a>
              <a href="tel:+12148367794" className="flex items-center gap-2 text-[#5365FF] hover:text-[#4152cc] dark:text-blue-400 dark:hover:text-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (214) 836-7794
              </a>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Video Modal Lightbox */}
      {showVideoModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowVideoModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-4xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowVideoModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                                 {/* Modal Header */}
                 <div className="p-6 pr-16">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                     How to Use the Data Room
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                     Learn how to navigate and use our investor data room effectively
                   </p>
                 </div>
                 
                 {/* Video Container */}
                 <div className="px-6 pb-6">
                   <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                     {/* Placeholder for video - replace with actual video URL */}
                     <div className="w-full h-full flex items-center justify-center">
                       <div className="text-center">
                         <div className="w-16 h-16 mx-auto mb-4 bg-[#5365FF] rounded-full flex items-center justify-center">
                           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                         </div>
                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                           Data Room Tutorial Video
                         </h4>
                         <p className="text-gray-600 dark:text-gray-400 mb-4">
                           Learn how to navigate and use our investor data room effectively.
                         </p>
                         <p className="text-sm text-gray-500 dark:text-gray-400">
                           Video coming soon - Replace this placeholder with your actual video embed
                         </p>
                       </div>
                     </div>
                     
                     {/* Uncomment and replace VIDEO_ID with actual video when ready */}
                     {/* 
                     <iframe
                       className="w-full h-full"
                       src="https://www.youtube.com/embed/VIDEO_ID"
                       title="How to Use the Data Room"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                     */}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </>
       )}

      {/* Presentation Video Modal */}
      {showPresentationVideoModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowPresentationVideoModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-4xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowPresentationVideoModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                 {/* Modal Header */}
                 <div className="p-6 pr-16">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                     Investor Presentation
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                     Watch our comprehensive investor presentation and pitch deck walkthrough
                   </p>
                 </div>
                 
                 {/* Video Container */}
                 <div className="px-6 pb-6">
                   <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                     {/* Placeholder for video - replace with actual video URL */}
                     <div className="w-full h-full flex items-center justify-center">
                       <div className="text-center">
                         <div className="w-16 h-16 mx-auto mb-4 bg-[#5365FF] rounded-full flex items-center justify-center">
                           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                           </svg>
                         </div>
                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                           Investor Presentation Video
                         </h4>
                         <p className="text-gray-600 dark:text-gray-400 mb-4">
                           Watch our comprehensive investor presentation and pitch deck walkthrough.
                         </p>
                         <p className="text-sm text-gray-500 dark:text-gray-400">
                           Video coming soon - Replace this placeholder with your actual video embed
                         </p>
                       </div>
                     </div>
                     
                     {/* Uncomment and replace VIDEO_ID with actual video when ready */}
                     {/* 
                     <iframe
                       className="w-full h-full"
                       src="https://www.youtube.com/embed/VIDEO_ID"
                       title="Investor Presentation"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     ></iframe>
                     */}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </>
       )}

      {/* SAFE Document PDF Modal */}
      {showSafeModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowSafeModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
                         {/* Scrollable container with max height */}
             <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowSafeModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Dynamic SAFE Note
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $1,000,000 Investment Agreement • Post-Money Valuation Cap & Discount - 1 yr of Adora AI OS included
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                          $100M Valuation Cap
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          20% Discount Rate
                        </span>
                        <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                          1yr of Adora AI OS Included
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                                 {/* PDF Viewer Container */}
                 <div className="p-2 pb-3">
                   <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                     <iframe
                       src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$1m.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMW0ucGRmIiwiaWF0IjoxNzUwMjgwMDM4LCJleHAiOjE3ODE4MTYwMzh9.rcy8tlyTbJZ0-3UCiEREXq9mJv696dsCMZygo1IHovU#view=FitH&zoom=110"
                       title="Adora AI Dynamic SAFE Note - $1M Investment Agreement"
                       className="w-full h-[65vh] rounded-lg"
                       style={{ minHeight: '500px' }}
                     />
                   </div>
                 </div>
                 
                 {/* Action Buttons */}
                 <div className="px-2 pb-3">
                   <div className="flex flex-col sm:flex-row gap-3">
                     <a
                       href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$1m.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMW0ucGRmIiwiaWF0IjoxNzUwMjgwMDM4LCJleHAiOjE3ODE4MTYwMzh9.rcy8tlyTbJZ0-3UCiEREXq9mJv696dsCMZygo1IHovU"
                       download="Adora_AI_Dynamic_SAFE_Note_$1M.pdf"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                       </svg>
                       Download PDF
                     </a>
                     <button
                       onClick={handleShowInvestmentModal}
                       className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                       Contact About Investment
                     </button>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Client SAFE Document PDF Modal ($322K) */}
      {showClientSafeModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowClientSafeModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowClientSafeModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Client SAFE Note
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $322,000 Investment Agreement • Post-Money Valuation Cap & Discount - Investor get's investment credit for adding their first year of Adora AI to the $250k minimum investment
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                          $100M Valuation Cap
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          20% Discount Rate
                        </span>
                        <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                          1yr of Adora AI OS Included
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$322k%20Client.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMzIyayBDbGllbnQucGRmIiwiaWF0IjoxNzUwMjgyMjQ2LCJleHAiOjE3ODE4MTgyNDZ9.2Le6WTGQNFtx_doB8cUK6bshEJ6jIxj6VMzLZQ1Fjuw#view=FitH&zoom=110"
                      title="Adora AI Client SAFE Note - $322K Investment Agreement"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$322k%20Client.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMzIyayBDbGllbnQucGRmIiwiaWF0IjoxNzUwMjgyMjQ2LCJleHAiOjE3ODE4MTgyNDZ9.2Le6WTGQNFtx_doB8cUK6bshEJ6jIxj6VMzLZQ1Fjuw"
                      download="Adora_AI_Client_SAFE_Note_$322K.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Minimum SAFE Document PDF Modal ($250K) */}
      {showMinimumSafeModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowMinimumSafeModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowMinimumSafeModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Minimum SAFE Note
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        $250,000 Investment Agreement • Post-Money Valuation Cap & Discount
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                          $100M Valuation Cap
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                          20% Discount Rate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$250k.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMjUway5wZGYiLCJpYXQiOjE3NTAyODI0MjksImV4cCI6MTc4MTgxODQyOX0.XA9bFdsO30pZ4Rs62qBvxCC3-gniLuE4d97b0jS_54M#view=FitH&zoom=110"
                      title="Adora AI Minimum SAFE Note - $250K Investment Agreement"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/ADORA%20AI%20DYNAMIC%20SAFE%20NOTE%20$250k.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9BRE9SQSBBSSBEWU5BTUlDIFNBRkUgTk9URSAkMjUway5wZGYiLCJpYXQiOjE3NTAyODI0MjksImV4cCI6MTc4MTgxODQyOX0.XA9bFdsO30pZ4Rs62qBvxCC3-gniLuE4d97b0jS_54M"
                      download="Adora_AI_Minimum_SAFE_Note_$250K.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Executive Summary PDF Modal */}
      {showExecutiveSummaryModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowExecutiveSummaryModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowExecutiveSummaryModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Executive Summary
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Investor Overview • Company strategy, vision, and key metrics
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20-%20Executive%20Summary%20-%20Invenstor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIC0gRXhlY3V0aXZlIFN1bW1hcnkgLSBJbnZlbnN0b3IgT3ZlcnZpZXcucGRmIiwiaWF0IjoxNzUwNzA3MDM1LCJleHAiOjE3ODIyNDMwMzV9.4qwtbk1jlpTzrNHyNBNb9Z5-anKZqgZzof6Z1iJSddw#view=FitH&zoom=110"
                      title="Adora AI Executive Summary"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20-%20Executive%20Summary%20-%20Invenstor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIC0gRXhlY3V0aXZlIFN1bW1hcnkgLSBJbnZlbnN0b3IgT3ZlcnZpZXcucGRmIiwiaWF0IjoxNzUwNzA3MDM1LCJleHAiOjE3ODIyNDMwMzV9.4qwtbk1jlpTzrNHyNBNb9Z5-anKZqgZzof6Z1iJSddw"
                      download="Adora_AI_Executive_Summary.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hiring Roadmap PDF Modal */}
      {showHiringRoadmapModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowHiringRoadmapModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowHiringRoadmapModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Hiring & Team Roadmap
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Investor Overview • Team expansion strategy and hiring plan
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* PDF Viewer Container */}
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20Hiring%20Roadmap%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIEhpcmluZyBSb2FkbWFwIC0gSW52ZXN0b3IgT3ZlcnZpZXcucGRmIiwiaWF0IjoxNzUwNzA3MDU1LCJleHAiOjE3ODIyNDMwNTV9.NGR0StzHtFKcTDOBNnpmYard_pAn3qkbjl3gp5PXhxc#view=FitH&zoom=110"
                      title="Adora AI Hiring & Team Roadmap"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20Hiring%20Roadmap%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIEhpcmluZyBSb2FkbWFwIC0gSW52ZXN0b3IgT3ZlcnZpZXcucGRmIiwiaWF0IjoxNzUwNzA3MDU1LCJleHAiOjE3ODIyNDMwNTV9.NGR0StzHtFKcTDOBNnpmYard_pAn3qkbjl3gp5PXhxc"
                      download="Adora_AI_Hiring_Roadmap.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Org Chart Image Modal */}
      {showOrgChartModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowOrgChartModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            {/* Scrollable container with max height */}
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowOrgChartModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Current Org Chart
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        June 2025 • Current organizational structure and team composition
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Image Viewer Container */}
                <div className="p-6">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <img
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Current%20Org%20Chart%20-%20June%202025.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0N1cnJlbnQgT3JnIENoYXJ0IC0gSnVuZSAyMDI1LnBuZyIsImlhdCI6MTc1MDcwNzk4NiwiZXhwIjoxNzgyMjQzOTg2fQ.9zFXWULFKz2ZJBbwBPRx2SJrOKYdQMpE8FKTjsDF-UQ"
                      alt="Adora AI Current Org Chart - June 2025"
                      className="w-full h-auto rounded-lg max-h-[70vh] object-contain"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="px-6 pb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Current%20Org%20Chart%20-%20June%202025.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0N1cnJlbnQgT3JnIENoYXJ0IC0gSnVuZSAyMDI1LnBuZyIsImlhdCI6MTc1MDcwNzk4NiwiZXhwIjoxNzgyMjQzOTg2fQ.9zFXWULFKz2ZJBbwBPRx2SJrOKYdQMpE8FKTjsDF-UQ"
                      download="Adora_AI_Current_Org_Chart_June_2025.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Image
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI Pin Modal */}
      {showAIPinModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowAIPinModal(false)}
          />
          
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px',
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px';
                }
                if (isExpanded || isHovered) {
                  return '290px';
                }
                return '90px';
              })(),
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowAIPinModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Adora AI Pin 
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Wearable AI device roadmap and specifications
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20AI%20Pin%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gQUkgUGluIC0gSW52ZXN0b3IgT3ZlcnZpZXcucGRmIiwiaWF0IjoxNzUwNzA4Mjg3LCJleHAiOjE3ODIyNDQyODd9.HOdD2eCoN21xX-P1sPyL-mqVR8PEMX5mZ6xWhcHLahA#view=FitH&zoom=110"
                      title="Adora AI Pin"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20AI%20Pin%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gQUkgUGluIC0gSW52ZXN0b3IgT3ZlcnZpZXcucGRmIiwiaWF0IjoxNzUwNzA4Mjg3LCJleHAiOjE3ODIyNDQyODd9.HOdD2eCoN21xX-P1sPyL-mqVR8PEMX5mZ6xWhcHLahA"
                      download="Adora_AI_Pin_Investor_Overview.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* B2C Player Pro Modal */}
      {showB2CPlayerProModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowB2CPlayerProModal(false)}
          />
          
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px',
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px';
                }
                if (isExpanded || isHovered) {
                  return '290px';
                }
                return '90px';
              })(),
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowB2CPlayerProModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        B2C Player Pro 
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Consumer AI platform and monetization strategy
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe
                      src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20B2C%20Player%20Pro%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gQjJDIFBsYXllciBQcm8gLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3MDgyOTgsImV4cCI6MTc4MjI0NDI5OH0.B5UIMw-VpQqeL2pueoLMBkh4VdKiOX74GLGzZ0Sf_-8#view=FitH&zoom=110"
                      title="B2C Player Pro"
                      className="w-full h-[65vh] rounded-lg"
                      style={{ minHeight: '500px' }}
                    />
                  </div>
                </div>
                
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20B2C%20Player%20Pro%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gQjJDIFBsYXllciBQcm8gLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3MDgyOTgsImV4cCI6MTc4MjI0NDI5OH0.B5UIMw-VpQqeL2pueoLMBkh4VdKiOX74GLGzZ0Sf_-8"
                      download="Adora_AI_B2C_Player_Pro_Investor_Overview.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                    <button
                      onClick={handleShowInvestmentModal}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Multi-Model Strategy Modal */}
      {showMultiModelModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowMultiModelModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowMultiModelModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Multi-Model Strategy & Cost-Control</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI model optimization and cost management</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Multi-Model%20Strategy%20&%20Cost-Control%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gTXVsdGktTW9kZWwgU3RyYXRlZ3kgJiBDb3N0LUNvbnRyb2wgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3MDgzMTAsImV4cCI6MTc4MjI0NDMxMH0.b9aiJ3-eAcuQpzh2PmDIX6igL3_INN2kO1JBzqUtwRo#view=FitH&zoom=110" title="Multi-Model Strategy & Cost-Control" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Multi-Model%20Strategy%20&%20Cost-Control%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gTXVsdGktTW9kZWwgU3RyYXRlZ3kgJiBDb3N0LUNvbnRyb2wgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3MDgzMTAsImV4cCI6MTc4MjI0NDMxMH0.b9aiJ3-eAcuQpzh2PmDIX6igL3_INN2kO1JBzqUtwRo" download="Adora_AI_Multi_Model_Strategy.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Product Roadmap Modal */}
      {showProductRoadmapModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowProductRoadmapModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowProductRoadmapModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Product Roadmap</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Strategic product development timeline</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Product%20Roadmap%20-%20%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gUHJvZHVjdCBSb2FkbWFwIC0gIEludmVzdG9yIE92ZXJ2aWV3LnBkZiIsImlhdCI6MTc1MDcwODMyNCwiZXhwIjoxNzgyMjQ0MzI0fQ.jKs0BDK9NDgxASGemnFUql4NZDwlo8xQC_W7v2cIeTY#view=FitH&zoom=110" title="Product Roadmap" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Product%20Roadmap%20-%20%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gUHJvZHVjdCBSb2FkbWFwIC0gIEludmVzdG9yIE92ZXJ2aWV3LnBkZiIsImlhdCI6MTc1MDcwODMyNCwiZXhwIjoxNzgyMjQ0MzI0fQ.jKs0BDK9NDgxASGemnFUql4NZDwlo8xQC_W7v2cIeTY" download="Adora_AI_Product_Roadmap.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Recommendation System Modal */}
      {showRecommendationSystemModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowRecommendationSystemModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowRecommendationSystemModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommendation System </h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI-powered recommendation engine design</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Recommendation%20System%20Architecture%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gUmVjb21tZW5kYXRpb24gU3lzdGVtIEFyY2hpdGVjdHVyZSAtIEludmVzdG9yIE92ZXJ2aWV3LnBkZiIsImlhdCI6MTc1MDcwODMzNywiZXhwIjoxNzgyMjQ0MzM3fQ.NcGoH2mf6OOO4fvKSK_gnCQ2yQvIf4jqkgbKv-mVc5E#view=FitH&zoom=110" title="Recommendation System Architecture" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Recommendation%20System%20Architecture%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gUmVjb21tZW5kYXRpb24gU3lzdGVtIEFyY2hpdGVjdHVyZSAtIEludmVzdG9yIE92ZXJ2aWV3LnBkZiIsImlhdCI6MTc1MDcwODMzNywiZXhwIjoxNzgyMjQ0MzM3fQ.NcGoH2mf6OOO4fvKSK_gnCQ2yQvIf4jqkgbKv-mVc5E" download="Adora_AI_Recommendation_System.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Security Framework Modal */}
      {showSecurityFrameworkModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowSecurityFrameworkModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowSecurityFrameworkModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Security Framework </h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive security architecture and protocols</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20Security%20-%20Provisional%20Patent%20Filing%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSBTZWN1cml0eSAtIFByb3Zpc2lvbmFsIFBhdGVudCBGaWxpbmcgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3OTk5MzEsImV4cCI6MTc4MjMzNTkzMX0.Td5iutqSz1jpuHeByujHDb4Nd4x6Zyy9yr-XAI3r-BE#view=FitH&zoom=110" title="Security Framework" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20Security%20-%20Provisional%20Patent%20Filing%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSBTZWN1cml0eSAtIFByb3Zpc2lvbmFsIFBhdGVudCBGaWxpbmcgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3OTk5MzEsImV4cCI6MTc4MjMzNTkzMX0.Td5iutqSz1jpuHeByujHDb4Nd4x6Zyy9yr-XAI3r-BE" download="Adora_AI_Security_Framework.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Unified Communication Hub Modal */}
      {showUnifiedCommHubModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowUnifiedCommHubModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowUnifiedCommHubModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Unified Communication Hub</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Integrated communication platform architecture</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Unified%20Communication%20Hub%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gVW5pZmllZCBDb21tdW5pY2F0aW9uIEh1YiAtIEludmVzdG9yIE92ZXJ2aWV3LnBkZiIsImlhdCI6MTc1MDcwODM4MiwiZXhwIjoxNzgyMjQ0MzgyfQ.Eia4JUOJyYMD0JWnwN1WPf8cX4TOU4aHljy58gUnMNc#view=FitH&zoom=110" title="Unified Communication Hub" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20Unified%20Communication%20Hub%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gVW5pZmllZCBDb21tdW5pY2F0aW9uIEh1YiAtIEludmVzdG9yIE92ZXJ2aWV3LnBkZiIsImlhdCI6MTc1MDcwODM4MiwiZXhwIjoxNzgyMjQ0MzgyfQ.Eia4JUOJyYMD0JWnwN1WPf8cX4TOU4aHljy58gUnMNc" download="Adora_AI_Unified_Communication_Hub.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* User Management System Modal */}
      {showUserManagementModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowUserManagementModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowUserManagementModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">User Management System</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User authentication and management system</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20User%20Management%20System%20Architecture%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gVXNlciBNYW5hZ2VtZW50IFN5c3RlbSBBcmNoaXRlY3R1cmUgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3MDgzOTksImV4cCI6MTc4MjI0NDM5OX0.D2jnJo7ur7_liUKxrLMR9zd5reki8czaWU7mebYRRrU#view=FitH&zoom=110" title="User Management System Architecture" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Technology/Adora%20AI%20-%20User%20Management%20System%20Architecture%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9UZWNobm9sb2d5L0Fkb3JhIEFJIC0gVXNlciBNYW5hZ2VtZW50IFN5c3RlbSBBcmNoaXRlY3R1cmUgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA3MDgzOTksImV4cCI6MTc4MjI0NDM5OX0.D2jnJo7ur7_liUKxrLMR9zd5reki8czaWU7mebYRRrU" download="Adora_AI_User_Management_System.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Go-To-Market Strategy Modal */}
      {showGoToMarketModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowGoToMarketModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowGoToMarketModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Go-To-Market Strategy</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive strategy for market entry and customer acquisition</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Go-To-Market/Adora%20AI%20-%20Go-To-Market%20Strategy%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9Hby1Uby1NYXJrZXQvQWRvcmEgQUkgLSBHby1Uby1NYXJrZXQgU3RyYXRlZ3kgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA4NzExODUsImV4cCI6MTc4MjQwNzE4NX0.MUkrMElMw7TJ0xyPb9H2jl5WTGN_sbj1tW7fQ0Z-jCg#view=FitH&zoom=110" title="Go-To-Market Strategy" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Go-To-Market/Adora%20AI%20-%20Go-To-Market%20Strategy%20-%20Investor%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9Hby1Uby1NYXJrZXQvQWRvcmEgQUkgLSBHby1Uby1NYXJrZXQgU3RyYXRlZ3kgLSBJbnZlc3RvciBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTA4NzExODUsImV4cCI6MTc4MjQwNzE4NX0.MUkrMElMw7TJ0xyPb9H2jl5WTGN_sbj1tW7fQ0Z-jCg" download="Adora_AI_Go_To_Market_Strategy.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Market Analysis Modal */}
      {showMarketAnalysisModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowMarketAnalysisModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowMarketAnalysisModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Market Analysis May 2025</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive AI market analysis and strategic positioning</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Go-To-Market/Market%20Analysis%20May%202025.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9Hby1Uby1NYXJrZXQvTWFya2V0IEFuYWx5c2lzIE1heSAyMDI1LnBkZiIsImlhdCI6MTc1MDcwOTgxMiwiZXhwIjoxNzgyMjQ1ODEyfQ.R6gF-U6zrOfIUzq7AZYRz1Y_vFvQeNLlv-PJxFmeT1I#view=FitH&zoom=110" title="Market Analysis May 2025" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Go-To-Market/Market%20Analysis%20May%202025.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9Hby1Uby1NYXJrZXQvTWFya2V0IEFuYWx5c2lzIE1heSAyMDI1LnBkZiIsImlhdCI6MTc1MDcwOTgxMiwiZXhwIjoxNzgyMjQ1ODEyfQ.R6gF-U6zrOfIUzq7AZYRz1Y_vFvQeNLlv-PJxFmeT1I" download="Market_Analysis_May_2025.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI Storm Modal */}
      {showAIStormModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowAIStormModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowAIStormModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">The AI Storm - Why Today's Tech is Tomorrow Quicksand</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Strategic analysis of AI technology evolution and market disruption</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Go-To-Market/The%20AI%20Storm%20-%20Why%20Today's%20Tech%20is%20Tomorrow%20Quicksand.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9Hby1Uby1NYXJrZXQvVGhlIEFJIFN0b3JtIC0gV2h5IFRvZGF5J3MgVGVjaCBpcyBUb21vcnJvdyBRdWlja3NhbmQucGRmIiwiaWF0IjoxNzUwNzE0MDI2LCJleHAiOjE3ODIyNTAwMjZ9.nPf2gOUfRMWsppVqGYTQnWAtKuI6Mfdvbn9H9wppH-s#view=FitH&zoom=110" title="The AI Storm - Why Today's Tech is Tomorrow Quicksand" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/Go-To-Market/The%20AI%20Storm%20-%20Why%20Today's%20Tech%20is%20Tomorrow%20Quicksand.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9Hby1Uby1NYXJrZXQvVGhlIEFJIFN0b3JtIC0gV2h5IFRvZGF5J3MgVGVjaCBpcyBUb21vcnJvdyBRdWlja3NhbmQucGRmIiwiaWF0IjoxNzUwNzE0MDI2LCJleHAiOjE3ODIyNTAwMjZ9.nPf2gOUfRMWsppVqGYTQnWAtKuI6Mfdvbn9H9wppH-s" download="The_AI_Storm_Analysis.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Operating Agreement Modal */}
      {showOperatingAgreementModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowOperatingAgreementModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowOperatingAgreementModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Draft Operating Agreement</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Corporate governance and operational structure</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20-%20Draft%20Operating%20Agreement.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSAtIERyYWZ0IE9wZXJhdGluZyBBZ3JlZW1lbnQucGRmIiwiaWF0IjoxNzUwNzEwNDc0LCJleHAiOjE3ODIyNDY0NzR9.q4vZTLjxVOL7GdSIMuVm5oa5ZNBPSWsgb2-G7Osf8As#view=FitH&zoom=110" title="Draft Operating Agreement" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20-%20Draft%20Operating%20Agreement.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSAtIERyYWZ0IE9wZXJhdGluZyBBZ3JlZW1lbnQucGRmIiwiaWF0IjoxNzUwNzEwNDc0LCJleHAiOjE3ODIyNDY0NzR9.q4vZTLjxVOL7GdSIMuVm5oa5ZNBPSWsgb2-G7Osf8As" download="Adora_AI_Draft_Operating_Agreement.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mutual NDA Modal */}
      {showSummaryCorporateByLawsModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowSummaryCorporateByLawsModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowSummaryCorporateByLawsModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Summary of Corporate Bylaws</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Non-disclosure agreement for confidential discussions</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20-%20Summary%20of%20Corporate%20Bylaws.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSAtIFN1bW1hcnkgb2YgQ29ycG9yYXRlIEJ5bGF3cy5wZGYiLCJpYXQiOjE3NTA3ODY2OTIsImV4cCI6MTc4MjMyMjY5Mn0.4EtYDGLb-6waITqz8CZCN_L0r8sEKSnLgltHmW9WV4A#view=FitH&zoom=110" title="Mutual NDA Template" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20-%20Summary%20of%20Corporate%20Bylaws.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSAtIFN1bW1hcnkgb2YgQ29ycG9yYXRlIEJ5bGF3cy5wZGYiLCJpYXQiOjE3NTA3ODY2OTIsImV4cCI6MTc4MjMyMjY5Mn0.4EtYDGLb-6waITqz8CZCN_L0r8sEKSnLgltHmW9WV4A" download="Adora_AI_Mutual_NDA_Template.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mutual NDA Modal */}
      {showMutualNDAModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowMutualNDAModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowMutualNDAModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Mutual NDA Template</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Non-disclosure agreement for confidential discussions</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20-%20Mutual%20NDA%20Template.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSAtIE11dHVhbCBOREEgVGVtcGxhdGUucGRmIiwiaWF0IjoxNzUwNzEwNDg1LCJleHAiOjE3ODIyNDY0ODV9.vu2IxvVwu8L4Krabe1242SF6OV7qdMcwB5H0N-lE-do#view=FitH&zoom=110" title="Mutual NDA Template" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20AI%20-%20Mutual%20NDA%20Template.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBBSSAtIE11dHVhbCBOREEgVGVtcGxhdGUucGRmIiwiaWF0IjoxNzUwNzEwNDg1LCJleHAiOjE3ODIyNDY0ODV9.vu2IxvVwu8L4Krabe1242SF6OV7qdMcwB5H0N-lE-do" download="Adora_AI_Mutual_NDA_Template.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Patent Record Modal */}
      {showPatentRecordModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowPatentRecordModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowPatentRecordModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Security Provisional Patent Record</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Patent application overview and intellectual property documentation</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20Security%20Provisional%20Patent%20Record%20and%20Application%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBTZWN1cml0eSBQcm92aXNpb25hbCBQYXRlbnQgUmVjb3JkIGFuZCBBcHBsaWNhdGlvbiBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTE0ODU4OTUsImV4cCI6MTc4MzAyMTg5NX0.ApwZnTkSV8pEOMQs0KDT0MsQ52AfyfXo777P5vuBLrQ#view=FitH&zoom=110" title="Security Provisional Patent Record" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/legal/Adora%20Security%20Provisional%20Patent%20Record%20and%20Application%20Overview.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9sZWdhbC9BZG9yYSBTZWN1cml0eSBQcm92aXNpb25hbCBQYXRlbnQgUmVjb3JkIGFuZCBBcHBsaWNhdGlvbiBPdmVydmlldy5wZGYiLCJpYXQiOjE3NTE0ODU4OTUsImV4cCI6MTc4MzAyMTg5NX0.ApwZnTkSV8pEOMQs0KDT0MsQ52AfyfXo777P5vuBLrQ" download="Adora_Security_Provisional_Patent_Record.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Financial Projection Modal */}
      {showFinancialProjectionModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowFinancialProjectionModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowFinancialProjectionModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">2-Year Financial Projection</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive financial projections and revenue forecasts</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/financial/Adora%20AI_%202-Year%20Financial%20Projection.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9maW5hbmNpYWwvQWRvcmEgQUlfIDItWWVhciBGaW5hbmNpYWwgUHJvamVjdGlvbi5wZGYiLCJpYXQiOjE3NTA5NzU0MzAsImV4cCI6MTc4MjUxMTQzMH0.wd5Ibgcz3nHZUjCyPbTv4mibsQoyIACFae9SoPQLn9Q#view=FitH&zoom=110" title="2-Year Financial Projection" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/financial/Adora%20AI_%202-Year%20Financial%20Projection.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9maW5hbmNpYWwvQWRvcmEgQUlfIDItWWVhciBGaW5hbmNpYWwgUHJvamVjdGlvbi5wZGYiLCJpYXQiOjE3NTA5NzU0MzAsImV4cCI6MTc4MjUxMTQzMH0.wd5Ibgcz3nHZUjCyPbTv4mibsQoyIACFae9SoPQLn9Q" download="Adora_AI_2_Year_Financial_Projection.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Budget Template Modal */}
      {showBudgetTemplateModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowBudgetTemplateModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowBudgetTemplateModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Budget Template Q2 2025</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quarterly budget template and financial planning framework</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent('https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/financial/Adora%20Budget%20Template%20-%20Q2%202025.xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9maW5hbmNpYWwvQWRvcmEgQnVkZ2V0IFRlbXBsYXRlIC0gUTIgMjAyNS54bHN4IiwiaWF0IjoxNzUwOTc1NDM3LCJleHAiOjE3ODI1MTE0Mzd9.ySMLsehqOL2N-MXYEXIbrQ1FZqaaU0vuPoU9Fy2_dJM')}`} title="Budget Template Q2 2025" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/financial/Adora%20Budget%20Template%20-%20Q2%202025.xlsx?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9maW5hbmNpYWwvQWRvcmEgQnVkZ2V0IFRlbXBsYXRlIC0gUTIgMjAyNS54bHN4IiwiaWF0IjoxNzUwOTc1NDM3LCJleHAiOjE3ODI1MTE0Mzd9.ySMLsehqOL2N-MXYEXIbrQ1FZqaaU0vuPoU9Fy2_dJM" download="Adora_Budget_Template_Q2_2025.xlsx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download Excel
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Investor Memo Modal */}
      {showInvestorMemoModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowInvestorMemoModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowInvestorMemoModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Investor Memo</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive investment overview and opportunity summary</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/financial/Adora%20AI%20-%20Investor%20Memo.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9maW5hbmNpYWwvQWRvcmEgQUkgLSBJbnZlc3RvciBNZW1vLnBkZiIsImlhdCI6MTc1MTQ4MzYwNSwiZXhwIjoxNzgzMDE5NjA1fQ.EfQeUJXdKEe5B_nrf2syQD16PoXGsXJiBOOlmxKT17o#view=FitH&zoom=110" title="Investor Memo" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/financial/Adora%20AI%20-%20Investor%20Memo.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9maW5hbmNpYWwvQWRvcmEgQUkgLSBJbnZlc3RvciBNZW1vLnBkZiIsImlhdCI6MTc1MTQ4MzYwNSwiZXhwIjoxNzgzMDE5NjA1fQ.EfQeUJXdKEe5B_nrf2syQD16PoXGsXJiBOOlmxKT17o" download="Adora_AI_Investor_Memo.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Problem Thesis Modal */}
      {showProblemThesisModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowProblemThesisModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowProblemThesisModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Problem Thesis</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Market challenges we're solving</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20-%20Problem%20Thesis.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIC0gUHJvYmxlbSBUaGVzaXMucGRmIiwiaWF0IjoxNzUxNDg0MjA1LCJleHAiOjE3ODMwMjAyMDV9.gnkgU_tBTidqu2-O4O1IQjbELh-Ydkf8QyyP6Ph8fto#view=FitH&zoom=110" title="Problem Thesis PDF" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20-%20Problem%20Thesis.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIC0gUHJvYmxlbSBUaGVzaXMucGRmIiwiaWF0IjoxNzUxNDg0MjA1LCJleHAiOjE3ODMwMjAyMDV9.gnkgU_tBTidqu2-O4O1IQjbELh-Ydkf8QyyP6Ph8fto" download="Adora_AI_Problem_Thesis.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Solution Matrix Modal */}
      {showSolutionMatrixModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowSolutionMatrixModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowSolutionMatrixModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Solution Matrix</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Our comprehensive approach</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20-%20Solution%20Matrix.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIC0gU29sdXRpb24gTWF0cml4LnBkZiIsImlhdCI6MTc1MTQ4NDA3MiwiZXhwIjoxNzgzMDIwMDcyfQ.uPdTKxHHLFgGQbVjiFANSEoMMJDdFD0sROn-gZZMnwA#view=FitH&zoom=110" title="Solution Matrix PDF" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI%20-%20Solution%20Matrix.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJIC0gU29sdXRpb24gTWF0cml4LnBkZiIsImlhdCI6MTc1MTQ4NDA3MiwiZXhwIjoxNzgzMDIwMDcyfQ.uPdTKxHHLFgGQbVjiFANSEoMMJDdFD0sROn-gZZMnwA" download="Adora_AI_Solution_Matrix.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Financial Outline Modal */}
      {showFinancialOutlineModal && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 transition-opacity" onClick={() => setShowFinancialOutlineModal(false)} />
          <div className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{ top: '80px', left: '0', right: '0', bottom: '0', marginLeft: (() => { if (typeof window !== 'undefined' && window.innerWidth < 1024) { return '0px'; } if (isExpanded || isHovered) { return '290px'; } return '90px'; })(), transition: 'margin-left 300ms ease-in-out' }}>
            <div className="w-full max-w-7xl max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative min-h-0">
                <button className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700" onClick={() => setShowFinancialOutlineModal(false)} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <div><h3 className="text-xl font-bold text-gray-900 dark:text-white">Financial Outline</h3><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projections and key metrics</p></div>
                </div>
                <div className="p-2 pb-3">
                  <div className="w-full rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <iframe src="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI_%202-Year%20Financial%20Projection.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJXyAyLVllYXIgRmluYW5jaWFsIFByb2plY3Rpb24ucGRmIiwiaWF0IjoxNzUxNDkyNDA5LCJleHAiOjE3ODMwMjg0MDl9.iMiOF2MsLuV41EovQc4DzPDuMEF9ov1tutnF2atj5EY#view=FitH&zoom=110" title="Financial Outline PDF" className="w-full h-[65vh] rounded-lg" style={{ minHeight: '500px' }} />
                  </div>
                </div>
                <div className="px-2 pb-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="https://tnbsoahieqhejtoewmbt.supabase.co/storage/v1/object/sign/dataroom/company_overview/Adora%20AI_%202-Year%20Financial%20Projection.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NmZhMDAxZS1mMDUxLTQ4OTItYTc4Mi1jY2M4Y2ZjMTljZDEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkYXRhcm9vbS9jb21wYW55X292ZXJ2aWV3L0Fkb3JhIEFJXyAyLVllYXIgRmluYW5jaWFsIFByb2plY3Rpb24ucGRmIiwiaWF0IjoxNzUxNDkyNDA5LCJleHAiOjE3ODMwMjg0MDl9.iMiOF2MsLuV41EovQc4DzPDuMEF9ov1tutnF2atj5EY" download="Adora_AI_2_Year_Financial_Projection.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5365FF] px-4 py-2 text-white hover:bg-[#4152cc] transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download PDF
                    </a>
                    <button onClick={handleShowInvestmentModal} className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>Contact About Investment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Investment Inquiry Modal */}
      {showInvestmentModal && (
        <>
          {/* Overlay for lightbox - covers entire viewport */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => setShowInvestmentModal(false)}
          />
          
          {/* Modal positioned to account for sidebar and header */}
          <div 
            className="fixed z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
            style={{
              top: '80px', // Account for header height
              left: '0',
              right: '0', 
              bottom: '0',
              marginLeft: (() => {
                // Calculate sidebar offset for desktop - matches the layout system
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  return '0px'; // On mobile, sidebar overlays so no offset needed
                }
                // Desktop: match the layout system's margin logic
                if (isExpanded || isHovered) {
                  return '290px'; // Full sidebar width
                }
                return '90px'; // Collapsed sidebar width
              })(),
              // Add smooth transition for sidebar state changes
              transition: 'margin-left 300ms ease-in-out'
            }}
          >
            <div className="w-full max-w-md">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl relative">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => setShowInvestmentModal(false)}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Modal Header */}
                <div className="p-6 pr-16 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Interested in Investing?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Fill out your details and we'll get in touch to discuss investment opportunities.
                  </p>
                </div>
                
                {/* Form */}
                <div className="p-6">
                  {submitMessage ? (
                    <div className="text-center text-green-600 dark:text-green-400 py-4">
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p>{submitMessage}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleInvestmentSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={investmentForm.name}
                          onChange={(e) => handleInvestmentFormChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={investmentForm.email}
                          onChange={(e) => handleInvestmentFormChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:border-transparent"
                          required
                        />
                      </div>
                      
                      {submitError && (
                        <div className="text-red-600 dark:text-red-400 text-sm">
                          {submitError}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#5365FF] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#4152cc] focus:outline-none focus:ring-2 focus:ring-[#5365FF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Submitting...
                          </div>
                        ) : (
                          'Submit Request'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 