import { GameState } from "@/@types/game.types";
import { GameFactory } from "@/factories/game-factory";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useUser } from "@/hooks/use-profile";
import { GameLoaderService } from "@/services/game-loader";
import { GameProgressService } from "@/services/game-progress";
import { destroyLocalStorage } from "@/utils/destroy-storage";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export function useGameState(initialState: GameState) {
  const [state, setState] = useState<GameState>(initialState);
  const [storedId, setStoredId] = useLocalStorage<string | null>('id', null);

  const updateState = (updates: Partial<GameState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return {
    state,
    updateState,
    storedId,
    setStoredId,
  };
}

interface GameContextType {
  state: GameState;
  handleBackspace: () => void;
  handleConfirm: () => Promise<void>;
  handleWordChange: (newLetter: string) => void;
  resetTurn: () => void;
  changePuzzle: (id: string) => Promise<void>;
  nextTurn: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const gameFactory = new GameFactory();
  const gameLoader = new GameLoaderService();
  const gameProgress = new GameProgressService();
  const router = useRouter();
  const user = useUser();

  const {
    state,
    updateState,
    storedId,
    setStoredId
  } = useGameState(gameFactory.createInitialState());

  const loadWord = async (options: { genNewWord?: boolean; newId?: string }) => {
    const result = await gameLoader.loadWord({
      ...options,
      currentWordId: storedId
    });

    if (!result.puzzle) {
      destroyLocalStorage();
      return;
    }

    updateState({
      puzzle: result.puzzle,
      wordSize: result.wordSize,
      maxAttempts: result.maxAttempts,
      alphabet: result.alphabet,
      canCheck: Array(result.maxAttempts).fill(false),
      gameWords: Array(result.maxAttempts).fill(''),
      currentAttempt: 0,
    });
    setStoredId(result.puzzle.id);
  };

  const handleWordChange = (newLetter: string) => {
    if (state.currentWord.length < state.wordSize && !state.defeat && !state.win) {
      const newWord = state.currentWord + newLetter;
      const newGameWords = [...state.gameWords];
      newGameWords[state.currentAttempt] = newWord;

      updateState({
        currentWord: newWord,
        gameWords: newGameWords
      });
    }
  };

  const handleBackspace = () => {
    if (state.currentWord.length > 0) {
      const newWord = state.currentWord.slice(0, -1);
      const newGameWords = [...state.gameWords];
      newGameWords[state.currentAttempt] = newWord;

      updateState({
        currentWord: newWord,
        gameWords: newGameWords
      });
    }
  };

  const verifyWin = (): boolean => {
    const validation = state.currentWord.toLowerCase() === state.puzzle?.word;
    if (validation) {
      updateState({ win: true });
    }
    return validation;
  };

  const handleConfirm = async () => {
    const isWin = verifyWin();
    if (isWin && user?.id && state.puzzle) {
      await gameProgress.updateProgress(user.id, state.puzzle.id);
    }
    nextAttempt();
  };

  const nextAttempt = () => {
    const newChecks = [...state.canCheck];
    newChecks[state.currentAttempt] = true;

    const isWin = verifyWin();

    updateState({
      currentWord: '',
      currentAttempt: state.currentAttempt + 1,
      canCheck: newChecks
    });

    if (isWin) {
      updateState({
        currentWord: '',
      });
      return;
    }

    if (state.currentAttempt === state.maxAttempts - 1 && !isWin) {
      updateState({
        defeat: true,
        canCheck: newChecks
      });
      return;
    }
  };

  const resetTurn = () => {
    destroyLocalStorage();
    updateState(gameFactory.createInitialState());
  };

  const changePuzzle = async (id: string) => {
    resetTurn();
    await loadWord({ newId: id });
  };

  const nextTurn = async () => {
    resetTurn();
    await loadWord({ genNewWord: true });
    router.refresh();
  };

  useEffect(() => {
    const initializeGame = async () => {
      if (!storedId) {
        await loadWord({ genNewWord: true });
      } else {
        await loadWord({});
      }
    };

    initializeGame();
  }, []);

  const value = {
    state,
    handleBackspace,
    handleConfirm,
    handleWordChange,
    resetTurn,
    changePuzzle,
    nextTurn,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};