import React, { useState, useEffect } from "react";
import useNews from "../hooks/useNews";

const refreshOptions = [
  { label: "1 minute", value: 600000 },
  { label: "10 minutes", value: 600000 },
  { label: "20 minutes", value: 1200000 },
  { label: "1 hour", value: 3600000 },
  { label: "2 hours", value: 7200000 },
  { label: "1 day", value: 86400000 },
];

const Timer: React.FC = () => {
  const { refreshInterval, setRefreshInterval } = useNews();

  // Ensure timeLeft starts from refreshInterval
  const [timeLeft, setTimeLeft] = useState(() => {
    return Number(localStorage.getItem("timeLeft")) || refreshInterval;
  });

  // Reset timeLeft when refreshInterval changes
  useEffect(() => {
    setTimeLeft(refreshInterval);
    localStorage.setItem("timeLeft", refreshInterval.toString());
  }, [refreshInterval]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          console.log("Fetching data...");
          localStorage.setItem("timeLeft", refreshInterval.toString());
          return refreshInterval;
        }
        const newTime = prev - 1000;
        localStorage.setItem("timeLeft", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Handle interval change
  const handleIntervalChange = (value: number) => {
    setRefreshInterval(value);
    setTimeLeft(value);
    localStorage.setItem("refreshInterval", value.toString());
    localStorage.setItem("timeLeft", value.toString());
  };

  // Format time for display
  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60) % 60;
    const h = Math.floor(s / 3600);
    return `${h ? `${h}h ` : ""}${m ? `${m}m ` : ""}${s % 60}s`;
  };

  return (
    <div className="text-sm text-gray-500">
      <p>
        Refreshing in <strong>{formatTime(timeLeft)}</strong>
      </p>
      <div className="text-[12px] text-white p-3 rounded-[3px]">
        {refreshOptions.map(({ label, value }) => (
          <div
            key={value}
            className={`py-2 px-3 cursor-pointer rounded-md ${
              refreshInterval === value ? "bg-green-500 border border-white text-black" : "hover:bg-gray-600"
            }`}
            onClick={() => handleIntervalChange(value)}
          >
            {label} {refreshInterval === value ? "(Selected)" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
