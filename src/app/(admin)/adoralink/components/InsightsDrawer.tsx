"use client";

import React from 'react';
import { Conversation } from '../page';

interface InsightsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversation?: Conversation;
}

export default function InsightsDrawer({ isOpen, onClose, conversation }: InsightsDrawerProps) {
  if (!isOpen || !conversation) return null;

  const message = conversation.lastMessage;

  // Mock AI insights
  const insights = {
    sentiment: 'Positive',
    confidence: 85,
    urgency: message.temperature,
    keyTopics: ['Budget Planning', 'Q4 Strategy', 'Team Coordination'],
    suggestedActions: [
      { action: 'Schedule Meeting', priority: 'high', reason: 'Budget discussion requires real-time collaboration' },
      { action: 'Review Analytics', priority: 'medium', reason: 'Referenced trends need verification' },
      { action: 'Loop in Finance Team', priority: 'medium', reason: 'Budget changes affect multiple departments' }
    ],
    similarConversations: [
      { id: '1', title: 'Q3 Budget Review', similarity: 92 },
      { id: '2', title: 'Marketing Strategy Discussion', similarity: 78 }
    ]
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg z-30">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Insights
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto h-full">
        {/* Sentiment Analysis */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sentiment Analysis</h4>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overall Sentiment</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">{insights.sentiment}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${insights.confidence}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{insights.confidence}%</span>
            </div>
          </div>
        </div>

        {/* Key Topics */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {insights.keyTopics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Suggested Actions</h4>
          <div className="space-y-3">
            {insights.suggestedActions.map((action, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">{action.action}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    action.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    action.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {action.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{action.reason}</p>
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Take Action →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Conversations */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Similar Conversations</h4>
          <div className="space-y-2">
            {insights.similarConversations.map((conv) => (
              <div key={conv.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span className="text-sm text-gray-900 dark:text-white truncate">{conv.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{conv.similarity}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{message.temperature}°</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Temperature</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">2.5m</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Read Time</div>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">AI Summary</h4>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              This message discusses Q4 marketing budget allocation with a positive tone. 
              The sender is seeking input on analytics-driven strategy changes. 
              Recommended action: schedule a collaborative session within 24 hours.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Generate Response
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300">
            Create Calendar Event
          </button>
        </div>
      </div>
    </div>
  );
} 