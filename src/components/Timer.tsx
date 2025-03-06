import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const TimerDisplay: React.FC = () => {
  const { timeLeft, setIntervalValue } = useTimer();
  const [lastUpdated, setLastUpdated] = useState<number>(
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
      setLastUpdated(Date.now());
      localStorage.setItem("lastUpdated", Date.now().toString());
      setIntervalValue(600000); // 10 minutes
      window.location.reload(); // Immediate reload when timer hits 0
    }
  }, [timeLeft, setIntervalValue]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "r") {
        window.location.reload();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return <p className="text-gray-500">Last updated {getElapsedMinutes()}</p>;
};

export default TimerDisplay;
