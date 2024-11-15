"use server";

import { DWordGuess } from "@/db/schema";
import { getRandomWordGuess } from "@/model/word-guess";

export async function fetchGame(
  alphabetName: string
): Promise<DWordGuess | null> {
  try {
    const puzzle = await getRandomWordGuess(alphabetName);
    if (!puzzle) {
      return null;
    }

    return puzzle;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
