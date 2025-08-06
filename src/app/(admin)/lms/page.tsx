'use client';

import React, { useState } from 'react';
import { LearningHub } from '@/components/home/LearningHub';

export default function LMS() {
  const [selectedTab, setSelectedTab] = useState('courses');

  const mockCourses = [
    {
      id: 1,
      title: "AI Prompt Engineering Fundamentals",
      instructor: "Dr. Sarah Chen",
      duration: "4 weeks",
      progress: 75,
      difficulty: "Beginner",
      thumbnail: "🤖",
      description: "Learn the art and science of crafting effective AI prompts for maximum output quality.",
      lessons: 12,
      students: 1247,
      rating: 4.8,
      status: "in-progress"
    },
    {
      id: 2,
      title: "Advanced Workflow Automation",
      instructor: "Marcus Rodriguez",
      duration: "6 weeks",
      progress: 0,
      difficulty: "Advanced",
      thumbnail: "⚡",
      description: "Master complex automation workflows and integration patterns for enterprise environments.",
      lessons: 18,
      students: 892,
      rating: 4.9,
      status: "not-started"
    },
    {
      id: 3,
      title: "Data Analysis with AI Tools",
      instructor: "Dr. Emily Johnson",
      duration: "5 weeks",
      progress: 100,
      difficulty: "Intermediate",
      thumbnail: "📊",
      description: "Leverage AI-powered analytics tools to extract insights from complex datasets.",
      lessons: 15,
      students: 1456,
      rating: 4.7,
      status: "completed"
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Data Analysis with AI Tools",
      issueDate: "2024-01-15",
      certificateId: "ADORA-AI-2024-001",
      instructor: "Dr. Emily Johnson"
    },
    {
      id: 2,
      title: "Prompt Engineering Specialist",
      issueDate: "2023-12-08",
      certificateId: "ADORA-AI-2023-089",
      instructor: "Dr. Sarah Chen"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex-none mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Management System</h1>
                <p className="text-gray-600 dark:text-gray-400">Master new skills with AI-powered learning experiences</p>
              </div>
              
              {/* Ask Adora Voice Button */}
              <div className="relative group flex-shrink-0 ml-6">
                <button
                  className="group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl border-transparent transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {/* Microphone Icon */}
                  <div className="relative">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                    
                    {/* Pulse animation overlay for when recording */}
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 animate-ping"></div>
                  </div>
                  
                  {/* Text */}
                  <span className="text-sm font-medium">Ask Adora</span>
                  
                  {/* Voice waves animation (hidden by default, shown when listening) */}
                  <div className="hidden group-active:flex items-center gap-1 ml-2">
                    <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse"></div>
                    <div className="w-1 h-5 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-4 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </button>
                
                {/* LMS-specific Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 w-80 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="font-semibold text-purple-300 mb-2">🎓 Ask Adora for Learning Help</div>
                  <div className="space-y-2 text-xs">
                    <div><strong>Courses:</strong> "Recommend courses for AI skills" or "Find beginner-friendly content"</div>
                    <div><strong>Progress:</strong> "Show my learning progress" or "Schedule study sessions"</div>
                    <div><strong>Certificates:</strong> "Check certification requirements" or "Download certificates"</div>
                    <div><strong>Support:</strong> "Get help with assignments" or "Connect with instructors"</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-purple-200">
                    AI-powered learning assistant
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Learning Hours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">32</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started with Adora AI Section */}
        <div className="mb-8">
          <LearningHub />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">My Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center text-2xl">
                      {course.thumbnail}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      course.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {course.status === 'in-progress' ? 'In Progress' : 
                       course.status === 'completed' ? 'Completed' : 'Not Started'}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>👨‍🏫 {course.instructor}</span>
                    <span>⏱️ {course.duration}</span>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            course.progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <button className={`w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium ${
                    course.status === 'completed' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : course.status === 'in-progress'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                    {course.status === 'completed' ? 'View Certificate' : 
                     course.status === 'in-progress' ? 'Continue Learning' : 'Start Course'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Course Catalog</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore our comprehensive catalog of AI and automation courses designed to enhance your skills.
          </p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Browse All Courses
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Learning Paths
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 