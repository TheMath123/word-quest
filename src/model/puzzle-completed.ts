import { PuzzleCompletedDTO } from "@/dtos/puzzle-completed-dto";
import { prisma } from "@/lib/db/prisma";

const addPuzzleCompleted = async ({
  gameDataId,
  puzzleId,
}: PuzzleCompletedDTO) => {
  return prisma.puzzleCompleted.create({
    data: {
      gameDataId,
      puzzleId,
    },
  });
};

export { addPuzzleCompleted };
