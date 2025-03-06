import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import TreeBackground from "@/components/tree-background";
import Letter from "@/components/animations/letter";
import type { Letter as LetterType } from "@shared/schema";

export default function LetterTree() {
  const [_, setLocation] = useLocation();
  const { data: letters, isLoading } = useQuery<LetterType[]>({
    queryKey: ["/api/letters"]
  });

  if (isLoading || !letters) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-2xl text-pink-600 animate-pulse">
          Loading your love letters... 💌
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fdf4f5] py-16 md:py-8">
      <TreeBackground />

      {/* Responsive grid container */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto">
        <div className="relative w-full max-w-6xl mt-12 md:mt-0">
          {/* Mobile: 2 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {letters.map((letter, index) => (
              <div key={letter.id} className="relative h-40 md:h-56">
                <Letter
                  title={letter.title}
                  position={index}
                  unlockTime={letter.unlockTime}
                  onClick={() => {
                    // Check if the letter is unlocked before navigating
                    if (!letter.unlockTime) {
                      setLocation(`/letters/${letter.id}`);
                      return;
                    }
                    
                    const getOrCreateStartTime = () => {
                      const key = `letter_start_time_${letter.title}`;
                      let startTime = localStorage.getItem(key);
                      
                      if (!startTime) {
                        startTime = new Date().toISOString();
                        localStorage.setItem(key, startTime);
                      }
                      
                      return new Date(startTime);
                    };

                    const startTime = getOrCreateStartTime();
                    const hoursToUnlock = parseInt(letter.unlockTime, 10);
                    const unlockDate = new Date(startTime);
                    unlockDate.setHours(unlockDate.getHours() + hoursToUnlock);
                    
                    const now = new Date();
                    if (now >= unlockDate) {
                      setLocation(`/letters/${letter.id}`);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 text-center text-pink-600 text-lg font-semibold">
        Pick a letter to read 💌
      </div>
    </div>
  );
}