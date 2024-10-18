import { UpdateGameDataDTO } from "@/dtos/game-data-dto";
import { prisma } from "@/lib/db/prisma";

const getUserGameData = async (userId: string) => {
  return prisma.gameData.findUnique({
    where: { userId },
    include: { puzzlesCompleted: true },
  });
};

const createGameData = async (userId: string) => {
  return prisma.gameData.create({
    data: {
      userId,
      totalCompleted: 0,
    },
  });
};

const updateGameData = async ({ gameDataId, data }: UpdateGameDataDTO) => {
  return prisma.gameData.update({
    where: { id: gameDataId },
    data,
  });
};

export { getUserGameData, createGameData, updateGameData };
