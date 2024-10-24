"use server";

import { DPuzzlesCompleted } from "@/db/schema";
import { PuzzleCompletedDTO } from "@/dtos/puzzle-completed-dto";
import { addPuzzleCompleted as addPuzzleCompletedDB } from "@/model/puzzle-completed";

export async function addPuzzleCompleted(
  data: PuzzleCompletedDTO
): Promise<DPuzzlesCompleted | null> {
  try {
    return addPuzzleCompletedDB(data);
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
