"use client";
import React, { useRef, useEffect, useState } from "react";

const COLORS = [
  "#2563eb", // blue
  "#ef4444", // red
  "#22c55e", // green
  "#f59e42", // orange
  "#fbbf24", // yellow
  "#000000", // black
  "#ffffff", // white
];
const LINE_WIDTHS = [2, 4, 8, 16];

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  const [color, setColor] = useState("#2563eb");
  const [lineWidth, setLineWidth] = useState(3);
  const [textMode, setTextMode] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [textPos, setTextPos] = useState<{ x: number; y: number } | null>(null);

  // Resize canvas to fill container
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height)
        });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
  }, [canvasSize, color, lineWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Handle canvas click for text tool
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (textMode) {
      const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
      setTextPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTextInput("");
    }
  };

  // Commit text to canvas
  const commitText = () => {
    if (textInput && textPos && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.font = `20px Outfit, sans-serif`;
        ctx.fillStyle = color;
        ctx.textBaseline = "top";
        ctx.fillText(textInput, textPos.x, textPos.y);
        ctx.restore();
      }
    }
    setTextInput("");
    setTextPos(null);
    setTextMode(false);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-120px)] min-h-[400px] max-h-[calc(100vh-120px)] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Floating Toolbar, Title, and Button */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-white/80 dark:bg-gray-900/80 rounded-lg px-4 py-2 shadow">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mr-4">Whiteboard</h1>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 rounded bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
        >
          Clear
        </button>
        {/* Color Picker */}
        <div className="flex items-center gap-1 ml-4">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-sky-600' : 'border-gray-300'} flex items-center justify-center`}
              style={{ background: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
        {/* Line Width Picker */}
        <div className="flex items-center gap-1 ml-4">
          {LINE_WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${lineWidth === w ? 'border-sky-600' : 'border-gray-300'}`}
              aria-label={`Select line width ${w}`}
            >
              <div style={{ width: w, height: w, background: color, borderRadius: '50%' }} />
            </button>
          ))}
        </div>
        {/* Mock Multimedia Toolbar */}
        <div className="flex items-center gap-2 ml-4 opacity-60">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 group relative" title="Templates">
            <span role="img" aria-label="Templates">📄</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">Templates</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 group relative" title="Images">
            <span role="img" aria-label="Images">🖼️</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">Images</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 group relative" title="Documents">
            <span role="img" aria-label="Documents">📑</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">Documents</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 group relative" title="Videos">
            <span role="img" aria-label="Videos">🎬</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">Videos</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 group relative" title="Links">
            <span role="img" aria-label="Links">🔗</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">Links</span>
          </button>
          <button
            className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 group relative ${textMode ? 'bg-sky-100 dark:bg-sky-900' : ''}`}
            title="Text"
            onClick={() => { setTextMode((v) => !v); setTextInput(""); setTextPos(null); }}
          >
            <span className="font-bold text-lg text-gray-700 dark:text-gray-200">T</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-10 z-20 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">Text</span>
          </button>
        </div>
      </div>
      {/* Responsive Canvas */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute top-0 left-0 w-full h-full block cursor-crosshair bg-white dark:bg-gray-900"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onClick={handleCanvasClick}
        style={{ zIndex: 1 }}
      />
      {/* Text Input Overlay */}
      {textMode && textPos && (
        <input
          type="text"
          autoFocus
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          onBlur={commitText}
          onKeyDown={e => { if (e.key === "Enter") commitText(); }}
          style={{
            position: "absolute",
            left: textPos.x,
            top: textPos.y,
            zIndex: 10,
            fontSize: 20,
            color: color,
            background: "rgba(255,255,255,0.8)",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "2px 6px",
            outline: "none",
            fontFamily: 'Outfit, sans-serif',
            minWidth: 40
          }}
        />
      )}
      {/* Disclaimer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded text-gray-500 dark:text-gray-400 text-sm shadow z-20">
        This whiteboard is for demo purposes only, users will be able to save their whiteboards in the live version.
      </div>
    </div>
  );
} 