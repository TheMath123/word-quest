"use server";

import { PuzzleCompletedDTO } from "@/dtos/puzzle-completed-dto";
import { addPuzzleCompleted as addPuzzleCompletedDB } from "@/model/puzzle-completed";
import { PuzzleCompleted } from "@prisma/client";

export async function createGameData(
  data: PuzzleCompletedDTO
): Promise<PuzzleCompleted | null> {
  try {
    return addPuzzleCompletedDB(data);
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
