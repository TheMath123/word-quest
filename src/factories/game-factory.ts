import { GameState } from "@/@types/game.types";

export class GameFactory {
  createInitialState(): GameState {
    return {
      alphabet: null,
      puzzle: null,
      wordSize: 0,
      maxAttempts: 0,
      defeat: false,
      win: false,
      canCheck: [],
      currentAttempt: 5,
      gameWords: [],
      currentWord: "",
    };
  }
}
