import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const TimerDisplay: React.FC = () => {
  const { timeLeft } = useTimer();
  const [lastUpdated, setLastUpdated] = useState(
    Number(localStorage.getItem("lastUpdated")) || Date.now()
  );

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getElapsedMinutes = () => {
    const elapsed = Math.floor((Date.now() - lastUpdated) / 60000);
    return elapsed === 0 ? "just now" : `${elapsed} min ago`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      const now = Date.now();
      setLastUpdated(now);
      localStorage.setItem("lastUpdated", now.toString());
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastUpdated) / 60000);
      if (elapsed >= 10) {
        localStorage.removeItem("lastUpdated");
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div>
      <p className="text-gray-500">Last updated {getElapsedMinutes()}</p>
    </div>
  );
};

export default TimerDisplay;
