"use client";

import React from 'react';
import { Message, AlertLevel, ChannelType } from '../page';

interface LiveTickerProps {
  messages: Message[];
  onClaimMessage: (messageId: string) => void;
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
    default:
      return null;
  }
};

// Helper to get alert styling
const getAlertStyling = (level: AlertLevel): string => {
  switch (level) {
    case 'L0': return 'border-l-gray-400 bg-gray-50 dark:bg-gray-800';
    case 'L1': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    case 'L2': return 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20';
    case 'L3': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse';
    default: return 'border-l-gray-400 bg-gray-50 dark:bg-gray-800';
  }
};

// Helper to format timestamp
const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);

  if (seconds < 30) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function LiveTicker({ messages, onClaimMessage }: LiveTickerProps) {
  return (
    <div className="h-full bg-gray-900 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-lg font-semibold text-white">
              Live Ticker
            </h2>
          </div>
          <div className="text-sm text-gray-400">
            {messages.length} active
          </div>
        </div>
      </div>

      {/* Live Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 text-gray-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-sm">Waiting for live updates...</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`relative p-3 rounded-lg border-l-4 transition-all duration-300 ${getAlertStyling(message.alertLevel)} ${
                index === 0 ? 'ring-2 ring-white/20' : ''
              }`}
              style={{
                transform: `scale(${1 - index * 0.02})`,
                opacity: 1 - index * 0.1
              }}
            >
              {/* New badge for first item */}
              {index === 0 && (
                <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                  NEW
                </div>
              )}

              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {/* Channel indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <div className="text-gray-600 dark:text-gray-400">
                      {getChannelIcon(message.channel)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {message.sender.name}
                      </h4>
                      {message.sender.handle && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {message.sender.handle}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        message.alertLevel === 'L0' ? 'bg-gray-200 text-gray-700' :
                        message.alertLevel === 'L1' ? 'bg-blue-200 text-blue-700' :
                        message.alertLevel === 'L2' ? 'bg-amber-200 text-amber-700' :
                        'bg-red-200 text-red-700'
                      }`}>
                        {message.alertLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                    {message.preview}
                  </p>

                  {/* Temperature bar */}
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          message.temperature < 25 ? 'bg-gray-400' :
                          message.temperature < 50 ? 'bg-blue-500' :
                          message.temperature < 80 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${message.temperature}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {message.temperature}°
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onClaimMessage(message.id)}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Claim
                      </button>
                      <button className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                        Snooze
                      </button>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-3 border-t border-gray-700">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-white">
              {messages.filter(m => m.alertLevel === 'L3').length}
            </div>
            <div className="text-xs text-red-400">Critical</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">
              {messages.filter(m => m.alertLevel === 'L2').length}
            </div>
            <div className="text-xs text-amber-400">High</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">
              {messages.filter(m => m.alertLevel === 'L1').length}
            </div>
            <div className="text-xs text-blue-400">Medium</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">
              {messages.filter(m => m.alertLevel === 'L0').length}
            </div>
            <div className="text-xs text-gray-400">Low</div>
          </div>
        </div>
      </div>
    </div>
  );
} 