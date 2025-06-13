"use client";

import React from 'react';
import { Conversation, AlertLevel, ChannelType } from '../page';

interface DetailPaneProps {
  conversation?: Conversation;
  onShowInsights: () => void;
  showInsights: boolean;
}

// Helper to get channel icon
const getChannelIcon = (channel: ChannelType): React.ReactNode => {
  switch (channel) {
    case 'email':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'chat':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'sms':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21l4-4 4 4M3 4h18M4 4h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      );
    default:
      return null;
  }
};

// Helper to get alert styling
const getAlertStyling = (level: AlertLevel): string => {
  switch (level) {
    case 'L0': return 'text-gray-600 bg-gray-100';
    case 'L1': return 'text-blue-600 bg-blue-100';
    case 'L2': return 'text-amber-600 bg-amber-100';
    case 'L3': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export default function DetailPane({ conversation, onShowInsights, showInsights }: DetailPaneProps) {
  if (!conversation) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Select a Conversation</h3>
          <p className="text-sm">Choose a conversation from the list to view details</p>
        </div>
      </div>
    );
  }

  const message = conversation.lastMessage;

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-12 h-12 rounded-full"
              />
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                message.alertLevel === 'L0' ? 'bg-gray-400' :
                message.alertLevel === 'L1' ? 'bg-blue-500' :
                message.alertLevel === 'L2' ? 'bg-amber-500' :
                'bg-red-500'
              }`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {message.sender.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="text-gray-500 dark:text-gray-400">
                  {getChannelIcon(message.channel)}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {message.channel}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getAlertStyling(message.alertLevel)}`}>
                  {message.alertLevel}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onShowInsights}
              className={`p-2 rounded-lg transition-colors ${
                showInsights 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
              title="AI Insights"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Temperature and Urgency Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Urgency Temperature
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {message.temperature}°
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                message.temperature < 25 ? 'bg-gray-400' :
                message.temperature < 50 ? 'bg-blue-500' :
                message.temperature < 80 ? 'bg-amber-500' :
                'bg-red-500'
              }`}
              style={{ width: `${message.temperature}%` }}
            />
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {message.subject && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {message.subject}
            </h3>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {message.body}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h4>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Reply
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              Forward
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              Schedule
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              Assign
            </button>
          </div>
        </div>

        {/* Conversation History Preview */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h4>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <img
                  src={message.sender.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {message.sender.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {i + 1}h ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Previous message preview {i + 1}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 