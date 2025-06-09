"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  category: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Finalize the quarterly project proposal and submit to stakeholders for review.",
    priority: "high",
    estimatedTime: "2 hours",
    category: "Work"
  },
  {
    id: 2,
    title: "Review Marketing Campaign",
    description: "Analyze current marketing campaign performance and identify areas for improvement.",
    priority: "medium",
    estimatedTime: "1.5 hours",
    category: "Marketing"
  },
  {
    id: 3,
    title: "Team Meeting Preparation",
    description: "Prepare agenda and materials for tomorrow's team meeting on product roadmap.",
    priority: "high",
    estimatedTime: "45 minutes",
    category: "Management"
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review and provide feedback on pull requests from team members.",
    priority: "medium",
    estimatedTime: "1 hour",
    category: "Development"
  },
  {
    id: 5,
    title: "Client Follow-up",
    description: "Send follow-up emails to three potential clients from last week's meetings.",
    priority: "low",
    estimatedTime: "30 minutes",
    category: "Sales"
  }
];

const TaskCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTask = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockTasks.length);
  };

  const prevTask = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mockTasks.length) % mockTasks.length);
  };

  const goToTask = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTask = mockTasks[currentIndex];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Task Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 lg:p-6 flex-1 flex flex-col justify-center mb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevTask}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            disabled={mockTasks.length <= 1}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="text-center flex-1">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentTask.title}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(currentTask.priority)}`}>
                {currentTask.priority.charAt(0).toUpperCase() + currentTask.priority.slice(1)} Priority
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                {currentTask.category}
              </span>
            </div>
          </div>
          
          <button
            onClick={nextTask}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            disabled={mockTasks.length <= 1}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base mb-3 leading-relaxed">
            {currentTask.description}
          </p>
          <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-500">
            Estimated time: <span className="font-medium">{currentTask.estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Task Indicators and Counter */}
      <div className="flex-shrink-0">
        <div className="flex justify-center gap-2 mb-3">
          {mockTasks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTask(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <div className="text-center">
          <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
            Task {currentIndex + 1} of {mockTasks.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCarousel; 