"use server";

import { DWordGuess } from "@/db/schema";
import { getWordGuessList } from "@/model/word-guess";

export async function fetchWordGuess(): Promise<DWordGuess[]> {
  try {
    const puzzle = await getWordGuessList();
    if (!puzzle) {
      return [];
    }

    return puzzle;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
