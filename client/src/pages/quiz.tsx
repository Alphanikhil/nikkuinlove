import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BearCouple from "@/components/animations/bear-couple";
import type { QuizQuestion } from "@shared/schema";

export default function Quiz() {
  const [_, setLocation] = useLocation();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { data: quiz, isLoading, refetch } = useQuery<QuizQuestion>({
    queryKey: ["/api/quiz"]
  });

  if (isLoading || !quiz) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-2xl text-pink-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const tryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    refetch(); // This will fetch a new random question
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-4 md:p-6 bg-white/80 backdrop-blur shadow-xl">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-lg md:text-2xl font-bold text-pink-600 mb-6 text-center break-words max-w-full">
                {quiz.question}
              </h2>
              <div className="space-y-3 w-full">
                {quiz.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-sm md:text-base py-4 md:py-6 px-3 hover:bg-pink-50 hover:text-pink-600 transition-all text-left break-words"
                      onClick={() => handleAnswer(index)}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              {isCorrect ? (
                <>
                  <motion.h3 
                    className="text-xl md:text-3xl font-bold text-green-600 mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    Correct! 🎉
                  </motion.h3>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={() => setLocation("/letters")}
                      className="bg-pink-400 hover:bg-pink-500 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                    >
                      See Your Special Letters
                    </Button>
                  </motion.div>
                </>
              ) : (
                <>
                  <img
                    src="/tkthao219-peach.gif"
                    alt="Cute wrong answer"
                    className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full"
                  />
                  <motion.h3 
                    className="text-lg md:text-2xl font-bold text-red-600 mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    Oops! Try again sweetie! 💕
                  </motion.h3>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={tryAgain}
                      className="bg-pink-400 hover:bg-pink-500 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="fixed bottom-4 right-4">
        <BearCouple position="right" />
      </div>
    </div>
  );
}