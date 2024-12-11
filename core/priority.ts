import { Word } from "@/types";

// Normalize timeSpend between 0 and 1
const normalizeTimeSpend = (word: Word, maxTime: number): number => {
  return word.timeSpend ? word.timeSpend / maxTime : 0;
};

// Calculate priority based solely on timeSpend
const calculatePriority = (word: Word, maxTime: number): number => {
  return 1 - normalizeTimeSpend(word, maxTime); // Higher priority for words with more time spent
};

// Generate sorted list of words by priority based on timeSpent
export const prioritizeWords = (words: Word[]): Word[] => {
  const maxTime = Math.max(...words.map((w) => w.timeSpend || 0)); // Find max time spent

  return words
    .map((word) => ({
      ...word,
      priority: calculatePriority(word, maxTime),
    }))
    .sort((a, b) => b.priority - a.priority); // Sort by priority descending (more time spent = higher priority)
};
