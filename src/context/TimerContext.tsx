import React, { createContext, useState, useEffect, useContext } from "react";

interface TimerContextProps {
  timeLeft: number;
  selectedInterval: number;
  setIntervalValue: (value: number) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedInterval = Number(localStorage.getItem("selectedInterval")) || 600000;
  const startTime = Number(localStorage.getItem("startTime")) || Date.now();
  const elapsedTime = Date.now() - startTime;
  const initialTimeLeft = Math.max(savedInterval - elapsedTime, 0); // Calculate remaining time

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [selectedInterval, setSelectedInterval] = useState(savedInterval);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const setIntervalValue = (value: number) => {
    setSelectedInterval(value);
    setTimeLeft(value);
    localStorage.setItem("selectedInterval", value.toString());
    localStorage.setItem("startTime", Date.now().toString());
  };

  return (
    <TimerContext.Provider value={{ timeLeft, selectedInterval, setIntervalValue }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
