"use server";

import { ServiceResponse } from "@/@types/response";
import { WordGuessDTO } from "@/dtos";
import { createWordGuess as createWordGuessDB } from "@/model/word-guess";

export async function createWordGuess(
  data: WordGuessDTO
): Promise<ServiceResponse> {
  try {
    await createWordGuessDB(data);

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
