// Define the Word type
export enum LearningRate {
  "VERY_EASY" = "VERY_EASY",
  "EASY" = "EASY",
  "MEDIUM" = "MEDIUM",
  "HARD" = "HARD",
}

export interface Word {
  id: number;
  word: string;
  translation: string;
  hint?: string;
  tag: string; // Optional property
  dateAndTimeCreated: string;
  learningRate: LearningRate;
  timeSpend?: number; // In seconds
  timeStart?: number;
}
