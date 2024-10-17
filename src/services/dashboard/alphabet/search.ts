"use server";

import { getAlphabet, GetAlphabetParams } from "@/model/alphabet";
import { Alphabet } from "@prisma/client";

export async function searchAlphabet({
  id,
  name,
}: GetAlphabetParams): Promise<Alphabet | null> {
  try {
    const alphabet = await getAlphabet({ id, name });
    if (!alphabet) {
      return null;
    }
    return alphabet;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
