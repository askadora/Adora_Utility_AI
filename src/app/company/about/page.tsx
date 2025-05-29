import React from 'react';
import { Metadata } from 'next';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';

export const metadata: Metadata = {
  title: "About Us | Adora AI",
  description: "Learn about Adora AI - our mission, team, careers, and how to contact us.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <PageBreadcrumb pageTitle="About Us" />

      {/* Hero Section */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white/90 mb-4">
            Transforming Business Intelligence with AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Adora AI is at the forefront of artificial intelligence innovation, 
            helping businesses make smarter decisions through advanced analytics 
            and machine learning.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <ComponentCard title="Our Story" desc="Learn about our journey and mission">
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Founded in 2023, Adora AI emerged from a vision to democratize artificial 
            intelligence for businesses of all sizes. Our platform combines cutting-edge 
            AI technology with intuitive design to deliver powerful business intelligence 
            solutions that drive growth and innovation.
          </p>
          <p>
            We believe that AI should be accessible, understandable, and actionable. 
            That's why we've built a platform that makes it easy for businesses to 
            harness the power of AI without needing a team of data scientists.
          </p>
        </div>
      </ComponentCard>

      {/* Team Section */}
      <ComponentCard title="Our Team" desc="Meet the people behind Adora AI">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Team Member Cards */}
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">CEO & Co-founder</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Jane Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">CTO & Co-founder</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">Mike Johnson</h3>
            <p className="text-gray-600 dark:text-gray-400">Head of AI Research</p>
          </div>
        </div>
      </ComponentCard>

      {/* Careers Section */}
      <ComponentCard title="Join Our Team" desc="Build the future of AI with us">
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            We're always looking for talented individuals who are passionate about AI 
            and want to make a difference. Join us in our mission to transform how 
            businesses use artificial intelligence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-2">
                Open Positions
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Senior AI Engineer</li>
                <li>Full Stack Developer</li>
                <li>Product Manager</li>
                <li>UX/UI Designer</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90 mb-2">
                Benefits
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Competitive salary</li>
                <li>Health insurance</li>
                <li>Remote work options</li>
                <li>Learning & development</li>
              </ul>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* Contact Section */}
      <ComponentCard title="Get in Touch" desc="We'd love to hear from you">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
              Contact Information
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Email: contact@adoraai.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 AI Street, Tech City, TC 12345</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
} 