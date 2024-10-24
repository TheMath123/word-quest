"use server";

import { DAlphabet } from "@/db/schema";
import { getAlphabet, GetAlphabetParams } from "@/model/alphabet";

export async function searchAlphabet({
  id,
  name,
}: GetAlphabetParams): Promise<DAlphabet | null> {
  try {
    const alphabet = await getAlphabet({ id, name });
    return alphabet;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
