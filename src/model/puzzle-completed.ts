import { PuzzleCompletedDTO } from "@/dtos/puzzle-completed-dto";
import { db } from "@/lib/db/drizzle";
import { puzzlesCompleted, DPuzzlesCompleted } from "@/db/schema";

const addPuzzleCompleted = async ({
  gameDataId,
  puzzleId,
}: PuzzleCompletedDTO): Promise<DPuzzlesCompleted> => {
  const result = await db
    .insert(puzzlesCompleted)
    .values({
      gameDataId,
      puzzleId,
    })
    .returning();

  return result[0];
};

export { addPuzzleCompleted };
