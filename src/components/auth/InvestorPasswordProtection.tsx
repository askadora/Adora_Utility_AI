"use client";

import React, { useState, useEffect } from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { supabase } from '@/lib/supabaseClient';

interface InvestorPasswordProtectionProps {
  children: React.ReactNode;
}

const InvestorPasswordProtection: React.FC<InvestorPasswordProtectionProps> = ({ children }) => {
  const { isExpanded, isHovered } = useSidebar();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Request Access Modal State
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    isAccredited: false
  });
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [requestSuccess, setRequestSuccess] = useState('');

  // Check if user is already authenticated for investors page
  useEffect(() => {
    const investorAuth = sessionStorage.getItem('investor_authenticated');
    if (investorAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check - in production, you might want to use environment variables
    const INVESTOR_PASSWORD = process.env.NEXT_PUBLIC_INVESTOR_PASSWORD || '@d0r@!vest0r2025';
    
    if (password === INVESTOR_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('investor_authenticated', 'true');
      setError('');
    } else {
      setError('Invalid password. Please contact Adora AI for access.');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('investor_authenticated');
    setPassword('');
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestLoading(true);
    setRequestError('');
    setRequestSuccess('');

    try {
      // Call Supabase function directly
      const { data, error } = await supabase.rpc('create_investor_access_request', {
        p_name: requestForm.name,
        p_email: requestForm.email,
        p_is_accredited: requestForm.isAccredited
      });

      if (error) {
        throw new Error(error.message);
      }

      // Handle response based on whether record already exists and accreditation status
      if (data.existing) {
        // Record already exists for accredited investor - send email again
        setRequestSuccess('You already have access! We\'re sending your credentials again. Check your email.');
        
        // Send email for existing accredited user
        try {
          await fetch('/api/investor-access/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: requestForm.name,
              email: requestForm.email,
              isAccredited: true
            }),
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          setRequestSuccess('You already have access, but there was an issue sending the email. Please contact support.');
        }
      } else {
        // New record created
        if (requestForm.isAccredited) {
          setRequestSuccess('Request approved! You will receive access credentials via email shortly.');
          
          // Call the API route only for sending email (since we still need server-side email sending)
          try {
            await fetch('/api/investor-access/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: requestForm.name,
                email: requestForm.email,
                isAccredited: requestForm.isAccredited
              }),
            });
          } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't show error to user since the request was saved successfully
          }
        } else {
          setRequestSuccess('Thank you for your interest. However, access to our investor data room is currently limited to accredited investors only.');
        }
      }

      setRequestForm({ name: '', email: '', isAccredited: false });
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setShowRequestModal(false);
        setRequestSuccess('');
      }, 3000);

    } catch (error: any) {
      setRequestError(error.message || 'Failed to process request. Please try again.');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleRequestFormChange = (field: string, value: string | boolean) => {
    setRequestForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isAuthenticated) {
    return (
      <div>
        {/* Logout button for investors */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg"
            title="Exit Investor Portal"
          >
            Exit Portal
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
            <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Investor Data Room
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This section requires additional authentication
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="investor-password" className="sr-only">
                Investor Password
              </label>
              <input
                id="investor-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter investor password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Access Denied
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              )}
              {isLoading ? 'Verifying...' : 'Access Data Room'}
            </button>
          </div>

          {/* Request Access Section */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Don't have access?
            </p>
            <button
              type="button"
              onClick={() => setShowRequestModal(true)}
              className="w-full flex justify-center py-3 px-4 border border-indigo-300 dark:border-indigo-500 text-sm font-medium rounded-lg text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Access
            </button>
          </div>


        </form>
      </div>

      {/* Request Access Modal - matching Apply to Adora AI style */}
      {showRequestModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 transition-opacity"
            onClick={() => {
              setShowRequestModal(false);
              setRequestError('');
              setRequestSuccess('');
            }}
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
            <div className="w-full max-w-md max-h-full overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 relative">
                <button
                  className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestError('');
                    setRequestSuccess('');
                  }}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="text-gray-900 dark:text-white pr-8">
                  <h3 className="text-xl font-bold mb-2">Request Investor Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Please fill out the following form and we'll send you access credentials.
                  </p>
                  
                  <form onSubmit={handleRequestAccess} className="space-y-4">
                    {/* Success/Error Message */}
                    {requestSuccess && (
                      <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                        {requestSuccess}
                      </div>
                    )}
                    
                    {requestError && (
                      <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                        {requestError}
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={requestLoading}
                        value={requestForm.name}
                        onChange={(e) => handleRequestFormChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={requestLoading}
                        value={requestForm.email}
                        onChange={(e) => handleRequestFormChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="accredited-investor"
                          type="checkbox"
                          checked={requestForm.isAccredited}
                          onChange={(e) => handleRequestFormChange('isAccredited', e.target.checked)}
                          disabled={requestLoading}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded disabled:opacity-50"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="accredited-investor" className="font-medium text-gray-700 dark:text-gray-300">
                          I am an accredited investor
                        </label>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                          Access to the investor data room is limited to accredited investors only.
                        </p>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={requestLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors mt-6 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {requestLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvestorPasswordProtection; 