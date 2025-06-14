"use client";
import React, { useState } from "react";
import { FolderIcon, FileIcon } from "@/icons/index";

const mockFolders = [
  { id: 1, name: "My Drive" },
  { id: 2, name: "Shared" },
  { id: 3, name: "Projects" },
  { id: 4, name: "Archive" },
];

const mockFiles = [
  { id: 1, name: "Project Plan.pdf", type: "pdf", folder: 1 },
  { id: 2, name: "Budget.xlsx", type: "excel", folder: 1 },
  { id: 3, name: "Team Photo.jpg", type: "image", folder: 2 },
  { id: 4, name: "Notes.txt", type: "text", folder: 3 },
  { id: 5, name: "Archive.zip", type: "zip", folder: 4 },
];

export default function MyDrivePage() {
  const [selectedFolder, setSelectedFolder] = useState(1);

  const filesInFolder = mockFiles.filter(f => f.folder === selectedFolder);

  return (
    <div className="flex h-full min-h-[600px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Sidebar: Folders */}
      <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Folders</h2>
        <ul className="flex flex-col gap-1">
          {mockFolders.map(folder => (
            <li key={folder.id}>
              <button
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedFolder === folder.id ? "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <span className="w-5 h-5"><FolderIcon /></span>
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main: Files */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">My Drive</h1>
        {/* Search Mockup */}
        <div className="mb-6 flex items-center max-w-md">
          <input
            type="text"
            placeholder="Search in My Drive..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
            disabled
          />
          <span className="-ml-8 text-gray-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filesInFolder.length === 0 ? (
            <div className="col-span-full text-gray-400 text-center py-12">No files in this folder.</div>
          ) : (
            filesInFolder.map(file => (
              <div key={file.id} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <span className="w-10 h-10 mb-2 text-sky-500"><FileIcon /></span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate w-full text-center">{file.name}</span>
              </div>
            ))
          )}
        </div>
        {/* Living Doc Files in My Drive */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Living Docs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Mock Living Doc file cards */}
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">LD</span>
                <span className="font-medium text-gray-900 dark:text-white">Team Charter.ld</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 13, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">LD</span>
                <span className="font-medium text-gray-900 dark:text-white">Vision Statement.ld</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 1, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">LD</span>
                <span className="font-medium text-gray-900 dark:text-white">Strategy Outline.ld</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Apr 20, 2024</span>
            </div>
          </div>
        </div>
        {/* DataRain Notebooks in My Drive */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your DataRain Notebooks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Mock notebook cards */}
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded bg-sky-100 text-sky-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                    <path d="M8 4v16" strokeWidth="2" />
                  </svg>
                </span>
                <span className="font-medium text-gray-900 dark:text-white">Sales Analysis 2024.dr</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 10, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded bg-sky-100 text-sky-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                    <path d="M8 4v16" strokeWidth="2" />
                  </svg>
                </span>
                <span className="font-medium text-gray-900 dark:text-white">Customer Segments.dr</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Apr 28, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded bg-sky-100 text-sky-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
                    <path d="M8 4v16" strokeWidth="2" />
                  </svg>
                </span>
                <span className="font-medium text-gray-900 dark:text-white">Market Research Q2.dr</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Mar 15, 2024</span>
            </div>
          </div>
        </div>
        {/* Whiteboard Files in My Drive */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Whiteboards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Mock whiteboard file cards */}
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">W</span>
                <span className="font-medium text-gray-900 dark:text-white">Brainstorm.wb</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 12, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">W</span>
                <span className="font-medium text-gray-900 dark:text-white">UX Sketch.wb</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Apr 30, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">W</span>
                <span className="font-medium text-gray-900 dark:text-white">Team Plan.wb</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Apr 10, 2024</span>
            </div>
          </div>
        </div>
        {/* Storybook Files in My Drive */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Storybooks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Mock storybook file cards */}
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">SB</span>
                <span className="font-medium text-gray-900 dark:text-white">Brand Story.sb</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 14, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">SB</span>
                <span className="font-medium text-gray-900 dark:text-white">Customer Journey.sb</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: May 2, 2024</span>
            </div>
            <div className="flex flex-col items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">SB</span>
                <span className="font-medium text-gray-900 dark:text-white">Product Launch.sb</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Last modified: Apr 18, 2024</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 