'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DictionaryWord } from '@/types';
import { INITIAL_DICTIONARY } from '@/lib/data';

interface SavedWordsContextType {
  savedWords: DictionaryWord[];
  toggleSaveWord: (word: DictionaryWord) => boolean;
  isWordSaved: (wordId: string) => boolean;
  allWords: DictionaryWord[];
  addCustomWord: (word: DictionaryWord) => void;
}

const SavedWordsContext = createContext<SavedWordsContextType | undefined>(undefined);

export function SavedWordsProvider({ children }: { children: React.ReactNode }) {
  const [allWords, setAllWords] = useState<DictionaryWord[]>(INITIAL_DICTIONARY);
  const [savedWords, setSavedWords] = useState<DictionaryWord[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('redmandarin_saved_words');
      if (saved) {
        setSavedWords(JSON.parse(saved));
      } else {
        // default 3 saved words as in PRD Section 20
        setSavedWords(INITIAL_DICTIONARY.slice(0, 3));
      }
    } catch {
      // fallback
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('redmandarin_saved_words', JSON.stringify(savedWords));
    }
  }, [savedWords, isInitialized]);

  const toggleSaveWord = (word: DictionaryWord): boolean => {
    const exists = savedWords.some((w) => w.id === word.id);
    if (exists) {
      setSavedWords((prev) => prev.filter((w) => w.id !== word.id));
      return false;
    } else {
      setSavedWords((prev) => [word, ...prev]);
      return true;
    }
  };

  const isWordSaved = (wordId: string): boolean => {
    return savedWords.some((w) => w.id === wordId);
  };

  const addCustomWord = (word: DictionaryWord) => {
    setAllWords((prev) => [word, ...prev]);
  };

  return (
    <SavedWordsContext.Provider
      value={{
        savedWords,
        toggleSaveWord,
        isWordSaved,
        allWords,
        addCustomWord,
      }}
    >
      {children}
    </SavedWordsContext.Provider>
  );
}

export function useSavedWords() {
  const context = useContext(SavedWordsContext);
  if (!context) {
    throw new Error('useSavedWords must be used within a SavedWordsProvider');
  }
  return context;
}
