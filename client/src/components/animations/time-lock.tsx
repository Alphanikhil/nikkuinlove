
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLockProps {
  unlockTime: string | null;
  title?: string;
}

export default function TimeLock({ unlockTime, title }: TimeLockProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [unlockDate, setUnlockDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!unlockTime) {
      setIsUnlocked(true);
      return;
    }

    // Get the creation time from localStorage or create it if it doesn't exist
    const getOrCreateStartTime = () => {
      const key = `letter_start_time_${title}`;
      let startTime = localStorage.getItem(key);
      
      if (!startTime) {
        // If no start time exists, create one with current time
        startTime = new Date().toISOString();
        localStorage.setItem(key, startTime);
      }
      
      return new Date(startTime);
    };

    const startTime = getOrCreateStartTime();
    const hoursToUnlock = parseInt(unlockTime, 10);
    
    // Calculate unlock date by adding the hours to the start time
    const calculatedUnlockDate = new Date(startTime);
    calculatedUnlockDate.setHours(calculatedUnlockDate.getHours() + hoursToUnlock);
    setUnlockDate(calculatedUnlockDate);

    const checkLockStatus = () => {
      const now = new Date();
      
      if (now >= calculatedUnlockDate) {
        setIsUnlocked(true);
        return;
      }
      
      // Calculate remaining time
      const diffMs = calculatedUnlockDate.getTime() - now.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${diffHours}h ${diffMinutes}m ${diffSeconds}s`);
    };

    checkLockStatus();

    // Update every second
    const interval = setInterval(checkLockStatus, 1000);
    return () => clearInterval(interval);
  }, [unlockTime, title]);

  if (isUnlocked) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex items-center justify-center z-10 bg-gradient-to-b from-pink-50 to-white/90 backdrop-blur-sm rounded-lg border-2 border-pink-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center p-2">
        {/* Cute lock icon with heart */}
        <div className="flex justify-center mb-3">
          <motion.div 
            className="text-3xl relative" 
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut" 
            }}
          >
            <span className="drop-shadow-md">🔒</span>
            <motion.span 
              className="absolute -top-2 -right-2 text-sm"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ❤️
            </motion.span>
          </motion.div>
        </div>

        {/* Display letter title with better styling */}
        {title && (
          <div className="text-pink-600 font-bold mb-2 text-sm">
            {title}
          </div>
        )}

        {/* Only show remaining time */}
        {timeRemaining && (
          <div className="text-pink-400 text-sm font-bold">
            {timeRemaining}
          </div>
        )}
      </div>
    </motion.div>
  );
}
