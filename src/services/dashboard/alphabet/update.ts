"use server";

import { ServiceResponse } from "@/@types/response";
import { AlphabetUpdateDTO } from "@/dtos";
import { updateAlphabet as updateAlphabetDB } from "@/model/alphabet";

export async function updateAlphabet(
  data: AlphabetUpdateDTO
): Promise<ServiceResponse> {
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
