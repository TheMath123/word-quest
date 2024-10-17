"use server";

import { AlphabetParams, getAlphabet } from "@/model/alphabet";
import { Alphabet } from "@prisma/client";

export async function searchAlphabet(
  params: AlphabetParams
): Promise<Alphabet | null> {
  try {
    const alphabet = await getAlphabet(params);
    if (!alphabet) {
      return null;
    }

    return alphabet;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
