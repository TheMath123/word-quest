"use server";

import { AlphabetUpdateDTO } from "@/dtos";
import { updateAlphabet as updateAlphabetDB } from "@/model/alphabet";

interface AlphabetResponse {
  description?: string;
  error?: string;
}

export async function updateAlphabet(
  data: AlphabetUpdateDTO
): Promise<AlphabetResponse> {
  try {
    await updateAlphabetDB(data);

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
