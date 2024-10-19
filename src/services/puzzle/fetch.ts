"use server";

import { getPuzzles } from "@/model/puzzle";
import { Puzzle } from "@prisma/client";

export async function fetchPuzzles(): Promise<Puzzle[]> {
  try {
    const puzzle = await getPuzzles();
    if (!puzzle) {
      return [];
    }

    return puzzle;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
