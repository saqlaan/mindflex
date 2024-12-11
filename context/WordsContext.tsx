import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Word } from "@/types";

// Define the context shape
interface WordContextType {
    words: Word[];
    addWord: ({ word, translation, tag }: { word: string, translation: string, tag: string }) => Promise<void>;
    removeWord: (id: number) => Promise<void>;
    updateWord: (updatedWord: Word) => Promise<void>;
    resetTimeSpent: () => Promise<void>;
    tags: string[];
}
// Create the context
const WordContext = createContext<WordContextType | undefined>(undefined);

// Provider component
export const WordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [words, setWords] = useState<Word[]>([]);
    const [tags, setTags] = useState(['German A1', 'German A2', 'German B1', 'German B2'])



    // AsyncStorage key
    const STORAGE_KEY = "@words";

    // Load words from AsyncStorage on initial render
    useEffect(() => {
        const loadWords = async () => {
            const storedWords = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedWords) {
                setWords(JSON.parse(storedWords));
            }
        };
        loadWords();
    }, []);

    // Helper function to save words to AsyncStorage
    const saveWordsToStorage = async (newWords: Word[]) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
    };

    // Add a new word
    const addWord = async ({ word, translation, tag }: { word: string, translation: string, tag: string }) => {
        const newWords = [...words, { word, translation, tag, id: Date.now() }];
        setWords(newWords);
        await saveWordsToStorage(newWords);
    };

    // Remove a word
    const removeWord = async (id: number) => {
        const newWords = words.filter((word) => word.id !== id);
        setWords(newWords);
        await saveWordsToStorage(newWords);
    };

    // Update a word
    const updateWord = async (updatedWord: Word) => {
        const newWords = words.map((word) => (word.id === updatedWord.id ? { ...updatedWord } : word));
        setWords(newWords);
        await saveWordsToStorage(newWords);
    };

    const resetTimeSpent = async () => {
        const newWords = words.map((word) => ({ ...word, timeSpend: 0, timeStart: 0 }));
        setWords([...newWords]);
        await saveWordsToStorage([...newWords]);
    }

    return (
        <WordContext.Provider value={{ words, addWord, removeWord, updateWord, tags, resetTimeSpent }}>
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
