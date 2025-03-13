import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";

const Timer: React.FC = () => {
  const { timeLeft } = useTimer();
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  useEffect(() => {
    // Reset lastUpdated when timer hits 0
    if (timeLeft === 0) {
      setLastUpdated(0);
    }

    // Update the "minutes ago" counter every minute
    const interval = setInterval(() => {
      setLastUpdated(prev => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const getDisplayText = () => {
    if (lastUpdated === 0) {
      return "Last updated just now";
    }
    return `Last updated ${lastUpdated} ${lastUpdated === 1 ? 'minute' : 'minutes'} ago`;
  };

  return (
    <div className=" text-[#747678]">
      {getDisplayText()}
    </div>
  );
};

export default Timer;
