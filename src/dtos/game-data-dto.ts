export interface UpdateGameDataDTO {
  gameDataId: string;
  data: { totalCompleted: number };
}

export interface CheckPuzzleCompletedDTO {
  userId: string;
  puzzleId: string;
}
