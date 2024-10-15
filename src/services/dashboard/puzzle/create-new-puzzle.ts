"use server";

import { PuzzleDTO } from "@/dtos";
import { createPuzzle } from "@/model/puzzle";

interface AlphabetResponse {
  description?: string;
  error?: string;
}

export async function createNewPuzzle(
  data: PuzzleDTO
): Promise<AlphabetResponse> {
  try {
    await createPuzzle(data);

    return { description: "Alphabet created" };
  } catch (error) {
    console.error("error", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}
