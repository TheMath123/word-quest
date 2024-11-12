export interface WordGuessDTO {
  word: string;
  tip: string;
  alphabetName: string;
  maxAttempts: number;
}

export interface WordGuessUpdateDTO extends WordGuessDTO {
  id: string;
}
