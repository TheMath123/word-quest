import { GameState } from "@/@types/word-guess-game";

export class WordGuessGameFactory {
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
