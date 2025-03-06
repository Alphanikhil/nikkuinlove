import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const letters = pgTable("letters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  position: integer("position").notNull(),
  unlockTime: text("unlock_time")
});

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull()
});

export const insertLetterSchema = createInsertSchema(letters);
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions);

export type Letter = typeof letters.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertLetter = z.infer<typeof insertLetterSchema>;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
