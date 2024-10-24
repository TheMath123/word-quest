"use server";

import { DPuzzle } from "@/db/schema";
import { getPuzzleById } from "@/model/puzzle";

export async function searchPuzzle(id: string): Promise<DPuzzle | null> {
  try {
    const puzzle = await getPuzzleById(id);
    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
