import {
  addPuzzleCompleted,
  createGameData,
  searchGameData,
  updateGameData,
} from "./game-data";

export class GameProgressService {
  async updateProgress(userId: string, puzzleId: string): Promise<void> {
    let userGameData = await searchGameData(userId);

    if (!userGameData) {
      userGameData = await createGameData(userId);
    }

    if (userGameData) {
      await addPuzzleCompleted({
        gameDataId: userGameData.id,
        puzzleId,
      });

      await updateGameData({
        gameDataId: userGameData.id,
        data: {
          totalCompleted: (userGameData?.totalCompleted ?? 0) + 1,
        },
      });
    }
  }
}
