"use server";

import { ServiceResponse } from "@/@types/response";
import { AlphabetDTO } from "@/dtos";
import {
  getAlphabet,
  createAlphabet as createAlphabetDB,
} from "@/model/alphabet";

export async function createAlphabet(
  data: AlphabetDTO
): Promise<ServiceResponse> {
  try {
    const alphabetExists = await getAlphabet({ name: data.name });
    if (alphabetExists) {
      return { error: "Alphabet already exists" };
    }

    await createAlphabetDB(data);

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
