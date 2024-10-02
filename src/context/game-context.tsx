import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import words from '@/assets/words.json';

interface Word {
  id: string,
  word: string,
  tip: string,
  alphabet: string;
}

interface GameContextType {
  maxAttempts: number;
  correctWord: Word | null;
  wordSize: number;
  defeat: boolean;
  win: boolean;
  canCheck: boolean[];
  currentAttempt: number;
  gameWords: string[];
  currentWord: string;
  handleBackspace: () => void;
  handleConfirm: () => void;
  handleWordChange: (newLetter: string) => void;
  resetTurn: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const maxAttempts = 5;
  const [wordID, setWordID] = useLocalStorage<string | undefined>('id');
  const [correctWord, setCorrectWord] = useState<Word | null>(null);
  const [wordSize, setWordSize] = useLocalStorage('sizew', 0);
  const [defeat, setDefeat] = useLocalStorage('defeat', false);
  const [win, setWin] = useLocalStorage('win', false);
  const initialChecks = Array(maxAttempts).fill(false);
  const [canCheck, setCanCheck] = useLocalStorage('checks', initialChecks);
  const [currentAttempt, setCurrentAttempt] = useLocalStorage('attempt', 0);
  const fillGrid = Array(maxAttempts).fill('');
  const [gameWords, setGameWords] = useLocalStorage<string[]>('game', fillGrid);
  const [currentWord, setCurrentWord] = useLocalStorage<string>('word', '');

  const chooseNewWord = () => {
    const chosenWord = randomNewWord();
    setCorrectWord(chosenWord);
    setWordSize(chosenWord.word.length);
  }

  const getWord = (id: string): Word | null => {
    return words.find(word => word.id === id) || null;
  }

  useEffect(() => {
    if (wordID) {
      const chosenWord = getWord(wordID);
      if (chosenWord) {
        setCorrectWord(chosenWord);
        setWordSize(chosenWord.word.length);
        return;
      }
    }
    chooseNewWord()
  }, []);

  const randomNewWord = (): Word => {
    const rawWord = words[Math.floor(Math.random() * words.length)];
    setWordID(rawWord.id);
    return rawWord;
  }

  const handleBackspace = () => {
    if (currentWord.length > 0) {
      setCurrentWord((prev: string) => prev.slice(0, -1));
      const newGameWords = [...gameWords];
      newGameWords[currentAttempt] = currentWord.slice(0, -1);
      setGameWords(newGameWords);
    }
  };

  const handleConfirm = () => {
    nextAttempt();
  }

  const handleWordChange = (newLetter: string) => {
    if (currentWord.length < wordSize && !defeat && !win) {
      const newWord = currentWord + newLetter;
      setCurrentWord(newWord);
      const newGameWords = [...gameWords];
      newGameWords[currentAttempt] = newWord;
      setGameWords(newGameWords);
    }
  };

  const nextAttempt = () => {
    setCanCheck(prev => {
      const newChecks = [...prev];
      newChecks[currentAttempt] = true;
      return newChecks;
    });
    const isWin = verifyWin();
    if (currentAttempt === maxAttempts - 1 && !isWin) {
      setDefeat(true);
    }
    setCurrentAttempt((prev: number) => prev + 1);
    if (!win) setCurrentWord('');
  }

  const verifyWin = () => {
    const validation = currentWord.toLowerCase() === correctWord?.word;
    if (validation) {
      setWin(true);
      return true;
    }
    return false;
  }

  const resetTurn = () => {
    setCurrentAttempt(0);
    setGameWords(fillGrid);
    setCurrentWord('');
    setDefeat(false);
    setWin(false);
    setCanCheck(initialChecks);
    chooseNewWord()
  };

  const value = {
    maxAttempts,
    correctWord,
    wordSize,
    defeat,
    win,
    canCheck,
    currentAttempt,
    gameWords,
    currentWord,
    handleBackspace,
    handleConfirm,
    handleWordChange,
    resetTurn,
  };

  return <GameContext.Provider
    value={value}
  >
    {children}
  </GameContext.Provider>;
};