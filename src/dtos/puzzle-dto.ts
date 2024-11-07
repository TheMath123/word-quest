export interface PuzzleDTO {
  word: string;
  tip: string;
  alphabetName: string;
  maxAttempts: number;
}

export interface PuzzleUpdateDTO extends PuzzleDTO {
  id: string;
}
