"use client";

import React from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import DocsBotWidget from '@/components/investor-dashboard/DocsBotWidget';

export default function InvestorDataRoom() {
  return (
    <div className="relative min-h-screen">
      <div className="space-y-6 md:space-y-8">
        <div className="mt-1 p-4 md:p-6 2xl:p-10">
          <div className="mb-4">
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Investor Data Room
            </h2>
          </div>
        </div>

        {/* Hero Section */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white/90 mb-4">
              Your Investment Opportunity
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We're seeking $2.5-3.2M in funding to accelerate our AI platform launch. 
              Join us in building the future of artificial intelligence.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Minimum Investment</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">$250K</p>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Client Investor</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">$322K</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pitch Deck Section */}
        <ComponentCard title="Pitch Deck" desc="Watch our presentation and download materials">
          <div className="space-y-6">
            <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800">
              {/* Video Player Placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Video Player</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Pitch Deck (PDF)
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Watch Presentation
              </a>
            </div>
          </div>
        </ComponentCard>

        {/* Financials Section */}
        <ComponentCard title="Financials" desc="Key financial documents and projections">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Financial Statements</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Balance Sheet
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Profit & Loss Statement
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Projections & KPIs</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Revenue Projections
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Key Performance Indicators
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ComponentCard>

        {/* Legal Documents Section */}
        <ComponentCard title="Legal Documents" desc="Corporate structure and intellectual property">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Corporate Documents</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Articles of Incorporation
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Share Structure
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Intellectual Property</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Trademark Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Patent Applications
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ComponentCard>

        {/* Brand & Market Section */}
        <ComponentCard title="Brand & Market Analysis" desc="Brand guidelines and market insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Brand Assets</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Brand Book & Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Marketing Assets
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Market Analysis</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Market Size & Growth
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Competitive Analysis
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </ComponentCard>

        {/* Contact Section */}
        <ComponentCard title="Contact Us" desc="Get in touch with our investment team">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              For investment inquiries or to schedule a meeting with our team, please contact:
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:investors@adoraai.com" className="flex items-center gap-2 text-primary hover:underline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                investors@adoraai.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2 text-primary hover:underline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* DocsBot AI Widget - Fixed to bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <DocsBotWidget />
        <div id="docsbotai-root"></div>
      </div>
    </div>
  );
} 