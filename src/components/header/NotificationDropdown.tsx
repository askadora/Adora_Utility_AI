"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const router = useRouter();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  // AdoraLink synchronized notifications - perfectly matched with inbox conversations
  const adoraLinkNotifications = [
    // L3 - Critical Security Alert (Highest Priority)
    {
      id: '1',
      name: 'Brandon Philips',
      avatar: '/images/user/user-05.jpg',
      message: 'sent a critical security alert',
      subject: 'URGENT: Security Breach Detected',
      preview: 'CRITICAL: We have detected unauthorized access attempts on our main servers...',
      channel: 'Email',
      time: '5 min ago',
      priority: 'L3',
      isRead: false,
      conversationId: '1'
    },
    // L2 - System Performance Alert (High Priority)
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: '/images/user/user-06.jpg',
      message: 'reported database performance issues',
      subject: 'Production Database Performance Alert',
      preview: 'WARNING: Database response times have increased by 300% in the last hour...',
      channel: 'Chat',
      time: '12 min ago',
      priority: 'L2',
      isRead: false,
      conversationId: '2'
    },
    // L1 - Business Updates (Medium Priority)
    {
      id: '3',
      name: 'Terry Franci',
      avatar: '/images/user/user-02.jpg',
      message: 'shared budget review',
      subject: 'Q4 Marketing Budget Review',
      preview: 'Hi team, I wanted to discuss the proposed changes to our Q4 marketing spend...',
      channel: 'Email',
      time: '25 min ago',
      priority: 'L1',
      isRead: false,
      conversationId: '3'
    },
    // L1 - Development Updates (Medium Priority)
    {
      id: '4',
      name: 'Alena Franci',
      avatar: '/images/user/user-03.jpg',
      message: 'posted standup update',
      subject: 'Dev Team Standup Update',
      preview: 'Quick update: deployment pipeline is ready for review...',
      channel: 'Chat',
      time: '35 min ago',
      priority: 'L1',
      isRead: false,
      conversationId: '4'
    },
    // L0 - General Communication (Low Priority, Read)
    {
      id: '5',
      name: 'Jocelyn Kenter',
      avatar: '/images/user/user-04.jpg',
      message: 'rescheduled meeting',
      subject: 'Meeting Rescheduled',
      preview: 'Meeting moved to 3pm today. Conference room B.',
      channel: 'SMS',
      time: '45 min ago',
      priority: 'L0',
      isRead: true,
      conversationId: '5'
    }
  ];

  const handleNotificationClick = (conversationId: string) => {
    // Navigate to AdoraLink and select the specific conversation
    const url = `/adoralink?conversation=${conversationId}`;
    router.push(url);
    closeDropdown();
  };

  const getPriorityColor = (priority: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-400';
    switch (priority) {
      case 'L3': return 'bg-red-500';
      case 'L2': return 'bg-orange-500';
      case 'L1': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email': return '📧';
      case 'Chat': return '💬';
      case 'SMS': return '📱';
      case 'Voice': return '📞';
      case 'Video': return '📹';
      default: return '💬';
    }
  };

  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            AdoraLink Messages
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dropdown-toggle dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {adoraLinkNotifications.map((notification) => (
            <li key={notification.id}>
              <DropdownItem
                onItemClick={() => handleNotificationClick(notification.conversationId)}
                className={`flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                }`}
              >
                <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                  <Image
                    width={40}
                    height={40}
                    src={notification.avatar}
                    alt={notification.name}
                    className="w-full overflow-hidden rounded-full"
                  />
                  <span className={`absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900 ${getPriorityColor(notification.priority, notification.isRead)}`}></span>
                </span>

                <span className="block flex-1">
                  <span className="mb-1.5 space-x-1 block text-theme-sm text-gray-500 dark:text-gray-400">
                    <span className={`font-medium ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {notification.name}
                    </span>
                    <span>{notification.message}</span>
                    {notification.subject && (
                      <span className={`font-medium ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        "{notification.subject}"
                      </span>
                    )}
                  </span>

                  <span className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
                    {notification.preview}
                  </span>

                  <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>{getChannelIcon(notification.channel)}</span>
                      <span>{notification.channel}</span>
                    </span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{notification.time}</span>
                    {notification.priority !== 'L1' && (
                      <>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                          notification.priority === 'L3' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          notification.priority === 'L2' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {notification.priority}
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </DropdownItem>
            </li>
          ))}
        </ul>
        <Link
          href="/adoralink"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All in AdoraLink
        </Link>
      </Dropdown>
    </div>
  );
}
