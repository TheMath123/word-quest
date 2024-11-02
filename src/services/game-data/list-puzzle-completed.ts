"use server";

import { listCompletedPuzzlesWithDetails } from "@/model/puzzle-completed";

export async function listPuzzleCompleted(userId: string) {
  try {
    return listCompletedPuzzlesWithDetails(userId);
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
