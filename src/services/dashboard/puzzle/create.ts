"use server";

import { PuzzleDTO } from "@/dtos";
import { createPuzzle as createPuzzleDB } from "@/model/puzzle";

interface AlphabetResponse {
  description?: string;
  error?: string;
}

export async function createPuzzle(data: PuzzleDTO): Promise<AlphabetResponse> {
  try {
    await createPuzzleDB(data);

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
