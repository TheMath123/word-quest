import { DAlphabet, DWordGuess } from "@/db/schema";

export interface GameState {
  alphabet: DAlphabet | null;
  puzzle: DWordGuess | null;
  wordSize: number;
  maxAttempts: number;
  defeat: boolean;
  win: boolean;
  canCheck: boolean[];
  currentAttempt: number;
  gameWords: string[];
  currentWord: string;
}
