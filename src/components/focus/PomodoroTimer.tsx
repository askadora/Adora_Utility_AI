"use client";
import React, { useEffect, useRef } from "react";
import { useTimer } from "@/context/TimerContext";

type TimerMode = "shortWork" | "longWork" | "shortBreak" | "longBreak";

interface TimerSettings {
  shortWork: number;
  longWork: number;
  shortBreak: number;
  longBreak: number;
}

const PomodoroTimer: React.FC = () => {
  const { timer, updateTimer } = useTimer();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timerSettings: TimerSettings = {
    shortWork: 25 * 60, // 25 minutes
    longWork: 90 * 60, // 90 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };

  useEffect(() => {
    if (timer.isActive && timer.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        updateTimer({ timeLeft: timer.timeLeft - 1 });
      }, 1000);
    } else if (timer.timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.isActive, timer.timeLeft, updateTimer]);

  const handleTimerComplete = () => {
    updateTimer({ isActive: false });
    
    if (timer.mode === "shortWork" || timer.mode === "longWork") {
      const newSessions = timer.sessions + 1;
      updateTimer({ sessions: newSessions });
      // After 4 work sessions, take a long break
      if (newSessions % 4 === 0) {
        updateTimer({ mode: "longBreak", timeLeft: timerSettings.longBreak });
      } else {
        updateTimer({ mode: "shortBreak", timeLeft: timerSettings.shortBreak });
      }
    } else {
      // After a break, default to short work
      updateTimer({ mode: "shortWork", timeLeft: timerSettings.shortWork });
    }

    // Play notification sound (you could add actual audio here)
    console.log("Timer completed!");
  };

  const toggleTimer = () => {
    updateTimer({ isActive: !timer.isActive });
  };

  const resetTimer = () => {
    updateTimer({ isActive: false, timeLeft: timerSettings[timer.mode] });
  };

  const switchMode = (newMode: TimerMode) => {
    updateTimer({ 
      mode: newMode, 
      timeLeft: timerSettings[newMode], 
      isActive: false 
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgress = () => {
    const totalTime = timerSettings[timer.mode];
    return ((totalTime - timer.timeLeft) / totalTime) * 100;
  };

  const getModeColor = () => {
    switch (timer.mode) {
      case "shortWork":
        return "text-red-500 border-red-500";
      case "longWork":
        return "text-purple-500 border-purple-500";
      case "shortBreak":
        return "text-green-500 border-green-500";
      case "longBreak":
        return "text-blue-500 border-blue-500";
      default:
        return "text-gray-500 border-gray-500";
    }
  };

  const getModeBackground = () => {
    switch (timer.mode) {
      case "shortWork":
        return "bg-red-50 dark:bg-red-900/10";
      case "longWork":
        return "bg-purple-50 dark:bg-purple-900/10";
      case "shortBreak":
        return "bg-green-50 dark:bg-green-900/10";
      case "longBreak":
        return "bg-blue-50 dark:bg-blue-900/10";
      default:
        return "bg-gray-50 dark:bg-gray-900/10";
    }
  };

  return (
    <div className={`w-full h-full p-4 lg:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${getModeBackground()}`}>
      <div className="text-center h-full flex flex-col justify-center">
        {/* Mode Selector */}
        <div className="flex flex-col gap-2 mb-4 lg:mb-6">
          {/* Work Options Row */}
          <div className="flex justify-center gap-1 lg:gap-2">
            <button
              onClick={() => switchMode("shortWork")}
              className={`px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                timer.mode === "shortWork"
                  ? "bg-red-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Quick Work
            </button>
            <button
              onClick={() => switchMode("longWork")}
              className={`px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                timer.mode === "longWork"
                  ? "bg-purple-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Focus Work
            </button>
          </div>
          
          {/* Break Options Row */}
          <div className="flex justify-center gap-1 lg:gap-2">
            <button
              onClick={() => switchMode("shortBreak")}
              className={`px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                timer.mode === "shortBreak"
                  ? "bg-green-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode("longBreak")}
              className={`px-3 lg:px-4 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                timer.mode === "longBreak"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Long Break
            </button>
          </div>
        </div>

        {/* Timer Display */}
        <div className="relative mb-4 lg:mb-6">
          <div className={`w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full border-4 lg:border-6 ${getModeColor()} flex items-center justify-center relative overflow-hidden`}>
            {/* Progress Ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(currentColor ${getProgress()}%, transparent ${getProgress()}%)`,
                opacity: 0.2,
              }}
            />
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white z-10">
              {formatTime(timer.timeLeft)}
            </div>
          </div>
        </div>

        {/* Current Mode Label */}
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-4 lg:mb-6">
          {timer.mode === "shortWork" && "Quick Work Session"}
          {timer.mode === "longWork" && "Focus Work Session"}
          {timer.mode === "shortBreak" && "Short Break"}
          {timer.mode === "longBreak" && "Long Break"}
        </h3>

        {/* Control Buttons */}
        <div className="flex justify-center gap-2 lg:gap-4 mb-4 lg:mb-6">
          <button
            onClick={toggleTimer}
            className={`px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-medium text-white transition-colors ${
              timer.isActive
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {timer.isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 lg:px-6 py-2 lg:py-3 rounded-lg text-sm lg:text-base font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Session Counter */}
        <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
          Completed Sessions: <span className="font-bold">{timer.sessions}</span>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer; 