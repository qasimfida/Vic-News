import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const TimerDisplay: React.FC = () => {
  const { timeLeft, setIntervalValue } = useTimer();
  const [lastUpdated, setLastUpdated] = useState<number>(
    Number(localStorage.getItem("lastUpdated")) || Date.now()
  );

  // Format timeLeft into MM:SS
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Calculate minutes since last update
  const getElapsedMinutes = () => {
    const elapsed = Math.floor((Date.now() - lastUpdated) / 60000);
    return elapsed === 0 ? "just now" : `${elapsed} min ago`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setLastUpdated(Date.now());
      localStorage.setItem("lastUpdated", Date.now().toString());
      setIntervalValue(600000); // Reset timer to 10 minutes
    }
  }, [timeLeft]);

  return (      <p className="text-gray-500">Last updated {getElapsedMinutes()}</p>

  );
};

export default TimerDisplay;
