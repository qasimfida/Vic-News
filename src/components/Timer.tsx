import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const Timer: React.FC = () => {
  const { timeLeft } = useTimer();
  const [lastUpdated, setLastUpdated] = useState<number>(() => {
    const stored = localStorage.getItem('lastUpdated');
    if (!stored) {
      const now = Date.now();
      localStorage.setItem('lastUpdated', now.toString());
      return 0;
    }
    
    // Check if stored time is too old (more than 10 minutes)
    const storedTime = parseInt(stored);
    const timeDiff = Math.floor((Date.now() - storedTime) / 60000);
    if (timeDiff > 10) {
      // If too old, reset to current time
      const now = Date.now();
      localStorage.setItem('lastUpdated', now.toString());
      return 0;
    }
    
    return Math.max(0, timeDiff);
  });

  useEffect(() => {
    // When timer resets (hits 10 minutes), update the last updated time
    if (timeLeft === 600000) {
      const now = Date.now();
      localStorage.setItem('lastUpdated', now.toString());
      setLastUpdated(0);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Update the minutes counter every 5 seconds
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lastUpdated');
      if (stored) {
        const storedTime = parseInt(stored);
        const timeDiff = Math.floor((Date.now() - storedTime) / 60000);
        
        // If time difference is more than 10 minutes, reset the timer
        if (timeDiff > 10) {
          const now = Date.now();
          localStorage.setItem('lastUpdated', now.toString());
          setLastUpdated(0);
        } else {
          setLastUpdated(Math.max(0, timeDiff));
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getDisplayText = () => {
    if (lastUpdated === 0) {
      return "Last updated just now";
    }
    return `Last updated ${lastUpdated} ${lastUpdated === 1 ? 'minute' : 'minutes'} ago`;
  };

  return (
    <div className="text-[#747678]">
      {getDisplayText()}
    </div>
  );
};

export default Timer;
