import { useState } from "react";
import { useLocalStorage } from "./use-local-storage";
import { GameState } from "@/@types/game.types";

export function useGameState(initialState: GameState) {
  const [state, setState] = useState<GameState>(initialState);
  const [storedId, setStoredId] = useLocalStorage<string | null>("id", null);

  const updateState = (updates: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return {
    state,
    updateState,
    storedId,
    setStoredId,
  };
}
