"use client";

import React, { useState } from 'react';
import { AlertLevel } from '../page';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AlertSettings {
  level: AlertLevel;
  enabled: boolean;
  channels: string[];
  threshold: number;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'alerts' | 'channels' | 'preferences'>('alerts');
  const [alertSettings, setAlertSettings] = useState<AlertSettings[]>([
    { level: 'L3', enabled: true, channels: ['email', 'sms', 'push'], threshold: 80 },
    { level: 'L2', enabled: true, channels: ['email', 'push'], threshold: 60 },
    { level: 'L1', enabled: true, channels: ['push'], threshold: 40 },
    { level: 'L0', enabled: false, channels: [], threshold: 0 }
  ]);

  const [preferences, setPreferences] = useState({
    autoMarkAsRead: false,
    groupSimilarMessages: true,
    showPreviewInTicker: true,
    enableKeyboardShortcuts: true,
    theme: 'system' as 'light' | 'dark' | 'system'
  });

  if (!isOpen) return null;

  const handleAlertSettingChange = (level: AlertLevel, field: keyof AlertSettings, value: any) => {
    setAlertSettings(prev => prev.map(setting => 
      setting.level === level ? { ...setting, [field]: value } : setting
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AdoraLink Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4">
          <div className="flex space-x-1">
            {[
              { key: 'alerts', label: 'Alert Levels' },
              { key: 'channels', label: 'Channels' },
              { key: 'preferences', label: 'Preferences' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Alert Levels Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Configure Alert Levels
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Set thresholds and notification preferences for each alert level.
                </p>
              </div>

              {alertSettings.map((setting) => (
                <div key={setting.level} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        setting.level === 'L0' ? 'bg-gray-400' :
                        setting.level === 'L1' ? 'bg-blue-500' :
                        setting.level === 'L2' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`} />
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Level {setting.level}
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={setting.enabled}
                        onChange={(e) => handleAlertSettingChange(setting.level, 'enabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {setting.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                          Temperature Threshold: {setting.threshold}°
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={setting.threshold}
                          onChange={(e) => handleAlertSettingChange(setting.level, 'threshold', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                          Notification Channels
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['email', 'sms', 'push', 'desktop'].map((channel) => (
                            <label key={channel} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={setting.channels.includes(channel)}
                                onChange={(e) => {
                                  const newChannels = e.target.checked
                                    ? [...setting.channels, channel]
                                    : setting.channels.filter(c => c !== channel);
                                  handleAlertSettingChange(setting.level, 'channels', newChannels);
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{channel}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Channels Tab */}
          {activeTab === 'channels' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Channel Configuration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Configure how different communication channels are handled.
                </p>
              </div>

              {[
                { channel: 'Email', icon: '✉️', description: 'Configure email processing and filters' },
                { channel: 'Chat', icon: '💬', description: 'Set up chat integrations and rules' },
                { channel: 'SMS', icon: '📱', description: 'Manage SMS routing and preferences' },
                { channel: 'Voice', icon: '🎤', description: 'Configure voice message handling' }
              ].map((item) => (
                <div key={item.channel} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.channel}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  General Preferences
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Customize your AdoraLink experience.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'autoMarkAsRead', label: 'Auto-mark messages as read', description: 'Automatically mark messages as read when viewed' },
                  { key: 'groupSimilarMessages', label: 'Group similar messages', description: 'Combine related messages into conversation threads' },
                  { key: 'showPreviewInTicker', label: 'Show previews in live ticker', description: 'Display message previews in the live ticker view' },
                  { key: 'enableKeyboardShortcuts', label: 'Enable keyboard shortcuts', description: 'Use keyboard shortcuts for faster navigation' }
                ].map((pref) => (
                  <div key={pref.key} className="flex items-start justify-between py-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{pref.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={preferences[pref.key as keyof typeof preferences] as boolean}
                        onChange={(e) => setPreferences(prev => ({ ...prev, [pref.key]: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}

                <div className="py-3 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Theme</h4>
                  <div className="flex space-x-3">
                    {[
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                      { value: 'system', label: 'System' }
                    ].map((theme) => (
                      <label key={theme.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value={theme.value}
                          checked={preferences.theme === theme.value}
                          onChange={(e) => setPreferences(prev => ({ ...prev, theme: e.target.value as any }))}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{theme.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Save settings logic here
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 