"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  videoUrl: string;
  isNew?: boolean;
}

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  url: string;
  duration: string;
  icon: React.ReactNode;
}

export const LearningHub: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos: Video[] = [
    {
      id: 1,
      title: "Get Started with Adora AI",
      description: "Everything you need to know to start using our AI platform effectively in under 5 minutes.",
      thumbnail: "/images/video-thumb/platform-overview.png",
      duration: "4:32",
      category: "Getting Started",
      videoUrl: "https://example.com/platform-overview.mp4",
      isNew: true
    },
    {
      id: 2,
      title: "Create Your First Workflow",
      description: "Step-by-step guide to automating your first business process.",
      thumbnail: "/images/video-thumb/workflow-tutorial.png", 
      duration: "8:15",
      category: "Tutorial",
      videoUrl: "https://example.com/workflow-tutorial.mp4"
    },
    {
      id: 3,
      title: "Advanced AI Synthesis",
      description: "Learn how multiple AI models work together for better results.",
      thumbnail: "/images/video-thumb/synthesis-demo.png",
      duration: "12:45",
      category: "Advanced",
      videoUrl: "https://example.com/synthesis-demo.mp4"
    }
  ];

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Complete Profile Setup",
      description: "Add your role, company info, and preferences",
      completed: true,
      current: false,
      url: "/settings?tab=profile",
      duration: "2 min",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Connect Your First Integration",
      description: "Link your CRM, email, or document storage",
      completed: true,
      current: false,
      url: "/integrations",
      duration: "5 min",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Try Your First AI Conversation",
      description: "Ask Adora a question and see the magic happen",
      completed: true,
      current: false,
      url: "/prompt/chat",
      duration: "3 min",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Create Your First Workflow",
      description: "Automate a repetitive task to save time",
      completed: false,
      current: true,
      url: "/workflow",
      duration: "8 min",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Explore Multi-Model Synthesis",
      description: "See how multiple AI models work together",
      completed: false,
      current: false,
      url: "/prompt/multi-chat",
      duration: "10 min",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 6,
      title: "Set Up Your Dashboard",
      description: "Customize widgets and data views",
      completed: false,
      current: false,
      url: "/dashboard/customize",
      duration: "6 min",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const totalSteps = onboardingSteps.length;
  const currentStep = onboardingSteps.find(step => step.current);
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const isOnboardingCompleted = completedSteps === totalSteps;

  const handlePlayVideo = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
  };

  const featuredVideo = videos[0];

  return (
    <>
      {/* Learning Hub - Video Centric */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg overflow-hidden">
        
        {/* Hero Video Section */}
        <div className="relative group cursor-pointer" onClick={() => handlePlayVideo(featuredVideo)}>
          {/* Video Thumbnail - Full Width Hero */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center">
              <div className="text-center">
                {/* Large Play Button */}
                <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <svg className="w-10 h-10 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                {/* Video Info Overlay */}
                <div className="bg-black/50 backdrop-blur-sm rounded-xl px-6 py-3 mx-auto inline-block">
                  <p className="text-white font-medium text-lg mb-1">{featuredVideo.title}</p>
                  <p className="text-white/80 text-sm">{featuredVideo.duration} • {featuredVideo.category}</p>
                </div>
              </div>
            </div>
            
            {/* NEW Badge */}
            {featuredVideo.isNew && (
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-full shadow-lg">
                  NEW
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Below Video */}
        <div className="p-6">
          {/* Video Description */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Ready to get started?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
              {featuredVideo.description}
            </p>
          </div>

          {/* Progress & Next Steps - Simplified */}
          {!isOnboardingCompleted && currentStep && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 mb-6 border border-blue-100 dark:border-blue-800/20">
              <div className="flex items-center justify-between">
                {/* Progress Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="2" />
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-500" strokeWidth="2" 
                              strokeDasharray={`${progressPercentage}, 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Next: {currentStep.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {completedSteps} of {totalSteps} setup steps completed • ~{currentStep.duration} remaining
                    </p>
                  </div>
                </div>

                {/* Continue Button */}
                <Link href={currentStep.url}>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                    Continue Setup
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Completion State */}
          {isOnboardingCompleted && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 mb-6 border border-green-100 dark:border-green-800/20">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    🎉 All set! You're ready to explore.
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Continue learning with our advanced tutorials
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* More Videos - Simple List */}
          {videos.length > 1 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                More tutorials
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.slice(1).map((video) => (
                  <div 
                    key={video.id}
                    className="group cursor-pointer p-4 rounded-xl border border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200"
                    onClick={() => handlePlayVideo(video)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                          {video.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {video.duration} • {video.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{activeVideo.title}</h3>
                  <p className="text-gray-300 mb-4">{activeVideo.description}</p>
                  <p className="text-sm text-gray-400">Video player would be embedded here</p>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-6 text-center text-white">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                <span>{activeVideo.duration}</span>
                <span>•</span>
                <span>{activeVideo.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 