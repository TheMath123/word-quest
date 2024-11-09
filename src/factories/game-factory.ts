import { GameState } from "@/@types/game.types";

export class GameFactory {
  private maxAttempts: number;
  private fillGrid: string[];
  private initialChecks: boolean[];

  constructor(maxAttempts: number) {
    this.maxAttempts = maxAttempts;
    this.fillGrid = Array(maxAttempts).fill("");
    this.initialChecks = Array(maxAttempts).fill(false);
  }

  getMaxAttempts(): number {
    return this.maxAttempts;
  }

  createInitialState(): GameState {
    return {
      alphabet: null,
      puzzle: null,
      wordSize: 0,
      defeat: false,
      win: false,
      canCheck: this.initialChecks,
      currentAttempt: 0,
      gameWords: this.fillGrid,
      currentWord: "",
      maxAttempts: this.maxAttempts,
    };
  }
}
