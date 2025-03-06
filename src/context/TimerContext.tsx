import React, { createContext, useState, useEffect, useContext } from "react";

interface TimerContextProps {
  timeLeft: number;
  selectedInterval: number;
  setIntervalValue: (value: number) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedInterval = Number(localStorage.getItem("selectedInterval")) || 600000; // Default 10 minutes
  const expirationTime = Number(localStorage.getItem("expirationTime")) || Date.now() + savedInterval;
  const initialTimeLeft = Math.max(expirationTime - Date.now(), 0);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [selectedInterval, setSelectedInterval] = useState(savedInterval);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1000;
          return newTime <= 0 ? 0 : newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const setIntervalValue = (value: number) => {
    const newExpirationTime = Date.now() + value;
    setSelectedInterval(value);
    setTimeLeft(value);
    localStorage.setItem("selectedInterval", value.toString());
    localStorage.setItem("expirationTime", newExpirationTime.toString());
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
