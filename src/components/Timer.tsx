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
    
    
    const storedTime = parseInt(stored);
    const timeDiff = Math.floor((Date.now() - storedTime) / 60000);
    if (timeDiff > 10) {
      
      const now = Date.now();
      localStorage.setItem('lastUpdated', now.toString());
      return 0;
    }
    
    return Math.max(0, timeDiff);
  });

  useEffect(() => {
   
    if (timeLeft === 600000) {
      const now = Date.now();
      localStorage.setItem('lastUpdated', now.toString());
      setLastUpdated(0);
    }
  }, [timeLeft]);

  useEffect(() => {
   
    const interval = setInterval(() => {
      const stored = localStorage.getItem('lastUpdated');
      if (stored) {
        const storedTime = parseInt(stored);
        const timeDiff = Math.floor((Date.now() - storedTime) / 60000);
        
        
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
