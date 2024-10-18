import {
  CheckPuzzleCompletedDTO,
  UpdateGameDataDTO,
} from "@/dtos/game-data-dto";
import { prisma } from "@/lib/db/prisma";
import { GameData, PuzzleCompleted } from "@prisma/client";

export type GameDataWithPuzzles = GameData & {
  puzzlesCompleted: PuzzleCompleted[];
};

const getUserGameData = async (userId: string) => {
  return prisma.gameData.findUnique({
    where: { userId },
    include: { puzzlesCompleted: true },
  });
};

const createGameData = async (userId: string): Promise<GameDataWithPuzzles> => {
  return prisma.gameData.create({
    data: {
      userId,
      totalCompleted: 0,
    },
    include: { puzzlesCompleted: true },
  });
};

const updateGameData = async ({
  gameDataId,
  data,
}: UpdateGameDataDTO): Promise<GameDataWithPuzzles> => {
  return prisma.gameData.update({
    where: { id: gameDataId },
    data,
    include: { puzzlesCompleted: true },
  });
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
