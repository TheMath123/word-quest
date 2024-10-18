import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Alphabet, Puzzle } from '@prisma/client';
import { fetchGame } from '@/services/game/fetch';
import { searchAlphabet } from '@/services/dashboard/alphabet';
import { searchPuzzle } from '@/services/dashboard/puzzle';

interface GameContextType {
  alphabet: Alphabet | null;
  maxAttempts: number;
  puzzle: Puzzle | null;
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
  changePuzzle: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const alphabetName = 'Latin';
  const maxAttempts = 5;
  const [wordID, setWordID] = useLocalStorage<string | undefined>('id');
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [wordSize, setWordSize] = useLocalStorage('sizew', 0);
  const [alphabet, setAlphabet] = useLocalStorage<Alphabet | null>('alphabet', null);
  const [defeat, setDefeat] = useLocalStorage('defeat', false);
  const [win, setWin] = useLocalStorage('win', false);
  const initialChecks = Array(maxAttempts).fill(false);
  const [canCheck, setCanCheck] = useLocalStorage('checks', initialChecks);
  const [currentAttempt, setCurrentAttempt] = useLocalStorage('attempt', 0);
  const fillGrid = Array(maxAttempts).fill('');
  const [gameWords, setGameWords] = useLocalStorage<string[]>('game', fillGrid);
  const [currentWord, setCurrentWord] = useLocalStorage<string>('word', '');

  const changePuzzle = (id: string) => {
    setWordID(id);
    existCurrentPuzzle()
  }

  const chooseNewWord = async () => {
    const dataPuzzle = await fetchGame(alphabetName);
    const dataAlphabet = await searchAlphabet({ name: dataPuzzle?.alphabetName });
    const chosenWord = dataPuzzle?.word as string;
    if (dataPuzzle && chosenWord && dataAlphabet) {
      setPuzzle(dataPuzzle);
      setWordSize(chosenWord.length);
      setWordID(dataPuzzle.id);
      setAlphabet(dataAlphabet);
    }
  }

  const existCurrentPuzzle = async () => {
    if (wordID) {
      const dataPuzzle = await searchPuzzle(wordID);
      const dataAlphabet = await searchAlphabet({ name: dataPuzzle?.alphabetName });
      const chosenWord = dataPuzzle?.word as string;
      if (dataPuzzle && chosenWord) {
        setPuzzle(dataPuzzle);
        setWordSize(chosenWord.length);
        setWordID(dataPuzzle.id);
        setAlphabet(dataAlphabet);
      }
    }
  }


  useEffect(() => {
    if (wordID) {
      existCurrentPuzzle();
      return;
    }
    chooseNewWord()
  }, []);

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
    const validation = currentWord.toLowerCase() === puzzle?.word;
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
    alphabet,
    maxAttempts,
    puzzle,
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
    changePuzzle
  };

  return <GameContext.Provider
    value={value}
  >
    {children}
  </GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};