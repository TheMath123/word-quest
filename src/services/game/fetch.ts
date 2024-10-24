"use server";

import { DPuzzle } from "@/db/schema";
import { getRandomPuzzle } from "@/model/puzzle";

export async function fetchGame(alphabetName: string): Promise<DPuzzle | null> {
  try {
    const puzzle = await getRandomPuzzle(alphabetName);
    if (!puzzle) {
      return null;
    }

    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
