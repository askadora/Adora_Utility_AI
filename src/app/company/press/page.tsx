import React from 'react';
import { Metadata } from 'next';
import ComponentCard from '@/components/common/ComponentCard';

export const metadata: Metadata = {
  title: "Press | Adora AI",
  description: "Latest news, press releases, and media resources for Adora AI.",
};

export default function PressPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Main Heading - left aligned, matching card headings */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl mb-4">
        Press & Media
      </h1>

      {/* Latest Press Releases */}
      <ComponentCard title="Latest Press Releases" desc="Official announcements from Adora AI">
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          <li className="py-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-1">Adora AI Announces $3M Pre-Launch Funding Round</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-1">June 2025 &mdash; Adora AI secures strategic investment to accelerate product launch and team growth.</p>
            <a href="#" className="text-primary hover:underline text-sm">Read full release</a>
          </li>
          <li className="py-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-1">Adora AI Unveils Next-Gen AI OS at Tech Summit</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-1">April 2025 &mdash; The company showcases its multi-model AI platform at the annual Tech Summit.</p>
            <a href="#" className="text-primary hover:underline text-sm">Read full release</a>
          </li>
        </ul>
      </ComponentCard>

      {/* Media Coverage */}
      <ComponentCard title="Media Coverage" desc="What the media is saying about Adora AI">
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          <li className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white/90">"Adora AI is poised to disrupt the AI OS market"</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">TechCrunch &mdash; May 2025</p>
            </div>
            <a href="#" className="text-primary hover:underline text-sm mt-2 md:mt-0">Read article</a>
          </li>
          <li className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white/90">"The team behind Adora AI is building something special"</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">VentureBeat &mdash; March 2025</p>
            </div>
            <a href="#" className="text-primary hover:underline text-sm mt-2 md:mt-0">Read article</a>
          </li>
        </ul>
      </ComponentCard>

      {/* Press Kit Download */}
      <ComponentCard title="Press Kit" desc="Download our brand assets, logos, and company overview">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Press Kit (ZIP)
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Download Logo (PNG)
          </a>
        </div>
      </ComponentCard>

      {/* Media Contact */}
      <ComponentCard title="Media Contact" desc="For press inquiries, please contact our team">
        <div className="space-y-2">
          <a href="mailto:press@adoraai.com" className="flex items-center gap-2 text-primary hover:underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            press@adoraai.com
          </a>
        </div>
      </ComponentCard>
    </div>
  );
} 