// Define the Word type
export enum LearningRate {
  "VERY_EASY" = "VERY_EASY",
  "EASY" = "EASY",
  "MEDIUM" = "MEDIUM",
  "HARD" = "HARD",
}

export type DIFFICULTY_LEVEL = 1 | 2 | 3 | 4 | 5;

export interface Word {
  id: string;
  word: string;
  translation: string;
  hint?: string;
  tag: string; // Optional property
  learningRate?: LearningRate;
  timeSpend?: number; // In seconds
  timeStart?: number;
  visited: number;
  createdOn?: string;
  lastVisitedOn?: string;
  nextReviewOn?: string;
  difficultyLevel: DIFFICULTY_LEVEL; // higher then level the difficult the word is
}

export enum EXPLORE {
  "REVIEW" = "REVIEW",
  "NEW" = "NEW",
  "ALL" = "ALL",
}
export type EXPLORE_WORDS_TYPE = EXPLORE;
