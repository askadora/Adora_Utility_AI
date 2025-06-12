"use client";

import React, { useState, useEffect } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import Calendar from '@/components/calendar/Calendar';
import AttentionBar from './components/AttentionBar';
import ConversationPane from './components/ConversationPane';
import DetailPane from './components/DetailPane';
import LiveTicker from './components/LiveTicker';
import ComposerBar from './components/ComposerBar';
import SettingsModal from './components/SettingsModal';
import InsightsDrawer from './components/InsightsDrawer';

// Alert levels
export type AlertLevel = 'L0' | 'L1' | 'L2' | 'L3';
export type AlertColor = 'grey' | 'blue' | 'amber' | 'red';

// Channel types
export type ChannelType = 'email' | 'chat' | 'sms' | 'voice' | 'video';

// Main AdoraLink types
export interface Message {
  id: string;
  channel: ChannelType;
  sender: {
    name: string;
    avatar: string;
    handle?: string;
  };
  subject?: string;
  preview: string;
  body: string;
  timestamp: Date;
  alertLevel: AlertLevel;
  temperature: number; // 0-100
  isRead: boolean;
  isClaimed?: boolean;
  claimedBy?: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  lastMessage: Message;
  participants: Array<{ name: string; avatar: string }>;
}

export interface ContactInteraction {
  id: string;
  channel: ChannelType;
  timestamp: Date;
  subject?: string;
  preview: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  lastContactTime: Date;
  lastContactChannel: ChannelType;
  interactions: ContactInteraction[];
  crmId?: string;
}

// Side rail views
export type SideRailView = 'inbox' | 'live' | 'recent' | 'analytics' | 'calendar' | 'settings';

// Mock alert level calculation
const calculateAlertLevel = (): { alertLevel: AlertLevel; temperature: number; color: AlertColor } => {
  const temperature = Math.floor(Math.random() * 100);
  let alertLevel: AlertLevel;
  let color: AlertColor;

  if (temperature < 25) {
    alertLevel = 'L0';
    color = 'grey';
  } else if (temperature < 50) {
    alertLevel = 'L1';
    color = 'blue';
  } else if (temperature < 80) {
    alertLevel = 'L2';
    color = 'amber';
  } else {
    alertLevel = 'L3';
    color = 'red';
  }

  return { alertLevel, temperature, color };
};

// Helper functions for contacts
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInMinutes < 60 * 24) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInMinutes / (60 * 24));
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

const getChannelIcon = (channel: ChannelType) => {
  switch (channel) {
    case 'email': return '📧';
    case 'chat': return '💬';
    case 'sms': return '📱';
    case 'voice': return '📞';
    case 'video': return '📹';
    default: return '💬';
  }
};

// Analytics Components
const AnalyticsMetrics = () => {
  const metrics = [
    { title: 'Average Response Time', value: '2.4 min', change: '-15%', trend: 'down' },
    { title: 'Resolution Rate', value: '94.2%', change: '+3%', trend: 'up' },
    { title: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
    { title: 'Messages Resolved', value: '1,247', change: '+12%', trend: 'up' },
    { title: 'Channel Performance', value: 'Email: 96%', change: 'SMS: 92%', trend: 'stable' },
    { title: 'Peak Hours', value: '9-11 AM', change: '2-4 PM', trend: 'stable' }
  ];

  return (
    <div className="space-y-4 p-6">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {metric.title}
            </h3>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {metric.value}
              </p>
              <p className={`text-xs ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                'text-gray-500 dark:text-gray-400'
              }`}>
                {metric.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AnalyticsDashboard = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Response Time Trends
          </h3>
          <div className="h-32 flex items-end justify-between space-x-2">
            {[85, 70, 65, 80, 55, 60, 45].map((height, i) => (
              <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Last 7 days</p>
        </div>
        
        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Channel Distribution
          </h3>
          <div className="space-y-3">
            {[
              { channel: 'Email', percentage: 45, count: 234 },
              { channel: 'Chat', percentage: 30, count: 156 },
              { channel: 'SMS', percentage: 15, count: 78 },
              { channel: 'Voice', percentage: 10, count: 52 }
            ].map((item) => (
              <div key={item.channel} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.channel}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-2 bg-blue-500 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Performance Insights
        </h3>
        <div className="space-y-3">
          {[
            { insight: 'Peak response time today: 2.1 minutes (20% faster than yesterday)', type: 'positive' },
            { insight: 'Email channel showing 98% resolution rate this week', type: 'positive' },
            { insight: 'SMS response time increased by 30 seconds', type: 'warning' },
            { insight: 'Customer satisfaction up 0.3 points from last month', type: 'positive' }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                item.type === 'positive' ? 'bg-green-500' :
                item.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Calendar Components
const CalendarView = () => {
  const upcomingMeetings = [
    {
      id: '1',
      title: 'Security Review Meeting',
      attendees: ['Brandon Philips', 'Security Team'],
      time: 'Today, 2:00 PM',
      duration: '1 hour',
      type: 'urgent',
      relatedConversation: '1'
    },
    {
      id: '2',
      title: 'Q4 Budget Planning',
      attendees: ['Terry Franci', 'Finance Team'],
      time: 'Tomorrow, 10:00 AM',
      duration: '2 hours',
      type: 'business',
      relatedConversation: '3'
    },
    {
      id: '3',
      title: 'Dev Team Standup',
      attendees: ['Alena Franci', 'Engineering'],
      time: 'Tomorrow, 9:00 AM',
      duration: '30 minutes',
      type: 'routine',
      relatedConversation: '4'
    }
  ];

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Upcoming Meetings
        </h3>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          + New Meeting
        </button>
      </div>
      
      {upcomingMeetings.map((meeting) => (
        <div key={meeting.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {meeting.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {meeting.attendees.join(', ')}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>📅 {meeting.time}</span>
                <span>⏱️ {meeting.duration}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                meeting.type === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                meeting.type === 'business' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400'
              }`}>
                {meeting.type}
              </span>
              {meeting.relatedConversation && (
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  View Chat
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CalendarDetail = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Quick Booking Stats */}
      <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Booking Statistics
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Meetings This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">96%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Show-up Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Calendar Integration */}
      <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Schedule
        </h3>
        <div className="space-y-3">
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-sm">Calendar actions and scheduling tools</p>
            <p className="text-xs mt-1">Full calendar view is available above</p>
          </div>
        </div>
      </div>

      {/* Meeting Analytics */}
      <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Meeting Insights
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Meetings This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">94%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Attendance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Booking Component for Conversations
const QuickBooking = ({ conversationId, onSendBookingLink }: { conversationId: string, onSendBookingLink: (link: string, type: string) => void }) => {
  const bookingOptions = [
    { type: '15-min Quick Chat', duration: '15 min', icon: '⚡', color: 'bg-green-100 text-green-700 dark:bg-green-900/30' },
    { type: '30-min Strategy Call', duration: '30 min', icon: '💬', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' },
    { type: '1-hour Deep Dive', duration: '1 hour', icon: '🔍', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' }
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">📅 Schedule a meeting:</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {bookingOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => onSendBookingLink(`https://cal.ly/meeting-${option.duration.replace(' ', '')}`, option.type)}
            className={`p-2 rounded-lg text-center hover:opacity-80 transition-opacity ${option.color}`}
          >
            <div className="text-lg mb-1">{option.icon}</div>
            <div className="text-xs font-medium">{option.duration}</div>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        Click to send booking link instantly
      </p>
    </div>
  );
};

export default function AdoraLinkPage() {
  const [currentView, setCurrentView] = useState<SideRailView>('inbox');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [liveMessages, setLiveMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasUnreadL2OrL3, setHasUnreadL2OrL3] = useState(false);
  const [lastL3Alert, setLastL3Alert] = useState<Date | null>(null);

  // Handle URL parameters after component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationParam = urlParams.get('conversation');
    if (conversationParam && conversations.length > 0) {
      console.log('Setting conversation from URL:', conversationParam);
      setCurrentView('inbox');
      setSelectedConversation(conversationParam);
      // Clean up URL
      window.history.replaceState({}, '', '/adoralink');
    }
  }, [conversations]); // Run when conversations are loaded

  // Handle booking link sending
  const handleSendBookingLink = (link: string, type: string) => {
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    if (selectedConv) {
      console.log(`Sending ${type} booking link to ${selectedConv.participants[0].name}: ${link}`);
      // In a real app, this would send the link via the appropriate channel
      // For now, we'll show a toast or update the conversation
      alert(`Booking link sent to ${selectedConv.participants[0].name}!\n\n${type}: ${link}`);
    }
  };

  // Mock data initialization
  useEffect(() => {
    // Initialize mock conversations with synchronized data for all priority levels L0-L3
    const mockConversations: Conversation[] = [
      // L3 - Critical Security Alert (Highest Priority)
      {
        id: '1',
        participants: [{ name: 'Brandon Philips', avatar: '/images/user/user-05.jpg' }],
        messages: [],
        lastMessage: {
          id: 'm1',
          channel: 'email',
          sender: { name: 'Brandon Philips', avatar: '/images/user/user-05.jpg' },
          subject: 'URGENT: Security Breach Detected',
          preview: 'CRITICAL: We have detected unauthorized access attempts on our main servers...',
          body: 'CRITICAL: We have detected unauthorized access attempts on our main servers. Immediate action required. Please escalate to security team and implement emergency protocols. Multiple failed login attempts detected from suspicious IP addresses.',
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          alertLevel: 'L3',
          temperature: 95,
          isRead: false,
        }
      },
      // L2 - System Outage (High Priority)
      {
        id: '2',
        participants: [{ name: 'Sarah Chen', avatar: '/images/user/user-06.jpg' }],
        messages: [],
        lastMessage: {
          id: 'm2',
          channel: 'chat',
          sender: { name: 'Sarah Chen', avatar: '/images/user/user-06.jpg' },
          subject: 'Production Database Performance Alert',
          preview: 'WARNING: Database response times have increased by 300% in the last hour...',
          body: 'WARNING: Database response times have increased by 300% in the last hour. Query execution times are averaging 2.5 seconds. This is affecting user experience and may require immediate intervention.',
          timestamp: new Date(Date.now() - 1000 * 60 * 12), // 12 minutes ago
          alertLevel: 'L2',
          temperature: 75,
          isRead: false,
        }
      },
      // L1 - Business Updates (Medium Priority)
      {
        id: '3',
        participants: [{ name: 'Terry Franci', avatar: '/images/user/user-02.jpg' }],
        messages: [],
        lastMessage: {
          id: 'm3',
          channel: 'email',
          sender: { name: 'Terry Franci', avatar: '/images/user/user-02.jpg' },
          subject: 'Q4 Marketing Budget Review',
          preview: 'Hi team, I wanted to discuss the proposed changes to our Q4 marketing spend...',
          body: 'Hi team, I wanted to discuss the proposed changes to our Q4 marketing spend. The analytics are showing some interesting trends that might affect our allocation strategy. Please review the attached spreadsheet.',
          timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
          alertLevel: 'L1',
          temperature: 40,
          isRead: false,
        }
      },
      // L1 - Development Updates (Medium Priority) 
      {
        id: '4',
        participants: [{ name: 'Alena Franci', avatar: '/images/user/user-03.jpg' }],
        messages: [],
        lastMessage: {
          id: 'm4',
          channel: 'chat',
          sender: { name: 'Alena Franci', avatar: '/images/user/user-03.jpg' },
          subject: 'Dev Team Standup Update',
          preview: 'Quick update: deployment pipeline is ready for review...',
          body: 'Quick update: deployment pipeline is ready for review. We resolved the authentication issues and the staging environment is stable. Ready for code review and testing.',
          timestamp: new Date(Date.now() - 1000 * 60 * 35), // 35 minutes ago
          alertLevel: 'L1',
          temperature: 35,
          isRead: false,
        }
      },
      // L0 - General Communication (Low Priority, Read)
      {
        id: '5',
        participants: [{ name: 'Jocelyn Kenter', avatar: '/images/user/user-04.jpg' }],
        messages: [],
        lastMessage: {
          id: 'm5',
          channel: 'sms',
          sender: { name: 'Jocelyn Kenter', avatar: '/images/user/user-04.jpg' },
          subject: 'Meeting Rescheduled',
          preview: 'Meeting moved to 3pm today. Conference room B.',
          body: 'Meeting moved to 3pm today. Conference room B. Please bring your quarterly reports for review.',
          timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
          alertLevel: 'L0',
          temperature: 15,
          isRead: true,
        }
      }
    ];

    setConversations(mockConversations);
    setSelectedConversation(mockConversations[0].id);

    // Initialize mock contacts data
    const mockContacts: Contact[] = [
      {
        id: 'c1',
        name: 'Terry Franci',
        avatar: '/images/user/user-02.jpg',
        email: 'terry.franci@company.com',
        phone: '+1 (555) 123-4567',
        company: 'TechCorp Solutions',
        title: 'Marketing Director',
        lastContactTime: new Date(Date.now() - 1000 * 60 * 31), // 31 minutes ago
        lastContactChannel: 'email',
        interactions: [
          {
            id: 'i1',
            channel: 'email',
            timestamp: new Date(Date.now() - 1000 * 60 * 31),
            subject: 'Q4 Marketing Budget Review',
            preview: 'Hi team, I wanted to discuss the proposed changes...'
          },
          {
            id: 'i2',
            channel: 'chat',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
            preview: 'Quick question about the campaign metrics'
          },
          {
            id: 'i3',
            channel: 'voice',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            preview: 'Phone call regarding project timeline'
          }
        ],
        crmId: 'CRM-001'
      },
      {
        id: 'c2',
        name: 'Alena Franci',
        avatar: '/images/user/user-03.jpg',
        email: 'alena.franci@devteam.com',
        company: 'Internal Dev Team',
        title: 'Senior Developer',
        lastContactTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        lastContactChannel: 'chat',
        interactions: [
          {
            id: 'i4',
            channel: 'chat',
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
            preview: 'Quick update: deployment pipeline is ready'
          },
          {
            id: 'i5',
            channel: 'email',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
            subject: 'Code Review Request',
            preview: 'Could you review the authentication module?'
          }
        ],
        crmId: 'CRM-002'
      },
      {
        id: 'c3',
        name: 'Jocelyn Kenter',
        avatar: '/images/user/user-04.jpg',
        email: 'jocelyn.kenter@partner.org',
        phone: '+1 (555) 987-6543',
        company: 'Partner Organization',
        title: 'Project Manager',
        lastContactTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        lastContactChannel: 'sms',
        interactions: [
          {
            id: 'i6',
            channel: 'sms',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            preview: 'Meeting moved to 3pm today. Conference room B.'
          },
          {
            id: 'i7',
            channel: 'email',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
            subject: 'Partnership Agreement Review',
            preview: 'Please find attached the updated partnership terms'
          }
        ],
        crmId: 'CRM-003'
      },
      {
        id: 'c4',
        name: 'Brandon Philips',
        avatar: '/images/user/user-05.jpg',
        email: 'brandon.philips@security.com',
        phone: '+1 (555) 555-0199',
        company: 'Security Solutions Inc',
        title: 'Security Analyst',
        lastContactTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        lastContactChannel: 'email',
        interactions: [
          {
            id: 'i8',
            channel: 'email',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            subject: 'URGENT: Security Breach Detected',
            preview: 'CRITICAL: We have detected unauthorized access attempts...'
          },
          {
            id: 'i9',
            channel: 'voice',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            preview: 'Emergency security briefing call'
          }
        ],
        crmId: 'CRM-004'
      }
    ];

    setContacts(mockContacts);
    setSelectedContact(mockContacts[0].id);
  }, []);

  // Check for unread L2/L3 alerts
  useEffect(() => {
    const hasHighAlerts = conversations.some(conv => 
      !conv.lastMessage.isRead && (conv.lastMessage.alertLevel === 'L2' || conv.lastMessage.alertLevel === 'L3')
    );
    setHasUnreadL2OrL3(hasHighAlerts);
  }, [conversations]);

  // Mock live ticker updates
  useEffect(() => {
    if (currentView !== 'live') return;

    const interval = setInterval(() => {
      const newMessage: Message = {
        id: `live-${Date.now()}`,
        channel: ['email', 'chat', 'sms'][Math.floor(Math.random() * 3)] as ChannelType,
        sender: {
          name: ['Terry Franci', 'Alena Franci', 'Jocelyn Kenter', 'Brandon Philips'][Math.floor(Math.random() * 4)],
          avatar: `/images/user/user-${String(Math.floor(Math.random() * 4) + 2).padStart(2, '0')}.jpg`,
          handle: `@user${Math.floor(Math.random() * 1000)}`
        },
        preview: [
          'New customer inquiry about enterprise features',
          'Bug report: login issue on mobile app', 
          'Partnership proposal from TechCorp',
          'User feedback on latest UI update'
        ][Math.floor(Math.random() * 4)],
        body: 'Full message content would be here...',
        timestamp: new Date(),
        ...calculateAlertLevel(),
        isRead: false,
      };

      setLiveMessages(prev => [newMessage, ...prev.slice(0, 9)]);

      // Trigger L3 alert if applicable
      if (newMessage.alertLevel === 'L3') {
        setLastL3Alert(new Date());
        // TODO: Show toast notification
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentView]);

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const selectedContactData = contacts.find(c => c.id === selectedContact);

  // Calculate stats for dashboard
  const totalMessages = conversations.length + liveMessages.length;
  const unreadCount = conversations.filter(c => !c.lastMessage.isRead).length;
  const highPriorityCount = [...conversations.map(c => c.lastMessage), ...liveMessages]
    .filter(m => m.alertLevel === 'L2' || m.alertLevel === 'L3').length;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* 
        PAGE HEADER - Standard Layout Pattern
        - Column direction for title and description stacking
        - Responsive spacing and typography
      */}
      <header className="flex flex-col gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white/90 md:text-3xl">
              AdoraLink
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Unified communication hub with AI-powered message prioritization and intelligent routing across all channels.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button 
              onClick={() => setShowSettings(true)}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
            <AttentionBar />
          </div>
        </div>
      </header>

      {/* 
        COMMUNICATION STATS SECTION - CSS Grid Layout (2D)
        - Mobile: 1 column (stacked vertically)
        - Tablet: 2 columns (2x2 grid)
        - Desktop: 4 columns (1x4 grid)
      */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/20 mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-2m-2 2l2-2" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Messages</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">{totalMessages}</span>
            <span className="text-xs text-blue-600 dark:text-blue-400">Across all channels</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl dark:bg-amber-900/20 mb-4">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Unread Messages</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">{unreadCount}</span>
            <span className="text-xs text-amber-600 dark:text-amber-400">Require attention</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl dark:bg-red-900/20 mb-4">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">High Priority</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">{highPriorityCount}</span>
            <span className="text-xs text-red-600 dark:text-red-400">L2/L3 alerts</span>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl dark:bg-green-900/20 mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Active Channels</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white/90">5</span>
            <span className="text-xs text-green-600 dark:text-green-400">Email, Chat, SMS, Voice, Video</span>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { key: 'inbox', label: 'Inbox', icon: '📥' },
          { key: 'live', label: 'Live Feed', icon: '⚡' },
          { key: 'recent', label: 'Recent', icon: '👥' },
          { key: 'analytics', label: 'Analytics', icon: '📊' },
          { key: 'calendar', label: 'Calendar', icon: '📅' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCurrentView(tab.key as SideRailView)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === tab.key
                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-900 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </section>

      {/* Calendar Quick Actions Bar */}
      {currentView === 'calendar' && (
        <section className="mb-6">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-white/[0.03] transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Calendar Quick Actions
              </h3>
              
              <div className="flex items-center gap-3">
                {/* Quick Booking Links */}
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full border bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    15-min Quick Chat
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full border bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    30-min Strategy Call
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full border bg-purple-600 hover:bg-purple-700 text-white border-purple-600 hover:border-purple-700 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    1-hour Deep Dive
                  </button>
                </div>

                {/* Add Event Button */}
                <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full border bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 hover:border-indigo-700 transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Event
                </button>

                {/* Today's Schedule Summary */}
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    3 meetings today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Full Calendar View - First Priority for Calendar Tab */}
      {currentView === 'calendar' && (
        <section className="mb-6">
          <Calendar />
        </section>
      )}

      {/* 
        MAIN COMMUNICATION INTERFACE - CSS Grid Layout
        - Mobile: 1 column (stacked)
        - Desktop: 2 columns (conversation list + detail view)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation/Live Feed Pane */}
                 <div className="lg:col-span-1">
           <ComponentCard 
             title={
               currentView === 'live' ? 'Live Message Feed' : 
               currentView === 'recent' ? 'Recent Contacts' : 
               currentView === 'analytics' ? 'Performance Metrics' :
               currentView === 'calendar' ? 'Calendar & Scheduling' :
               'Conversations'
             } 
             desc={
               currentView === 'live' ? 'Real-time message stream across all channels' : 
               currentView === 'recent' ? 'People who have recently contacted you' :
               currentView === 'analytics' ? 'Track your communication performance and response metrics' :
               currentView === 'calendar' ? 'Manage meetings and send booking links from conversations' :
               'Your organized conversation threads'
             }
             className="h-[700px] overflow-hidden"
           >
             <div className="h-full overflow-y-auto -mx-4 px-4 -mb-6 pb-6">
               {currentView === 'live' ? (
                 <LiveTicker 
                   messages={liveMessages}
                   onClaimMessage={(messageId: string) => {
                     console.log('Claiming message:', messageId);
                   }}
                 />
               ) : currentView === 'recent' ? (
                 <div className="space-y-2">
                   {contacts.map((contact) => {
                     const isSelected = selectedContact === contact.id;
                     
                     return (
                       <div
                         key={contact.id}
                         onClick={() => setSelectedContact(contact.id)}
                         className={`p-3 rounded-lg cursor-pointer transition-colors ${
                           isSelected 
                             ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                             : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                         }`}
                       >
                         <div className="flex items-center space-x-3">
                           {/* Avatar */}
                           <div className="relative flex-shrink-0">
                             <img
                               src={contact.avatar}
                               alt={contact.name}
                               className="w-10 h-10 rounded-full"
                             />
                           </div>

                           {/* Contact Info */}
                           <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between">
                               <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                 {contact.name}
                               </h4>
                               <div className="flex items-center space-x-2 ml-2">
                                 <span className="text-lg">{getChannelIcon(contact.lastContactChannel)}</span>
                                 <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                   {formatTimeAgo(contact.lastContactTime)}
                                 </span>
                               </div>
                             </div>
                             <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                               {contact.title} at {contact.company}
                             </p>
                           </div>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               ) : currentView === 'analytics' ? (
                 <AnalyticsMetrics />
               ) : currentView === 'calendar' ? (
                 <CalendarView />
               ) : (
                 <ConversationPane
                   conversations={conversations}
                   selectedId={selectedConversation}
                   onSelectConversation={setSelectedConversation}
                   currentView={currentView}
                 />
               )}
             </div>
           </ComponentCard>
         </div>

        {/* Detail Pane */}
                 <div className="lg:col-span-2">
           <ComponentCard 
             title={
               currentView === 'recent' ? 'Contact Details' : 
               currentView === 'analytics' ? 'Analytics Dashboard' : 
               currentView === 'calendar' ? 'Booking & Scheduling' :
               'Message Details'
             } 
             desc={
               currentView === 'recent' ? 'Contact history and information' : 
               currentView === 'analytics' ? 'Detailed performance analytics and insights' :
               currentView === 'calendar' ? 'Quick booking links and meeting management' :
               'Full conversation thread and message details'
             }
             className="h-[700px] overflow-hidden relative"
           >
             <div className="h-full flex flex-col">
               {currentView === 'recent' && selectedContactData ? (
                 <div className="p-6 space-y-6 overflow-y-auto">
                   {/* Contact Header */}
                   <div className="flex items-start space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                     <img
                       src={selectedContactData.avatar}
                       alt={selectedContactData.name}
                       className="w-16 h-16 rounded-full"
                     />
                     <div className="flex-1">
                       <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                         {selectedContactData.name}
                       </h2>
                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                         {selectedContactData.title}
                       </p>
                       <p className="text-sm text-gray-500 dark:text-gray-500">
                         {selectedContactData.company}
                       </p>
                       <div className="flex items-center space-x-4 mt-3 text-sm">
                         <span className="text-gray-600 dark:text-gray-400">
                           📧 {selectedContactData.email}
                         </span>
                         {selectedContactData.phone && (
                           <span className="text-gray-600 dark:text-gray-400">
                             📞 {selectedContactData.phone}
                           </span>
                         )}
                       </div>
                     </div>
                     <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                       </svg>
                       View in CRM
                     </button>
                   </div>

                   {/* Contact History */}
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                       Recent Interactions
                     </h3>
                     <div className="space-y-3">
                       {selectedContactData.interactions.map((interaction) => (
                         <div key={interaction.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                           <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                             <span className="text-sm">{getChannelIcon(interaction.channel)}</span>
                           </div>
                           <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between">
                               <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                 {interaction.channel}
                                 {interaction.subject && (
                                   <span className="font-normal text-gray-600 dark:text-gray-400 ml-2">
                                     • {interaction.subject}
                                   </span>
                                 )}
                               </p>
                               <span className="text-xs text-gray-500 dark:text-gray-400">
                                 {formatTimeAgo(interaction.timestamp)}
                               </span>
                             </div>
                             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                               {interaction.preview}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Context Section */}
                   <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                     <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-2">
                       Contact Context
                     </h4>
                     <p className="text-sm text-blue-800 dark:text-blue-300">
                       {selectedContactData.name} has been in contact {selectedContactData.interactions.length} times across {new Set(selectedContactData.interactions.map(i => i.channel)).size} different channels. 
                       Last contacted {formatTimeAgo(selectedContactData.lastContactTime)} via {selectedContactData.lastContactChannel}.
                     </p>
                     {selectedContactData.crmId && (
                       <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                         CRM ID: {selectedContactData.crmId}
                       </p>
                     )}
                   </div>
                 </div>
               ) : currentView === 'analytics' ? (
                 <AnalyticsDashboard />
               ) : currentView === 'calendar' ? (
                 <CalendarDetail />
               ) : (
                 <>
                   <DetailPane
                     conversation={selectedConv}
                     onShowInsights={() => setShowInsights(true)}
                     showInsights={showInsights}
                   />
                   
                   {/* Quick Booking Integration */}
                   {selectedConv && currentView === 'inbox' && (
                     <QuickBooking 
                       conversationId={selectedConv.id}
                       onSendBookingLink={handleSendBookingLink}
                     />
                   )}
                   
                   {/* Insights Drawer */}
                   <InsightsDrawer
                     isOpen={showInsights}
                     onClose={() => setShowInsights(false)}
                     conversation={selectedConv}
                   />
                 </>
               )}
             </div>
           </ComponentCard>
         </div>
      </div>

      {/* Message Composer */}
      <ComponentCard 
        title="Compose Message" 
        desc="Send messages across all connected channels"
      >
        <ComposerBar />
      </ComponentCard>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
} 