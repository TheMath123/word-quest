import { PuzzleCompletedDTO } from "@/dtos/puzzle-completed-dto";
import { prisma } from "@/lib/db/prisma";
import { PuzzleCompleted } from "@prisma/client";

const addPuzzleCompleted = async ({
  gameDataId,
  puzzleId,
}: PuzzleCompletedDTO): Promise<PuzzleCompleted> => {
  return prisma.puzzleCompleted.create({
    data: {
      gameDataId,
      puzzleId,
    },
  });
};
export { addPuzzleCompleted };
