'use client';

import React, { useState } from 'react';

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Learning Management System</h1>
          <p className="text-gray-600 dark:text-gray-400">Master new skills with AI-powered learning experiences</p>
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