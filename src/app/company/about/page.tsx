import React from 'react';
import { Metadata } from 'next';
import ComponentCard from '@/components/common/ComponentCard';

export const metadata: Metadata = {
  title: "About Adora AI | Company Information",
  description: "Learn about Adora AI's mission, team, and company culture.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - FLEXBOX (1D) Layout
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
          About Adora AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Discover our mission to transform business intelligence with AI, meet our team, 
          and learn about career opportunities at Adora AI.
        </p>
      </header>

      {/* Our Story Section */}
      <ComponentCard title="Our Story" desc="Learn about our journey and mission">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            Our journey began 10 years ago with a vision to quantify the good done in the world. 
            After facing initial challenges and learning valuable lessons about technology, 
            database management, and scaling, we've evolved into a pioneering force in AI development.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            In 2016, we faced a pivotal moment that shaped our future. Despite having a talented team, 
            strong press coverage, and impressive app download numbers, we encountered significant 
            technical challenges with our database infrastructure. This experience taught us invaluable 
            lessons about technology, scaling, and the importance of deep technical understanding.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Since then, we've dedicated ourselves to mastering database security, technology responsibility, 
            Machine Learning, and Artificial Intelligence. Our goal is to help organizations avoid the 
            mistakes we've made and leverage AI effectively and ethically.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Today, Adora AI stands at the forefront of AI development with a unique approach:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>We use nine different AI models, including our own specialized models, ensuring robust and comprehensive solutions</li>
            <li>Our revolutionary PRIO server/data storage framework keeps your data secure across multiple servers</li>
            <li>We implement proprietary 64 & 256-bit combined encryption with a 4th image-based security layer</li>
            <li>Our AI Dev Agent is evolving to rewrite generalized software, making it custom for your company</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Our mission is clear: to develop AI in an Ethical, Moral, Safe, and Secure way. We believe 
            that AI must be trained to find wonder in everything, to see the beauty in our world, and 
            to value and protect everything - including us - while never violating individual freedom.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We're not just building AI tools; we're creating an integrated AI system that will impact 
            every aspect of your organization. Our goal is to help you become one of the companies that 
            not only survives but thrives in the AI revolution.
          </p>
        </div>
      </ComponentCard>

      {/* Team Section */}
      <ComponentCard title="Our Team" desc="Meet the people behind Adora AI">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member Cards */}
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kyle Thomas</h3>
            <p className="text-gray-600 dark:text-gray-300">Founder</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Karina Lupercio</h3>
            <p className="text-gray-600 dark:text-gray-300">Operations</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kevin Bultongez</h3>
            <p className="text-gray-600 dark:text-gray-300">Physical Product</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Naomi Wang</h3>
            <p className="text-gray-600 dark:text-gray-300">Senior Product Engineer</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chittal Karuppiah</h3>
            <p className="text-gray-600 dark:text-gray-300">Product Engineer</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sridurga Linga</h3>
            <p className="text-gray-600 dark:text-gray-300">Product Engineer</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Anthony Porter</h3>
            <p className="text-gray-600 dark:text-gray-300">Recruiting</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jacob Gresham</h3>
            <p className="text-gray-600 dark:text-gray-300">Recruiting</p>
          </div>
        </div>
      </ComponentCard>

      {/* Careers Section */}
      <ComponentCard title="Join Our Team" desc="Build the future of AI with us">
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            We're always looking for talented individuals who are passionate about AI 
            and want to make a difference. Join us in our mission to transform how 
            businesses use artificial intelligence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Open Positions
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Senior AI Engineer</li>
                <li>Full Stack Developer</li>
                <li>Product Manager</li>
                <li>UX/UI Designer</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Benefits
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contact Information
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>Email: contact@adoraai.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 AI Street, Tech City, TC 12345</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                LinkedIn
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Twitter
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
} 