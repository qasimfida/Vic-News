import React, { createContext, useState, useEffect, useContext } from "react";

interface TimerContextProps {
  timeLeft: number;
  selectedInterval: number;
  setIntervalValue: (value: number) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const DEFAULT_INTERVAL = 600000; // 10 minutes
  const savedInterval = Number(localStorage.getItem("selectedInterval")) || DEFAULT_INTERVAL;
  
  // Check if expiration time exists and is valid
  let expirationTime = Number(localStorage.getItem("expirationTime"));
  if (!expirationTime || expirationTime < Date.now()) {
    expirationTime = Date.now() + savedInterval;
    localStorage.setItem("expirationTime", expirationTime.toString());
  }

  const [timeLeft, setTimeLeft] = useState(Math.max(expirationTime - Date.now(), 0));
  const [selectedInterval, setSelectedInterval] = useState(savedInterval);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const expTime = Number(localStorage.getItem("expirationTime"));
      const remaining = Math.max(expTime - now, 0);

      if (remaining <= 1000) {
        // Reset timer to 10 minutes
        const newExpirationTime = now + DEFAULT_INTERVAL;
        localStorage.setItem("expirationTime", newExpirationTime.toString());
        setTimeLeft(DEFAULT_INTERVAL);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
