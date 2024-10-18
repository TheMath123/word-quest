"use server";

import { getRandomPuzzle } from "@/model/puzzle";
import { Puzzle } from "@prisma/client";

export async function fetchGame(alphabetName: string): Promise<Puzzle | null> {
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
