import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const Timer: React.FC = () => {
  const { timeLeft } = useTimer();
  const [lastUpdated, setLastUpdated] = useState<number>(() => {
    const stored = localStorage.getItem('lastUpdated');
    if (!stored) {
      // If no stored time exists, store current time
      localStorage.setItem('lastUpdated', Date.now().toString());
      return 0;
    }
    const timeDiff = Math.floor((Date.now() - parseInt(stored)) / 60000);
    return Math.max(0, timeDiff);
  });

  useEffect(() => {
    // When timer resets (hits 1000ms), update the last updated time
    if (timeLeft === 1000) {
      const now = Date.now();
      localStorage.setItem('lastUpdated', now.toString());
      setLastUpdated(0);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Update the minutes counter every 10 seconds for more responsive updates
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lastUpdated');
      if (stored) {
        const timeDiff = Math.floor((Date.now() - parseInt(stored)) / 60000);
        setLastUpdated(Math.max(0, timeDiff));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getDisplayText = () => {
    if (lastUpdated === 0) {
      return "Last updated just now";
    }
    return `Last updated ${lastUpdated} ${lastUpdated === 1 ? 'minute' : 'minutes'} ago`;
  };

  console.log(lastUpdated, timeLeft);
  return (
    <div className="text-[#747678]">
      {getDisplayText()}
    </div>
  );
};

export default Timer;
