'use client';

import React, { useState } from 'react';
import InterviewChat from '@/components/obs/InterviewChat';
import ComponentCard from '@/components/common/ComponentCard';

interface CandidateData {
  name: string;
  email: string;
  role: string;
  location: string;
  profile?: string;
  phone?: string;
}

export default function ApplyPage() {
  const [step, setStep] = useState<'form' | 'interview' | 'complete'>('form');
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const candidate: CandidateData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as string,
        location: formData.get('location') as string,
        profile: formData.get('profile') as string,
        phone: formData.get('phone') as string,
      };

      // Validate required fields
      if (!candidate.name || !candidate.email || !candidate.role || !candidate.location) {
        setSubmitMessage({ type: 'error', text: 'Please fill in all required fields.' });
        return;
      }

      // Save candidate data and start interview
      setCandidateData(candidate);
      setStep('interview');

      // Optionally save to database here
      // await fetch('/api/job-applications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(candidate),
      // });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterviewComplete = async (summary: any) => {
    console.log('Interview completed:', summary);
    
    // Save interview results
    try {
      await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...candidateData,
          interviewSummary: summary,
          status: 'interviewed'
        }),
      });
    } catch (error) {
      console.error('Error saving interview results:', error);
    }

    setStep('complete');
  };

  const resetApplication = () => {
    setStep('form');
    setCandidateData(null);
    setSubmitMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start py-8 md:py-12">
      <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Apply to Adora AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our mission to transform business intelligence with AI. 
            Complete your application and take our AI-powered interview.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 'form' ? 'text-blue-600' : step === 'interview' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'form' ? 'bg-blue-600 border-blue-600 text-white' : 
                step === 'interview' ? 'bg-green-600 border-green-600 text-white' : 
                'bg-gray-200 border-gray-300 text-gray-500'
              }`}>
                {step === 'form' ? '1' : '✓'}
              </div>
              <span className="ml-2 font-medium">Application</span>
            </div>
            <div className="w-8 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step === 'interview' ? 'text-blue-600' : step === 'complete' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'interview' ? 'bg-blue-600 border-blue-600 text-white' : 
                step === 'complete' ? 'bg-green-600 border-green-600 text-white' : 
                'bg-gray-200 border-gray-300 text-gray-500'
              }`}>
                {step === 'interview' ? '2' : step === 'complete' ? '✓' : '2'}
              </div>
              <span className="ml-2 font-medium">Interview</span>
            </div>
            <div className="w-8 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step === 'complete' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'complete' ? 'bg-green-600 border-green-600 text-white' : 
                'bg-gray-200 border-gray-300 text-gray-500'
              }`}>
                {step === 'complete' ? '✓' : '3'}
              </div>
              <span className="ml-2 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          {step === 'form' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10 md:p-12 mx-auto transition-all">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Tell Us About Yourself
                </h2>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {submitMessage && (
                    <div className={`p-4 rounded-md ${
                      submitMessage.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
                        : 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                    }`}>
                      {submitMessage.text}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Position You're Applying For *
                      </label>
                      <select
                        id="role"
                        name="role"
                        required
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      >
                        <option value="">Select a position</option>
                        <option value="Cryptography Systems Engineer">Cryptography Systems Engineer — Symbolic Encryption (Rust | C/C++)</option>
                        <option value="AI Systems Integrator">AI Systems Integrator — GenAI & LLM-Ops (Python | TypeScript | RAG | n8n)</option>
                        <option value="Product Designer">Product Designer — Agentic AI OS UI/UX (Web | Desktop | Mobile)</option>
                        <option value="Product Manager">Product Manager — Agentic AI OS Team Organization (Jira, Asana, Discord, Figma)</option>
                        <option value="AI Social Media Manager">AI first Social Media Manager</option>
                        <option value="AI Content Creator">AI Educational Content Creator</option>
                        <option value="Internship">Paid Internships Available</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        disabled={isSubmitting}
                        placeholder="City, Country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="profile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn/GitHub Profile
                    </label>
                    <input
                      type="url"
                      id="profile"
                      name="profile"
                      disabled={isSubmitting}
                      placeholder="https://linkedin.com/in/yourprofile or https://github.com/yourusername"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Start AI Interview'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {step === 'interview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Interview Chat */}
              <div className="lg:col-span-2">
                <InterviewChat
                  candidateData={candidateData || undefined}
                  onInterviewComplete={handleInterviewComplete}
                  className="h-[600px]"
                />
              </div>

              {/* Candidate Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Candidate Information
                  </h3>
                  {candidateData && (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                        <p className="text-gray-900 dark:text-white">{candidateData.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                        <p className="text-gray-900 dark:text-white">{candidateData.email}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Position:</span>
                        <p className="text-gray-900 dark:text-white">{candidateData.role}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Location:</span>
                        <p className="text-gray-900 dark:text-white">{candidateData.location}</p>
                      </div>
                      {candidateData.profile && (
                        <div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile:</span>
                          <a 
                            href={candidateData.profile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 block truncate"
                          >
                            {candidateData.profile}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Interview Progress
                    </h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Question 1 of 8
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12 mx-auto text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Interview Complete!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Thank you for completing your AI interview. Our team will review your application and responses. 
                We'll be in touch within 3-5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetApplication}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Apply for Another Position
                </button>
                <a
                  href="/company/about"
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Back to About
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 