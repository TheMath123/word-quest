"use server";

import { getPuzzleById } from "@/model/puzzle";
import { Puzzle } from "@prisma/client";

export async function searchPuzzle(id: string): Promise<Puzzle | null> {
  try {
    const puzzle = await getPuzzleById(id);
    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
