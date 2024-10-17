export interface PuzzleDTO {
  word: string;
  tip: string;
  alphabetName: string;
}

export interface PuzzleUpdateDTO extends PuzzleDTO {
  id: string;
}
