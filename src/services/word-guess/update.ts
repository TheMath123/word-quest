"use server";

import { ServiceResponse } from "@/@types/response";
import { WordGuessUpdateDTO } from "@/dtos";
import { updateWordGuess as updateWordGuessDB } from "@/model/word-guess";

export async function updateWordGuess(
  data: WordGuessUpdateDTO
): Promise<ServiceResponse> {
  try {
    await updateWordGuessDB(data);

    return { description: "Alphabet updated" };
  } catch (error) {
    console.error("error", error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unknown error occurred" };
    }
  }
}
