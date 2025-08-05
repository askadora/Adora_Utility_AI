'use client';

import React from 'react';

export default function NativeApps() {
  const platforms = [
    {
      name: "iOS",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      iconColor: "text-gray-900 dark:text-white",
      description: "Native iPhone and iPad app with full iOS integration",
      features: ["Siri integration", "Apple Watch support", "iCloud sync", "Push notifications"],
      status: "In Development"
    },
    {
      name: "Android",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5976.416.416 0 00-.5976.1521l-2.0223 3.503C15.5902 9.2439 13.8533 8.6738 12 8.6738s-3.5902.5701-5.2055 1.6954L4.7723 6.8662a.416.416 0 00-.5976-.1521.416.416 0 00-.1521.5976L5.8185 9.3214C2.6884 11.1867.3432 14.6589.0376 18.764h23.9249c-.3056-4.1051-2.6509-7.5773-5.7806-9.4426"/>
        </svg>
      ),
      iconColor: "text-green-600 dark:text-green-400",
      description: "Native Android app optimized for all Android devices",
      features: ["Google Assistant integration", "Material Design", "Cloud sync", "Background processing"],
      status: "In Development"
    },
    {
      name: "macOS",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      iconColor: "text-gray-900 dark:text-white",
      description: "Native macOS desktop application",
      features: ["Menu bar integration", "Spotlight search", "Touch Bar support", "Native notifications"],
      status: "Planned"
    },
    {
      name: "Windows",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3.545L9.091 2.182v9.273H0V3.545zM10.909 2.182L24 0v11.455H10.909V2.182zM0 12.545h9.091V21.818L0 20.455V12.545zM10.909 12.545H24V24l-13.091-2.182V12.545z"/>
        </svg>
      ),
      iconColor: "text-blue-600 dark:text-blue-400",
      description: "Native Windows desktop application",
      features: ["System tray integration", "Windows search", "Taskbar notifications", "Native Windows UI"],
      status: "Planned"
    },
    {
      name: "Linux",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      iconColor: "text-orange-600 dark:text-orange-400",
      description: "Native Linux desktop application",
      features: ["Package manager support", "Desktop notifications", "System integration", "Open source"],
      status: "Planned"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Native Apps</h1>
                <p className="text-gray-600 dark:text-gray-400">Experience Adora AI across all your devices with native applications</p>
              </div>
              
              {/* Coming Soon Badge */}
              <div className="flex-shrink-0 ml-6">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🚀 Native Apps for Every Platform
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We're building native applications for all major platforms to provide you with the best possible experience. 
                Each app will be optimized for its platform while maintaining full feature parity with the web version.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>📱 Mobile First</span>
                <span>•</span>
                <span>🖥️ Desktop Optimized</span>
                <span>•</span>
                <span>☁️ Cloud Sync</span>
                <span>•</span>
                <span>🔒 Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={platform.iconColor}>{platform.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(platform.status)}`}>
                    {platform.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {platform.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {platform.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Key Features:</h4>
                  <ul className="space-y-1">
                    {platform.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cross-Platform Sync */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔄 Cross-Platform Sync</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All your data, settings, and preferences will sync seamlessly across all platforms. 
              Start a conversation on your phone and continue it on your desktop.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Real-time synchronization</li>
              <li>• Offline capability</li>
              <li>• End-to-end encryption</li>
              <li>• Automatic backup</li>
            </ul>
          </div>

          {/* Development Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📅 Development Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Q2 2024</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">iOS & Android Beta</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Q3 2024</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Desktop Apps (macOS & Windows)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Q4 2024</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Linux Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800/20">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to know when our native apps are available. Sign up for early access and beta testing.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              Get Early Access
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 