"use server";

import { DPuzzle } from "@/db/schema";
import { getPuzzles } from "@/model/puzzle";

export async function fetchPuzzles(): Promise<DPuzzle[]> {
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
