"use client";

import React from 'react';
import Link from 'next/link';
import { SideRailView, Conversation, Message, AlertLevel } from '../page';

interface SideRailProps {
  currentView: SideRailView;
  onViewChange: (view: SideRailView) => void;
  onSettingsClick: () => void;
  conversations: Conversation[];
  liveMessages: Message[];
}

// Helper to get most urgent alert color
const getAlertColor = (level: AlertLevel): string => {
  switch (level) {
    case 'L0': return 'bg-gray-400';
    case 'L1': return 'bg-blue-500';
    case 'L2': return 'bg-amber-500';
    case 'L3': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
};

// Helper to get most urgent alert in a section
const getMostUrgentAlert = (messages: Message[]): AlertLevel => {
  const levels = messages.map(m => m.alertLevel);
  if (levels.includes('L3')) return 'L3';
  if (levels.includes('L2')) return 'L2';
  if (levels.includes('L1')) return 'L1';
  return 'L0';
};

export default function SideRail({ 
  currentView, 
  onViewChange, 
  onSettingsClick, 
  conversations, 
  liveMessages 
}: SideRailProps) {
  
  // Calculate alert dots for each section
  const inboxMessages = conversations.map(c => c.lastMessage);
  const inboxAlert = getMostUrgentAlert(inboxMessages);
  const liveAlert = getMostUrgentAlert(liveMessages);
  
  const railItems = [
    {
      id: 'inbox' as SideRailView,
      label: 'Inbox',
      alertLevel: inboxAlert,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-2m-2 2l2-2" />
        </svg>
      )
    },
    {
      id: 'live' as SideRailView,
      label: 'Live',
      alertLevel: liveAlert,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'contacts' as SideRailView,
      label: 'Contacts',
      alertLevel: 'L0' as AlertLevel,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'calendar' as SideRailView,
      label: 'Calendar',
      alertLevel: 'L0' as AlertLevel,
      link: '/calendar', // Link to existing calendar
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'recents' as SideRailView,
      label: 'Recents',
      alertLevel: 'L0' as AlertLevel,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'settings' as SideRailView,
      label: 'Settings',
      alertLevel: 'L0' as AlertLevel,
      onClick: onSettingsClick,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-[72px] bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur border-r border-gray-700 flex flex-col items-center py-4 space-y-2">
      {railItems.map((item) => {
        const isActive = currentView === item.id;
        const hasAlert = item.alertLevel !== 'L0';
        
        const buttonContent = (
          <div className="relative group">
            <button
              className={`relative p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              title={item.label}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else if (!item.link) {
                  onViewChange(item.id);
                }
              }}
            >
              {item.icon}
              
              {/* Alert Dot */}
              {hasAlert && (
                <span 
                  className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${getAlertColor(item.alertLevel)}`}
                />
              )}
            </button>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {item.label}
            </div>
          </div>
        );

        // If it has a link, wrap in Link component
        if (item.link) {
          return (
            <Link key={item.id} href={item.link}>
              {buttonContent}
            </Link>
          );
        }

        return (
          <div key={item.id}>
            {buttonContent}
          </div>
        );
      })}
    </div>
  );
} 