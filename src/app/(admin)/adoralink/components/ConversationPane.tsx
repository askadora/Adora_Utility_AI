"use client";

import React from 'react';
import { Conversation, SideRailView, AlertLevel, ChannelType } from '../page';

interface ConversationPaneProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelectConversation: (id: string) => void;
  currentView: SideRailView;
}

// Helper to get channel icon
const getChannelIcon = (channel: ChannelType): React.ReactNode => {
  switch (channel) {
    case 'email':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'chat':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'sms':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21l4-4 4 4M3 4h18M4 4h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      );
    case 'voice':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case 'video':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
};

// Helper to get alert color
const getAlertColor = (level: AlertLevel): string => {
  switch (level) {
    case 'L0': return 'text-gray-400';
    case 'L1': return 'text-blue-500';
    case 'L2': return 'text-amber-500';
    case 'L3': return 'text-red-500';
    default: return 'text-gray-400';
  }
};

// Helper to format timestamp
const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
};

export default function ConversationPane({ 
  conversations, 
  selectedId, 
  onSelectConversation, 
  currentView 
}: ConversationPaneProps) {
  
  const getViewTitle = (): string => {
    switch (currentView) {
      case 'inbox': return 'Focus Inbox';
      case 'recent': return 'Recent Contacts';
      case 'analytics': return 'Performance Overview';
      default: return 'Conversations';
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {getViewTitle()}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const message = conversation.lastMessage;
          const isSelected = selectedId === conversation.id;
          
          return (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                isSelected 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {/* Alert Level Indicator */}
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                    message.alertLevel === 'L0' ? 'bg-gray-400' :
                    message.alertLevel === 'L1' ? 'bg-blue-500' :
                    message.alertLevel === 'L2' ? 'bg-amber-500' :
                    'bg-red-500'
                  }`} />
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {message.sender.name}
                      </h3>
                      <div className={`flex items-center space-x-1 ${getAlertColor(message.channel === 'email' ? 'L1' : 'L0')}`}>
                        {getChannelIcon(message.channel)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  {/* Subject for emails */}
                  {message.subject && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">
                      {message.subject}
                    </p>
                  )}
                  
                  {/* Preview */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {message.preview}
                  </p>

                  {/* Temperature bar */}
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
                    <span className={`text-xs font-medium ${getAlertColor(message.alertLevel)}`}>
                      {message.alertLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 