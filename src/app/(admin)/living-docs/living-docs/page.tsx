"use client";
import React, { useState } from "react";

const FONT_SIZES = [12, 16, 20, 28, 36];
const COLORS = [
  "#111827", // black
  "#2563eb", // blue
  "#ef4444", // red
  "#22c55e", // green
  "#f59e42", // orange
  "#fbbf24", // yellow
];

export default function LivingDocsPage() {
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#111827");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-120px)] min-h-[600px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
      {/* Floating Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 rounded-lg px-4 py-2 shadow border border-gray-200 dark:border-gray-700">
        {/* Font size */}
        <select
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
          className="rounded border border-gray-300 dark:border-gray-700 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {FONT_SIZES.map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
        {/* Color picker */}
        <div className="flex items-center gap-1 ml-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-sky-600' : 'border-gray-300'} flex items-center justify-center`}
              style={{ background: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
        {/* Bold, Italic, Underline */}
        <button
          onClick={() => setBold(b => !b)}
          className={`px-2 py-1 rounded font-bold text-lg ${bold ? 'bg-sky-100 text-sky-700' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          title="Bold"
        >
          B
        </button>
        <button
          onClick={() => setItalic(i => !i)}
          className={`px-2 py-1 rounded italic text-lg ${italic ? 'bg-sky-100 text-sky-700' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          title="Italic"
        >
          I
        </button>
        <button
          onClick={() => setUnderline(u => !u)}
          className={`px-2 py-1 rounded underline text-lg ${underline ? 'bg-sky-100 text-sky-700' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          title="Underline"
        >
          U
        </button>
        {/* Insert buttons (mock) */}
        <button className="ml-4 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Insert Image">
          <span role="img" aria-label="Insert Image">🖼️</span>
        </button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Insert Table">
          <span role="img" aria-label="Insert Table">📊</span>
        </button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Insert Shape">
          <span role="img" aria-label="Insert Shape">⬛</span>
        </button>
      </div>
      {/* Document Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-8 px-8 bg-gray-100 dark:bg-gray-900">
        <div className="relative flex flex-col items-center">
          <div className="mx-auto bg-white dark:bg-gray-800 shadow-2xl border border-gray-300 dark:border-gray-700 rounded-[18px]" style={{ width: 800, minHeight: 1100, aspectRatio: '8.5/11', margin: '0 auto', padding: 48, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
            <div
              className="w-full min-h-[900px] text-gray-900 dark:text-white outline-none"
              style={{
                fontSize: fontSize,
                color: color,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: underline ? 'underline' : 'none',
              }}
              contentEditable
              suppressContentEditableWarning
            >
              Start writing your Living Doc here... (This is a mockup. Drag and drop, visual editing, and multimedia coming soon!)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 