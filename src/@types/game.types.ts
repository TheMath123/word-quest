import { DAlphabet, DPuzzle } from "@/db/schema";

export interface GameState {
  alphabet: DAlphabet | null;
  puzzle: DPuzzle | null;
  wordSize: number;
  maxAttempts: number;
  defeat: boolean;
  win: boolean;
  canCheck: boolean[];
  currentAttempt: number;
  gameWords: string[];
  currentWord: string;
}
