import React, { createContext, useContext, useEffect, useState } from "react";

import { Word } from "@/types";
import { readWords, subscribeToWords } from "@/firebase/words/operations";

// Define the context shape
interface WordContextType {
    words: Word[];
    resetTimeSpent: () => Promise<void>;
    tags: string[];
}
// Create the context
const WordContext = createContext<WordContextType | undefined>(undefined);

// Provider component
export const WordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [words, setWords] = useState<Word[]>([]);
    const [tags, setTags] = useState(['German A1', 'German A2', 'German B1', 'German B2'])


    useEffect(() => {
        const unsubscribe = subscribeToWords(setWords);
        return () => unsubscribe();
    }, [])


    const resetTimeSpent = async () => {
        if (words.length === 0) return
        const newWords = words.map(word => ({ ...word, timeSpend: 0, timeStart: 0 }));
        setWords([...newWords]);
    }

    return (
        <WordContext.Provider value={{ words, tags, resetTimeSpent }}>
            {children}
        </WordContext.Provider>
    );
};

// Custom hook to use the context
export const useWordContext = () => {
    const context = useContext(WordContext);
    if (!context) {
        throw new Error("useWordContext must be used within a WordProvider");
    }
    return context;
};
