"use server";

import { getPuzzle } from "@/model/puzzle";
import { Puzzle } from "@prisma/client";

export async function searchPuzzle(id: string): Promise<Puzzle | null> {
  try {
    const puzzle = await getPuzzle(id);
    if (!puzzle) {
      return null;
    }

    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
