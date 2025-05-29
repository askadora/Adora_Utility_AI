"use client";

import React, { useState } from "react";

const mailboxes = [
  { name: "Inbox", count: 3 },
  { name: "Sent" },
  { name: "Drafts" },
  { name: "Spam", count: 2 },
  { name: "Trash" },
  { name: "Archive" },
];

const filters = ["Starred", "Important"];
const labels = ["Personal", "Work", "Payments", "Invoices", "Blank"];

const mockEmails = [
  {
    id: 1,
    sender: "Lindsey Curtis",
    subject: "Welcome to the team!",
    preview: "We're excited to have you join us. Please find attached...",
    time: "2 hours ago",
    unread: true,
    starred: true,
    important: false,
    label: "Work",
  },
  {
    id: 2,
    sender: "Kaiya George",
    subject: "Invoice for March",
    preview: "Please see the attached invoice for your records.",
    time: "5 hours ago",
    unread: false,
    starred: false,
    important: true,
    label: "Invoices",
  },
  {
    id: 3,
    sender: "Abram Schleifer",
    subject: "Meeting Reminder",
    preview: "Just a reminder about our meeting tomorrow at 10am.",
    time: "1 day ago",
    unread: true,
    starred: false,
    important: false,
    label: "Personal",
  },
];

export default function EmailInboxPage() {
  const [selectedMailbox, setSelectedMailbox] = useState("Inbox");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredEmails = mockEmails.filter((email) => {
    if (selectedTab === "Unread" && !email.unread) return false;
    if (selectedTab === "Read" && email.unread) return false;
    if (selectedFilter && !email[selectedFilter.toLowerCase() as "starred" | "important"]) return false;
    if (selectedLabel && email.label !== selectedLabel) return false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-9rem)] bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col p-6 gap-8">
        <button className="w-full mb-4 rounded-lg bg-brand-500 text-white py-2 font-medium hover:bg-brand-600 transition">Compose</button>
        <div>
          <h4 className="mb-2 text-xs font-semibold text-gray-400 uppercase">Mailbox</h4>
          <ul className="space-y-1">
            {mailboxes.map((box) => (
              <li key={box.name}>
                <button
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition ${selectedMailbox === box.name ? "bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"}`}
                  onClick={() => setSelectedMailbox(box.name)}
                >
                  <span>{box.name}</span>
                  {box.count && <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">{box.count}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-semibold text-gray-400 uppercase">Filter</h4>
          <ul className="space-y-1">
            {filters.map((filter) => (
              <li key={filter}>
                <button
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${selectedFilter === filter ? "bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"}`}
                  onClick={() => setSelectedFilter(filter === selectedFilter ? null : filter)}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-semibold text-gray-400 uppercase">Label</h4>
          <ul className="space-y-1">
            {labels.map((label) => (
              <li key={label}>
                <button
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${selectedLabel === label ? "bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"}`}
                  onClick={() => setSelectedLabel(label === selectedLabel ? null : label)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-h-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-brand-500 text-white px-3 py-1.5 text-sm font-medium hover:bg-brand-600">View More</button>
            <button className="rounded-lg bg-red-500 text-white px-3 py-1.5 text-sm font-medium hover:bg-red-600">Delete</button>
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Read', 'Unread'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${selectedTab === tab ? "bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Email List */}
        <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6 bg-gray-50 dark:bg-gray-900">
          {filteredEmails.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">No emails found.</div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmails.map((email) => (
                <li key={email.id} className={`flex items-center gap-4 py-4 px-2 rounded-lg transition ${email.unread ? "bg-white dark:bg-gray-800" : ""}`}>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white truncate">{email.sender}</span>
                      {email.starred && <span className="ml-1 text-yellow-400">★</span>}
                      {email.important && <span className="ml-1 text-red-500">●</span>}
                      <span className="ml-2 text-xs text-gray-400">{email.label}</span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 truncate font-semibold">{email.subject}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{email.preview}</div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">{email.time}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-3 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-500 dark:text-gray-400">Showing 1 of 159</span>
        </div>
      </main>
    </div>
  );
} 