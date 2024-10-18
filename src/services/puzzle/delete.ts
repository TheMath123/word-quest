"use server";

import { ServiceResponse } from "@/@types/response";
import { deletePuzzle as deletePuzzleDB } from "@/model/puzzle";

export async function deletePuzzle(id: string): Promise<ServiceResponse> {
  try {
    const puzzle = await deletePuzzleDB(id);
    if (!puzzle) {
      return { error: "Puzzle not found" };
    }

    return { description: `Puzzle ${puzzle.word} deleted` };
  } catch (error) {
    console.error("error", error);
    return { error: "Problems deleting alphabet" };
  }
}
