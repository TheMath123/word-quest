"use server";

import { ServiceResponse } from "@/@types/response";
import { deleteWordGuess as deleteWordGuessDB } from "@/model/word-guess";

export async function deleteWordGuess(id: string): Promise<ServiceResponse> {
  try {
    const puzzle = await deleteWordGuessDB(id);
    if (!puzzle) {
      return { error: "Puzzle not found" };
    }

    return { description: `Puzzle ${puzzle.word} deleted` };
  } catch (error) {
    console.error("error", error);
    return { error: "Problems deleting puzzle" };
  }
}
