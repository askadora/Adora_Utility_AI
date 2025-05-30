"use client";

import React, { useState } from "react";
import Image from 'next/image';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastActive: string;
}

interface Message {
  id: string;
  sender: "me" | "contact";
  content: string;
  timestamp: string;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Kaiya George",
    role: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    lastMessage: "Let's catch up tomorrow!",
    lastActive: "15 mins",
  },
  {
    id: "2",
    name: "Lindsey Curtis",
    role: "Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    lastActive: "30 mins",
  },
  {
    id: "3",
    name: "Zain Geidt",
    role: "Content Writer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "If don't like something, I'll stay away from it.",
    lastActive: "45 mins",
  },
  {
    id: "4",
    name: "Carla George",
    role: "Front-end Developer",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    lastMessage: "They got there early, and got really good seats.",
    lastActive: "2 days",
  },
  {
    id: "5",
    name: "Abram Schleifer",
    role: "Digital Marketer",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    lastMessage: "Please preview the image",
    lastActive: "1 hour",
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "contact",
    content: "Hi there! How can I help you today?",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    sender: "me",
    content: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    sender: "contact",
    content: "Sure! I have scheduled your appointment.",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    sender: "me",
    content: "Thank you!",
    timestamp: "1 hour ago",
  },
];

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact>(mockContacts[1]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "me",
        content: input,
        timestamp: "now",
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col flex-shrink-0 min-w-0 overflow-hidden">
        {/* Sidebar Header */}
        <div className="flex-none h-14 px-3 flex items-center border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h2>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          {mockContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full flex items-center gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left ${
                selectedContact.id === contact.id ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <Image
                src={contact.avatar}
                alt={contact.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white truncate">{contact.name}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{contact.lastActive}</span>
                </div>
                <div className="text-xs text-gray-500 truncate dark:text-gray-400">
                  {contact.role}
                </div>
                <div className="text-xs text-gray-500 truncate dark:text-gray-400 mt-1">
                  {contact.lastMessage}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>
      {/* Chat Window */}
      <main className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
        {/* Main Header */}
        <header className="flex-none h-14 flex items-center justify-between px-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-4">
            <Image
              src={selectedContact.avatar}
              alt={selectedContact.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{selectedContact.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{selectedContact.role}</div>
            </div>
          </div>
        </header>
        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "me"
                    ? "bg-brand-500 text-white rounded-br-none"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-700"
                }`}
              >
                {msg.content}
                <div className="mt-1 text-xs text-gray-400 text-right">{msg.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 flex items-center gap-4 flex-shrink-0 z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            onClick={handleSend}
            className="rounded-full bg-brand-500 text-white p-2 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
} 