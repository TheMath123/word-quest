import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Alphabet, GameData, Puzzle } from '@prisma/client';
import { fetchGame } from '@/services/game/fetch';
import { searchAlphabet } from '@/services/alphabet';
import { searchPuzzle } from '@/services/puzzle';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-profile';
import { addPuzzleCompleted, checkPuzzleCompleted, createGameData, searchGameData, updateGameData, } from '@/services/game-data';
import { destroyLocalStorage } from '@/utils/destroy-storage';

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
  nextTurn: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const alphabetName = 'Latin';
  const maxAttempts = 5;

  const router = useRouter()

  const [wordID, setWordID] = useLocalStorage<string | null>('id', null);
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


  const user = useUser()
  const [, setGameData] = useState<GameData | null>(null);

  const loadWord = async (options: { genNewWord?: boolean, newId?: string }) => {
    const { genNewWord = false, newId } = options;
    let dataPuzzle: Puzzle | null = null;
    const attempts = 0;
    const maxAttempts = 5;

    while (!dataPuzzle && attempts < maxAttempts) {
      if (genNewWord) {
        dataPuzzle = await fetchGame(alphabetName);
      } else if (newId) {
        dataPuzzle = await searchPuzzle(newId);
      } else if (wordID) {
        dataPuzzle = await searchPuzzle(wordID);
      } else {
        dataPuzzle = await fetchGame(alphabetName);
      }

      if (dataPuzzle && user?.id && !newId) {
        // const isCompleted = await checkPuzzleCompleted({
        //   userId: user.id,
        //   puzzleId: dataPuzzle.id
        // });
        // if (isCompleted) {
        //   dataPuzzle = null;
        //   attempts++;
        // } else {
        //   break;
        // }
      } else {
        break;
      }
    }

    if (!dataPuzzle) {
      destroyLocalStorage()
      console.error('Failed to load puzzle');
      return;
    }

    const dataAlphabet = await searchAlphabet({ name: dataPuzzle.alphabetName });

    if (dataPuzzle && dataPuzzle.word && dataAlphabet) {
      setPuzzle(dataPuzzle);
      setWordSize(dataPuzzle.word.length);
      setWordID(dataPuzzle.id);
      setAlphabet(dataAlphabet);
    }
  };


  const handleConfirm = async () => {
    const isWin = verifyWin();
    if (isWin && user?.id && puzzle) {
      // await updateUserGameData(user.id, puzzle.id);
    }
    nextAttempt();
  }

  const updateUserGameData = async (userId: string, puzzleId: string) => {
    let userGameData = await searchGameData(userId);
    if (!userGameData) {
      userGameData = await createGameData(userId);
    }
    if (userGameData) {
      await addPuzzleCompleted({
        gameDataId: userGameData.id,
        puzzleId,
      });
      await updateGameData({
        gameDataId: userGameData.id,
        data: {
          totalCompleted: userGameData!.totalCompleted + 1
        }
      });
      setGameData(userGameData);
    }
  };

  const changePuzzle = async (id: string) => {
    resetTurn();
    await loadWord({ newId: id });
  };

  const nextTurn = async () => {
    resetTurn();
    await loadWord({ genNewWord: true });
    router.refresh()
  };

  useEffect(() => {
    const initializeGame = async () => {
      if (!wordID) {
        await loadWord({ genNewWord: true });
      } else {
        await loadWord({});
      }
    };

    initializeGame();
  }, []);

  useEffect(() => {
    if (user?.id) {
      searchGameData(user.id).then(setGameData);
    }
  }, [user]);

  const handleBackspace = () => {
    if (currentWord.length > 0) {
      setCurrentWord((prev: string) => prev.slice(0, -1));
      const newGameWords = [...gameWords];
      newGameWords[currentAttempt] = currentWord.slice(0, -1);
      setGameWords(newGameWords);
    }
  };

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
    destroyLocalStorage()
    setCurrentAttempt(0);
    setGameWords(fillGrid);
    setCurrentWord('');
    setDefeat(false);
    setWin(false);
    setCanCheck(initialChecks);
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
    changePuzzle,
    nextTurn
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