// Define the Word type
export interface Word {
  id: number;
  word: string;
  translation: string;
  hint?: string;
  tag: string; // Optional property
}
