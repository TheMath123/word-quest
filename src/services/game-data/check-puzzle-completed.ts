"use server";

import { checkPuzzleCompleted as checkPuzzleCompletedDB } from "@/model/game-data";
import { CheckPuzzleCompletedDTO } from "@/dtos/game-data-dto";

export async function checkPuzzleCompleted(data: CheckPuzzleCompletedDTO) {
  try {
    return checkPuzzleCompletedDB(data);
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
