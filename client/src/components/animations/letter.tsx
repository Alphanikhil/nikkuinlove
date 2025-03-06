import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import TimeLock from "./time-lock";

interface LetterProps {
  title: string;
  position: number;
  unlockTime: string | null;
  onClick: () => void;
}

export default function Letter({ title, position, unlockTime, onClick }: LetterProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { rotation, scale } = useSpring({
    from: { rotation: 0, scale: 1 },
    to: async (next) => {
      while (true) {
        // Slower, more natural swaying motion
        await next({ 
          rotation: 2,
          config: { 
            tension: 80, 
            friction: 15,
            duration: 2000
          } 
        });
        await next({ 
          rotation: -2,
          config: { 
            tension: 80, 
            friction: 15,
            duration: 2000
          } 
        });
      }
    },
    config: {
      tension: 120,
      friction: 14
    },
    immediate: false,
    pause: isHovered
  });

  return (
    <animated.div
      style={{
        position: "absolute",
        inset: 0,
        rotate: rotation.to((r) => `${r}deg`),
        scale: isHovered ? 1.1 : 1,
        transformOrigin: "top center"
      }}
      className="cursor-pointer flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative">
        <TimeLock unlockTime={unlockTime} title={title} />
        <div className="w-28 h-36 md:w-32 md:h-40 bg-pink-100 rounded-lg shadow-lg p-4 flex items-center justify-center text-center transform transition-all duration-300 hover:shadow-xl hover:bg-pink-50">
          {/* Envelope flap with gradient */}
          <div 
            className="absolute top-0 left-0 w-full h-6 md:h-8 bg-gradient-to-b from-pink-200 to-pink-100 rounded-t-lg" 
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} 
          />

          {/* Heart seal with shadow */}
          <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-red-400 rounded-full flex items-center justify-center transform -rotate-45 shadow-md hover:shadow-lg transition-shadow">
            <span className="text-white text-base md:text-xl animate-pulse">❤️</span>
          </div>

          {/* Letter title with enhanced typography */}
          <span className="text-pink-600 font-semibold mt-4 md:mt-6 font-serif tracking-wide text-xs md:text-sm">
            {title}
          </span>

          {/* Decorative string with shadow */}
          <div className="w-1 h-12 md:h-16 bg-gradient-to-b from-pink-300 to-pink-200 absolute top-0 left-1/2 -translate-x-1/2 -z-10 shadow-sm" />
        </div>
      </div>
    </animated.div>
  );
}