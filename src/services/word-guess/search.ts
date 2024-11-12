"use server";

import { DWordGuess } from "@/db/schema";
import { getWordGuessById } from "@/model/word-guess";

export async function searchWordGuess(id: string): Promise<DWordGuess | null> {
  try {
    const puzzle = await getWordGuessById(id);
    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
