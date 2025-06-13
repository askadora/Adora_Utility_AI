"use client";

import React, { useState } from 'react';
import { ChannelType } from '../page';

const ComposerBar: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<ChannelType>('email');
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const channels = [
    { type: 'email' as ChannelType, label: 'Email', icon: '✉️' },
    { type: 'chat' as ChannelType, label: 'Chat', icon: '💬' },
    { type: 'sms' as ChannelType, label: 'SMS', icon: '📱' },
    { type: 'voice' as ChannelType, label: 'Voice', icon: '🎤' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log(`Sending ${activeChannel} message:`, message);
      setMessage('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSend();
    }
    if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  };

  return (
    <div className="h-[56px] bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 flex items-center relative">
      {/* Expanded Composer */}
      {isExpanded && (
        <div className="absolute bottom-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            {/* Channel Selector */}
            <div className="flex items-center space-x-2 mb-4">
              {channels.map((channel) => (
                <button
                  key={channel.type}
                  onClick={() => setActiveChannel(channel.type)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeChannel === channel.type
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{channel.icon}</span>
                  <span className="text-sm font-medium">{channel.label}</span>
                </button>
              ))}
            </div>

            {/* Recipients (for email/sms) */}
            {(activeChannel === 'email' || activeChannel === 'sms') && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={activeChannel === 'email' ? 'To: email@example.com' : 'To: +1234567890'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Subject (for email) */}
            {activeChannel === 'email' && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Message Input */}
            <div className="mb-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Compose your ${activeChannel} message...`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
                autoFocus
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 2v12a2 2 0 002 2h8a2 2 0 002-2V6M7 6h10M9 10v8m6-8v8" />
                  </svg>
                </button>
                <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Composer */}
      <div className="flex-1 flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Start a conversation... (⌘+K to expand)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quick Channel Buttons */}
        <div className="flex items-center space-x-1">
          {channels.slice(0, 3).map((channel) => (
            <button
              key={channel.type}
              onClick={() => {
                setActiveChannel(channel.type);
                setIsExpanded(true);
              }}
              className={`p-2 rounded-lg transition-colors ${
                activeChannel === channel.type
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={`Compose ${channel.label}`}
            >
              <span className="text-lg">{channel.icon}</span>
            </button>
          ))}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ComposerBar; 