"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type TimerMode = "shortWork" | "longWork" | "shortBreak" | "longBreak";

interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  sessions: number;
}

interface TimerContextType {
  timer: TimerState;
  updateTimer: (state: Partial<TimerState>) => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const initialTimerState: TimerState = {
  mode: "shortWork",
  timeLeft: 25 * 60, // 25 minutes in seconds
  isActive: false,
  sessions: 0,
};

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timer, setTimer] = useState<TimerState>(initialTimerState);

  const updateTimer = (state: Partial<TimerState>) => {
    setTimer(prev => ({ ...prev, ...state }));
  };

  const resetTimer = () => {
    setTimer(initialTimerState);
  };

  return (
    <TimerContext.Provider value={{ timer, updateTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}; 