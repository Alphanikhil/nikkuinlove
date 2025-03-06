import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Letter } from "@shared/schema";

const COUPLE_IMAGES = [
  "/couple-1.jpg",
  "/couple-2.jpg",
  "/couple-3.jpg"
];

export default function LetterContent() {
  const [match, params] = useRoute("/letters/:id");
  const [_, setLocation] = useLocation();

  const { data: letter, isLoading } = useQuery<Letter>({
    queryKey: [`/api/letters/${params?.id}`]
  });

  if (!match || isLoading || !letter) {
    return <div>Loading...</div>;
  }
  
  // Check if letter is locked
  if (letter.unlockTime) {
    const getOrCreateStartTime = () => {
      const key = `letter_start_time_${letter.title}`;
      let startTime = localStorage.getItem(key);
      
      if (!startTime) {
        // If no start time exists, create one with current time
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
    if (now < unlockDate) {
      return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="w-full max-w-md bg-white/90 backdrop-blur rounded-lg shadow-xl p-8 text-center"
          >
            <Button
              variant="ghost"
              onClick={() => setLocation("/letters")}
              className="mb-4 text-pink-600"
            >
              ← Back to Tree
            </Button>
            
            <div className="text-5xl mb-4 flex justify-center">
              <motion.div 
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🔒
              </motion.div>
            </div>
            
            <h2 className="text-2xl font-bold text-pink-600 mb-4">{letter.title}</h2>
            <p className="text-pink-500 mb-6">This letter will unlock after {letter.unlockTime} hours</p>
            
            <div className="text-center">
              <div className="inline-block bg-pink-100 p-2 rounded-lg">
                <motion.div 
                  className="text-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ⏰
                </motion.div>
                <p className="text-sm mt-1 text-pink-500">Come back later</p>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-lg shadow-xl p-8"
      >
        <Button
          variant="ghost"
          onClick={() => setLocation("/letters")}
          className="mb-4 text-pink-600"
        >
          ← Back to Tree
        </Button>

        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center font-serif">
          {letter.title}
        </h1>

        {/* Circular image gallery */}
        <div className="flex justify-center gap-4 mb-6">
          {COUPLE_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-pink-200 shadow-lg"
            >
              <img
                src={img}
                alt={`Couple moment ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <ScrollArea className="h-[400px] rounded-md border border-pink-200 p-6 bg-white/50">
          <div className="text-lg leading-relaxed whitespace-pre-wrap text-pink-800 font-medium">
            {letter.content}
          </div>
        </ScrollArea>

        {/* Decorative hearts */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">💝</div>
        <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce delay-300">💖</div>
      </motion.div>
    </div>
  );
}