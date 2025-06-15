"use client";
import React from "react";

export default function StorytellingPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[600px] h-full w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 relative">
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Add stories</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-sm text-center max-w-2xl">
        Stories let you organize and present your content in a narrative format.<br/>
        <span className="text-xs text-gray-400">(Examples: brand stories, customer journeys, product launches, etc.)</span>
      </p>
      {/* Upload area */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-4">
        <div className="w-full border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-2xl flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-800 mb-4 relative">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900 mb-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div className="font-medium text-gray-700 dark:text-gray-200 mb-1">Upload stories</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">Drag & drop or <span className="text-purple-600 cursor-pointer underline">choose file</span> to upload</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">Supported file types: PDF, .txt, Markdown, .docx, .sb, .md, .json</div>
            {/* File type chips */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">Storybook (.sb)</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">Markdown (.md)</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">Word (.docx)</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">JSON</span>
            </div>
          </div>
        </div>
        {/* Source options */}
        <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Google Drive</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium hover:bg-purple-200">Google Docs</button>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Link</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium hover:bg-purple-200">Website</button>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Paste text</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium hover:bg-purple-200">Copied text</button>
            </div>
          </div>
        </div>
      </div>
      {/* Source limit bar */}
      <div className="w-full max-w-2xl flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-400">Source limit</span>
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <span className="text-xs text-gray-400">0 / 50</span>
      </div>
      {/* Storybooks */}
      <div className="w-full max-w-2xl mb-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your Storybooks</h2>
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
    </div>
  );
} 