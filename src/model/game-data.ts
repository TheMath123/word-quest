import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { gameData, puzzlesCompleted } from "@/db/schema";
import {
  CheckPuzzleCompletedDTO,
  UpdateGameDataDTO,
} from "@/dtos/game-data-dto";
import { DGameData, DPuzzlesCompleted } from "@/db/schema";

export type GameDataWithPuzzles = DGameData & {
  puzzlesCompleted: DPuzzlesCompleted[];
};

const getUserGameData = async (userId: string) => {
  const result = await db
    .select()
    .from(gameData)
    .where(eq(gameData.userId, userId))
    .leftJoin(puzzlesCompleted, eq(puzzlesCompleted.gameDataId, gameData.id));

  if (!result.length) return null;

  const gameDataResult = result[0].game_data;
  const puzzlesCompletedResult = result
    .map((r) => r.puzzles_completed)
    .filter(Boolean);

  return {
    ...gameDataResult,
    puzzlesCompleted: puzzlesCompletedResult,
  } as GameDataWithPuzzles;
};

const createGameData = async (userId: string): Promise<GameDataWithPuzzles> => {
  const result = await db
    .insert(gameData)
    .values({
      userId,
      totalCompleted: 0,
    })
    .returning();

  return {
    ...result[0],
    puzzlesCompleted: [],
  } as GameDataWithPuzzles;
};

const updateGameData = async ({ gameDataId, data }: UpdateGameDataDTO) => {
  const result = await db
    .update(gameData)
    .set(data)
    .where(eq(gameData.id, gameDataId))
    .returning();

  const puzzlesCompletedResult = await db
    .select()
    .from(puzzlesCompleted)
    .where(eq(puzzlesCompleted.gameDataId, gameDataId));

  return {
    ...result[0],
    puzzlesCompleted: puzzlesCompletedResult,
  } as GameDataWithPuzzles;
};

const checkPuzzleCompleted = async ({
  userId,
  puzzleId,
}: CheckPuzzleCompletedDTO): Promise<boolean> => {
  const userGameData = await getUserGameData(userId);
  return (
    userGameData?.puzzlesCompleted.some((pc) => pc.puzzleId === puzzleId) ??
    false
  );
};

export {
  getUserGameData,
  createGameData,
  updateGameData,
  checkPuzzleCompleted,
};
